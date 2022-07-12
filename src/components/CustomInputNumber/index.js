import React, { useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';

import CustomInputNumberButton from './CustomInputNumberButton';
import triggerInputChange from '@/utils/triggerInputChange';

function CustomInputNumber({
  min = 0,
  max = 0,
  step = 1,
  name = '',
  value = 0,
  disabled = false,
  onChange = () => {},
  onBlur = () => {}
}) {
  const inputEl = useRef(null);
  const cacheInputValue = useRef(0);
  const [inputValue, setInputValue] = useState(value);
  const [upperDisabled, setUpperDisabled] = useState(false);
  const [downDisabled, setDownDisabled] = useState(false);

  useEffect(() => {
    // 判斷按鈕 disabled
    setDownDisabled(inputValue - step < min);
    max !== 0 && setUpperDisabled(inputValue + step > max);
  }, [inputValue, min, max, step]);

  useEffect(() => {
    // update cached value
    cacheInputValue.current = inputValue;
  }, [inputValue]);

  const handleClick = (type) => {
    let newValue = cacheInputValue.current;
    if (type === 'minus') newValue = cacheInputValue.current - step;
    if (type === 'plus') newValue = cacheInputValue.current + step;
    triggerInputChange(inputEl.current, newValue);
  };

  const handleChange = (e) => {
    if (e.target.value > max) e.target.value = max;
    if (e.target.value < min) e.target.value = min;
    setInputValue(+e.target.value);
    onChange(e);
  };

  return (
    <div className="custom-input">
      <CustomInputNumberButton
        disabled={disabled || downDisabled}
        onClick={() => handleClick('minus')}>
        -
      </CustomInputNumberButton>
      <input
        className="testInput"
        ref={inputEl}
        type="number"
        name={name}
        value={inputValue}
        disabled={disabled}
        onChange={handleChange}
        onBlur={onBlur}
      />
      <CustomInputNumberButton
        disabled={disabled || upperDisabled}
        onClick={() => handleClick('plus')}>
        +
      </CustomInputNumberButton>
    </div>
  );
}

CustomInputNumber.propTypes = {
  min: PropTypes.number,
  max: PropTypes.number,
  step: PropTypes.number,
  name: PropTypes.string,
  value: PropTypes.number,
  disabled: PropTypes.bool,
  onChange: PropTypes.func,
  onBlur: PropTypes.func
};

export default CustomInputNumber;
