/**
 * @author Muhamad Humam
 * @email muhamadhumamm17@gmail.com
 * @create date 2020-08-16 21:34:42
 * @modify date 2020-08-16 21:34:42
 * @desc Input Text Component Base
 */

import React, { Component } from 'react';
import { Input, Form } from 'antd';
import { validationRules } from '../Base/Helper';

class InputText extends Component {

    render() {
        let labelPosition = (this.props.labelCol || this.props.wrapperCol) ? {
            labelCol: this.props.labelCol,
            wrapperCol: this.props.wrapperCol
        } : null;

        return (
            <Form.Item
                rules={validationRules(this.props)} name={this.props.name}
                label={this.props.label} style={this.props.style} className={this.props.className} extra={this.props.extra} {...labelPosition}>
                <Input
                    defaultValue={this.props.defaultValue}
                    type={this.props.type}
                    disabled={this.props.disabled}
                    placeholder={this.props.placeholder}
                    maxLength={this.props.maxLength}
                    onChange={this.props.onChange}
                    onBlur={this.props.onBlur}
                    prefix={this.props.prefix}
                    suffix={this.props.suffix} />
            </Form.Item>
        )
    }

}

export default InputText;
