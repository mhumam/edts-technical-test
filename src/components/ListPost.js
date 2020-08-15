/**
 * @author Muhamad Humam
 * @email muhamadhumamm17@gmail.com
 * @create date 2020-08-15 09:28:36
 * @modify date 2020-08-15 09:28:36
 * @desc Post Page
 */

import React from 'react';
import { List, Space } from 'antd';
import { MessageOutlined, EyeOutlined } from '@ant-design/icons';

const IconText = ({ icon, text }) => (
    <Space>
        {React.createElement(icon)}
        {text}
    </Space>
);

class App extends React.Component {
    render() {
        const { dataSource } = this.props;
        return (
            <List
                pagination={{ pageSize: 5 }}
                itemLayout="horizontal"
                dataSource={dataSource}
                renderItem={item => (
                    <List.Item actions={[
                        <a key="list-loadmore-edit"><IconText icon={EyeOutlined} text="Detail" key="list-vertical-message" /></a>,
                        <a key="list-loadmore-edit"><IconText icon={MessageOutlined} text="Comment" key="list-vertical-message" /></a>
                    ]}
                        className="card-shadow" style={{ margin: '10px 0', padding: '10px', background: '#FFFFFF' }}>
                        <List.Item.Meta
                            title={item.title.toUpperCase()}
                            description={item.body}
                        />
                    </List.Item>
                )}
            />
        )
    }
}

export default App;