import crawlersController from '../controllers/crawlers.controller'

export default (router)=>{
    
    router.post('/upload-crawled-urls', crawlersController.storeAllCrawledUrls);
    router.get('/list-crawled-pages', crawlersController.listCrawledPages);
    router.get('/post-crawled-urls', crawlersController.uploadPost);
    router.post('/9gag-crawled-urls', crawlersController.nineGagCrawledUrls);
    router.get('/list-crawled-urls', crawlersController.listUploadedPosts);
    router.post('/latest-cursor', crawlersController.latestCursor);
    router.get('/latest-cursor', crawlersController.getLatestCursor);


    router.get('/compressed-images', crawlersController.compressImages);


    
    return router;
}