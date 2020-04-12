export default {
   env : process.env.NODE_ENV || 'development',
   port : process.env.PORT || 8000,
   API_URL: "http://localhost:8000",
   // API_URL: "http://192.168.0.132:8000",
   // API_URL: "http://192.168.43.140:8000",
   MONGO_URI: 'mongodb+srv://feelfunny:feelfunny123@cluster0-ekrsc.mongodb.net/test?retryWrites=true&w=majority',
   // MONGO_URI : 'mongodb+srv://feelfunny:feelfunny123@feelfunny-jfu4v.mongodb.net/test?retryWrites=true',
   COOKIEKEY: 'mycookiesecret',
   DB:{
      DEFAULT_COUNT : 0,
      DEFAULT_CONTENT_TYPE : 1,  //1-images 2- videos
      DEFAULT_TRUE: true,
      DEFAULT_FALSE: false,
      DEFAULT_ACCOUNT_TYPE: 0, // -1 - ADMIN SIDE  0 - Normal , 1- Google, 2- Facebook
      GENDER:{
         MALE : 1,
         FEMALE: 2,
         OTHER: 3
      },
      BADGETS: {
         NOOBIE: 1,
         PRO: 2 
      },
      CRAWLED_TYPE : {
          DEFAULT : 0,
          FB : 1,
          GAG: 2
      }
   },
   S3:{
      // BUCKET : 'feel-funny',
      // URL : 'https://feel-funny.s3.ap-south-1.amazonaws.com',
      // ACCESS: 'AKIA3YIPQLXV4NIO3PWA',
      // SECRET: '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',
      BUCKET : 'stylemycv',
      URL : 'https://stylemycv.s3.ap-south-1.amazonaws.com',
      ACCESS: 'AKIA3YIPQLXVUZ3S3UD7',
      SECRET: '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',
      PASSWORD: 'WMwQ}t%c(XqR'
   },
   LOGIN_KEYS:{
        GOOGLE:{
           CLIENT: '38122336055-7stkqff3vae90il94e1p12tp0pq26a4h.apps.googleusercontent.com',
           SECRET : 'Czvtwg5Is_ZZwdVPEwUAoR8c'
        }
   },
   MESSAGES : {    
      100 : "post has beeb added successfully",
      101: "section has been added successfully"
   },
   ERRORS : {
      100 : "something went wrong, please try to post again"
   },
   JWT_SECRET: "himanshu@1234",
   ACCESS_TOKEN : "0z6v8b4uua"
}