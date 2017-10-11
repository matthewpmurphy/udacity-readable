import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter, Link } from 'react-router-dom'
import { Panel, Glyphicon, Well, Modal, Button } from 'react-bootstrap'
import moment from 'moment'
import * as PostActions from '../actions/Post'
import { getAllCategories } from '../actions/Categories'
import * as CommentsActions from '../actions/Comments'
import LabelRow from './LabelRow'
import CommentForm from './CommentForm'
import Vote from './Vote'
import EditDeletePost from './EditDeletePost'

class PostDetails extends Component {
    state = {
        showCommentEditModal: false,
        showCommentDeleteModal: false,
        commentActionType: '',
        commentId: '',
        comment: {}
    }

    /**
     * @description update the state for showCommentDeleteModal and commentId to display the delete modal
     * @param { string } id
     */
    openCommentDeleteModal = (id) => {
        this.setState({ showCommentDeleteModal: true, commentId: id });
    }

    /**
     * @description update the state for showCommentDeleteModal to hide the delete modal
     */
    closeCommentDeleteModal = () => {
        this.setState({ showCommentDeleteModal: false });
    }

    /**
     * @description update the state for showCommentEditModal to display that modal as well as the commentAction type and comment
     */
    openCommentEditModal = (comment) => {
        this.setState({ showCommentEditModal: true, commentActionType: 'edit', comment: comment});
    }

    /**
     * @description set the showCommentEditModal state to true and the action type to new to open a window to create a new comment
     */
    openCommentCreateModal = () => {
        this.setState({ showCommentEditModal: true, commentActionType: 'new' });
    }

    /**
     * @description set the showCommentEditModal state to false to hide it
     */
    closeCommentEditModal = () => {
        this.setState({ showCommentEditModal: false });
    }

    /**
     * @description take our comment parameter and pass it to our action dispatch for editing comments
     * @param { object } comment
     */
    editComment = (comment) => {
        const { success } = this.props.comments;
        this.props.editComment(comment);
        if(success) {
            this.closeCommentEditModal();
            this.getData();
        }
    }

    /**
     * @description take comment parameter and pass it to our action dispatch for creating comments
     * @param { object } comment
     */
    createComment = (comment) => {
        this.props.createComment(comment)
        this.getData();
        this.closeCommentEditModal();
    }

    /**
     * @description page UI, display a link back to the home page then display post details if post found
     */
    render() {
        const { post } = this.props
        return(
            <div>
                <Link to="#" onClick={this.props.history.goBack}><Glyphicon glyph="arrow-left" /> Back</Link>
                {(!post) ? this.noPostFound() : this.detailedPost() }
            </div>
        )
    }

    /**
     * @description get the post id from the URL, then get the post details and related comments
     */
    getData = () => {
        const { id } = this.props.match.params;
        this.props.getPost(id)
            .then(() => this.props.getComments(id))
    }

    /**
     * @description on mount, get the post details and related comments, also grab categories
     */
    componentDidMount() {
        this.getData();
        this.props.getAllCategories();
    }

    /**
     * @description delete comment by taking the commentId saved in state and passing it to our action for deleting comments
     */
    deleteComment = () => {
        const { comments } = this.props;
        this.props.deleteComment(this.state.commentId);
        if(comments.success) {
            this.getData();
            this.closeCommentDeleteModal();
        }
    }

