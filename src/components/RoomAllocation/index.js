import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import CustomInputNumber from '@/components/CustomInputNumber';

const initialRoomState = (guest, room) => {
  const roomState = Array(room)
    .fill(null)
    .map(() => {
      guest--;
      return {
        adult: guest >= 0 ? 1 : 0,
        child: 0
      };
    });

  return roomState;
};

function RoomAllocation({ guest = 0, room = 0, onChange = () => {} }) {
  const [roomState, setRoomState] = useState(initialRoomState(guest, room));
  const allocatNum = roomState.reduce((acc, room) => acc + room.adult + room.child, 0);
  const leftGuest = guest - allocatNum;
  const isFullAllocated = leftGuest === 0;
  const isDisabled = guest < room;

  useEffect(() => {
    onChange(roomState);
  }, [roomState]);

  return (
    <div className="room-allocation">
      <h4>
        住客人數: {guest} 人 / {room} 房
      </h4>

      {!isFullAllocated && (
        <div className="room-allocation-hint">
          <p>尚未分配人數: {leftGuest} 人</p>
        </div>
      )}

      {roomState.map((room, index) => (
        <div key={index}>
          <h4>房間: {room.adult + room.child} 人</h4>
          <div className="room-allocation-list">
            <p>
              大人
              <br />
              <span className="text-hint">年齡20+</span>
            </p>

            <CustomInputNumber
              value={room.adult}
              min={1}
              max={isFullAllocated ? room.adult : room.adult + leftGuest}
              disabled={isDisabled}
              onChange={(event) => {
                setRoomState((prevState) => {
                  const newState = prevState.map((room, roomIndex) => {
                    if (roomIndex === index) {
                      return { ...room, adult: +event.target.value };
                    }
                    return room;
                  });
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
              max={isFullAllocated ? room.child : room.child + leftGuest}
              disabled={isDisabled}
              onChange={(event) => {
                setRoomState((prevState) => {
                  const newState = prevState.map((room, roomIndex) => {
                    if (roomIndex === index) {
                      return { ...room, child: +event.target.value };
                    }
                    return room;
                  });
                  return newState;
                });
              }}
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
