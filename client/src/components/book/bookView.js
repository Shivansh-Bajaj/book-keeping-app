import React, { Component } from 'react';
import { FormGroup, FormControl, InputGroup, Glyphicon, Modal, ButtonToolbar, Button, Row, Col, Grid} from 'react-bootstrap';
import BookForm from './newbook';
import Gallery from './Gallery';
import UploadCompoonent from "./csvUpload";
const bookExplorer = {
    marginTop: '40px',
    marginLeft: 'auto',
    marginRight: 'auto',
    border: 'solid 2px green',
    width: '80vw',
    minHeight: '80vh',
    alignContent: 'center'
};

const searchBar = {
    maxWidth: '80%',
    margin: 'auto'
};

class BookExplorerView extends Component {
    constructor(props) {
        super(props);
        this.handleShow = this.handleShow.bind(this);
        this.handleHide = this.handleHide.bind(this);
        this.uploadHandleShow = this.uploadHandleShow.bind(this);
        this.uploadHandleHide = this.uploadHandleHide.bind(this);
        this.search = this.search.bind(this);
        this.state = {
            query: '',
            show: false,
            uploadshow: false,
            items: []
        }
        this.search();
    }
    handleShow() {
        this.setState({ show: true });
    }

    handleHide() {
        this.setState({ show: false });
    }
    uploadHandleShow() {
        this.setState({ uploadshow: true });
    }

    uploadHandleHide() {
        this.setState({ uploadshow: false });
    }
    search() {
        const BASE_URL = 'http://localhost:3000/api/book';
        fetch(`${BASE_URL}`, { method: 'GET'})
            .then(response => response.json())
            .then(json => {
                let { data } = json;
                this.setState({ items: data})
            });
    }
    render() {
        return (
            <div className="bookExplorer" style={bookExplorer}>
                <br />
                <Grid>
                    <Row>
                        <Col md={6} xs={6}>
                            <Button bsStyle="success" style={{width:'100%'}} onClick={this.handleShow}>
                                add new book
                            </Button>
                        </Col>
                        <Col md={6} xs={6}>
                            <Button bsStyle="success" style={{width:'100%'}} onClick={this.uploadHandleShow}>
                                add books from csv
                            </Button>
                        </Col>
                    </Row>
                </Grid>
                <br />
                <Modal show={this.state.show} animation={false} onHide={this.handleHide}>
                    <Modal.Header closeButton></Modal.Header>
                    <Modal.Body>
                            <BookForm />
                        </Modal.Body>
                        <Modal.Footer>
                            <Button onClick={this.handleHide}>Close</Button>
                        </Modal.Footer>
                    </Modal>
                <Modal show={this.state.uploadshow} animation={false} onHide={this.uploadHandleHide}>
                    <Modal.Header closeButton></Modal.Header>
                    <Modal.Body>
                        <UploadCompoonent />
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.uploadHandleHide}>Close</Button>
                    </Modal.Footer>
                </Modal>
                <h2 style={{textAlign: 'center'}}>Book Explorer!</h2>
                <br />
                <FormGroup>
                    <InputGroup>
                        <FormControl
                            type="text"
                            placeholder="Search for a book"
                            style={searchBar}
                            onChange={event => this.setState({query: event.target.value})}
                            onKeyPress={event => {if (event.key === 'Enter') {
                                this.search();
                            }}}/>
                        <InputGroup.Addon onClick={() => this.search()}>
                            <Glyphicon glyph="search"></Glyphicon>
                        </InputGroup.Addon>
                    </InputGroup>
                </FormGroup>
                <Gallery items={this.state.items}/>
            </div>

        )

    }
}

export default BookExplorerView;