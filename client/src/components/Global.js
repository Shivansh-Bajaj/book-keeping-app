import React, { Component } from 'react';
import NavMenu from './routes';

class Global extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="Global">
                <NavMenu />
            </div>
        )
    }
}

export default Global;