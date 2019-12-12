import React from 'react';

const PopoutComponent = (props) => {
    return (
        <div className="popoutComponent">
            <button>&gt;</button>
            {props.children}
        </div>
    );
}

export default PopoutComponent;