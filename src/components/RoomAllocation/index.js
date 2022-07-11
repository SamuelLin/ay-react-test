import React, { useState, useMemo, useEffect } from 'react';
import PropTypes from 'prop-types';
import CustomInputNumber from '@/components/CustomInputNumber';

function RoomAllocation({ guest = 0, room = 0, onChange = () => {} }) {
  const [defaultAllocatNum, setDefaultAllocatNum] = useState(0);
  const [roomState, setRoomState] = useState(Array(room).fill({ adult: 1, child: 0 }));
  const allocatNum = useMemo(
    () => roomState.reduce((acc, room) => acc + room.adult + room.child, 0),
    [roomState]
  );
  const leftGuest = guest - allocatNum;
  const isDisabled = leftGuest === 0;

  useEffect(() => {
    setDefaultAllocatNum(guest - room);
  }, []);

  return (
    <div className="room-allocation">
      <h4>
        住客人數: {guest} 人 / {room} 房
      </h4>
      <div className="room-allocation-hint">
        <p>尚未分配人數: {leftGuest} 人</p>
      </div>
      {roomState.map((room, index) => (
        <div key={index}>
          <h4>房間: 1 人</h4>
          <div className="room-allocation-list">
            大人
            <CustomInputNumber
              value={room.adult}
              min={1}
              max={defaultAllocatNum}
              disabled={isDisabled}
              onChange={(event) => {
                setRoomState((prevState) => {
                  const newState = [...prevState];
                  newState[index].adult = event.target.value;
                  return newState;
                });
              }}
            />
          </div>
          <div className="room-allocation-list">
            小孩
            <CustomInputNumber
              value={room.child}
              min={0}
              max={defaultAllocatNum}
              disabled={isDisabled}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

RoomAllocation.propTypes = {
  guest: PropTypes.number,
  room: PropTypes.number,
  onChange: PropTypes.func
};

export default RoomAllocation;
