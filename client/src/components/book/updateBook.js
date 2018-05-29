import React from "react";
import FieldGroup from "../common/form";
import {Panel, Button} from "react-bootstrap";


class UpdateBookForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = props.item;
        // this.state = {title:"", isbn: "", published_at: "", image_url: "", price: "", authors: []};
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        console.log(this.state);
        let obj = {};
        obj[event.target.name] = event.target.value;
        this.setState(obj);
    }

    handleSubmit(event) {
        alert('A name was submitted: ' + this.state.title);
        fetch('http://localhost:3000/api/book', {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(this.state)
        }).then((resp) => {
            if(resp.status === 200) {
                return resp.json();
            } else {
                alert("some problem while updating");
            }
        }).then(() => {
            window.location.reload();
        });
        event.preventDefault();
    }

    render() {
        return (
            <div >
                <Panel >
                    <Panel.Heading componentClass="h3"><b>Update Book {this.state.title}</b></Panel.Heading>
                    <br />
                    <Panel.Body>
                        <form onSubmit={this.handleSubmit}>
                            <FieldGroup
                                id="title"
                                type="text"
                                label="title"
                                name="title"
                                placeholder="title for the book"
                                value={this.state.title}
                                onChange={this.handleChange}
                            />
                            <FieldGroup
                                id="isbn"
                                type="text"
                                label="isbn"
                                name="isbn"
                                placeholder="isbn for the book"
                                value={this.state.isbn}
                                onChange={this.handleChange}
                            />
                            <FieldGroup
                                id="published_at"
                                type="date"
                                label="published_at"
                                name="published_at"
                                placeholder="published date the book"
                                value={this.state.date}
                                onChange={this.handleChange}
                            />
                            <FieldGroup
                                id="image_url"
                                type="url"
                                label="image_url"
                                name="image_url"
                                placeholder="image url date the book"
                                value={this.state.image_url}
                                onChange={this.handleChange}
                            />

                            <FieldGroup
                                id="price"
                                type="number"
                                label="price"
                                name="price"
                                placeholder="price for the book"
                                value={this.state.price}
                                onChange={this.handleChange}
                            />
                            <Button style={{display: 'flex', justifyContent: 'center'}} bsStyle="success" bsSize="large" onClick={this.handleSubmit}>
                                update
                            </Button>
                        </form>
                    </Panel.Body>
                </Panel>
            </div>

        );
    }
}

export default UpdateBookForm;