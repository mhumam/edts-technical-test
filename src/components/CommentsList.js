/**
 * @author Muhamad Humam
 * @email muhamadhumamm17@gmail.com
 * @create date 2020-08-15 10:13:44
 * @modify date 2020-08-15 10:13:44
 * @desc Comment List Component
 */

import React from 'react';
import { List, Comment, Avatar, Typography } from 'antd';
import { getRequest } from '../utilities/RequestService';
import { api } from '../config/Endpoint';

const { Text } = Typography;
class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            commentList: []
        }
    }

    async componentDidMount() {
        /* get userId from uri */
        const postId = this.props.postid;
        /* set url */
        const url = api.url.comments.list + "/?postId=" + postId;
        /* callback after calling service */
        const callback = async (response) => {
            const commentList = (response) ? response : [];
            /* set commentList and hide loader */
            await this.setState({ commentList, isLoading: false });
        }
        /* call loader */
        await this.setState({ isLoading: true });
        /* call service */
        await getRequest(url, callback);
    }

    render() {
        const { isLoading, commentList } = this.state;
        const actions = [
            <span key="comment-basic-reply-to">Edit</span>,
            <span key="comment-basic-reply-to">Delete</span>,
        ];
        return (
            <List
                loading={isLoading}
                pagination={{ pageSize: 3 }}
                itemLayout="horizontal"
                dataSource={commentList}
                renderItem={item => (
                    <Comment
                        className="card-shadow"
                        style={{ margin: '10px 0', padding: '10px', background: '#FFFFFF' }}
                        actions={actions}
                        author={
                            <a>
                                <Text strong>{(item.name) ? item.name.toUpperCase() : '-'}</Text>
                                <span style={{ display: 'block' }}>{item.email}</span>
                            </a>}
                        avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" alt={item.email} />}
                        content={<p>{item.body}</p>}
                    />
                )}
            />
        )
    }
}

export default App;