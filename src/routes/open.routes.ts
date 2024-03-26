import { Router } from 'express';
import passport from 'passport';
import { Strategy } from 'passport-local';
import userService from '../service/user.service';
import authMiddleware from '../middleware/auth.middleware';

export const openRoute = Router();

passport.use(new Strategy({ usernameField: 'username' },async (username, password, done) => {
  userService.authenticateLocalUser(username, password, done);
}));

passport.serializeUser((user, cb) => {
  const newUser = user as any;
  cb(null, newUser[0].id);
});

passport.deserializeUser(async (id:any, cb) => {
  const user = await userService.getById(id).catch((err) => {
      cb(err, null);
  });

  if(user) {
      cb(null, user[0]);
  }
});

openRoute.post('/authenticate', function(req, res, next) {
  passport.authenticate('local', function(err: any, user: any, info: any) {
      if(err) {
          return next(err);
      }
      if(!user) {
          return res.status(401).json(info.message);
      }
      req.logIn(user, function(err) {
          if(err) {
              return next(err);
          }
          return res.json('Login successful');
      });
  })(req, res, next)
});

openRoute.post('/logout', authMiddleware.isUserAuthenticated, (req, res, next) => {
	try {
        res.clearCookie('connect.sid');
	    req.logout((err) => {
		req.session.destroy((err) => {
			return res.send();
		});
	});
    } catch (error) {
        return res.status(500).send('Something went wrong')
    }
});