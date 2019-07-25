const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20').Strategy
const User = require('../models/user-model')
const { google } = require('./config')

passport.use(new GoogleStrategy({
    clientID: google.clientID,
    clientSecret: google.clientSecret,
    callbackURL: "/auth/google/cb"
},(accessToken, refreshToken, profile, done) =>{
  // check first if user already exists in our DB.
  User.findOne({googleId: profile.id}).then((currentUser) =>{
    if (currentUser) {
      done(null, currentUser)
    } else {
      const user = new User({
        username: profile.username,
        googleId: profile.id
      })
      user.save().then(() => console.log("user saved to DB."))
      done(null, user)
    }
  })
}))

passport.serializeUser((user, done) =>{
  done(null, user.id)
})

passport.deserializeUser((id, done) =>{
  User.findById(id).then((user) =>{
    done(null, user)
  })
})
