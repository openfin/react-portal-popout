import React from 'react';

const counters = [
    { innerText: 'Red' },
    { innerText: 'Blue' },
    { innerText: 'Green' },
]

const CountPicker = () => {
    return (
        <div className="countPicker">
            <select>
                {counters.map((c, i) => (<option key={i}>{c.innerText}</option>))}
            </select>
            <span>0</span>
        </div>
    );
}

export default CountPicker;