/**
 * @author Muhamad Humam
 * @email muhamadhumamm17@gmail.com
 * @create date 2020-08-15 09:28:36
 * @modify date 2020-08-15 14:48:57
 * @desc Album List Component
 */

import React from 'react';
import { List, Card } from 'antd';
import { Link } from 'react-router-dom';
import { EyeOutlined } from '@ant-design/icons';
import { getRequest } from '../utilities/RequestService';
import { api } from '../config/Endpoint';

const { Meta } = Card;

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            albumList: []
        }
    }

    async componentDidMount() {
        /* get userId from uri */
        const userId = this.props.userId;
        /* set url */
        const url = api.url.albums.list + "/?userId=" + userId;
        /* callback after calling service */
        const callback = async (response) => {
            const albumList = (response) ? response : [];
            /* set albumList and hide loader */
            await this.setState({ albumList, isLoading: false });
        }
        /* call loader */
        await this.setState({ isLoading: true });
        /* call service */
        await getRequest(url, callback);
    }

    render() {
        const { albumList, isLoading } = this.state;
        const userId = this.props.userId;
        return (
            <List
                loading={isLoading}
                grid={{ gutter: 16, xs: 1, sm: 2, md: 2, lg: 4, xl: 4, xxl: 4 }}
                itemLayout="horizontal"
                dataSource={albumList}
                renderItem={item => (
                    <Card
                        cover={<img alt="example" src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png" />}
                        actions={[<Link to={"/albums/" + userId + "/photos/" + item.id}><EyeOutlined key="View" /> View Photos</Link>]}
                        style={{ margin: '10px' }}
                        className="card-shadow"
                    >
                        <Meta title={item.title} />
                    </Card>
                )}
            />
        )
    }
}

export default App;