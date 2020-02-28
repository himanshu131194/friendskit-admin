import postsController from '../controllers/posts.controller'
import usersController from '../controllers/users.controller'

export default (router)=>{
    
    router.get('/list-sections', postsController.listSections);
    
    router.get('/list-documents', postsController.listUniversalUploads);

    // router.get('/list-posts', usersController.authenticate, postsController.listPosts);
    
    // router.get('/query-test', postsController.queryTest);

    // router.get('/download-content', postsController.downloadContent);
    
    // router.get('/list-emojis', postsController.listEmojis);
    
    // router.post('/list-comments', usersController.authenticate, postsController.listComments);
    // router.post('/upvote-comments', usersController.authenticate, postsController.upvoteComments);

    // router.post('/delete-comments', usersController.authenticate, postsController.deleteComment);

    

    
    // router.post('/user-posts', usersController.authenticate, postsController.userPosts);
    
    // router.get('/check-upload', postsController.checkUpload);
    
    router.post('/upload-s3', postsController.uploadImagetoS3);
    
    // router.post('/upload-posts', postsController.uploadPost);
    // router.post('/post-liked',  usersController.authenticate,  postsController.postLiked)
    
    // router.post('/post-comments', usersController.authenticate, postsController.postComments)

    router.post('/add-sections', postsController.addSections)
    router.post('/toggle-contents', postsController.toggleContents)
       
    return router;
}