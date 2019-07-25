const router = require('express').Router()
const passport = require('passport')

// auth login
router.get('/signin', (req,res)=>{
    res.render('login', {title: "login page", user: req.user})
})

// auth logout
router.get('/logout', (req,res) =>{
  req.logout()
  res.redirect('/')
})

// auth with google
router.get('/google', passport.authenticate('google', {
  scope: ['profile']
}))

router.get('/google/cb', passport.authenticate('google'), (req,res) =>{
  res.redirect('/dashboard')
})

module.exports = router
