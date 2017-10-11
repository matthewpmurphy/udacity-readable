import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Modal, Form, FormGroup, Button, FormControl, Col, ControlLabel } from 'react-bootstrap';

class CommentForm extends Component {
    /**
     * @description UI for a modal window to create and edit comments
     */
    render() {
        return (
            <Modal show={this.props.show} onHide={this.props.hide}>
                <Modal.Header className="bg-primary" closeButton>
                    <Modal.Title>{(this.props.type === 'edit') ? 'Edit this comment' : 'Create a new comment'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form horizontal>
                        <FormGroup controlId="txtPostAuthor">
                            <Col componentClass={ControlLabel} sm={3}>
                            Author<span className="required">*</span>:
                            </Col>
                            <Col sm={8}>
                                <FormControl defaultValue={ (this.props.type === 'edit') ? this.props.comment.author : '' } type="text" inputRef={(ref) => this.author = ref} placeholder="Please enter your name" />
                            </Col>
                        </FormGroup>
                        <FormGroup controlId="body">
                            <Col componentClass={ControlLabel} sm={3}>
                                Comment<span className="required">*</span>:
                            </Col>
                            <Col sm={8}>
                                <FormControl defaultValue={ (this.props.type === 'edit') ? this.props.comment.body : '' } componentClass="textarea" placeholder="Please enter your comment here" inputRef={(ref) => this.comment = ref} />
                            </Col>
                        </FormGroup>
                        <FormControl defaultValue={ (this.props.type === 'edit') ? this.props.comment.id : '' } type="hidden" inputRef={(ref) => this.id = ref} />
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={this.props.hide}>Cancel</Button>
                    <Button onClick={this.saveForm} bsStyle="primary">{ (this.props.type === 'edit') ? 'Update Comment' : 'Create Comment' }</Button>
                </Modal.Footer>
            </Modal>
        )
    }

    /**
     * @description validate the comment form, ensure values for author and comment
     */
    validateForm = () => {
        let valid = true;

        if(!this.author.value) {
            valid = false;
            this.author.className = "form-control alert-danger";
        }

        if(!this.comment.value) {
            valid = false;
            this.comment.className = "form-control alert-danger";
        }

        return valid;
    }

    /**
     * @description Save/Update form if valid
     */
    saveForm = () => {
        if(this.props.type === 'edit') {
            let { comment } = this.props;
            if(this.validateForm()) {
                comment.author = this.author.value;
                comment.body = this.comment.value;
                this.props.doEdit(comment);
                this.props.hide();
            }
        }
        else {
            if(this.validateForm()) {
                const comment = {
                    parentId: this.props.postId,
                    author: this.author.value,
                    body: this.comment.value
                }
                this.props.create(comment);
                this.props.hide();
            }
        }
    }
}

CommentForm.propTypes = {
    hide: PropTypes.func.isRequired,
    show: PropTypes.bool.isRequired,
    create: PropTypes.func,
    edit: PropTypes.func,
    comment: PropTypes.object,
    doEdit: PropTypes.func,
    postId: PropTypes.string,
    type: PropTypes.string
}

export default CommentForm