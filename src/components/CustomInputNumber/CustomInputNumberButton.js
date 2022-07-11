import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import useLongPress from '@/utils/useLongPress';

let timer = null;

function CustomInputNumberButton({ disabled = false, children, onClick = () => {} }) {
  const btn = useRef(null);

  useEffect(() => {
    if (disabled) {
      clearInterval(timer);
    }
  }, [disabled]);

  const onLongPress = () => {
    timer = setInterval(() => {
      onClick();
    }, 500);
  };

  const onLongPressEnd = () => {
    clearInterval(timer);
  };

  const defaultOptions = {
    shouldPreventDefault: true,
    delay: 500
  };

  const longPressEvent = useLongPress(onLongPress, onLongPressEnd, onClick, defaultOptions);

  return (
    <button ref={btn} {...longPressEvent} disabled={disabled}>
      {children}
    </button>
  );
}

CustomInputNumberButton.propTypes = {
  children: PropTypes.any,
  disabled: PropTypes.bool,
  onClick: PropTypes.func
};

export default CustomInputNumberButton;
