import React from 'react';
import PropTypes from 'prop-types';

function CustomInputNumber({
  min = 0,
  max = 0,
  step = 0,
  name = '',
  disabled = false,
  onChange = () => {},
  onBlur = () => {}
}) {
  return (
    <div>
      <h1>CustomInputNumber</h1>
    </div>
  );
}

CustomInputNumber.propTypes = {
  min: PropTypes.number,
  max: PropTypes.number,
  step: PropTypes.number,
  name: PropTypes.string,
  disabled: PropTypes.bool,
  onChange: PropTypes.func,
  onBlur: PropTypes.func
};

export default CustomInputNumber;
