import React, {Component} from 'react';
import Paper from 'components/Paper';
import Button from 'components/Button';
import ToggleButton from 'components/ToggleButton';

import './Example.css';

class Example extends Component {
    render() {
        return (
            <div className="Example">
                <Paper>
                    <Button>Button</Button>
                    <Button>Button 2</Button>
                </Paper>
                <Paper>
                    <div className="line"><span>Необаходимы услуги грузчиков</span><ToggleButton name="one"/></div>
                    <div className="line"><span>Услуги по упаковке</span><ToggleButton name="two"/></div>
                </Paper>
            </div>
        );
    }
}

export default Example;
