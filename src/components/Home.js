import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { Button, Glyphicon } from 'react-bootstrap'
import { Form, FormGroup, Col, ControlLabel, FormControl } from 'react-bootstrap'
import { getAllCategories } from '../actions/Categories'
import * as PostsActions from '../actions/Posts'
import * as PostActions from '../actions/Post'
import PostList from './PostList'
import PostForm from './PostForm'
import { addOptions } from '../utils/Utils'

class Home extends Component {

    state = {
        showModal: false,
        sortBy: 'voteScore',
        ascending: false,
        category: '',
        error: false,
        message: ''
    }

    openModal = () => {
        this.setState({ showModal : true });
    }

    closeModal = () => {
        this.setState({ showModal: false });
    }

    sortPosts = () => {
        this.props.orderPostsBy(this.state.sortBy, this.state.ascending);
    }

    getPosts = () => {
        if(this.state.category === '')
            this.props.getPosts(this.state.sortBy, this.state.ascending)
        else
            this.props.getPostsByCategory(this.state.category, this.state.sortBy, this.state.ascending)
    }

    updateSort = (field, ascending) => {
        this.setState({ sortBy: field, ascending: ascending })
        this.props.orderPostsBy(field, ascending);
    }

    handleOnChange = (event) => {
        this.setState({ category: event.target.value });
        this.props.getPostsByCategory(event.target.value);
    }

    newPost = (post) => {
        this.props.createPost(post)
        this.props.getPosts(this.state.category);
        this.closeModal();
    }

    render() {
        const { categories, posts } = this.props;
        return (
            <div className="col-md-12">
                <div className="row">
                    <div className="col-md-8">
                        <Form horizontal>
                            <FormGroup controlId="categoryList">
                                <Col componentClass={ControlLabel} sm={2}>
                                    Categories:
                                </Col>
                                <Col sm={5}>
                                    <FormControl componentClass="select" placeholder="select" onChange={this.handleOnChange}>
                                        <option value=''>All Categories</option>
                                        {addOptions(categories)}
                                    </FormControl>
                                </Col>
                            </FormGroup>
                        </Form>
                    </div>
                    <div className="col-md-4 text-right">
                        <Button onClick={this.openModal} bsStyle="primary"><Glyphicon glyph="plus" /> New Post</Button>
                    </div>
                </div>
                <div className="row">
                    <PostList
                        refresh={this.getPosts}
                        category={this.state.category}
                        categories={this.props.categories}
                        posts={posts} onChange={this.props.getPosts}
                        orderPostsBy={this.updateSort}
                        sortField={this.state.sortBy}
                        sortAscending={this.state.ascending} />
                </div>
                <PostForm create={this.newPost} error={this.state.error} message={this.state.message} hide={this.closeModal} options={addOptions} show={this.state.showModal} categories={categories} />
            </div>
        )
    }

    componentDidMount() {
        this.props.getAllCategories();
        this.getPosts();
    }
}

function mapStateToProps(state) {
    const { posts, categories } = state;

    return {
      categories,
      posts
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getAllCategories: () => dispatch(getAllCategories()),
        getPosts: (orderBy, ascending) => dispatch(PostsActions.getAllPosts(orderBy, ascending)),
        getPostsByCategory: (category, orderBy, ascending) => dispatch(PostsActions.getPostsByCategory(category, orderBy, ascending)),
        orderPostsBy: (orderBy, ascending) => dispatch(PostsActions.orderPostsBy(orderBy, ascending)),
        createPost: (post) => dispatch(PostActions.createPost(post))
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Home));