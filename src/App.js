import React from 'react';

import CounterPicker from './CountPicker';
import Counter from './Counter';
import PopoutComponent from './PopoutComponent';

const App = () => {
    return (
        <>
            <CounterPicker/>
            <PopoutComponent>
                <Counter/>
            </PopoutComponent>
        </>
    );
}

export default App;