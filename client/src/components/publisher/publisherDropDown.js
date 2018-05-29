import React from "react";

class PublisherSelector extends React.Component {
    constructor(props) {
        super(props);
        this.state = {items:[], selectValue: []};
        this.handleChange1 = this.handleChange1.bind(this);
        this.search = this.search.bind(this);
        this.search();
    }
    search() {
        const BASE_URL = 'http://localhost:3000/api/publisher';
        fetch(`${BASE_URL}`, { method: 'GET'})
            .then(response => response.json())
            .then(json => {
                let items =(json.hasOwnProperty('data') && json.data.length !== 0 ? json.data: []);
                let selectValue = (items.length !== 0 ? [items[0].name]: []);
                this.setState({items: items, selectValue: selectValue});
                // this.state = {, selectValue: ""};
            });
    }
    handleChange1(e){
        this.setState({selectValue:e.target.value});
        this.props.onSelectPublisher(this.state.selectValue);
    }
    render() {
        return (
            <div>
                <select
                    value={this.state.selectValue}
                    onChange={this.handleChange1}
                    >
                    {
                        this.state.items.map((item, index) => {
                            let name = item.name;
                            return (
                                <option key={index} value={item}>{name}</option>
                            )
                        })
                    }
                </select><br />
                {this.state.selectValue.toString()}
            </div>
        );
    }
};

export default PublisherSelector;