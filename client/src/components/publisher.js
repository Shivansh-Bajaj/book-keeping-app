import React from "react";

class BookForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {name:"", info: ""};

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
        alert('A name was submitted: ' + this.state.name);
        event.preventDefault();
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <label>
                        title:
                        <input type="text" name="name" value={this.state.name} onChange={this.handleChange} />
                    </label>
                    <label>
                        info:
                        <input type="text" name="info" value={this.state.info} onChange={this.handleChange} />
                    </label>
                    <input type="submit" value="Submit" />
                </form>

            </div>
        );
    }
}

export default BookForm;