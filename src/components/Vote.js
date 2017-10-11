import React, { Component } from 'react'
import { Glyphicon } from 'react-bootstrap'
import { connect } from 'react-redux'
import * as PostActions from '../actions/Post'
import * as CommentsActions from '../actions/Comments'
import PropTypes from 'prop-types'

class Vote extends Component {

    render() {
        const { id, type } = this.props;
        return (
            <span>
                <Glyphicon title="Up Vote" className="text-primary clickable" onClick={() => this.upVote(id, type)} glyph="thumbs-up" />
                &nbsp;
                <Glyphicon title="Down Vote" className="text-primary clickable" onClick={() => this.downVote(id, type)} glyph="thumbs-down" />
            </span>
        )
    }

    upVote = (id, type) => {
        if(type === 'post') {
            this.props.votePost(id, 'upVote')
            .then(() => {
                if(this.props.post.success) {
                    this.props.refresh();
                }
            })
        }
        else {
            this.props.voteComment(id, 'upVote')
                .then(() => {
                    if(this.props.comments.success)
                        this.props.refresh();
                })
        }
    }

    downVote = (id, type) => {
        if(type === 'post') {
            this.props.votePost(id, 'downVote')
                .then(() => {
                    if(this.props.post.success) {
                        this.props.refresh();
                    }
                })
        }
        else {
            this.props.voteComment(id, 'downVote')
                .then(() => {
                    if(this.props.comments.success)
                        this.props.refresh();
                })
        }
    }
}

function mapDispatchToProps(dispatch) {
    return {
      votePost: (id, vote) => dispatch(PostActions.votePost(id, vote)),
      voteComment: (id, vote) => dispatch(CommentsActions.voteComment(id, vote))
    }
}

function mapStateToProps(state) {
    const { post,comments } = state;
    return {
        post, comments
    }
}

Vote.propTypes = {
    id: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    refresh: PropTypes.func.isRequired,
    category: PropTypes.string,
    sortField: PropTypes.string,
    ascending: PropTypes.bool
}

export default connect(mapStateToProps, mapDispatchToProps)(Vote)