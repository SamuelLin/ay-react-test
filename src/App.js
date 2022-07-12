import React, { useState } from 'react';
import CustomInputNumber from '@/components/CustomInputNumber';
import RoomAllocation from './components/RoomAllocation';

function App() {
  const [inputValue, setInputValue] = useState(1);

  return (
    <div style={{ padding: '0 20px' }}>
      <h2>normal</h2>
      <CustomInputNumber
        min={0}
        max={5}
        step={1}
        name="testInput1"
        value={inputValue}
        disabled={false}
        onChange={(e) => {
          console.log('onChange', e.target.value);
          setInputValue(+e.target.value);
        }}
        onBlur={(e) => {
          console.log('onBlur', e.target.value);
          console.log(e.target.value);
        }}
      />

      <h2>disabled</h2>
      <CustomInputNumber name="testInput2" disabled={true} />

      <h2>RoomAllocation</h2>
      <RoomAllocation
        guest={10}
        room={3}
        onChange={(result) => console.log('RoomAllocation: ', result)}
      />

      <br />
      <br />
      <br />
    </div>
  );
}

export default App;
