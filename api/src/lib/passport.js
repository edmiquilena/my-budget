import 'dotenv/config' 
import bcrypt from 'bcrypt'
import Sequelize from 'sequelize'
import passport from 'passport'
import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as JWTstrategy, ExtractJwt as ExtractJWT } from 'passport-jwt';
import {User} from './db'
const Op = Sequelize.Op;

passport.use(
  'register',
  new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
      passReqToCallback: true,
      session: false,
    },
    async(req, username, password, done) => {
 
      try {
       let user = await User.findOne({where: {email: username}})
          if (user != null) {
          
            return done(null, false, { message: 'email already taken'});
          }

         let create =  User.build({email: username, password})
await create.save();
return done(null, create);
      } catch (err) {
        return done(err);
      }
    },
  ),
);

passport.use(
  'login',
  new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
      session: false,
    },
    async (username, password, done) => {
      try {
      let user =   await User.findOne({
          where: {
            email: username,
          },
        })
         if (user === null)     return done(null, false, { message: 'Invalid Email/Password.' });
       
      if(await  user.validPassword(password)) return done(null, user);
        
              return done(null, false, { message: 'Invalid Email/Password.' });
         
          
      } catch (err) {
          console.log("er",err)
        done(err);
      }
    },
  ),
);

const opts = {
  jwtFromRequest: ExtractJWT.fromAuthHeaderWithScheme('JWT'),
  secretOrKey: process.env.JWT_SECRET,
};

passport.use(
  'jwt',
  new JWTstrategy(opts, (jwt_payload, done) => {
    try {
      User.findOne({
        where: {
          id: jwt_payload.id,
        },
      }).then(user => {
        if (user) return done(null, user);
          done(null, false);
        
      });
    } catch (err) {
      done(err);
    }
  }),
);