import React from "react";
import { WithContext as ReactTags } from 'react-tag-input';
import "../common/style/tags.css";


class PublisherSelector extends React.Component {
    constructor(props) {
        super(props);
        this.state = {items:[], selectValue: [],  tags: [], suggestions: []};
        this.handleChange1 = this.handleChange1.bind(this);
        this.search = this.search.bind(this);
        this.handleAddition = this.handleAddition.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.search();
    }
    search() {
        const BASE_URL = '/api/publisher/nameall';
        fetch(`${BASE_URL}`, { method: 'GET'})
            .then(response => response.json())
            .then(json => {
                let items =(json.hasOwnProperty('data') && json.data.length !== 0 ? json.data: []);
                this.setState({suggestions: items});
            });
    }
    handleChange1(e){
        this.setState({selectValue:e.target.value});
        this.props.onSelectPublisher(this.state.selectValue);
    }
    handleDelete(i, key) {
        console.log(i, key);
        this.setState({
            tags: [],
            selectValue: ""
        });
        this.props.onSelectPublisher("");
    }

    async handleAddition(tag) {
        this.setState({ tags: [tag], selectValue: tag.text });
        await this.props.onSelectPublisher(tag.text);
    }
    render() {
    //     return (
    //         <div>
    //             <select
    //                 value={this.state.selectValue}
    //                 onChange={this.handleChange1}
    //                 >
    //                 {
    //                     this.state.items.map((item, index) => {
    //                         let name = item.name;
    //                         return (
    //                             <option key={index} value={item}>{name}</option>
    //                         )
    //                     })
    //                 }
    //             </select><br />
    //             {this.state.selectValue.toString()}
    //         </div>
    //     );
        const { tags, suggestions } = this.state;
        return (
            <div>
                <ReactTags tags={tags}
                           suggestions={suggestions}
                           handleDelete={this.handleDelete}
                           handleAddition={this.handleAddition}
                />
            </div>
        )
    }
};

export default PublisherSelector;