    /**
     * @description UI for the delete comment modal
     */
    deleteCommentModal = () => {
        return (
            <Modal show={this.state.showCommentDeleteModal} onHide={this.closeCommentDeleteModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Glyphicon glyph="remove-sign" className="text-danger" /> Are you sure you want to delete this comment?
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={this.closeCommentDeleteModal}>Cancel</Button>
                    <Button onClick={() => this.deleteComment()} bsStyle="danger">Delete</Button>
                </Modal.Footer>
            </Modal>
        )
    }

    /**
     * @description UI for display the post details
     */
    detailedPost = () => {
        const { categories, history } = this.props;
        const { post } = this.props.post;
        const { comments } = this.props.comments;

        return(
            <div>
                <Panel header={post.title} bsStyle="primary">
                    <div className="row">
                        <div className="col-md-8">
                            <LabelRow label="Posted By:" content={post.author} data="" />
                            <LabelRow label="Posted On:" content={moment(post.timestamp).format("MMMM D, YYYY [at] h:mm A")} data="" />
                            <LabelRow
                                label="Vote Score:"
                                content={post.voteScore}
                                data={<Vote id={this.props.match.params.id} type="post" refresh={this.getData} />}
                            />
                        </div>
                        <div className="col-md-4 text-right">
                            <EditDeletePost _post={post} categories={categories} history={history} refresh={this.getData} />
                        </div>
                    </div>
                    <hr />
                    <div>{post.body}</div>
                    <hr />
                    <div className="col-md-10 col-md-offset-1">
                        <div className="col-md-12">
                            <div className="col-md-8">
                                <h4>Comments</h4>
                            </div>
                            <div className="text-right col-md-4">
                                <Button onClick={this.openCommentCreateModal} bsSize="small" bsStyle="primary"><Glyphicon glyph="plus" /> New Comment</Button>
                                <CommentForm
                                    error={this.state.error}
                                    message={this.state.message}
                                    hide={this.closeCommentEditModal}
                                    show={this.state.showCommentEditModal}
                                    comment={this.state.comment}
                                    doEdit={this.editComment}
                                    create={this.createComment}
                                    type={this.state.commentActionType}
                                    postId={post.id}
                                />
                                {this.deleteCommentModal()}
                            </div>
                        </div>
                        <div className="col-md-12">
                            { (comments instanceof Array && comments.length > 0) ? comments.map((comment) => this.showComment(comment))  : <div>No comments found</div> }
                        </div>
                    </div>
                </Panel>

        </div>
        )
    }

    /**
     * @description UI for displaying a comment
     * @param { object } comment
     */
    showComment = (comment) => {
        return(
            <Well key={comment.id}>
                <div className="row">
                    <div className="col-md-8">
                        <LabelRow label="Posted By:" content={comment.author} data="" />
                        <LabelRow label="Posted On:" content={moment(comment.timestamp).format("MMMM D, YYYY [at] h:mm A")} data="" />
                        <LabelRow
                            label="Vote Score:"
                            content={comment.voteScore}
                            data={<Vote id={comment.id} type="comment" refresh={this.getData} />}
                        />
                    </div>
                    <div className="col-md-4 text-right">
                        <span>
                            <Glyphicon glyph="pencil" className="text-warning clickable" onClick={() => this.openCommentEditModal(comment)} title="Edit Comment" />
                            &nbsp;
                            <Glyphicon glyph="remove" className="text-danger clickable" onClick={() => this.openCommentDeleteModal(comment.id)} title="Delete Comment" />
                        </span>
                    </div>
                </div>
                <hr />
                <div className="row">
                    <div className="col-md-12">
                        {comment.body}
                    </div>
                </div>
            </Well>
        )
    }

    /**
     * @description message if api returns no posts
     */
    noPostFound = () => {
        return (<div>The post you are looking for could not be found.</div>)
    }
}

/**
 * @description map our redux state for post, comments, and categories to our props
 * @param { object } state
 */
function mapStateToProps(state) {
    const {post, comments, categories } = state;
    return {
        post,
        comments,
        categories
    }
}

/**
 * @description map our Post, comment, and categories dispatches to our props
 * @param { object } dispatch
 */
function mapDispatchToProps(dispatch) {
    return {
      getPost: (id) => dispatch(PostActions.getPost(id)),
      deleteComment: (id) => dispatch(CommentsActions.deleteComment(id)),
      editComment: (comment) => dispatch(CommentsActions.editComment(comment)),
      createComment: (comment) => dispatch(CommentsActions.createComment(comment)),
      getComments: (id) => dispatch(CommentsActions.getPostComments(id)),
      getAllCategories: () => dispatch(getAllCategories()),
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PostDetails));
