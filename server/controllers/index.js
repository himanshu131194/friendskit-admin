// import postSections from '../models/sections.model'
import passport from 'passport'
// import CONFIG from '../../config';

export default (router)=>{

    router.get('/auth/google', passport.authenticate('google', {
        scope: ['profile', 'email']
      })
    );
  
    router.get('/auth/google/callback', passport.authenticate('google'),
      (req, res) => {
        console.log('redirect to home page')
        res.redirect('/');
      }
    );

    router.get('/authenticate', (req, res) => {
        console.log(req.user)
        res.send({
            key : req.user
        })
      }
    );




    return router;
}