import  React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Table, Glyphicon } from 'react-bootstrap'
import moment from 'moment'
import Vote from './Vote'
import EditDeletePost from './EditDeletePost'
class PostList extends Component {
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

    sortColumn = (field) => {
        if(field === this.props.sortField) {
            this.props.orderPostsBy(field, !this.props.sortAscending);
        }
        else {
            this.props.orderPostsBy(field, true);
        }
    }

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

export default PostList;