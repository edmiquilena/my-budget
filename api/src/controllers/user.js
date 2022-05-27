import 'dotenv/config' 
import jwt from 'jsonwebtoken';
import passport from 'passport';
import {User} from '../lib/db'
export const register = async (req, res, next) => {
passport.authenticate('register', (err, user, info) => {
if(err)   console.log('e1',err)
if (info !== undefined) {
    res.status(403).send({error: true, message: info.message});
  } else {
    req.logIn(user, error => {
    if(error) res.status(403).send({ error: true, message: 'user cannot be created' });
      res.status(200).send({error: false,  message: 'user created' });
    });
  }


})
(req, res, next);
    
}


export const login = async (req, res, next) => {

    passport.authenticate('login', (err, users, info) => {
        
        if (info !== undefined)  return res.status(403).send({error: true, message: info.message});
        
          req.logIn(users, async() => {
         let user =  await User.findOne({
              where: {
               email: req.body.email
              },
            })
            if(user) {
                console.log(user.id)
            const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
                expiresIn: 60 * 60,
              });
              res.status(200).send({
                error: false,
                token
              });
            }
          });
        
      })(req, res, next);
  
 


}
