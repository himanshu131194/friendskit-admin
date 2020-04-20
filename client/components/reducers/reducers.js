import {LOAD_POSTS, AUTH_USERS, LIST_SECTIONS, LIST_TAGS, LIST_DOCUMENTS, CURRENT_POST, COMMENTS_LIST, LIST_CURSORS} from '../actions/types'

export const listOfPostsReducer = (state=null, action)=>{
	switch(action.type){
		  case LOAD_POSTS:
			return action.payload;
		  default: 
		   return state;
	}
} 

export const authUsersReducer = (state=null, action)=>{
	state  = {
		auth : true,
		data : {
			gender: 1,
			badgets: 1,
			account_type: 1,
			favourite_sections: [],
			_id: "5e3551da2dafec60becda62c",
			name: "himanshu131194@gmail.com",
            email: "himanshu savita",
            // profile_pic: {
            //     original: {
            //           url : "https://lh3.googleusercontent.com/a-/AAuE7mAEEHwJWAXZA6cPFP1f36ptZjHtU2-hY3rQh4vv1A"
            //     }
            // },
            profile_pic: "https://lh3.googleusercontent.com/a-/AAuE7mAEEHwJWAXZA6cPFP1f36ptZjHtU2-hY3rQh4vv1A",
			account_id: "113944163418601847954",
			created: "2020-02-01T10:24:26.981Z",
			__v: 0
		}    
	}
	switch(action.type){
		  case AUTH_USERS:
			return action.payload;
		  default: 
		     return state;
	}
} 


export const listOfSectionsReducer = (state=[], action)=>{
	switch(action.type){
		  case LIST_SECTIONS:
			return action.payload;
		  default: 
		   return state;
	}
} 

export const listOfCrawledSourcesReducer = (state=[], action)=>{
	switch(action.type){
		  case LIST_SECTIONS:
			return action.payload;
		  default: 
		   return state;
	}
} 

export const listOfTagsReducer = (state=[], action)=>{
	switch(action.type){
		  case LIST_TAGS:
			return action.payload;
		  default: 
		   return state;
	}
} 

export const listOfDocumentsReducer = (state=[], action)=>{
	switch(action.type){
		  case LIST_DOCUMENTS:
			return action.payload;
		  default: 
		   return state;
	}
} 

export const selectedPostReducer = (state=null, action)=>{
	switch(action.type){
		  case CURRENT_POST:
			return action.payload;
		  default: 
		   return state;
	}
} 


export const listOfCommentsReducer = (state=null, action)=>{
	switch(action.type){
		  case COMMENTS_LIST:
			return action.payload;
		  default: 
		   return state;
	}
} 


export const listOfLatestCursorsReducer = (state=[], action)=>{
	switch(action.type){
		  case LIST_CURSORS:
			return action.payload;
		  default: 
		   return state;
	}
} 


