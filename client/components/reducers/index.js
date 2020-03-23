import {combineReducers} from 'redux'
import {listOfPostsReducer, authUsersReducer, listOfSectionsReducer, listOfTagsReducer,  listOfDocumentsReducer, selectedPostReducer, listOfCommentsReducer} from './reducers'

export default combineReducers({
	  listOfPosts :  listOfPostsReducer,
	  listOfSections : listOfSectionsReducer,
	  listOfTags : listOfTagsReducer,
	  listOfDocuments : listOfDocumentsReducer,
	  user : authUsersReducer,
	  selectedPost : selectedPostReducer,
	  listOfComments: listOfCommentsReducer
})