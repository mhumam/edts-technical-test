/**
 * @author Muhamad Humam
 * @email muhamadhumamm17@gmail.com
 * @create date 2020-08-15 10:13:44
 * @modify date 2020-08-15 10:13:44
 * @desc User Card Component
 */

import React from 'react';
import { Form, Row, Col, Card, Button } from 'antd';
import { Link } from 'react-router-dom';

class App extends React.Component {
    render() {
        let { id, name, username, email, website, phone } = this.props;
        name = (name) ? name : '-';
        username = (username) ? username : '-';
        email = (email) ? email : '-';
        website = (website) ? website : '-';
        phone = (phone) ? phone : '-';

        return (
            <Row style={{ margin: '20px 0' }}>
                <Col span={24}>
                    <Card size="small" title={name} style={{ width: "100%" }} className="card-shadow">
                        <Form layout="vertical">
                            <Row>
                                <Col className="gutter-row" xs={24} sm={24} md={12} lg={{ span: 6 }} xl={{ span: 6 }}>
                                    <Form.Item label="Username">
                                        <span className="ant-form-text">{username}</span>
                                    </Form.Item>
                                </Col>
                                <Col className="gutter-row" xs={24} sm={24} md={12} lg={{ span: 6 }} xl={{ span: 6 }}>
                                    <Form.Item label="Email">
                                        <span className="ant-form-text">{email}</span>
                                    </Form.Item>
                                </Col>
                                <Col className="gutter-row" xs={24} sm={24} md={12} lg={{ span: 6 }} xl={{ span: 6 }}>
                                    <Form.Item label="Webiste">
                                        <span className="ant-form-text">{website}</span>
                                    </Form.Item>
                                </Col>
                                <Col className="gutter-row" xs={24} sm={24} md={12} lg={{ span: 6 }} xl={{ span: 6 }}>
                                    <Form.Item label="Phone">
                                        <span className="ant-form-text">{phone}</span>
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row gutter={16} type="flex" justify="center" style={{ marginTop: 10 }}>
                                <Link to={"/post/" + id}>
                                    <Button type="primary">View Post</Button>
                                </Link>
                                &nbsp;
                                <Link to={"/album/" + id}>
                                    <Button type="primary">View Album</Button>
                                </Link>
                            </Row>
                        </Form>
                    </Card>
                </Col>
            </Row>
        )
    }
}

export default App;