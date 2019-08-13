import React, { Component } from 'react';

import './ChipStack.css';

const arrayOfInts = (value, quantity) =>
  Array.from(Array(quantity), () => value);

const getChipValues = amount => {
  let remainder = amount;
  const tens = Math.floor(remainder / 10);
  remainder -= tens * 10;
  const fives = Math.floor(remainder / 5);
  remainder -= fives * 5;
  const ones = remainder;
  return [
    ...arrayOfInts(10, tens),
    ...arrayOfInts(5, fives),
    ...arrayOfInts(1, ones)
  ];
};

class ChipStack extends Component {
  render() {
    const { amount } = this.props;
    const chips = getChipValues(amount);

    return (
      <div className="chip-stack">
        {chips.map(chip => {
          return <div className={`flat-chip value-${chip}`} />;
        })}
      </div>
    );
  }
}

export default ChipStack;
