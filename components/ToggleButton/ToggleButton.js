import React, {Component, PropTypes} from 'react';
import classNames from 'classnames';

import './ToggleButton.css';

class ToggleButton extends Component {

    static defaultProps = {
        checked: false
    }

    static propTypes = {
        name: PropTypes.string,
        onToggle: PropTypes.func
    }

    state = {
        checked: this.props.checked
    }

    _handleClick = () => {
        this.setState({
            checked: !this.state.checked
        });

        if (this.props.onToggle) {
            this.props.onToggle.apply(this, this.state.checked);
        }
    }

    render() {
        return (
            <div className={classNames(
                    "ToggleButton",
                    { _checked: this.state.checked }
                )}
                onClick={this._handleClick}>
                 <div className="ToggleButton-container">
                    <div className="ToggleButton-bar" />
                    <div className="ToggleButton-button" />
                 </div>
            </div>
        )
    }

}

export default ToggleButton;
