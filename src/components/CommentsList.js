/**
 * @author Muhamad Humam
 * @email muhamadhumamm17@gmail.com
 * @create date 2020-08-15 10:13:44
 * @modify date 2020-08-16 22:33:45
 * @desc Comment List Component
 */

import React from 'react';
import { List, Comment, Avatar, Typography, Form, Row, Button, Popconfirm, Space, Modal } from 'antd';
import { getRequest } from '../utilities/RequestService';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { api } from '../config/Endpoint';
import { InputText, TextArea, Alert } from '../components/Base/Index';

const IconText = ({ icon, text }) => (
    <Space>
        {React.createElement(icon)}
        {text}
    </Space>
);

const { Text } = Typography;
class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            commentList: [],
            showForm: false,
            dataDetail: null
        }

        this.handleRemoveComment = this.handleRemoveComment.bind(this);
        this.handleShowModal = this.handleShowModal.bind(this);
        this.handleCloseModal = this.handleCloseModal.bind(this);
        this.handleCreateAction = this.handleCreateAction.bind(this);
        this.handleUpdateAction = this.handleUpdateAction.bind(this);
    }

    /* handle for show modal form */
    handleShowModal = (e, dataDetail = null) => {
        e.preventDefault();
        this.setState({ showForm: true, dataDetail });
    }

    /* handle for close modal form */
    handleCloseModal = () => {
        this.setState({ showForm: false, dataDetail: null });
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

    /* handle for create comment */
    handleCreateAction = async (data) => {
        let { commentList } = this.state;
        const postId = this.props.postid;
        /* mapping data, add postId and id (random format) */
        data.postId = (postId) ? Number.parseInt(postId, 0) : null;
        data.id = Math.random(); //generate id random

        /* push data to commentList */
        await commentList.push(data);

        /* show notification */
        Alert.success("Create data has been successful");

        await this.setState({ commentList });
        await this.handleCloseModal();
    }

    /* handle update comment */
    handleUpdateAction = async (input) => {
        let { commentList } = this.state;
        const id = input.id;
        commentList = commentList.map((obj, key) => {
            /* update data */
            if (obj.id === id) {
                obj = { ...obj, ...input };
            }
            return obj;
        });

        /* show notification */
        Alert.success("Update data has been successful");

        await this.setState({ commentList });
        await this.handleCloseModal();
    }

    /* handle for remove comment */
    handleRemoveComment = async (id) => {
        let { commentList } = this.state;
        commentList = await commentList.filter(obj => obj.id !== id);
        /* show notification */
        Alert.success("Delete data has been successful");

        await this.setState({ commentList });
    }

    render() {
        const { isLoading, commentList, showForm, dataDetail } = this.state;
        return (
            <React.Fragment>
                <Row justify="end">
                    <Button type="primary" onClick={this.handleShowModal}>New Comment</Button>
                </Row>
                <Modal title="Form" visible={showForm} footer={null} onCancel={this.handleCloseModal} destroyOnClose={true}>
                    <FormComment dataDetail={dataDetail} createAction={this.handleCreateAction} updateAction={this.handleUpdateAction} />
                </Modal>
                <List
                    loading={isLoading}
                    pagination={{ pageSize: 3 }}
                    itemLayout="horizontal"
                    dataSource={commentList}
                    renderItem={item => (
                        <Comment
                            className="card-shadow"
                            style={{ margin: '10px 0', padding: '10px', background: '#FFFFFF' }}
                            actions={[
                                <a onClick={(e) => this.handleShowModal(e, item)} style={{ marginRight: '5px' }}><IconText icon={EditOutlined} text="Edit" key="list-vertical-message" /></a>,
                                <Popconfirm placement="topRight" title="Are you sure delete this data?" onConfirm={() => this.handleRemoveComment(item.id)} okText="Yes" cancelText="No">
                                    <a><IconText icon={DeleteOutlined} text="Delete" key="list-vertical-message" /></a>
                                </Popconfirm>,
                            ]}
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
            </React.Fragment>
        )
    }
}

/* Form Comment Component */
class FormComment extends React.Component {

    componentDidMount() {
        /* set data detail for update form */
        const { dataDetail } = this.props;
        if (dataDetail) {
            const { name, email, title, body } = dataDetail;
            this.componentForm.setFieldsValue({ name, email, title, body });
        }
    }

    onFinish = async (values) => {
        let { dataDetail } = this.props;
        if (dataDetail) {
            dataDetail = { ...dataDetail, ...values };

            /* for update data */
            this.props.updateAction(dataDetail);
        } else {
            /* for create data */
            this.props.createAction(values);
        }
    }

    render() {
        return (
            <Form ref={(e) => { this.componentForm = e }} layout="vertical" name="comment_form" onFinish={this.onFinish}>
                <InputText label="Name" name="name" validationrules={['required']} placeholder="Name" />
                <InputText label="Email" name="email" validationrules={['required', 'pattern.email']} placeholder="Email" />
                <TextArea label="Body" name="body" validationrules={['required']} placeholder="Body" />

                <Row gutter={24} type="flex" justify="center" style={{ marginTop: 10 }}>
                    <Button type="primary" htmlType="submit">Save</Button>
                </Row>
            </Form>
        )
    }
}

export default App;