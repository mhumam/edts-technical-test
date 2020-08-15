/**
 * @author Muhamad Humam
 * @email muhamadhumamm17@gmail.com
 * @create date 2020-08-15 10:13:44
 * @modify date 2020-08-15 10:13:44
 * @desc User Detail Component
 */

import React from 'react';
import { Form, Row, Col, Card, Divider } from 'antd';
import { getRequest } from '../utilities/RequestService';
import { Spin } from '../components/Base/Index';
import { api } from '../config/Endpoint';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            userDetail: {
                name: null,
                username: null,
                email: null,
                website: null,
                phone: null,
                address: {},
                company: {}
            }
        }
    }

    async componentDidMount() {
        /* get userId from uri */
        const userId = this.props.userId;
        /* set url */
        const url = api.url.users.list + "/" + userId;
        /* callback after calling service */
        const callback = async (response) => {
            const userDetail = (response) ? { ...response } : [];
            /* set userDetail and hide loader */
            await this.setState({ userDetail, isLoading: false });
        }
        /* call loader */
        await this.setState({ isLoading: true });
        /* call service */
        await getRequest(url, callback);
    }

    render() {
        const { isLoading } = this.state;
        const { name, username, email, website, phone, address, company } = this.state.userDetail;
        const { suite, street, city, zipcode } = address;

        return (
            <Spin isLoading={isLoading}>
                <Row style={{ margin: '20px 0' }}>
                    <Col span={24}>
                        <Divider>User Information</Divider>
                        <Card size="small" title={(name) ? name : '-'} style={{ width: "100%" }} className="card-shadow">
                            <Form layout="vertical">
                                <Row>
                                    <Col className="gutter-row" xs={24} sm={24} md={12} lg={{ span: 6 }} xl={{ span: 6 }}>
                                        <Form.Item label="Username">
                                            <span className="ant-form-text">{(username) ? username : '-'}</span>
                                        </Form.Item>
                                    </Col>
                                    <Col className="gutter-row" xs={24} sm={24} md={12} lg={{ span: 6 }} xl={{ span: 6 }}>
                                        <Form.Item label="Email">
                                            <span className="ant-form-text">{(email) ? email : '-'}</span>
                                        </Form.Item>
                                    </Col>
                                    <Col className="gutter-row" xs={24} sm={24} md={12} lg={{ span: 6 }} xl={{ span: 6 }}>
                                        <Form.Item label="Webiste">
                                            <span className="ant-form-text">{(website) ? website : '-'}</span>
                                        </Form.Item>
                                    </Col>
                                    <Col className="gutter-row" xs={24} sm={24} md={12} lg={{ span: 6 }} xl={{ span: 6 }}>
                                        <Form.Item label="Phone">
                                            <span className="ant-form-text">{(phone) ? phone : '-'}</span>
                                        </Form.Item>
                                    </Col>
                                    <Col className="gutter-row" xs={24} sm={24} md={12} lg={{ span: 12 }} xl={{ span: 12 }}>
                                        <Form.Item label="Address">
                                            <span className="ant-form-text">{suite + " " + street + " " + city + " , " + zipcode}</span>
                                        </Form.Item>
                                    </Col>
                                    <Col className="gutter-row" xs={24} sm={24} md={12} lg={{ span: 12 }} xl={{ span: 12 }}>
                                        <Form.Item label="Company">
                                            <span className="ant-form-text">{company.name + " - " + company.catchPhrase + " - " + company.bs}</span>
                                        </Form.Item>
                                    </Col>
                                </Row>
                            </Form>
                        </Card>
                    </Col>
                </Row>
            </Spin>
        )
    }
}

export default App;