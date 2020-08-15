/**
 * @author Muhamad Humam
 * @email muhamadhumamm17@gmail.com
 * @create date 2020-08-15 11:40:50
 * @modify date 2020-08-15 11:40:50
 * @desc Main Layout
 */

import React from 'react';
import { Layout } from 'antd';
import { Route, Switch } from 'react-router-dom';
import HomeComponent from './pages/Home/Index';
import PostComponent from './pages/Post/Index';
import 'antd/dist/antd.css';
import './App.css';

const { Content, Footer } = Layout;

class App extends React.Component {
	render() {
		return (
			<Layout>
				<Content className="site-layout" style={{ padding: '0 50px' }}>
					<div style={{ margin: '0 auto', textAlign: "center" }}>
						<img src="/images/edts-logo.png" alt="EDTS" className="background-login" style={{ width: '200px' }} />
					</div>
					<div className="site-layout-background" style={{ padding: 24, paddingTop: 0, minHeight: 380 }}>
						<Switch>
							<Route exact path='/' render={() => <HomeComponent/>} />
							<Route exact path='/post/:userid' render={() => <PostComponent/>} />
						</Switch>
					</div>
				</Content>
				<Footer style={{ textAlign: 'center' }}>EDTS Technical Test ©2020 Created by Muhamad Humam</Footer>
			</Layout>
		)
	}
}

export default App;