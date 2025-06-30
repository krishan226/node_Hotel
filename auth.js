const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const Person = require('./Models/Person');

//MARK: AUTENTICATION
passport.use(new LocalStrategy (async (username, password, done) => {
    // Authentication logic here
    try {
    //   console.log('Received credential:', USERNAME, password);
      const user = await Person.findOne({ username });
      
      if (!user) 
          return done(null, false, {message: 'Invalid username.'});
      
      const isPasswordMatch = await user.comparePassword(password);
      if (isPasswordMatch)
         return done(null, user);
      else
         return done(null, false, {message: 'Invalid password'});
    }catch (err) {
      return done(err);
    }
  
}))
  
module.exports = passport;
