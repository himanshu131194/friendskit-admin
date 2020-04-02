import crawlersController from '../controllers/crawlers.controller'

export default (router)=>{
    
    router.post('/upload-crawled-urls', crawlersController.storeAllCrawledUrls);

    return router;
}