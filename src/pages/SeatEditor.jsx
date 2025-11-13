import React, { useState, useRef } from 'react';

const SeatStatus = {
  available: 'available',
  taken: 'taken',
  blocked: 'blocked',
};

export default function SeatEditor() {
  const [groups, setGroups] = useState([]);
  const [currentGroupId, setCurrentGroupId] = useState(null);
  const [stage, setStage] = useState({
    x: 200,
    y: 50,
    width: 400,
    height: 100,
  });
  const [verticalGuide, setVerticalGuide] = useState(null);
  const [horizontalGuide, setHorizontalGuide] = useState(null);

  const snapThreshold = 8;
  const containerRef = useRef();

  const addGroup = () => {
    const newId = `G${groups.length + 1}`;
    const newGroup = {
      id: newId,
      x: 50 + 50 * groups.length,
      y: 200 + 50 * groups.length,
      isSelected: false,
      grid: [[{ id: 'A1', isSelected: false, status: SeatStatus.available }]],
      price: 100,
    };
    setGroups([...groups, newGroup]);
    setCurrentGroupId(newId);
  };

  const deleteGroup = (gid) => {
    setGroups((prev) => {
      const index = prev.findIndex((g) => g.id === gid);
      if (index === -1) return prev;

      const newGroups = prev.filter((g) => g.id !== gid);

      for (let i = index; i < newGroups.length; i++) {
        const num = i + 1;
        newGroups[i] = { ...newGroups[i], id: `G${num}` };
      }

      if (gid === gid) {
        setCurrentGroupId(null);
      }

      return newGroups;
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
          status: SeatStatus.available,
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
            status: SeatStatus.available,
          },
        ];
        return { ...g, grid: [...g.grid, newRow] };
      })
    );
  };

  const toggleSeatSelection = (gid, r, c) => {
    setGroups((prev) =>
      prev.map((g) => {
        if (g.id !== gid) return g;
        const newGrid = g.grid.map((row, ri) =>
          row.map((seat, ci) =>
            ri === r && ci === c
              ? { ...seat, isSelected: !seat.isSelected }
              : seat
          )
        );
        return { ...g, grid: newGrid };
      })
    );
    setCurrentGroupId(gid);
  };

  const deleteSeats = () => {
    setGroups((prev) =>
      prev
        .map((g) => {
          const allSelected = g.grid.every((row) =>
            row.every((s) => s.isSelected)
          );

          if (allSelected) {
            return null;
          }

          const newGrid = g.grid
            .map((row) => row.filter((s) => !s.isSelected))
            .filter((row) => row.length > 0);

          const updatedGrid = newGrid.map((row, rowIndex) =>
            row.map((seat, colIndex) => ({
              ...seat,
              id: `${String.fromCharCode(65 + rowIndex)}${colIndex + 1}`,
            }))
          );

          return { ...g, grid: updatedGrid };
        })
        .filter(Boolean)
    );
  };

  const changeSelectedSeatsStatus = (status) => {
    setGroups((prev) =>
      prev.map((g) => ({
        ...g,
        grid: g.grid.map((row) =>
          row.map((seat) =>
            seat.isSelected ? { ...seat, status, isSelected: false } : seat
          )
        ),
      }))
    );
  };

  const updateGroupPrice = (gid, newPrice) => {
    console.log(gid);
    setGroups((prev) =>
      prev.map((g) => (g.id === gid ? { ...g, price: newPrice } : g))
    );
  };

  const seatColor = (seat) => {
    if (seat.isSelected) return 'red';
    if (seat.status === SeatStatus.available) return 'blue';
    if (seat.status === SeatStatus.taken) return 'gray';
    return 'black';
  };

  const exportJson = () => {
    const data = {
      stage,
      groups: groups.map((g) => ({
        id: g.id,
        x: g.x,
        y: g.y,
        price: g.price,
        grid: g.grid.map((row) =>
          row.map((s) => ({ id: s.id, status: s.status }))
        ),
      })),
    };
    console.log(JSON.stringify(data, null, 2));
  };

  const onGroupDrag = (e, gid) => {
    e.preventDefault();
    e.stopPropagation();
    const startX = e.clientX;
    const startY = e.clientY;
    const group = groups.find((g) => g.id === gid);
    const initX = group.x;
    const initY = group.y;

    const onMove = (ev) => {
      const dx = ev.clientX - startX;
      const dy = ev.clientY - startY;
      let newX = initX + dx;
      let newY = initY + dy;

      let vGuide = null;
      let hGuide = null;
      groups.forEach((other) => {
        if (other.id === gid) return;

        if (Math.abs(newX - other.x) < snapThreshold) {
          newX = other.x;
          vGuide = other.x;
        }
        if (Math.abs(newY - other.y) < snapThreshold) {
          newY = other.y;
          hGuide = other.y;
        }

        const overlapX = newX < other.x + 100 && newX + 100 > other.x;
        const overlapY = newY < other.y + 100 && newY + 100 > other.y;
        if (overlapX && overlapY) {
          if (dx > 0) newX = other.x + 100;
          else newX = other.x - 100;
          if (dy > 0) newY = other.y + 100;
          else newY = other.y - 100;
        }
      });

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
      const dx = ev.clientX - startX;
      const dy = ev.clientY - startY;
      setStage({ ...stage, x: initX + dx, y: initY + dy });
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
      className="w-screen h-screen relative overflow-hidden origin-top-left"
    >
      <div className="flex gap-8 p-8 bg-[#eee]">
        <button onClick={addGroup} className="px-4 py-2 bg-gray-200 rounded">
          add group
        </button>
        <button
          onClick={() => deleteGroup(currentGroupId)}
          className="px-4 py-2 bg-gray-200 rounded"
        >
          delete group
        </button>
        <button
          onClick={addRowAtBottom}
          className="px-4 py-2 bg-gray-200 rounded"
        >
          add row
        </button>
        <button onClick={deleteSeats} className="px-4 py-2 bg-gray-200 rounded">
          delete selected
        </button>
        <button
          onClick={() => changeSelectedSeatsStatus('available')}
          className="px-4 py-2 bg-gray-200 rounded"
        >
          mark available
        </button>
        <button
          onClick={() => changeSelectedSeatsStatus('taken')}
          className="px-4 py-2 bg-gray-200 rounded"
        >
          mark taken
        </button>
        <button
          onClick={() => changeSelectedSeatsStatus('blocked')}
          className="px-4 py-2 bg-gray-200 rounded"
        >
          mark blocked
        </button>
        <button onClick={exportJson} className="px-4 py-2 bg-gray-200 rounded">
          export json
        </button>
      </div>

      <div
        onMouseDown={onStageDrag}
        className="absolute flex items-center justify-center font-bold text-white bg-green-600"
        style={{
          left: stage.x,
          top: stage.y,
          width: stage.width,
          height: stage.height,
        }}
      >
        STAGE
      </div>

      {groups.map((g) => (
        <div
          key={g.id}
          onMouseDown={(e) => onGroupDrag(e, g.id)}
          onClick={() => setCurrentGroupId(g.id)}
          className={`absolute bg-[#f2f2f2] p-2 ${
            currentGroupId === g.id
              ? 'border-2 border-red-500'
              : 'border-2 border-black'
          }`}
          style={{ left: g.x, top: g.y }}
        >
          <div className="font-bold">
            group {g.id} - ${g.price.toFixed(2)}
          </div>
          {g.grid.map((row, ri) => (
            <div key={ri} className="flex items-center">
              {row.map((seat, ci) => (
                <div
                  key={ci}
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleSeatSelection(g.id, ri, ci);
                  }}
                  className="w-10 h-10 m-1 rounded-md flex items-center justify-center text-white select-none cursor-pointer"
                  style={{ backgroundColor: seatColor(seat) }}
                >
                  {seat.id}
                </div>
              ))}
              <button
                onClick={() => addSeatToRow(g.id, ri)}
                className="px-2 py-1 bg-gray-300 rounded ml-1"
              >
                +
              </button>
            </div>
          ))}

          <button
            onClick={addRowAtBottom}
            className="px-2 py-1 bg-gray-300 rounded ml-1"
          >
            +
          </button>

          {currentGroupId === g.id && (
            <div className="mt-2 flex items-center gap-2">
              <span>price:</span>
              <input
                type="number"
                value={g.price}
                className="w-16 px-1 border rounded"
                onMouseDown={(e) => e.stopPropagation()}
                onChange={(e) =>
                  updateGroupPrice(
                    g.id,
                    e.target.value === '' ? 0 : parseFloat(e.target.value)
                  )
                }
              />
            </div>
          )}
        </div>
      ))}

      {verticalGuide !== null && (
        <div
          className="absolute bg-red-500"
          style={{ left: verticalGuide, top: 0, bottom: 0, width: 1 }}
        />
      )}
      {horizontalGuide !== null && (
        <div
          className="absolute bg-red-500"
          style={{ top: horizontalGuide, left: 0, right: 0, height: 1 }}
        />
      )}
    </div>
  );
}
