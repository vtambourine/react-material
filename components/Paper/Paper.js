import React, {Component} from 'react';

import './Paper.css';

class Paper extends Component {

    render() {
        return (
            <div className="Paper">
                {this.props.children}
            </div>
        );
    }

}

export default Paper;
