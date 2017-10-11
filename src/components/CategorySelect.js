import React, { Component } from 'react';
import { FormControl } from 'react-bootstrap'

class CategorySelect extends Component {

    render() {
        return (
            <FormControl componentClass="select" placeholder="select" inputRef={(ref) => this[this.props.name] = ref} onChange={this.handleOnChange}>
                { (this.props.showAll) ? <option value="all">All Categories</option> : <option value="">Select a category</option> }
                {this.addOption(this.props.categories)}
            </FormControl>
        )
    }

    handleOnChange = (event) => {
        if(this.props.onChange) {
            this.props.onChange(event.target.value);
        }
    }

    addOption = (categories) => {
        if(categories) {
            return Object.entries(categories).map(([key, value], index) => {
                return (
                    <option key={index} value={value}>{key}</option>
                )
            })
        }
    }


}

export default CategorySelect;