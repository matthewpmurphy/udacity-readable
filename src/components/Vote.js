import React, { Component } from 'react'
import { Glyphicon } from 'react-bootstrap'
import { connect } from 'react-redux'
import * as PostActions from '../actions/Post'
import * as CommentsActions from '../actions/Comments'
import PropTypes from 'prop-types'

class Vote extends Component {
    /**
     * @description up and downvote interface
     * @return span with thumbs up and down icons that allow  vting
     */
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

    /**
     * @description upvote posts or comments
     * @param { string } id
     * @param { string } type
     * @return pass vote to api then refresh the ui to show updated voteScore
     */
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

    /**
     * @description down posts or comments
     * @param { string } id
     * @param { string } type
     * @return pass vote to api then refresh the ui to show updated voteScore
     */
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

/**
 * @description map redux dispatches to props
 * @param { object } dispatch
 * @return props for voting on posts and comments
 */
function mapDispatchToProps(dispatch) {
    return {
      votePost: (id, vote) => dispatch(PostActions.votePost(id, vote)),
      voteComment: (id, vote) => dispatch(CommentsActions.voteComment(id, vote))
    }
}

/**
 * @description map state to props
 * @param { object } state
 * @return post and comments as props
 */
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