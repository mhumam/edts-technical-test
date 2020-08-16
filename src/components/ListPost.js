/**
 * @author Muhamad Humam
 * @email muhamadhumamm17@gmail.com
 * @create date 2020-08-15 09:28:36
 * @modify date 2020-08-16 21:33:54
 * @desc List Post
 */

import React from 'react';
import { List, Space, Row, Button, Popconfirm, Modal, Form } from 'antd';
import { Link } from 'react-router-dom';
import { MessageOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { getRequest } from '../utilities/RequestService';
import { api } from '../config/Endpoint';
import { InputText, TextArea, Alert } from '../components/Base/Index';

const IconText = ({ icon, text }) => (
    <Space>
        {React.createElement(icon)}
        {text}
    </Space>
);

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            postList: [],
            showForm: false,
            dataDetail: null
        }

        this.handleRemovePost = this.handleRemovePost.bind(this);
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
        const userId = this.props.userId;
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

    /* handle for remove post */
    handleRemovePost = async (id) => {
        let { postList } = this.state;
        postList = await postList.filter(obj => obj.id !== id);
        /* show notification */
        Alert.success("Delete data has been successful");

        await this.setState({ postList });
    }

    /* handle for create post */
    handleCreateAction = async (data) => {
        let { postList } = this.state;
        const userId = this.props.userId;
        /* mapping data, add userId and id (random format) */
        data.userId = (userId) ? Number.parseInt(userId, 0) : null;
        data.id = Math.random(); //generate id random

        /* push data to postList */
        await postList.push(data);

        /* show notification */
        Alert.success("Create data has been successful");

        await this.setState({ postList });
        await this.handleCloseModal();
    }

    handleUpdateAction = async (input) => {
        let { postList } = this.state;
        const id = input.id;
        postList = postList.map((obj, key) => {
            /* update data */
            if (obj.id === id) {
                obj.title = input.title;
                obj.body = input.body;
            }
            return obj;
        });

        /* show notification */
        Alert.success("Update data has been successful");

        await this.setState({ postList });
        await this.handleCloseModal();
    }

    render() {
        const { postList, isLoading, showForm, dataDetail } = this.state;
        const userId = this.props.userId;
        return (
            <React.Fragment>
                <Row justify="end">
                    <Button type="primary" onClick={this.handleShowModal}>New Post</Button>
                </Row>
                <Modal title="Form" visible={showForm} footer={null} onCancel={this.handleCloseModal} destroyOnClose={true}>
                    <FormPost dataDetail={dataDetail} createAction={this.handleCreateAction} updateAction={this.handleUpdateAction} />
                </Modal>
                <List
                    loading={isLoading}
                    pagination={{ pageSize: 5 }}
                    itemLayout="horizontal"
                    dataSource={postList}
                    renderItem={item => (
                        <List.Item actions={[
                            <Link to={"/post/" + userId + "/comment/" + item.id}><IconText icon={MessageOutlined} text="Comment" key="list-vertical-message" /></Link>,
                            <a onClick={(e) => this.handleShowModal(e, item)}><IconText icon={EditOutlined} text="Edit" key="list-vertical-message" /></a>,
                            <Popconfirm placement="topRight" title="Are you sure delete this data?" onConfirm={() => this.handleRemovePost(item.id)} okText="Yes" cancelText="No">
                                <a><IconText icon={DeleteOutlined} text="Delete" key="list-vertical-message" /></a>
                            </Popconfirm>
                        ]}
                            className="card-shadow" style={{ margin: '10px 0', padding: '10px', background: '#FFFFFF' }}>
                            <List.Item.Meta
                                title={item.title.toUpperCase()}
                                description={item.body}
                            />
                        </List.Item>
                    )}
                />
            </React.Fragment>
        )
    }
}

/* Form Post Component */
class FormPost extends React.Component {

    componentDidMount() {
        /* set data detail for update form */
        const { dataDetail } = this.props;
        if (dataDetail) {
            const { title, body } = dataDetail;
            this.componentForm.setFieldsValue({ title, body });
        }
    }

    onFinish = async (values) => {
        const { dataDetail } = this.props;
        if (dataDetail) {
            dataDetail.title = values.title;
            dataDetail.body = values.body;
            /* for update data */
            this.props.updateAction(dataDetail);
        } else {
            /* for create data */
            this.props.createAction(values);
        }
    }

    render() {
        return (
            <Form ref={(e) => { this.componentForm = e }} layout="vertical" name="post_form" onFinish={this.onFinish}>
                <InputText label="Title" name="title" validationrules={['required']} placeholder="Title" />
                <TextArea label="Body" name="body" validationrules={['required']} placeholder="Body" />

                <Row gutter={24} type="flex" justify="center" style={{ marginTop: 10 }}>
                    <Button type="primary" htmlType="submit">Save</Button>
                </Row>
            </Form>
        )
    }
}

export default App;