import express from 'express';
import { createPost, getAllPosts, getCategoryPosts, getPost, getRecentPosts, updatePost, deletePost, getAuthorPosts, likes } from '../controller/post-controller.js';
import { uploadImage, getImage } from '../controller/image-controller.js';
import upload from '../utils/upload.js';
import { newComment, getComments, deleteComment } from '../controller/comment-controller.js';

const router = express.Router();

router.post('/create', createPost);
router.get('/post/:id', getPost);
router.get('/posts', getAllPosts);
router.get('/recentposts', getRecentPosts);
router.get('/posts/:category', getCategoryPosts);
router.post('/posts/author', getAuthorPosts);
router.put('/update/:id', updatePost);
router.delete('/delete/:id', deletePost);

router.post('/file/upload', upload.single('file'), uploadImage);
router.get('/file/:filename', getImage);
router.put('/:id/like',likes);
router.post('/comment/new', newComment);
router.get('/comments/:id', getComments);
router.delete('/delete/comment/:id', deleteComment);

export default router