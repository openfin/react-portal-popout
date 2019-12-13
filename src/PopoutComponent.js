import React from 'react';

const PopoutComponent = ({children, isOpen}) => {
    return (
        <div className="popoutComponent">
            <button>&gt;</button>
            {children}
        </div>
    );
}

export default PopoutComponent;