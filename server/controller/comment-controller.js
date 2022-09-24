import Comment from "../model/comment.js";

export const newComment = async (req, res) => {
    try {
        console.log(req.body)
        const comment = await new Comment({
            name: req.body.name,
            postId: req.body.postId,
            comment: req.body.comment
        });
        comment.save();
        res.status(200).json("Comment Saved Successfully");
    } catch (error) {
        res.status(500).json(error);
    }
}

export const getComments = async (req, res) => {
    try {
        const comments = await Comment.find({postId: req.params.id});
        res.status(200).json(comments);
    } catch (error) {
        res.status(500).json(error);
    }
}

export const deleteComment = async (req,res) => {
    try {
        const comment = await Comment.findById(req.params.id)
        await comment.delete();
        res.status(200).json("Comment Deleted Successfully");
    } catch (error) {
        res.status(500).json(error);
    }
}