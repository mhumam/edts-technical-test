/**
 * @author Muhamad Humam
 * @email muhamadhumamm17@gmail.com
 * @create date 2020-08-15 09:28:36
 * @modify date 2020-08-15 15:00:54
 * @desc List Post
 */

import React from 'react';
import { List, Space } from 'antd';
import { MessageOutlined, EyeOutlined } from '@ant-design/icons';
import { getRequest } from '../utilities/RequestService';
import { api } from '../config/Endpoint';

const IconText = ({ icon, text }) => (
    <Space>
        {React.createElement(icon)}
        {text}
    </Space>
);

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            postList: []
        }
    }

    async componentDidMount() {
        /* get userId from uri */
        const userId = this.props.userId;
        /* set url */
        const url = api.url.posts.list + "/?userId=" + userId;
        /* callback after calling service */
        const callback = async (response) => {
            const postList = (response) ? response : [];
            /* set postList and hide loader */
            await this.setState({ postList, isLoading: false });
        }
        /* call loader */
        await this.setState({ isLoading: true });
        /* call service */
        await getRequest(url, callback);
    }
    
    render() {
        const { postList, isLoading } = this.state;
        return (
            <List
                loading={isLoading}
                pagination={{ pageSize: 5 }}
                itemLayout="horizontal"
                dataSource={postList}
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