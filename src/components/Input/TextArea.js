/**
 * @author Muhamad Humam
 * @email muhamadhumamm17@gmail.com
 * @create date 2020-08-16 21:35:00
 * @modify date 2020-08-16 21:35:00
 * @desc Text Area Component Base
 */

import React, { Component } from 'react';
import { Input, Form } from 'antd';
import { validationRules } from '../Base/Helper';

const { TextArea } = Input;

class App extends Component {

    render() {
        return (
            <Form.Item name={this.props.name} rules={validationRules(this.props)} label={this.props.label} style={this.props.style} className={this.props.className}>
                <TextArea disabled={this.props.disabled} placeholder={this.props.placeholder} maxLength={this.props.maxLength} />
            </Form.Item>
        )
    }
}

export default App;
