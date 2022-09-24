import mongoose from 'mongoose';

const PostSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true
    },
    picture: {
        type: String,
        required: false
    },
    author: {
        type: String,
        required: false
    },
    categories: {
        type: String,
        required: false
    }
}, { timestamps: true });


const post = mongoose.model('post', PostSchema);

export default post;