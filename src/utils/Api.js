const api = "http://localhost:5001"


// Generate a unique token for storing your bookshelf data on the backend server.
let token = localStorage.token
if (!token)
  token = localStorage.token = Math.random().toString(36).substr(-8)

const headers = {
  'Accept': 'application/json',
  'Authorization': token
}

/**
 * @description fetch all categories from local api
 * @return return categories in json format
 */
export const fetchAllCategories = () =>
  fetch(`${api}/categories`, { headers })
    .then(response => response.json() )
    .then(json => json.categories)

/**
 * @description fetch all posts from local api
 * @return return all posts in json format
 */
export const fetchAllPosts = () =>
  fetch(`${api}/posts`, { headers })
    .then(response => response.json() )

/**
 * @description fetch posts from a specific category
 * @param { string } category
 * @return return posts from the given category as json
 */
export const fetchPostsByCategory = (category) =>
  fetch(`${api}/${category}/posts`, { headers })
    .then(response => response.json())

/**
 * @description fetch a single post based on id
 * @param { string } id
 * @return a post in json format
 */
export const fetchPost = (id) =>
  fetch(`${api}/posts/${id}`, { headers })
    .then(response => response.json())

/**
 * @description send POST method to API to create a new post
 * @param { object } post
 * @return true or false based on success
 */
export const createPost = (post) =>
  fetch(`${api}/posts`, {
    headers: { ...headers, 'Content-Type': 'application/json' },
    method: 'POST',
    body: JSON.stringify(post)
  })
    .then(response => response.ok)

/**
 * @description send PUT request to api to update post
 * @param { object } post
 * @return true or false based on success
 */
export const editPost = (post) =>
  fetch(`${api}/posts/${post.id}`, {
    headers:  { ...headers, 'Content-Type': 'application/json' },
    method: 'PUT',
    body: JSON.stringify(post)
  })
    .then(response => {
        if(response.ok) {
          return post;
        }
        else {
          return false;
        }
    })

/**
 * @description send DELETE method to API to delete a post
 * @param { string } id
 * @return true or false based on success
 */
export const deletePost = (id) =>
  fetch(`${api}/posts/${id}`, { headers, method: 'DELETE' })
    .then(response => response.ok)

/**
 * @description send post request to API to vote post up or down
 * @param { string } id
 * @param { string } vote
 */
export const doPostVote = (id, vote) =>
  fetch(`${api}/posts/${id}`, {
    headers: { ...headers,'Content-Type': 'application/json' },
    method: 'POST',
    body: JSON.stringify({ option: vote })
  })
    .then(response => response.ok)

/**
 * @description send get request to retrieve comments for a specific post
 * @param { string } id post id
 * @return a list of comments in json format
 */
export const fetchPostComments = (id) =>
  fetch(`${api}/posts/${id}/comments`, { headers })
    .then(response => response.json())

/**
 * @description send a post request to the API to create a new comment
 * @param { object } comment
 * @return true or false based on success
 */
export const createComment = (comment) =>
fetch(`${api}/comments`, {
  headers: { ...headers, 'Content-Type': 'application/json' },
  method: 'POST',
  body: JSON.stringify(comment)
})
  .then(response => response.ok)

/**
 * @description send a PUT request to the local API to update a comment
 * @param { object } comment
 * @return true or false based on success
 */
export const editComment = (comment) =>
fetch(`${api}/comments/${comment.id}`, {
  headers: { ...headers, 'Content-Type': 'application/json' },
  method: 'PUT',
  body: JSON.stringify(comment)
 })
 .then(response => response.ok)

/**
 * @description send DELETE request to local API to delete a comment
 * @param { string } id
 * @return true or false based on success
 */
export const deleteComment = (id) =>
fetch(`${api}/comments/${id}`, { headers, method: 'DELETE' })
  .then(response => response.ok)

/**
 * @description send post request to API to vote comment up or down
 * @param { string } id
 * @param { string } vote
 * @return true or false based on success
 */
export const doCommentVote = (id, vote) =>
  fetch(`${api}/comments/${id}`, {
    headers: { ...headers,'Content-Type': 'application/json' },
    method: 'POST',
    body: JSON.stringify({ option: vote })
  })
    .then(response => response.ok)