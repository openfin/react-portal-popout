import React from 'react';

const Counter = ({increment, decrement, count}) => {
    return (
        <div className="counter">
            <button onClick={decrement}>-</button>
            <span>{count}</span>
            <button onClick={increment}>+</button>
        </div>
    );
}

export default Counter;