import React, { useState, useRef } from 'react';
import ReactDOM from 'react-dom';

const PopoutComponent = (props) => {
    const selfRef = useRef();
    
    console.log('render', !!selfRef.current);

    const [isPoppedOut, setIsPoppedOut] = useState(false);
    const [canPopOut, setCanPopout] = useState(false);
    const [popoutWin, setPopoutWin] = useState();
    const [domTargets, setDomTargets] = useState({});

    if(!popoutWin && window.fin) {
        const windowName = props.name || fin.desktop.getUuid();
        // fin.Window.create({
        //     url: 'popout.html',
        //     name: windowName
        new Promise((rs,rj) => {  //HACK: (See below...)
            let popoutWin = new fin.desktop.Window({
                url: 'popout.html',
                name: windowName,
                autoShow: false
            }, 
            () => rs(popoutWin),
            rj);
        }).then(popoutWin => {
            let popoutTarget = popoutWin
                //.getWebWindow()
                .getNativeWindow() //HACK: Something is wrong with the V2 getWebWindow call
                .document.getElementById('root');
            
            window.addEventListener('beforeunload', () => popoutWin.close());

            setPopoutWin(popoutWin);
            setDomTargets({
                content: selfRef.current,
                poppedIn: selfRef.current.parentElement,
                poppedOut: popoutTarget
            });
            setCanPopout(true);
        });
    }

    function togglePopout() {
        if(isPoppedOut) {
            domTargets.poppedIn.appendChild(domTargets.content);
            popoutWin.hide();
        }
        else {
            domTargets.poppedOut.appendChild(domTargets.content);
            popoutWin.show();
            popoutWin.bringToFront();
        }

        setIsPoppedOut(!isPoppedOut);
    }

    const content = (
        <div className="popoutComponent">
            <button onClick={() => togglePopout()}>
                {isPoppedOut ? '<' : '>'}
            </button>
            {props.children}
        </div>
    );

    return (
        <>
            <div ref={selfRef} />
            {selfRef.current ? ReactDOM.createPortal(content, selfRef.current.parentElement) : null}
        </>
    );
}

export default PopoutComponent;