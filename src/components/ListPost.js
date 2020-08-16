/**
 * @author Muhamad Humam
 * @email muhamadhumamm17@gmail.com
 * @create date 2020-08-15 09:28:36
 * @modify date 2020-08-15 15:00:54
 * @desc List Post
 */

import React from 'react';
import { List, Space } from 'antd';
import { Link } from 'react-router-dom';
import { MessageOutlined } from '@ant-design/icons';
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
        const userId = this.props.userId;
        return (
            <List
                loading={isLoading}
                pagination={{ pageSize: 5 }}
                itemLayout="horizontal"
                dataSource={postList}
                renderItem={item => (
                    <List.Item actions={[
                        <Link to={"/post/" + userId + "/comment/" + item.id}><IconText icon={MessageOutlined} text="Comment" key="list-vertical-message" /></Link>
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