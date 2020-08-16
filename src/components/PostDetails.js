/**
 * @author Muhamad Humam
 * @email muhamadhumamm17@gmail.com
 * @create date 2020-08-15 10:13:44
 * @modify date 2020-08-15 10:13:44
 * @desc Post Details Component
 */

import React from 'react';
import { List, Divider } from 'antd';
import { getRequest } from '../utilities/RequestService';
import { api } from '../config/Endpoint';
import { Spin } from '../components/Base/Index';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            title: null,
            body: null
        }
    }

    async componentDidMount() {
        /* get postId from uri */
        const postId = this.props.postid;
        /* set url */
        const url = api.url.posts.detail + "/" + postId;
        /* callback after calling service */
        const callback = async (response) => {
            const title = (response && response.title) ? response.title : null;
            const body = (response && response.body) ? response.body : null;
            /* set title, body and hide loader */
            await this.setState({ title, body, isLoading: false });
        }
        /* call loader */
        await this.setState({ isLoading: true });
        /* call service */
        await getRequest(url, callback);
    }

    render() {
        const { title, body, isLoading } = this.state;
        return (
            <React.Fragment>
                <Divider>Post Detail</Divider>
                <Spin isLoading={isLoading}>
                    <List.Item className="card-shadow" style={{ margin: '10px 0', padding: '10px', background: '#FFFFFF' }}>
                        <List.Item.Meta title={(title) ? title.toUpperCase() : '-'} description={(body) ? body : '-'} />
                    </List.Item>
                </Spin>
            </React.Fragment>
        )
    }
}

export default App;