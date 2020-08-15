/**
 * @author Muhamad Humam
 * @email muhamadhumamm17@gmail.com
 * @create date 2020-08-15 09:28:36
 * @modify date 2020-08-15 09:28:36
 * @desc Home Page
 */

import React from 'react';
import { getRequest } from '../../utilities/RequestService';
import { Spin, UserCard } from '../../components/Base/Index';
import { api } from '../../config/Endpoint';

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isLoading: false,
			userList: []
		}
	}

	async componentDidMount() {
		const url = api.url.users.list;
		const callback = async (response) => {
			const userList = (response) ? response : [];
			await this.setState({ userList, isLoading: false });
		}
		await this.setState({ isLoading: true });
		await getRequest(url, callback);
	}

	render() {
		const { userList, isLoading } = this.state;
		return (
			<div className="site-layout-background" style={{ padding: 24, paddingTop: 0, minHeight: 380 }}>
				<div style={{ maxWidth: '900px', margin: '0 auto' }}>
					<Spin isLoading={isLoading}>
						{
							userList.map((obj, key) => {
								return <UserCard {...obj} />
							})
						}
					</Spin>
				</div>
			</div>
		)
	}
}

export default App;