import React, {Component, PropTypes} from 'react';

import './Checkbox.css';

class Checkbox extends Component {

    static propTypes = {
        onClick: PropTypes.func
    }

    _onClick = () => {
        if (this.props.onClick) {
            this.props.onClick.apply(this, arguments);
        }
    }

    render() {
        return (
            <div className="Checkbox"
                 onClick={this._onClick}>
                 <input type="checkbox" />
                <label>{this.props.children}</label>
            </div>
        )
    }

}

export default Checkbox;
