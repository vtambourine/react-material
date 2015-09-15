import React, {Component, PropTypes} from 'react';
import cx from 'classnames';
import {uniqueId} from 'lodash';

import './Input.css';

class Input extends Component {

    static propTypes = {
        type: PropTypes.string,
        label: PropTypes.string,
        placeholder: PropTypes.string,
        size: PropTypes.number,
        onChange: PropTypes.func
    }

    static defaultProps = {
        type: 'text'
    }

    _onChange = () => {
        if (this.props.onChange) {
            this.props.onChange.apply(this, arguments);
        }
    }

    render() {
        var id = uniqueId();

        var inputControl = (
            <input className="Input-control"
                type={this.props.type}
                placeholder={this.props.placeholder}
                size={this.props.size}
                onChange={this._onChange}
                id={id} />
        )

        if (this.props.label) {
            var label = (
                <label className="Input-label"
                    htmlFor={id}>
                    {this.props.label}
                </label>
            )
        }

        return (
            <div className={cx("Input",
                {_wide: !this.props.size})}>
                {label}
                {inputControl}
            </div>
        )
    }

}

export default Input;
