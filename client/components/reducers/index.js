import {combineReducers} from 'redux'
import {listOfPostsReducer, authUsersReducer, listOfSectionsReducer, listOfTagsReducer,  listOfDocumentsReducer, 
	    selectedPostReducer, listOfCommentsReducer, listOfCrawledSourcesReducer, listOfLatestCursorsReducer} from './reducers'

export default combineReducers({
	  listOfPosts :  listOfPostsReducer,
	  listOfSections : listOfSectionsReducer,
	  listOfCrawledSources: listOfCrawledSourcesReducer,
	  listOfTags : listOfTagsReducer,
	  listOfDocuments : listOfDocumentsReducer,
	  user : authUsersReducer,
	  selectedPost : selectedPostReducer,
	  listOfComments: listOfCommentsReducer,
	  listOfLatestCursors: listOfLatestCursorsReducer
})