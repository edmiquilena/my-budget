import passport from 'passport';
const RequireAuth = (req, res, next) => {
    passport.authenticate('jwt', { session: false }, (err, user, info) => {
      if (err)  return res.status(500).json({error: true, message: "whoops, something went wrong!"});
      if (info != undefined) return res.status(403).json({error: true, message: info.message, Auth: false});
    req.user = user;
      next();
      
    })(req, res, next);
  };

  export default RequireAuth