/**
 * @author Muhamad Humam
 * @email muhamadhumamm17@gmail.com
 * @create date 2020-08-15 11:41:33
 * @modify date 2020-08-15 11:41:33
 * @desc Loader Component
 */

import React, { Component } from 'react';
import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';

class App extends Component {
    render() {
        const { isLoading } = this.props;
        const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
        return (
            <Spin {...this.props} indicator={antIcon} spinning={isLoading}>
                {this.props.children}
            </Spin>
        )
    }
}


export default App;