import React, {Component, PropTypes} from 'react';

import './Button.css';

class Button extends Component {

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
            <div className="Button"
                 onClick={this._onClick}>
                {this.props.children}
            </div>
        )
    }

}

export default Button;
