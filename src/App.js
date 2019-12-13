import React, {useState} from 'react';
import CounterPicker from './CountPicker';
import Counter from './Counter';
import PopoutComponent from './PopoutComponent';
import WindowPortal from './WindowPortal';
const App = () => {
    const [count, setCount] = useState(0)
    const [isOpen, setIsOpen] = useState(false);

    const increment = () => { setCount(count + 1) }
    const decrement = () => { setCount(count - 1)}

    return ( 
        <>
            <CounterPicker count={count}/>
            <PopoutComponent>
                <Counter increment={increment} decrement={decrement} count={count} />
            </PopoutComponent>
           { 
            <WindowPortal isOpen={isOpen} setIsOpen={setIsOpen}>
                <PopoutComponent>
                    <Counter increment={increment} decrement={decrement} count={count} />
                </PopoutComponent>
            </WindowPortal>
           }
        </>
    );
}

export default App;