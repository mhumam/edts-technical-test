/**
 * @author Muhamad Humam
 * @email muhamadhumamm17@gmail.com
 * @create date 2020-08-15 11:40:50
 * @modify date 2020-08-15 11:40:50
 * @desc Main Layout
 */

import React from 'react';
import { Layout, Typography } from 'antd';
import { Route, Switch } from 'react-router-dom';
import HomeComponent from './pages/Home/Index';
import PostComponent from './pages/Post/Index';
import AlbumsComponent from './pages/Albums/Index';
import PhotosComponent from './pages/Photos/Index';
import CommentsComponent from './pages/Comments/Index';
import 'antd/dist/antd.css';
import './App.css';

const { Title } = Typography;
const { Content, Footer } = Layout;

class App extends React.Component {
	render() {
		return (
			<Layout>
				<Content className="site-layout" style={{ padding: '0 50px' }}>
					<div style={{ margin: '0 auto', textAlign: "center", marginBottom: '40px' }}>
						<img src="/images/edts-logo.png" alt="EDTS" className="background-login" style={{ width: '200px', margin: '20px 0' }} />
						<Title level={3}>PT Elevenia Digital Teknologi Sukses (EDTS)</Title>
					</div>
					<div className="site-layout-background" style={{ padding: 24, paddingTop: 0, minHeight: 380 }}>
						<Switch>
							<Route exact path='/' render={() => <HomeComponent />} />
							<Route exact path='/post/:userid' render={(props) => <PostComponent {...props} />} />
							<Route exact path='/post/:userid/comment/:postid' render={(props) => <CommentsComponent {...props} />} />
							<Route exact path='/albums/:userid' render={(props) => <AlbumsComponent {...props} />} />
							<Route exact path='/albums/:userid/photos/:albumid' render={(props) => <PhotosComponent {...props} />} />
						</Switch>
					</div>
				</Content>
				<Footer style={{ textAlign: 'center' }}>EDTS Technical Test ©2020 Created by Muhamad Humam</Footer>
			</Layout>
		)
	}
}

export default App;