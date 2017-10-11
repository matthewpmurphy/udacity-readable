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

    /**
     * @description set state for showPostEditModal to true to display edit modal
     */
    openPostEditModal = () => {
        this.setState({ showPostEditModal: true });
    }

    /**
     * @description set state for showPostEditModal to false to hide modal
     */
    closePostEditModal = () => {
        this.setState({ showPostEditModal: false });
    }

    /**
     * @description set state for showPostDeleteModal to true to show modal
     */
    openPostDeleteModal = () => {
        this.setState({ showPostDeleteModal: true });
    }

    /**
     * @description set state for showPostDeleteModal to false to hide modal
     */
    closePostDeleteModal = () => {
        this.setState({ showPostDeleteModal: false });
    }

    /**
     * @description pass post param to dispatch for editPost to update post
     * @param { object } post
     */
    editPost = (post) => {
        this.props.editPost(post)
            .then(() => {
                if(this.props.post.success) {
                    this.closePostEditModal();
                    this.props.refresh();
                }
            })
    }

    /**
     * @description pass id to dispatch for deleting post
     * @param { string } id
     */
    deletePost = (id) => {
        this.props.deletePost(id);
        if(this.props.post.success)
            if(this.props.history)
                this.props.history.push("/")
            else
                this.props.refresh()
    }

    /**
     * @description UI for editing/deleting posts, show icons and include modals
     */
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

    /**
     * @description UI for delete post modal window
     */
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

/**
 * @description map dispatches for editing and deleting a post to props
 * @param { object } dispatch
 */
function mapDispatchToProps(dispatch) {
    return {
        editPost: (post) => dispatch(PostActions.editPost(post)),
        deletePost: (id) => dispatch(PostActions.deletePost(id)),
    }
}

/**
 * @description map state for post (redux) to props
 * @param { object } state
 */
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