/**
 * @author Muhamad Humam
 * @email muhamadhumamm17@gmail.com
 * @create date 2020-08-15 09:28:36
 * @modify date 2020-08-15 09:28:36
 * @desc Post Page
 */

import React from 'react';
import { Divider, Breadcrumb } from 'antd';
import { Link } from 'react-router-dom';
import { getRequest } from '../../utilities/RequestService';
import { Spin, ListPost, UserDetail } from '../../components/Base/Index';
import { api } from '../../config/Endpoint';
import { HomeOutlined } from '@ant-design/icons';

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
		const userId = this.props.match.params.userid;
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
		const userId = this.props.match.params.userid;
		return (
			<div className="site-layout-background" style={{ padding: 24, paddingTop: 0, minHeight: 380 }}>
				<div style={{ maxWidth: '900px', margin: '0 auto' }}>
					<Breadcrumb>
						<Breadcrumb.Item>
							<Link to="/">
								<HomeOutlined />
							</Link>
						</Breadcrumb.Item>
						<Breadcrumb.Item>
							<Link to={"/post/" + userId}>Post</Link>
						</Breadcrumb.Item>
					</Breadcrumb>
					<UserDetail userId={userId} />
					<Divider>List Post</Divider>
					<Spin isLoading={isLoading}>
						<ListPost dataSource={postList} />
					</Spin>
				</div>
			</div>
		)
	}
}

export default App;