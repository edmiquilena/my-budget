import 'dotenv/config' 
import jwt from 'jsonwebtoken';
import passport from 'passport';
import {User} from '../lib/db'
export const register = async (req, res, next) => {
passport.authenticate('register', async(err, user, info) => {
if(err)   return res.status(403).send({ error: true, message: 'user cannot be created' }); 
 (info !== undefined) ?  res.status(403).send({error: true, message: info.message}) :   res.status(200).send({error: false,  message: 'user created' });



})
(req, res, next);
    
}


export const me = async (req, res, next) => {
  passport.authenticate('jwt', { session: false }, (err, user, info) => {
    if (err)  return res.status(500).json({error: true, message: "whoops, something went wrong!"});
    if (info != undefined || !user) return res.status(403).json({error: true, message: info?.message, Auth: false});

  req.user = user;
    return res.json({error: false, user, Auth: true});
    
  })(req, res, next);
}

export const login = async (req, res, next) => {

    passport.authenticate('login', async(err, users, info) => {
        if (info !== undefined)  return res.status(403).json({error: true, message: info.message});
         let user =  await User.findOne({
              where: {
               email: req.body.email
              },
              attributes: ['id', 'email']
            })
            if(user) {
            const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
                expiresIn: "7d",
              });
              res.json({
                error: false,
                token,
                user: user
              });
            }
        
      })(req, res, next);
  
 


}
