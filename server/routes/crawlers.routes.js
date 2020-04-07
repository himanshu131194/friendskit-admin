import crawlersController from '../controllers/crawlers.controller'

export default (router)=>{
    
    router.post('/upload-crawled-urls', crawlersController.storeAllCrawledUrls);
    router.get('/list-crawled-pages', crawlersController.listCrawledPages);
    router.get('/post-crawled-urls', crawlersController.uploadPost);
    router.get('/list-crawled-urls', crawlersController.listUploadedPosts);


    return router;
}