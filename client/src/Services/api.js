import axios from 'axios';

const host = "http://localhost:8000"

export const getAllPosts = async () => {
    try {
        let respose = await axios.get(`${host}/api/posts`);
        return respose.data;
    } catch (error) {
        console.log(error)
    }
}

export const getPost = async (id) => {
    try {
        let response = await axios.get(`${host}/api/post/${id}`);
        return response.data;
    } catch (error) {
        console.log(error)
    }
}

export const recentPosts = async () => {
    try {
        let response = await axios.get(`${host}/api/recentposts`);
        return response.data;
    } catch (error) {
        console.log(error)
    }
}

export const categoryPosts = async (category) => {
    try {
        let response = await axios.get(`${host}/api/posts/${category}`);
        return response.data;
    } catch (error) {
        console.log(error)
    }
}

export const authorPosts = async (author) => {
    try {
        let response = await axios.post(`${host}/api/posts/author`, author);
        return response.data;
    } catch (error) {
        console.log(error)
    }
}

export const createPost = async (post) => {
    try {
        let response = await axios.post(`${host}/api/create`, post);
        return response.data;
    } catch (error) {
        console.log("Error while calling post Api", error)
    }
}

export const updatePost = async (id, post) => {
    try {
        let response = await axios.put(`${host}/api/update/${id}`, post);
        return response.data;
    } catch (error) {
        console.log(error)
    }
}

export const deletePost = async (id) => {
    try {
        let response = await axios.delete(`${host}/api/delete/${id}`)
        return response.data;
    } catch (error) {
        console.log("Error while deleting the post", error)
    }
}

export const uploadFile = async (data) => {
    try {
        return await axios.post(`${host}/api/file/upload`, data);
    } catch (error) {
        console.log("Error while uploading the file", error)
    }
}

export const getUser = async () => {
    try {
        let response = await axios.post(`${host}/api/users/getuser`, {
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            }
        });
        return response.data;
    } catch (error) {
        console.log(error)
    }
}

export const newComment = async (data) => {
    try {
        return await axios.post(`${host}/api/comment/new`, data);
    } catch (error) {
        console.log("Error while posting the comment", error);
    }
}

export const getComments = async (id) => {
    try {
        let response = await axios.get(`${host}/api/comments/${id}`);
        return response.data;
    } catch (error) {
        console.log("Error while getting the comments", error)
    }
}

export const deleteComment = async (id) => {
    try {
        return await axios.delete(`${host}/api/delete/comment/${id}`)
    } catch (error) {
        console.log("Error while deleting the comment", error)
    }
}