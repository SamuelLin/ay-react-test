import React, { useEffect, useState, useRef, useCallback } from 'react';
import PropTypes from 'prop-types';

import CustomInputNumberButton from './CustomInputNumberButton';
import useNonInitialEffect from '@/utils/useNonInitialEffect';

const triggerInputChange = (node, inputValue) => {
  const descriptor = Object.getOwnPropertyDescriptor(node, 'value');

  node.value = `${inputValue}#`;
  if (descriptor && descriptor.configurable) {
    delete node.value;
  }
  node.value = inputValue;

  const e = document.createEvent('HTMLEvents');
  e.initEvent('change', true, false);
  node.dispatchEvent(e);

  if (descriptor) {
    Object.defineProperty(node, 'value', descriptor);
  }
};

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
  const [inputValue, setInputValue] = useState(value);
  const [upperDisabled, setUpperDisabled] = useState(false);
  const [downDisabled, setDownDisabled] = useState(false);

  useEffect(() => {
    setDownDisabled(value - step < min);

    if (max !== 0) {
      setUpperDisabled(value + step > max);
    }
    // 避免超出最大值
    if (value > max) {
      triggerInputChange(inputEl.current, max);
    }
    // 避免超出最小值
    if (value < min) {
      triggerInputChange(inputEl.current, min);
    }
  }, [value, min, max, step]);

  useNonInitialEffect(() => {
    triggerInputChange(inputEl.current, inputValue);
  }, [inputValue]);

  const handleClick = (type) => {
    setInputValue((prevValue) => (type === 'minus' ? prevValue - step : prevValue + step));
  };

  const handleBlur = (e) => onBlur(e);

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
        value={value}
        disabled={disabled}
        onChange={(e) => onChange(e)}
        onBlur={handleBlur}
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
