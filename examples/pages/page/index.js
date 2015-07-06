import React, {Component} from 'react';
import Layout from 'components/Layout';
import Paper from 'components/Paper';
import Button from 'components/Button';
import Input from 'components/Input';
import ToggleButton from 'components/ToggleButton';
import Checkbox from 'components/Checkbox';

import './index.css';

class Example extends Component {
    render() {
        return (
            <div className="Example">
                <Paper>
                    <div className="form">
                        <div className="form-field">
                            <Input
                                label="Наименование"
                                placeholder="Введите наименование груза"/>
                        </div>
                        <div className="form-field">
                            <Input
                                label="Наименование"
                                placeholder="Введите наименование груза"/>
                        </div>
                        <div className="form-field">
                            <Button>Button</Button>
                        </div>
                        <div className="form-field">
                            <Input label="Страна"
                                size={6} />
                            <Input label="Улица"
                                size={16} />
                            <Input label="Дом"
                                size={4} />
                        </div>
                    </div>
                </Paper>
            </div>
        );
    }
}

export default Example;
