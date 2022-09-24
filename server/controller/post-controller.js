import Post from '../model/post.js';

export const createPost = async (req, res) => {
    try {
        const post = await new Post(req.body);
        post.save();
        res.status(200).json(post);
    } catch (error) {
        res.status(500).json("Internal Server Error");
    }
}

export const getAllPosts = async (req, res) => {
    let author = req.query.author;
    let category = req.query.category;
    let posts;
    try {
        if (author) {
            posts = await Post.find({ author: author });
        }
        else if (category) {
            posts = await Post.find({ categories: category });
        }
        else {
            posts = await Post.find({}).sort({ _id: -1 })
        }
        res.status(200).json(posts)
    } catch (error) {
        res.status(500).json("Internal Server Error");
    }
}

export const getPost = async (req, res) => {
    try {
        let post = await Post.findById(req.params.id);
        res.status(200).json(post);
    } catch (error) {
        res.status(500).json("Internal Server Error")
    }
}

export const getRecentPosts = async (req, res) => {
    try {
        let posts = await Post.find({}).sort({ _id: -1 }).limit(2);
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json("Internal Server Error")
    }
}

export const getCategoryPosts = async (req, res) => {
    try {
        let posts = await Post.find({ categories: req.params.category }).sort({ _id: -1 });
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json("Internal Server Error")
    }
}

export const getAuthorPosts = async (req,res) => {
    try {
        let posts = await Post.find({ author: req.body.author })
        console.log(posts)
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json("Internal Server Error");
    }
}

export const updatePost = async (request, response) => {
    try {
        const post = await Post.findById(request.params.id);

        await Post.findByIdAndUpdate(request.params.id, { $set: request.body })

        response.status(200).json('post updated successfully');
    } catch (error) {
        response.status(500).json(error);
    }
}

export const deletePost = async (request, response) => {
    try {
        const post = await Post.findById(request.params.id);

        await post.delete()

        response.status(200).json('post deleted successfully');
    } catch (error) {
        response.status(500).json(error)
    }
}
