import React, { Component } from 'react'
import { Glyphicon, Modal, Button } from 'react-bootstrap'
import { connect } from 'react-redux'
import * as PostActions from '../actions/Post'
import PostForm from './PostForm'
import PropTypes from 'prop-types'
import { addOptions } from '../utils/Utils'

class EditDeletePosts extends Component {
    state = {
        showPostDeleteModal: false,
        showPostEditModal: false,
    }

    openPostEditModal = () => {
        this.setState({ showPostEditModal: true });
    }

    closePostEditModal = () => {
        this.setState({ showPostEditModal: false });
    }

    openPostDeleteModal = () => {
        this.setState({ showPostDeleteModal: true });
    }

    closePostDeleteModal = () => {
        this.setState({ showPostDeleteModal: false });
    }

    editPost = (post) => {
        this.props.editPost(post)
            .then(() => {
                if(this.props.post.success) {
                    this.closePostEditModal();
                    this.props.refresh();
                }
            })
    }

    deletePost = (id) => {
        this.props.deletePost(id);
        if(this.props.post.success)
            if(this.props.history)
                this.props.history.push("/")
            else
                this.props.refresh()
    }

    render() {
        const { _post, categories } = this.props;
        return (
            <span>
                <Glyphicon glyph="pencil" className="text-warning clickable" onClick={() => this.openPostEditModal()} title="Edit Post" />
                &nbsp;
                <Glyphicon glyph="remove" className="text-danger clickable" onClick={() => this.openPostDeleteModal()} title="Delete post" />
                <PostForm
                    hide={this.closePostEditModal}
                    options={addOptions}
                    show={this.state.showPostEditModal}
                    categories={categories}
                    post={_post}
                    doEdit={this.editPost}
                />
                {this.deletePostModal()}
            </span>
        )
    }

    deletePostModal = () => {
        return (
            <Modal show={this.state.showPostDeleteModal} onHide={this.closePostDeleteModal}>
                <Modal.Header closeButton>
                    <Modal.Title>{this.props._post.title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Glyphicon glyph="remove-sign" className="text-danger" /> Are you sure you want to delete this post?
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={this.closePostDeleteModal}>Cancel</Button>
                    <Button onClick={() => this.deletePost(this.props._post.id)} bsStyle="danger">Delete</Button>
                </Modal.Footer>
            </Modal>
        )
    }



}

function mapDispatchToProps(dispatch) {
    return {
        editPost: (post) => dispatch(PostActions.editPost(post)),
        deletePost: (id) => dispatch(PostActions.deletePost(id)),
    }
}

function mapStateToProps(state) {
    const { post } = state;
    return {
        post
    }
}

EditDeletePosts.propTypes = {
    post: PropTypes.object.isRequired,
    refresh: PropTypes.func.isRequired,
    categories: PropTypes.object.isRequired,
    history: PropTypes.object
}

export default connect(mapStateToProps, mapDispatchToProps)(EditDeletePosts)