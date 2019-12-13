import React, {useEffect} from 'react';
import { createPortal } from 'react-dom';

function WindowPortal({children}) {
    const popoutContainer = document.createElement('div');
    
    useEffect(() => {
        let popoutWindow = window.open('', '', 'width=600,height=400,left=200,top=200')
        popoutWindow.document.body.appendChild(popoutContainer);
        
        return () => {
            popoutWindow.close();
        }
    })
    return ( createPortal(children, popoutContainer) );
}

export default WindowPortal;