import  React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Table, Glyphicon } from 'react-bootstrap'
import moment from 'moment'
import Vote from './Vote'
import EditDeletePost from './EditDeletePost'
import PropTypes from 'prop-types'

class PostList extends Component {
    /**
     * @description render the ui for post listings
     */
    render() {
        const { posts } = this.props
        return (
            <Table responsive bordered striped hover>
                <thead>
                    <tr className="bg-primary">
                        <th onClick={ () => this.sortColumn('title')}>{this.showIcon('title')} Title</th>
                        <th onClick={ () => this.sortColumn('author')}>{this.showIcon('author')} Author</th>
                        <th onClick={ () => this.sortColumn('timestamp')}>{this.showIcon('timestamp')} Posted On</th>
                        <th onClick={ () => this.sortColumn('voteScore')}>{this.showIcon('voteScore')} Vote Score</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    { (posts instanceof Array) ? posts.map( (post) => this.tableRow(post)) : '' }
                </tbody>
            </Table>
        )
    }

    /**
     * @description determine which icon to show in column headers for sorting
     * @param { string } field
     */
    showIcon = (field) => {

        var iconToUse = 'sort';

        if(field === this.props.sortField) {
            if(this.props.sortAscending) {
                iconToUse = 'chevron-up';
            }
            else {
                iconToUse = 'chevron-down';
            }

        }

        return(
            <Glyphicon glyph={iconToUse} />
        )
    }

    /**
     * @description sort clicked column
     * @param { string } field
     */
    sortColumn = (field) => {
        if(field === this.props.sortField) {
            this.props.orderPostsBy(field, !this.props.sortAscending);
        }
        else {
            this.props.orderPostsBy(field, true);
        }
    }

    /**
     * @description UI element for a table row in the post listing
     */
    tableRow = (post) =>{
        var link = `/${post.category}/${post.id}`;
        return (
            <tr key={post.id}>
                <td><Link to={link}>{post.title}</Link></td>
                <td>{post.author}</td>
                <td>{moment(post.timestamp).format("MMMM D, YYYY [at] h:mm A")}</td>
                <td>{post.voteScore}</td>
                <td>
                    <EditDeletePost _post={post} categories={this.props.categories} refresh={this.props.refresh} />
                    &nbsp;
                    <Vote
                        id={post.id}
                        type="post"
                        refresh={this.props.refresh}
                        category={this.props.category}
                        sortField={this.props.sortField}
                        sortAscending={this.props.sortAscending}
                    />
                </td>
            </tr>
        )
    }
}

PostList.PropTypes = {
    refresh: PropTypes.func.isRequired,
    category: PropTypes.string,
    categories: PropTypes.array.isRequired,
    posts: PropTypes.object,
    onChange: PropTypes.func.isRequired,
    orderPostsBy: PropTypes.func.isRequired,
    sortField: PropTypes.string.isRequired,
    sortAscending: PropTypes.bool.isRequired
}

export default PostList;