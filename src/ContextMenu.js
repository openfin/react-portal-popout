import React, { useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';


class BaseMenuImpl {
    constructor(menuElement) {
        this.menuElement = menuElement;
        let parentElement = menuElement.parentElement;

        parentElement.addEventListener('contextmenu', (mouseEvent) => {
            mouseEvent.preventDefault();
            mouseEvent.stopPropagation();

            this.onContextMenu(mouseEvent);

            return false;
        });
    }
}

class DivMenuImpl extends BaseMenuImpl {
    constructor(menuElement) {
        super(menuElement);

        // div only
        document.body.addEventListener('click', () => this.onContextMenuClosed());
        window.addEventListener('blur', () => this.onContextMenuClosed());
    }

    onContextMenu(mouseEvent) {
        let {
            clientX: left,
            clientY: top
        } = mouseEvent;

        Object.assign(this.menuElement.style, {
            left: `${left}px`,
            top: `${top}px`,
            display: 'block'
        });
    }

    onContextMenuClosed() {
        Object.assign(this.menuElement.style, {
            left: '',
            top: '',
            display: 'none',
            position: 'absolute'
        });
    }
}

class WinMenuImpl extends BaseMenuImpl {
    constructor(menuElement) {
        super(menuElement);

        this.ofWin = new fin.desktop.Window({
            url: 'about:blank',
            name: fin.desktop.getUuid(),
            frame: false,
            autoShow: false,
            resizable: false
        }, ack => {
            window.addEventListener('beforeunload', () => this.ofWin.close());
            this.ofWin.addEventListener('blurred', () => this.onContextMenuClosed());
            this.ofWin.getNativeWindow().document.body.appendChild(menuElement);
            menuElement.style.display = 'block';
        });
    }

    onContextMenu(mouseEvent) {
        let {
            screenX: left,
            screenY: top
        } = mouseEvent;

        let { 
            width,
            height 
        } = this.menuElement.getBoundingClientRect();

        console.dir({left,top,width,height});
        
        this.ofWin.setBounds(
            left, 
            top,
            width + 16,
            height + 16
        );
        this.ofWin.show();
        this.ofWin.bringToFront();
        this.ofWin.focus();
    }

    onContextMenuClosed() {
        this.ofWin.hide();
    }
}

class Menu2 extends React.Component {
    constructor(props) {
        super(props);
        this.ref = React.createRef();
    }

    render() {
        return window.fin ? (
            <WinMenu innerRef={this.ref}>{this.props.children}</WinMenu>
        ) : (
            <DivMenu innerRef={this.ref}>{this.props.children}</DivMenu>
        );
    }

    componentDidMount() { 
        let menuElement = this.ref.current;
        let menuTarget = menuElement.parentElement;

        menuTarget.addEventListener('contextmenu', evt => {
            evt.preventDefault();
            evt.stopPropagation();

            this.impl.onContextMenu(evt);
        });
        
    }
}

class DivMenu extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return <MenuBase className='divMenu' innerRef={this.props.innerRef}>{this.props.children}</MenuBase>;
    }
}

class WinMenu extends React.Component {
    constructor(props) {
        super(props);

        this.impl = {
            afterMount: function(menuElement) {
                let ofWin = new fin.desktop.Window({
                    url: 'about:blank',
                    name: fin.desktop.getUuid(),
                    frame: false,
                    autoShow: true
                }, ack => {
                    ofWin.getNativeWindow().document.body.appendChild(menuElement);
                });
            },
            onContextMenu: function(evt) {
                console.log('show menu: ', evt.screenX, evt.screenY);
            }
        };
    }

    render() {
        return <MenuBase className='winMenu' innerRef={this.props.innerRef}>{this.props.children}</MenuBase>;
    }
}

class MenuBase extends React.Component {
    render() {
        return <div className={this.props.className} ref={this.props.innerRef}>{this.props.children}</div>;
    }
}

class Menu extends React.Component {
    constructor(props) {
        super(props);
        this.ref = React.createRef();
    }

    componentDidMount() {
        let menuElement = this.ref.current;
        this.impl = window.fin ? new WinMenuImpl(menuElement) : new DivMenuImpl(menuElement);
    }

    render() {
        return <div ref={this.ref} style={{display:'none', backgroundColor:'white', position:'absolute'}}>{this.props.children}</div>;
    }
}

const Item = (props) => {
    return (
        <div>{props.children}</div>
    );
};

const Separator = (props) => {

};

export default {
    Menu,
    Item,
    Separator
}