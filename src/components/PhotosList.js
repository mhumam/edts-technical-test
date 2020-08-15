/**
 * @author Muhamad Humam
 * @email muhamadhumamm17@gmail.com
 * @create date 2020-08-15 09:28:36
 * @modify date 2020-08-15 15:31:43
 * @desc Photos List Component
 */

import React from 'react';
import { Modal, List, Card } from 'antd';
import { getRequest } from '../utilities/RequestService';
import { EyeOutlined } from '@ant-design/icons';
import { api } from '../config/Endpoint';

const { Meta } = Card;

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            photosList: [],
            showPhoto: false,
            urlPhoto: null,
            titlePhoto: null
        }

        this.showPhotoModal = this.showPhotoModal.bind(this);
        this.closePhotoModal = this.closePhotoModal.bind(this);
    }

    async componentDidMount() {
        /* get userId from uri */
        const albumId = this.props.albumId;
        /* set url */
        const url = api.url.photos.list + "/?albumId=" + albumId;
        /* callback after calling service */
        const callback = async (response) => {
            const photosList = (response) ? response : [];
            /* set photosList and hide loader */
            await this.setState({ photosList, isLoading: false });
        }
        /* call loader */
        await this.setState({ isLoading: true });
        /* call service */
        await getRequest(url, callback);
    }

    showPhotoModal = (urlPhoto, titlePhoto) => {
        this.setState({ showPhoto: true, urlPhoto, titlePhoto });
    };

    closePhotoModal = () => {
        this.setState({ showPhoto: false, urlPhoto: null, titlePhoto: null });
    };

    render() {
        const { photosList, isLoading, showPhoto, urlPhoto, titlePhoto } = this.state;
        return (
            <React.Fragment>
                <Modal
                    width="700px"
                    footer={null}
                    title={"View Photo - " + titlePhoto}
                    visible={showPhoto}
                    onOk={this.closePhotoModal}
                    onCancel={this.closePhotoModal}
                    style={{ textAlign: "center" }}
                >
                    <img alt={urlPhoto} src={urlPhoto} />
                </Modal>
                <List
                    pagination={{ pageSize: 8 }}
                    loading={isLoading}
                    grid={{ gutter: 16, xs: 1, sm: 2, md: 2, lg: 4, xl: 4, xxl: 4 }}
                    itemLayout="horizontal"
                    dataSource={photosList}
                    renderItem={item => (
                        <Card
                            cover={<img alt="Photos" src={item.thumbnailUrl} />}
                            actions={[<span onClick={() => this.showPhotoModal(item.url, item.title)}><EyeOutlined key="View" /> Show Photos</span>]}
                            style={{ margin: '10px' }}
                            className="card-shadow"
                        >
                            <Meta title={item.title} />
                        </Card>
                    )}
                />
            </React.Fragment>
        )
    }
}

export default App;