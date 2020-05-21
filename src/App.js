import React from 'react';

import CounterPicker from './CountPicker';
import Counter from './Counter';
import PopoutComponent from './PopoutComponent';

import ContextMenu from './ContextMenu';

const App = () => {
    return (
        <>
            <CounterPicker/>
            <PopoutComponent>
                <Counter/>
            </PopoutComponent>
            <div id='menuTarget' style={{backgroundColor:'lightgray'}}>
                CLICK ME FOR menu
                <ContextMenu.Menu>
                    <ContextMenu.Item>Save</ContextMenu.Item>
                    <ContextMenu.Item>Close</ContextMenu.Item>
                </ContextMenu.Menu>
            </div>
        </>
    );
}

export default App;