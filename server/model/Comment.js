import mongoose from 'mongoose';

const CommentSchema = mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    postId:{
        type: String,
        required: true
    },
    comment:{
        type: String,
        required: true
    }
},{timestamps: true})

const comment = mongoose.model('comment',CommentSchema);

export default comment