import { useState, useEffect, useRef } from 'react';

const seatColor = (seat) => {
  if (seat.isSelected) return '#E04B57';
  return '#2C3186';
};

export default function SeatEditorPage() {
  const TOOLBAR_HEIGHT = 64;
  const STAGE_MIN_TOP = TOOLBAR_HEIGHT + 8;
  const SNAP_THRESHOLD = 8;
  const GROUP_SIZE = { w: 100, h: 100 };

  const [groups, setGroups] = useState([]);
  const [currentGroupId, setCurrentGroupId] = useState(null);

  const [stage, setStage] = useState({
    x: (window.innerWidth - 400) / 2,
    y: STAGE_MIN_TOP + 16,
    width: 400,
    height: 100,
  });

  const [verticalGuide, setVerticalGuide] = useState(null);
  const [horizontalGuide, setHorizontalGuide] = useState(null);

  const [scale, setScale] = useState(1);

  const idCounterRef = useRef(0);

  const containerRef = useRef(null);

  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));

  const exportJson = () => {
    const data = {
      stage,
      groups: groups.map((g) => ({
        id: g.id,
        x: g.x,
        y: g.y,
        grid: g.grid.map((row) =>
          row.map((s) => ({ id: s.id, status: s.status }))
        ),
      })),
    };
    console.log('EXPORT:', JSON.stringify(data, null, 2));
    return data;
  };

  const addGroup = () => {
    idCounterRef.current += 1;
    const newId = `G${idCounterRef.current}`;
    const newGroup = {
      id: newId,
      x: 50 + 50 * groups.length,
      y: 200 + 50 * groups.length,
      isSelected: false,
      grid: [[{ id: 'A1', isSelected: false, status: 'available' }]],
    };
    setGroups((prev) => [...prev, newGroup]);
    setCurrentGroupId(newId);
  };

  const deleteGroup = (gid) => {
    setGroups((prev) => {
      const filtered = prev.filter((g) => g.id !== gid);
      const normalized = normalizeGroupIds(filtered);
      idCounterRef.current = normalized.length;

      if (currentGroupId === gid) {
        setCurrentGroupId(null);
      }

      return normalized;
    });
  };

  const addSeatToRow = (gid, rowIndex) => {
    setGroups((prev) =>
      prev.map((g) => {
        if (g.id !== gid) return g;
        const newGrid = [...g.grid];
        const row = [...newGrid[rowIndex]];
        const colIndex = row.length;
        row.push({
          id: `${String.fromCharCode(65 + rowIndex)}${colIndex + 1}`,
          isSelected: false,
          status: 'available',
        });
        newGrid[rowIndex] = row;
        return { ...g, grid: newGrid };
      })
    );
  };

  const addRowAtBottom = () => {
    if (!currentGroupId) return;
    setGroups((prev) =>
      prev.map((g) => {
        if (g.id !== currentGroupId) return g;
        const newRowIndex = g.grid.length;
        const newRow = [
          {
            id: `${String.fromCharCode(65 + newRowIndex)}1`,
            isSelected: false,
            status: 'available',
          },
        ];
        return { ...g, grid: [...g.grid, newRow] };
      })
    );
  };

  const toggleSeatStatus = (gid, r, c) => {
    setGroups((prev) =>
      prev.map((g) => {
        let newGrid = g.grid;
        if (g.id !== gid && g.id === currentGroupId) {
          newGrid = g.grid.map((row) =>
            row.map((seat) => ({ ...seat, isSelected: false }))
          );
        }

        if (g.id === gid) {
          newGrid = g.grid.map((row, ri) =>
            row.map((seat, ci) =>
              ri === r && ci === c
                ? { ...seat, isSelected: !seat.isSelected }
                : seat
            )
          );
        }

        return { ...g, grid: newGrid };
      })
    );
    setCurrentGroupId(gid);
  };

  const normalizeGroupIds = (groups) => {
    return groups.map((g, index) => ({
      ...g,
      id: `G${index + 1}`,
    }));
  };

  const deleteSeats = () => {
    setGroups((prev) => {
      const cleanedGroups = prev
        .map((g) => {
          const allSelected = g.grid.every((row) =>
            row.every((s) => s.isSelected)
          );
          if (allSelected) return null;

          const newGrid = g.grid
            .map((row) => row.filter((s) => !s.isSelected))
            .filter((row) => row.length > 0);

          return {
            ...g,
            grid: newGrid.map((row, ri) =>
              row.map((s, ci) => ({
                ...s,
                id: `${String.fromCharCode(65 + ri)}${ci + 1}`,
                isSelected: false,
              }))
            ),
          };
        })
        .filter(Boolean);
      const normalized = normalizeGroupIds(cleanedGroups);
      idCounterRef.current = normalized.length;
      return normalized;
    });
  };

  const onGroupDrag = (e, gid) => {
    e.preventDefault();
    e.stopPropagation();
    const startX = e.clientX;
    const startY = e.clientY;
    const group = groups.find((g) => g.id === gid);
    if (!group) return;
    const initX = group.x;
    const initY = group.y;

    const onMove = (ev) => {
      const dx = (ev.clientX - startX) / scale;
      const dy = (ev.clientY - startY) / scale;
      let newX = initX + dx;
      let newY = initY + dy;

      let vGuide = null;
      let hGuide = null;

      groups.forEach((other) => {
        if (other.id === gid) return;

        if (Math.abs(newX - other.x) < SNAP_THRESHOLD) {
          newX = other.x;
          vGuide = other.x;
        }
        if (Math.abs(newY - other.y) < SNAP_THRESHOLD) {
          newY = other.y;
          hGuide = other.y;
        }

        const overlapX =
          newX < other.x + GROUP_SIZE.w && newX + GROUP_SIZE.w > other.x;
        const overlapY =
          newY < other.y + GROUP_SIZE.h && newY + GROUP_SIZE.h > other.y;
        if (overlapX && overlapY) {
          if (dx > 0) newX = other.x + GROUP_SIZE.w;
          else newX = other.x - GROUP_SIZE.w;
          if (dy > 0) newY = other.y + GROUP_SIZE.h;
          else newY = other.y - GROUP_SIZE.h;
        }
      });

      const container = containerRef.current;
      if (container) {
        const cw = container.clientWidth / scale;
        const ch = container.clientHeight / scale;
        newX = clamp(newX, 0, cw - GROUP_SIZE.w);
        newY = clamp(newY, STAGE_MIN_TOP, ch - GROUP_SIZE.h);
      }

      setGroups((prev) =>
        prev.map((g) => (g.id === gid ? { ...g, x: newX, y: newY } : g))
      );
      setVerticalGuide(vGuide);
      setHorizontalGuide(hGuide);
    };

    const onUp = () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup', onUp);
      setVerticalGuide(null);
      setHorizontalGuide(null);
    };

    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);
  };

  const onStageDrag = (e) => {
    e.preventDefault();
    const startX = e.clientX;
    const startY = e.clientY;
    const initX = stage.x;
    const initY = stage.y;

    const onMove = (ev) => {
      const dx = (ev.clientX - startX) / scale;
      const dy = (ev.clientY - startY) / scale;
      const container = containerRef.current;
      let maxX = Number.POSITIVE_INFINITY;
      let maxY = Number.POSITIVE_INFINITY;
      if (container) {
        maxX = container.clientWidth / scale - stage.width;
        maxY = container.clientHeight / scale - stage.height;
      }

      const newX = clamp(initX + dx, 0, Math.max(0, maxX));
      const newY = clamp(
        initY + dy,
        STAGE_MIN_TOP,
        Math.max(STAGE_MIN_TOP, maxY)
      );
      setStage((s) => ({ ...s, x: newX, y: newY }));
    };

    const onUp = () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup', onUp);
    };

    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);
  };

  const zoomIn = () => setScale((s) => clamp(s + 0.1, 0.3, 3));
  const zoomOut = () => setScale((s) => clamp(s - 0.1, 0.3, 3));
  const resetZoom = () => setScale(1);

  useEffect(() => {
    const onResize = () => {
      const container = containerRef.current;
      if (!container) return;
      const maxX = container.clientWidth / scale - stage.width;
      const maxY = container.clientHeight / scale - stage.height;
      setStage((s) => ({
        ...s,
        x: clamp(s.x, 0, Math.max(0, maxX)),
        y: clamp(s.y, STAGE_MIN_TOP, Math.max(STAGE_MIN_TOP, maxY)),
      }));
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [scale, stage.width, stage.height]);

  return (
    <div
      ref={containerRef}
      className="w-screen min-h-screen relative overflow-hidden origin-top-left bg-gray-50 touch-none"
    >
      <div
        className="flex gap-4 items-center px-6"
        style={{
          height: TOOLBAR_HEIGHT,
          background: 'white',
          borderBottom: '1px solid #e5e5e5',
          alignItems: 'center',
          position: 'relative',
          zIndex: 9999,
          pointerEvents: 'auto',
        }}
      >
        <button onClick={addGroup} className="editor-button">
          add group
        </button>
        <button
          onClick={() => deleteGroup(currentGroupId)}
          className="editor-button"
        >
          delete group
        </button>
        <button onClick={addRowAtBottom} className="editor-button">
          add row
        </button>
        <button onClick={deleteSeats} className="editor-button">
          delete selected
        </button>

        <button
          onClick={() => {
            const d = exportJson();
            try {
              navigator.clipboard &&
                navigator.clipboard.writeText(JSON.stringify(d));
            } catch (e) {
              console.error(e);
            }
          }}
          className="editor-button"
        >
          export json
        </button>

        <div
          style={{
            marginLeft: 'auto',
            display: 'flex',
            gap: 8,
            alignItems: 'center',
          }}
        >
          <button onClick={zoomOut} className="editor-button">
            −
          </button>
          <div style={{ minWidth: 48, textAlign: 'center' }}>
            {Math.round(scale * 100)}%
          </div>
          <button onClick={zoomIn} className="editor-button">
            +
          </button>
          <button onClick={resetZoom} className="editor-button">
            reset
          </button>
        </div>
      </div>

      <div
        className="absolute top-0 left-0"
        style={{
          transformOrigin: '0 0',
          transform: `scale(${scale})`,
          width: '100%',
          height: '100%',
          zIndex: 0,
          pointerEvents: 'auto',
        }}
      >
        <div
          onMouseDown={onStageDrag}
          className="absolute flex items-center justify-center font-bold text-white bg-gray-400 rounded-sm"
          style={{
            left: stage.x,
            top: stage.y,
            width: stage.width,
            height: stage.height,
            cursor: 'grab',
            userSelect: 'none',
          }}
        >
          STAGE
        </div>

        {groups.map((g) => (
          <div
            key={g.id}
            onMouseDown={(e) => onGroupDrag(e, g.id)}
            onClick={() => setCurrentGroupId(g.id)}
            className={`absolute bg-[#f2f2f2] p-2 rounded-sm`}
            style={{
              left: g.x,
              top: g.y,
              border:
                currentGroupId === g.id
                  ? '2px solid #ff7a00'
                  : '2px solid #000',
              cursor: 'grab',
            }}
          >
            <div className="font-bold">{g.id}</div>
            {g.grid.map((row, ri) => (
              <div key={ri} className="flex items-center">
                {row.map((seat, ci) => (
                  <div
                    key={ci}
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleSeatStatus(g.id, ri, ci);
                    }}
                    className="w-10 h-10 m-1 rounded-md flex items-center justify-center text-white select-none cursor-pointer"
                    style={{ backgroundColor: seatColor(seat) }}
                  >
                    {seat.id}
                  </div>
                ))}
                <button
                  onClick={() => addSeatToRow(g.id, ri)}
                  className="px-2 py-1 bg-gray-300 rounded ml-1 cursor-pointer"
                >
                  +
                </button>
              </div>
            ))}

            <button
              onClick={addRowAtBottom}
              className="px-2 py-1 bg-gray-300 rounded ml-1 cursor-pointer"
            >
              +
            </button>
          </div>
        ))}

        {verticalGuide !== null && (
          <div
            className="absolute"
            style={{
              left: verticalGuide,
              top: 0,
              bottom: 0,
              width: 1,
              background: '#7DD3FC',
            }}
          />
        )}
        {horizontalGuide !== null && (
          <div
            className="absolute"
            style={{
              top: horizontalGuide,
              left: 0,
              right: 0,
              height: 1,
              background: '#7DD3FC',
            }}
          />
        )}
      </div>
    </div>
  );
}
