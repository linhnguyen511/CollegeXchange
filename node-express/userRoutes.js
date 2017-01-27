// var express = require('express');
// var router = express.Router();
var passport = require('passport');
var User = require('./models/userSchema');
var Verify    = require('./verify');

module.exports = function(app) {
/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });


 // New User Registration
  app.post('/api/signup', function(req, res) {
      if (req.body.password == req.body.password_confirm){
          //register users to Moongoose
          User.register(new User({ email : req.body.email }),
            req.body.password, function(err, user) {
                if (err) {
                    return res.json("Can't register new user");
                }

                //create URL for confirmation email
                var authenticationURL = 'http://localhost:3000/#!/verify/' + user.authToken;

                //send emails to user for verification
                const nodemailer = require('@nodemailer/pro');
                // create reusable transporter object using the default SMTP transport
                let transporter = nodemailer.createTransport({
                    service: 'gmail',
                    auth: {
                        user: 'donotreply.dormshop@gmail.com',
                        pass: 'tequiero1990'
                    }
                });
                // setup email data with unicode symbols
                let mailOptions = {
                    from: '"DormShop Team" <donotreply.dormshop@gmail.com>', // sender address
                    to: user.email, // list of receivers
                    subject:  'Confirm your email',
                    html:  '<p>Please click <a target=_blank href=\"' + authenticationURL + '\"> here</a> to confirm your registration with DormShop.</p>'
                };
                // send mail with defined transport object
                transporter.sendMail(mailOptions, function (err){
                      if (err) {
                        console.log(err);
                      }
                      res.redirect('/#!/emailverification')
                });
          });
      };
  });


  // Verify users after verification email sent
  app.get('/api/verify', function(req, res) {
      User.verifyEmail(req.query.token, function(err, existingAuthToken) {
          if(err) console.log('err:', err);
          res.json("Email verified succesfully");
      });
        // res.render('email-verification', { title : 'Email verified succesfully!' });
  });


  //User Login
  app.post('/api/login', function(req, res, next) {

      passport.authenticate('local', function(err, user, info) {
          if (err) {
            return next(err);
          }

          if (!user) {
            return res.status(401).json({
              err: info
            });
          }
          // console.log("Enter here");
          req.logIn(user, function(err) {
              if (err) {
                return res.status(500).json({
                  err: 'Could not log in user'
                });
              }

              var token = Verify.getToken(user);
                      // res.status(200).json({
                      //     status: 'Login successful!',
                      //     success: true,
                      //     token: token
                      // });

                      res.redirect('/');
                      // req.flash('message', 'You have succesfully logged in!');
          });
      })(req,res,next);
  });



// router.get('/api/logout', function(req, res) {
//     req.logout();
//   res.status(200).json({
//     status: 'Bye!'
//   });
// });



};
