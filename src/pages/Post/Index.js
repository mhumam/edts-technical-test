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
import { ListPost, UserDetail } from '../../components/Base/Index';
import { HomeOutlined } from '@ant-design/icons';

class App extends React.Component {
	render() {
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
					<ListPost userId={userId} />
				</div>
			</div>
		)
	}
}

export default App;