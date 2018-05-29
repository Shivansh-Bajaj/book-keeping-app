import React from "react";
import { WithContext as ReactTags } from 'react-tag-input';
import "../common/style/tags.css";

class AuthorSelector extends React.Component {
    constructor(props) {
        super(props);
        this.state = {items:[], selectValue: [], tags: [], suggestions: []};
        this.handleChange1 = this.handleChange1.bind(this);
        this.search = this.search.bind(this);
        this.handleAddition = this.handleAddition.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.search();
    }
    search() {
        const BASE_URL = 'http://localhost:3000/api/author/nameall';
        fetch(`${BASE_URL}`, { method: 'GET'})
            .then(response => response.json())
            .then(json => {
                let items =(json.hasOwnProperty('data') && json.data.length !== 0 ? json.data: []);
                let selectValue = (items.length !== 0 ? [items[0].name]: []);
                this.setState({suggestions: items, selectValue: selectValue});
            });
    }
    handleChange1(e){
        this.setState({selectValue:e.target.value});
        this.props.onSelectAuthors(this.state.selectValue);
    }
    handleDelete(i, key) {
        console.log(i, key);
        const { tags, selectValue } = this.state;
        this.setState({
            tags: tags.filter((tag, index) => index !== i),
            selectValue: selectValue.filter((tag, index) => index !== i),
        });
        this.props.onSelectAuthors(this.state.selectValue);
    }

    handleAddition(tag) {
        this.setState(state => ({ tags: [...state.tags, tag], selectValue: [...state.selectValue, tag.text] }));
        this.props.onSelectAuthors(this.state.selectValue);
    }
    render() {
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

export default AuthorSelector;