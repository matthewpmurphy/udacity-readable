import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Modal, Form, FormGroup, Button, FormControl, Col, ControlLabel } from 'react-bootstrap';

class PostForm extends Component {
    render() {
        return (
            <Modal show={this.props.show} onHide={this.props.hide}>
                <Modal.Header className="bg-primary" closeButton>
                    <Modal.Title>{(this.props.post) ? 'Edit this post' : 'Create a new post'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form horizontal>
                        <FormGroup controlId="txtPostTitle">
                            <Col componentClass={ControlLabel} sm={3}>
                            Title<span className="required">*</span>:
                            </Col>
                            <Col sm={8}>
                                <FormControl defaultValue={ (this.props.post) ? this.props.post.title : '' } type="text" inputRef={(ref) => this.title = ref} placeholder="Please enter a post title" />
                            </Col>
                        </FormGroup>
                        <FormGroup controlId="txtPostAuthor">
                            <Col componentClass={ControlLabel} sm={3}>
                            Author<span className="required">*</span>:
                            </Col>
                            <Col sm={8}>
                                <FormControl defaultValue={ (this.props.post) ? this.props.post.author : '' } type="text" inputRef={(ref) => this.author = ref} placeholder="Please enter your name" />
                            </Col>
                        </FormGroup>
                        <FormGroup controlId="selectCategory">
                            <Col componentClass={ControlLabel} sm={3}>
                                Category<span className="required">*</span>:
                            </Col>
                            <Col sm={8}>
                                <FormControl defaultValue={ (this.props.post) ? this.props.post.category : '' } componentClass="select" placeholder="select" inputRef={(ref) => this.postCategory = ref}>
                                    <option value="">Please select a category</option>
                                    {this.props.options(this.props.categories)}
                                </FormControl>
                            </Col>
                        </FormGroup>
                        <FormGroup controlId="body">
                            <Col componentClass={ControlLabel} sm={3}>
                                Post<span className="required">*</span>:
                            </Col>
                            <Col sm={8}>
                                <FormControl defaultValue={ (this.props.post) ? this.props.post.body : '' } componentClass="textarea" placeholder="Please enter your text here" inputRef={(ref) => this.post = ref} />
                            </Col>
                        </FormGroup>
                        <FormControl defaultValue={ (this.props.post) ? this.props.post.id : '' } type="hidden" inputRef={(ref) => this.id = ref} />
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={this.props.hide}>Cancel</Button>
                    <Button onClick={this.saveForm} bsStyle="primary">{ (this.props.post) ? 'Update Post' : 'Create Post' }</Button>
                </Modal.Footer>
            </Modal>
        )
    }

    validateForm = () => {
        let valid = true;

        if(!this.title.value) {
            valid = false;
            this.title.className = "form-control alert-danger";
        }

        if(!this.author.value) {
            valid = false;
            this.author.className = "form-control alert-danger";
        }

        if(!this.post.value) {
            valid = false;
            this.post.className = "form-control alert-danger";
        }

        if(!this.postCategory.value) {
            valid = false;
            this.postCategory.className = "form-control alert-danger";
        }
        return valid;
    }

    saveForm = () => {
        if(this.id.value) {
            let { post } = this.props;
            if(this.validateForm()) {
                post.title = this.title.value;
                post.author = this.author.value;
                post.category = this.postCategory.value;
                post.body = this.post.value;
                this.props.doEdit(post);
            }
        }
        else {
            if(this.validateForm()) {
                const post = {
                    title: this.title.value,
                    author: this.author.value,
                    category: this.postCategory.value,
                    body: this.post.value
                }
                this.props.create(post);
            }
        }
    }
}

PostForm.propTypes = {
    hide: PropTypes.func.isRequired,
    options: PropTypes.func.isRequired,
    show: PropTypes.bool.isRequired,
    categories: PropTypes.object.isRequired,
    create: PropTypes.func,
    edit: PropTypes.func,
    post: PropTypes.object,
    doEdit: PropTypes.func
}

export default PostForm;