import React from 'react';
import {Button} from 'react-bootstrap';

class UploadCompoonent extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            imageURL: '',
            loading: false
        };

        this.handleUpload = this.handleUpload.bind(this);
    }

    handleUpload(ev) {
        ev.preventDefault();

        const data = new FormData();
        data.append('file', this.uploadInput.files[0]);
        this.setState({loading: true});
        fetch('/api/csvupload', {
            method: 'POST',
            body: data,
        }).then((response) => {
            response.json().then((body) => {
                console.log(body);
                this.setState({loading: false});
                if(body.status === 'completed') {
                    window.location.reload();
                }
                // this.setState({ file: `http://localhost:8000/${body.file}` });
            });
        });
    }

    render() {
        return (
            <form onSubmit={this.handleUpload}>
                <p>upload csv file:</p>
                <div>
                    <input ref={(ref) => { this.uploadInput = ref; }} type="file" accept=".csv"/>
                </div>
                <br />
                <div>
                    <Button onClick={this.handleUpload} bsStyle={"success"}>Upload</Button>
                </div>
            </form>
        );
    }
}

export default UploadCompoonent;
