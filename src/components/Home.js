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
    }

    /**
      * @description sets the state of showModal to true
      */
    openModal = () => {
        this.setState({ showModal : true });
    }

    /**
     * @description sets the state of showModal to false
     */
    closeModal = () => {
        this.setState({ showModal: false });
    }

    /**
     * @description calls the orderPostsBy prop and passes it sortBy and acending from state
     */
    sortPosts = () => {
        this.props.orderPostsBy(this.state.sortBy, this.state.ascending);
    }

    /**
     * @description if the category of state is empty, it calls getPosts and retrieves all posts,
     *  else it passes the  category from state to getPostsByCategory to populate the list of posts
     */
    getPosts = () => {
        if(this.state.category === '')
            this.props.getPosts(this.state.sortBy, this.state.ascending)
        else
            this.props.getPostsByCategory(this.state.category, this.state.sortBy, this.state.ascending)
    }

    /**
     * @description sets the state of sortBy and ascending and then passes those values to orderPostsBy to resort the post list
     */
    updateSort = (field, ascending) => {
        this.setState({ sortBy: field, ascending: ascending })
        this.props.orderPostsBy(field, ascending);
    }

    /**
     * @description on Category change, let's set the state of category and refresh the list of posts accordingly
     * @param { event } event - on change event
     */
    handleOnChange = (event) => {
        this.setState({ category: event.target.value });
        if(event.target.value === '')
            this.props.getPosts();
        else
            this.props.getPostsByCategory(event.target.value);
    }

    /**
     * @description take a post object, pass it to the create post method, refresh the post list, and close the new post modal
     * @param { object } post object that includes title, author, body, and category
     */
    newPost = (post) => {
        this.props.createPost(post)
        this.props.getPosts();
        this.closeModal();
    }

    /**
     * @description render the home page, a list of post and controls to add/edit/delete/upvote/downvoteposts as well as sort and filter by category.
     * @return a listing of posts
     */
    render() {
        const { categories, posts } = this.props;
        return (
            <div className="col-md-12">
                <div className="row">
                    <div className="col-md-8 text-left">
                        <Form horizontal>
                            <FormGroup controlId="categoryList">
                                <Col componentClass={ControlLabel} sm={1}>
                                    Categories:
                                </Col>
                                <Col sm={3}>
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
                <PostForm create={this.newPost} hide={this.closeModal} options={addOptions} show={this.state.showModal} categories={categories} />
            </div>
        )
    }

    /**
     * @description when this mounts, get a list off all the categories as well as all the posts
     */
    componentDidMount() {
        this.props.getAllCategories();
        this.getPosts();
    }
}

/**
 * @description return state from redux as props
 * @param { object } state
 * @return returns categories and posts as props
 */
function mapStateToProps(state) {
    const { posts, categories } = state;

    return {
      categories,
      posts
    }
}

/**
 * @description map actions to local props
 * @param {*} dispatch
 */
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