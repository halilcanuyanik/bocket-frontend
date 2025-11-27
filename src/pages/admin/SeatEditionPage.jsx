import { useState, useRef } from 'react';

const seatColor = (seat) => {
  if (seat.isSelected) return '#E04B57';
  if (seat.status === 'occupied') return '#9CA3AF';
  return '#2C3186';
};

const getBounds = (group, seatSize = 40, gap = 8, padding = 16) => {
  if (!group.grid || group.grid.length === 0) return { w: 100, h: 100 };
  const rows = group.grid.length;
  const cols = group.grid[0].length;

  const width = cols * seatSize + (cols - 1) * gap + padding * 2;
  const height = rows * seatSize + (rows - 1) * gap + padding * 2;
  return {
    left: group.x,
    top: group.y,
    right: group.x + width,
    bottom: group.y + height,
    width,
    height,
    centerX: group.x + width / 2,
    centerY: group.y + height / 2,
  };
};

export default function SeatEditionPage() {
  const TOOLBAR_HEIGHT = 64;
  const SEAT_SIZE = 40;
  const SEAT_GAP = 8;
  const GROUP_PADDING = 16;
  const SNAP_THRESHOLD = 10;

  const [groups, setGroups] = useState([]);
  const [currentGroupId, setCurrentGroupId] = useState(null);

  const [stage, setStage] = useState({
    x: (window.innerWidth - 600) / 2,
    y: TOOLBAR_HEIGHT + 20,
    width: 600,
    height: 120,
  });

  const [guides, setGuides] = useState({ x: null, y: null });

  const [scale, setScale] = useState(1);

  const lastSelectedSeatRef = useRef(null);

  const idCounterRef = useRef(0);
  const containerRef = useRef(null);

  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));

  const exportJson = () => {
    const data = {
      meta: {
        scale,
        version: '1.0',
      },
      stage,
      groups: groups.map((g) => ({
        id: g.id,
        x: g.x,
        y: g.y,
        grid: g.grid.map((row) =>
          row.map((s) => ({
            id: s.id,
            status: s.status,
          }))
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
      x: 50 + 20 * groups.length,
      y: stage.y + stage.height + 50,
      grid: [[{ id: 'A1', isSelected: false, status: 'available' }]],
    };
    setGroups((prev) => [...prev, newGroup]);
    setCurrentGroupId(newId);
  };

  const normalizeGroupIds = (groups) => {
    return groups.map((g, index) => ({
      ...g,
      id: `G${index + 1}`,
    }));
  };

  const deleteGroup = (gid) => {
    if (!gid) return;
    setGroups((prev) => {
      const filtered = prev.filter((g) => g.id !== gid);
      const normalized = normalizeGroupIds(filtered);
      idCounterRef.current = normalized.length;

      if (currentGroupId === gid) {
        setCurrentGroupId(null);
      }

      return normalized;
      // return filtered;
    });
    if (currentGroupId === gid) setCurrentGroupId(null);
  };

  const addRowToGroup = (gid) => {
    setGroups((prev) =>
      prev.map((g) => {
        if (g.id !== gid) return g;
        const currentRowCount = g.grid.length;
        const colCount = g.grid[0].length;

        const newRow = Array.from({ length: colCount }).map((_, i) => ({
          id: `${String.fromCharCode(65 + currentRowCount)}${i + 1}`,
          isSelected: false,
          status: 'available',
        }));

        return { ...g, grid: [...g.grid, newRow] };
      })
    );
  };

  const addColToGroup = (gid) => {
    setGroups((prev) =>
      prev.map((g) => {
        if (g.id !== gid) return g;

        const newGrid = g.grid.map((row, rowIndex) => {
          const colIndex = row.length;
          return [
            ...row,
            {
              id: `${String.fromCharCode(65 + rowIndex)}${colIndex + 1}`,
              isSelected: false,
              status: 'available',
            },
          ];
        });

        return { ...g, grid: newGrid };
      })
    );
  };

  const selectRange = (gid, startR, startC, endR, endC) => {
    setGroups((prev) =>
      prev.map((g) => {
        if (g.id !== gid) return g;
        const newGrid = g.grid.map((row, r) =>
          row.map((seat, c) => {
            const inRowRange =
              r >= Math.min(startR, endR) && r <= Math.max(startR, endR);
            const inColRange =
              c >= Math.min(startC, endC) && c <= Math.max(startC, endC);
            if (inRowRange && inColRange) {
              return { ...seat, isSelected: true };
            }
            return seat;
          })
        );
        return { ...g, grid: newGrid };
      })
    );
  };

  const handleSeatClick = (e, gid, r, c) => {
    e.stopPropagation();
    if (
      e.shiftKey &&
      lastSelectedSeatRef.current &&
      lastSelectedSeatRef.current.gid === gid
    ) {
      const { r: lr, c: lc } = lastSelectedSeatRef.current;
      if (lr === r || lc === c) {
        selectRange(gid, lr, lc, r, c);
        return;
      }
    }

    setGroups((prev) =>
      prev.map((g) => {
        if (g.id !== gid) {
          return {
            ...g,
            grid: g.grid.map((row) =>
              row.map((s) => ({ ...s, isSelected: false }))
            ),
          };
        }

        const newGrid = g.grid.map((row, ri) =>
          row.map((seat, ci) => {
            if (ri === r && ci === c) {
              const newState = !seat.isSelected;
              if (newState) {
                lastSelectedSeatRef.current = { gid, r, c };
              } else {
                lastSelectedSeatRef.current = null;
              }
              return { ...seat, isSelected: newState };
            }
            return seat;
          })
        );
        return { ...g, grid: newGrid };
      })
    );
    setCurrentGroupId(gid);
  };

  const deleteSeats = () => {
    setGroups((prev) => {
      return prev
        .map((g) => {
          const gridWithDeleted = g.grid.map((row) =>
            row.filter((s) => !s.isSelected)
          );

          const nonEmptyGrid = gridWithDeleted.filter((row) => row.length > 0);

          if (nonEmptyGrid.length === 0) return null;

          const reindexedGrid = nonEmptyGrid.map((row, ri) =>
            row.map((s, ci) => ({
              ...s,
              id: `${String.fromCharCode(65 + ri)}${ci + 1}`,
            }))
          );

          return { ...g, grid: reindexedGrid };
        })
        .filter(Boolean);
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

    const draggingBounds = getBounds(group, SEAT_SIZE, SEAT_GAP, GROUP_PADDING);

    const onMove = (ev) => {
      const dx = (ev.clientX - startX) / scale;
      const dy = (ev.clientY - startY) / scale;

      let rawX = initX + dx;
      let rawY = initY + dy;

      let newX = rawX;
      let newY = rawY;

      let guideX = null;
      let guideY = null;

      groups.forEach((other) => {
        if (other.id === gid) return;
        const otherBounds = getBounds(
          other,
          SEAT_SIZE,
          SEAT_GAP,
          GROUP_PADDING
        );

        if (Math.abs(rawX - otherBounds.left) < SNAP_THRESHOLD) {
          newX = otherBounds.left;
          guideX = otherBounds.left;
        } else if (Math.abs(rawX - otherBounds.right) < SNAP_THRESHOLD) {
          newX = otherBounds.right;
          guideX = otherBounds.right;
        } else if (
          Math.abs(rawX + draggingBounds.width - otherBounds.left) <
          SNAP_THRESHOLD
        ) {
          newX = otherBounds.left - draggingBounds.width;
          guideX = otherBounds.left;
        } else if (
          Math.abs(rawX + draggingBounds.width - otherBounds.right) <
          SNAP_THRESHOLD
        ) {
          newX = otherBounds.right - draggingBounds.width;
          guideX = otherBounds.right;
        }

        if (Math.abs(rawY - otherBounds.top) < SNAP_THRESHOLD) {
          newY = otherBounds.top;
          guideY = otherBounds.top;
        } else if (Math.abs(rawY - otherBounds.bottom) < SNAP_THRESHOLD) {
          newY = otherBounds.bottom;
          guideY = otherBounds.bottom;
        } else if (
          Math.abs(rawY + draggingBounds.height - otherBounds.top) <
          SNAP_THRESHOLD
        ) {
          newY = otherBounds.top - draggingBounds.height;
          guideY = otherBounds.top;
        } else if (
          Math.abs(rawY + draggingBounds.height - otherBounds.bottom) <
          SNAP_THRESHOLD
        ) {
          newY = otherBounds.bottom - draggingBounds.height;
          guideY = otherBounds.bottom;
        }
      });

      if (newY < stage.y) {
        newY = stage.y;
        guideY = stage.y;
      }

      setGroups((prev) =>
        prev.map((g) => (g.id === gid ? { ...g, x: newX, y: newY } : g))
      );
      setGuides({ x: guideX, y: guideY });
    };

    const onUp = () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup', onUp);
      setGuides({ x: null, y: null });
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

      const newY = Math.max(TOOLBAR_HEIGHT + 10, initY + dy);
      setStage((s) => ({ ...s, x: initX + dx, y: newY }));
    };

    const onUp = () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup', onUp);
    };

    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);
  };

  return (
    <div
      ref={containerRef}
      className="w-screen h-screen flex flex-col overflow-hidden bg-gray-100 select-none"
    >
      <div
        className="flex items-center gap-3 px-4 shadow-sm bg-white z-50"
        style={{ height: TOOLBAR_HEIGHT }}
      >
        <h1 className="font-bold text-gray-700 mr-4">Seat Map Editor</h1>
        <button
          onClick={addGroup}
          className="bg-indigo-600 text-white px-3 py-1 rounded text-sm hover:bg-indigo-700"
        >
          Add Group
        </button>
        <button
          onClick={() => deleteGroup(currentGroupId)}
          className="bg-red-50 text-red-600 border border-red-200 px-3 py-1 rounded text-sm hover:bg-red-100"
        >
          Delete Group
        </button>
        <button
          onClick={deleteSeats}
          className="bg-white text-gray-700 border border-gray-300 px-3 py-1 rounded text-sm hover:bg-gray-50"
        >
          Delete Seats
        </button>
        <div className="flex-1" />
        <div className="flex items-center gap-2 bg-gray-100 p-1 rounded-lg">
          <button
            onClick={() => setScale((s) => clamp(s - 0.1, 0.2, 3))}
            className="w-8 h-8 flex items-center justify-center font-bold hover:bg-white rounded"
          >
            -
          </button>
          <span className="text-xs w-12 text-center">
            {Math.round(scale * 100)}%
          </span>
          <button
            onClick={() => setScale((s) => clamp(s + 0.1, 0.2, 3))}
            className="w-8 h-8 flex items-center justify-center font-bold hover:bg-white rounded"
          >
            +
          </button>
        </div>
        <button
          onClick={() => {
            const d = exportJson();
            navigator.clipboard.writeText(JSON.stringify(d));
            alert('JSON copied to clipboard!');
          }}
          className="ml-4 bg-green-600 text-white px-4 py-1 rounded text-sm hover:bg-green-700"
        >
          Export
        </button>
      </div>

      <div className="flex-1 relative overflow-hidden bg-[#f0f2f5] cursor-grab active:cursor-grabbing">
        <div
          style={{
            transform: `scale(${scale})`,
            transformOrigin: '0 0',
            width: '100%',
            height: '100%',
          }}
          className="relative"
        >
          <div
            onMouseDown={onStageDrag}
            className="absolute flex items-center justify-center bg-gray-800 text-white rounded-b-lg shadow-lg cursor-move"
            style={{
              left: stage.x,
              top: stage.y,
              width: stage.width,
              height: stage.height,
              zIndex: 10,
            }}
          >
            <div className="text-center">
              <div className="font-bold tracking-widest text-lg">STAGE</div>
              <div className="text-xs text-gray-400 mt-1">Drag me</div>
            </div>
          </div>
          {groups.map((g) => (
            <div
              key={g.id}
              className="absolute"
              style={{
                left: g.x,
                top: g.y,
                zIndex: currentGroupId === g.id ? 20 : 5,
              }}
            >
              <div className="relative">
                <div className="absolute -top-8 left-0 w-full flex justify-center">
                  <button
                    onClick={() => addRowToGroup(g.id)}
                    className="bg-blue-500 text-white text-xs px-2 py-1 rounded-t shadow-sm hover:bg-blue-600 transition-colors"
                    title="Add Row to Bottom"
                  >
                    + Add Row
                  </button>
                </div>
                <div className="absolute -left-8 top-0 h-full flex flex-col justify-center">
                  <button
                    onClick={() => addColToGroup(g.id)}
                    className="bg-blue-500 text-white text-xs px-1 py-2 rounded-l shadow-sm hover:bg-blue-600 transition-colors writing-vertical"
                    style={{ writingMode: 'vertical-rl' }}
                    title="Add Column to Right"
                  >
                    + Col
                  </button>
                </div>
                <div
                  onMouseDown={(e) => onGroupDrag(e, g.id)}
                  onClick={() => setCurrentGroupId(g.id)}
                  className={`bg-white rounded-lg shadow-sm p-4 transition-shadow ${
                    currentGroupId === g.id
                      ? 'ring-2 ring-indigo-500 shadow-xl'
                      : 'border border-gray-200'
                  }`}
                  style={{ cursor: 'move' }}
                >
                  <div className="text-xs font-bold text-gray-400 mb-2 select-none pointer-events-none text-center">
                    {g.id}
                  </div>

                  <div className="flex flex-col gap-2">
                    {g.grid.map((row, ri) => (
                      <div key={ri} className="flex gap-2">
                        {row.map((seat, ci) => (
                          <div
                            key={seat.id}
                            onClick={(e) => handleSeatClick(e, g.id, ri, ci)}
                            className="rounded-md flex items-center justify-center text-white text-xs font-medium shadow-sm hover:opacity-90 transition-opacity cursor-pointer"
                            style={{
                              width: SEAT_SIZE,
                              height: SEAT_SIZE,
                              backgroundColor: seatColor(seat),
                            }}
                          >
                            {seat.id}
                          </div>
                        ))}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
          {guides.x !== null && (
            <div
              className="absolute top-0 bottom-0 border-l border-cyan-400 border-dashed z-50 pointer-events-none"
              style={{ left: guides.x, borderWidth: '1px' }}
            />
          )}
          {guides.y !== null && (
            <div
              className="absolute left-0 right-0 border-t border-cyan-400 border-dashed z-50 pointer-events-none"
              style={{ top: guides.y, borderWidth: '1px' }}
            />
          )}
        </div>
      </div>
    </div>
  );
}
