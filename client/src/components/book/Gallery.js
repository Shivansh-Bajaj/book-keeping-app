import React, { Component } from 'react';
import {Grid, Row, Col, Modal, Button} from 'react-bootstrap';
import UpdateBookForm from './updateBook';

class Gallery extends Component {
    constructor (props) {
        super(props);
        this.handleShow = this.handleShow.bind(this);
        this.handleHide = this.handleHide.bind(this);
        this.state = {
            current: {publisher:{}, authors:[]},
            show: false,
        };
    }
    open (item) {
        this.setState({current: item, show: true});
        // this.setState({ show: true });
    }
    // update () {
    //     this.setState({callupdate: true});
    //
    //     // this.setState({ show: true });
    // }

    delete (item) {
        fetch('/api/book',
            {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(item)
            })
            .then((resp) => {
                if (resp.status === 200) {
                    window.location.reload();
                } else {
                    alert("unable to reload");
                    window.location.reload();
                }
            })
    }
    handleShow() {
        this.setState({ show: true });
    }

    handleHide() {
        this.setState({ show: false });
    }

    render() {
        let alternate = 'http://english.tw/wp-content/themes/qaengine/img/default-thumbnail.jpg';
        return (
            <div>
                <Grid>
                    <Row className="show-grid">
                        {
                            this.props.items.map((item, index) => {
                                let {title , image_url, author, publisher} = item;
                                return (
                                    <Col xs={12} md={6} style={{display: 'flex', justifyContent: 'center', textAlign: 'center'}}>
                                        <a
                                           onClick={() => this.open(item)}
                                            className="book">
                                            <img src={image_url !== undefined ? image_url : alternate}
                                                 alt={title}
                                                 className="book-img"/>
                                            <div className="book-text">
                                                {title}
                                            </div>
                                        </a>
                                    </Col>

                                )
                            })
                        }
                </Row>
            </Grid>
            <Modal show={this.state.show} animation={false} onHide={this.handleHide}>
                <Modal.Header closeButton={true}></Modal.Header>
                    <Modal.Body style={{display: 'flex', justifyContent: 'center'}}>
                        <div >
                            <img src={this.state.current.image_url !== undefined ? this.state.current.image_url : alternate}
                                 alt="book image"
                                 className="book-img"/>
                            <Row  className="show-grid">
                                <Col xs={6} md={6}><Button  bsStyle="danger" onClick={() => this.delete(this.state.current)}>delete</Button></Col>
                            </Row>
                            <p>Title: <b>{this.state.current.title}</b></p>
                            <p>Published At: <b>{new Date(this.state.current.published_at).toDateString() }</b></p>
                            <p>publisher: <b>{(this.state.current.hasOwnProperty('publisher')?this.state.current.publisher.title: "")}</b></p>
                            <p>isbn: <b>{this.state.current.isbn}</b></p>
                            <p>price: <b>{this.state.current.price}</b></p>
                            <p>authors: {
                                this.state.current.authors.map((element, index)=> {
                                    return (
                                        <b>{element.name}</b>
                                    )
                                })
                            };
                            </p><br />
                        </div>
                        <UpdateBookForm item={this.state.current} />
                    </Modal.Body>
                    <Modal.Footer>
                    <Button onClick={this.handleHide}>Close</Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
    }
}
export default Gallery;