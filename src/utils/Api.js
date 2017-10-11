const api = "http://localhost:5001"


// Generate a unique token for storing your bookshelf data on the backend server.
let token = localStorage.token
if (!token)
  token = localStorage.token = Math.random().toString(36).substr(-8)

const headers = {
  'Accept': 'application/json',
  'Authorization': token
}

export const fetchAllCategories = () =>
  fetch(`${api}/categories`, { headers })
    .then(response => response.json() )
    .then(json => json.categories)

export const fetchAllPosts = () =>
  fetch(`${api}/posts`, { headers })
    .then(response => response.json() )

export const fetchPostsByCategory = (category) =>
  fetch(`${api}/${category}/posts`, { headers })
    .then(response => response.json())

export const fetchPost = (id) =>
  fetch(`${api}/posts/${id}`, { headers })
    .then(response => response.json())

export const createPost = (post) =>
  fetch(`${api}/posts`, {
    headers: { ...headers, 'Content-Type': 'application/json' },
    method: 'POST',
    body: JSON.stringify(post)
  })
    .then(response => response.ok)



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

export const deletePost = (id) =>
  fetch(`${api}/posts/${id}`, { headers, method: 'DELETE' })
    .then(response => response.ok)

export const doPostVote = (id, vote) =>
  fetch(`${api}/posts/${id}`, {
    headers: { ...headers,'Content-Type': 'application/json' },
    method: 'POST',
    body: JSON.stringify({ option: vote })
  })
    .then(response => response.ok)

export const fetchPostComments = (id) =>
  fetch(`${api}/posts/${id}/comments`, { headers })
    .then(response => response.json())

export const createComment = (comment) =>
fetch(`${api}/comments`, {
  headers: { ...headers, 'Content-Type': 'application/json' },
  method: 'POST',
  body: JSON.stringify(comment)
})
  .then(response => response.ok)

export const editComment = (comment) =>
fetch(`${api}/comments/${comment.id}`, {
  headers: { ...headers, 'Content-Type': 'application/json' },
  method: 'PUT',
  body: JSON.stringify(comment)
 })
 .then(response => response.ok)

export const deleteComment = (id) =>
fetch(`${api}/comments/${id}`, { headers, method: 'DELETE' })
  .then(response => response.ok)

export const doCommentVote = (id, vote) =>
  fetch(`${api}/comments/${id}`, {
    headers: { ...headers,'Content-Type': 'application/json' },
    method: 'POST',
    body: JSON.stringify({ option: vote })
  })
    .then(response => response.ok)