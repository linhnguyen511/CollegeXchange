var express = require('express');
// var router = express.Router();
var passport = require('passport');
var User = require('./models/userSchema');
// var Verify    = require('./verify');
// var sendgrid = require('sendgrid')(process.env.SENDGRID_USERNAME, process.env.SENDGRID_PASSWORD);

//-----------------------------------------------------------------------------------
// const SENDGRID_API_KEY = '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';
// const MY_TEMPLATE_ID = 'c46f1b05-1bff-4003-b2f1-aaa63b73ac5a'

// var sendgrid = require('sendgrid')(process.env.SENDGRID_API_KEY);
//-----------------------------------------------------------------------------------

module.exports = function(app) {
/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });

  app.post('/api/signup', function(req, res) {
      console.log(req.body);
      if (req.body.password == req.body.password_confirm){
          //register users to Moongoose
          User.register(new User({ email : req.body.email }),
            req.body.password, function(err, user) {
                if (err) {
                    return res.json("Can't register new user");
                }

                //create URL for confirmation email
                var authenticationURL = 'http://localhost:3000/verify?authToken=' + user.authToken;


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
                      console.log("Enter here!!!!!");
                      // return res.json("Email verification sent");
                      // res.sendFile(__dirname + '../views/emailVerification.html');
                      res.redirect('/#!/emailverification')
                });
          });
      };
  });

  // app.get('/api/email-verification', function(req, res) {
  //
  //    res.sendFile('/email-verification.html', {title: 'Email verification sent!'})
  //  });

   app.get('/verify', function(req, res) {
        console.log(req.query.authToken);
       User.verifyEmail(req.query.authToken, function(err, existingAuthToken) {
         if(err) console.log('err:', err);
         res.json("Email verified succesfully");
        //  res.render('email-verification.html', { title : 'Email verified succesfully!' });
       });
   });



};











                //send email using send grid
                // var email = new sendgrid.Email({
                //     to:       user.email,
                //     from:     'donotreply.dormshop@gmail.com',
                //     subject:  'Confirm your email',
                //     html:     '<a target=_blank href=\"' + authenticationURL + '\">Confirm your email</a>'
                // });
                //
                // sendgrid.send(email, (err, response) => {
                //       if (err) {
                //         console.log(err);
                //       } else {
                //         res.redirect('/email-verification');
                //       }
                // });


                // var helper = require('sendgrid').mail,
                // from_email = new helper.Email("donotreply.dormshop@gmail.com"),
                // to_email = new helper.Email(user.email),
                // subject = "Confirm your email",
                // content = new helper.Content("text/plain", "Please click on the link to finish your registration with DormShop: " + authenticationURL ),
                // mail = new helper.Mail(from_email, subject, to_email, content);
                //
                // var sg = require('sendgrid')(process.env.SENDGRID_API_KEY);
                // var request = sg.emptyRequest({
                //   method: 'POST',
                //   path: '/v3/mail/send',
                //   body: mail.toJSON()
                // });
                //
                // sg.API(req, function(err, res) {
                //   if(err){
                //     console.log(res.statusCode);
                //     console.log(res.body);
                //     console.log(res.headers);
                //   } else {  res.json('Email verification sent!');}
                //
                //
                // })
                // , function(err, json) {
                // if (err) { return console.error(err); }
                //
                // res.redirect('/email-verification');
  //               // });
  //           });

  //
  // app.get('/email-verification', function(req, res) {
  //     res.render('email-verification', {title: 'Email verification sent!'})
  //   });

  // app.get('/verify', function(req, res) {
  //     User.verifyEmail(req.query.authToken, function(err, existingAuthToken) {
  //       if(err) console.log('err:', err);
  //
  //       res.render('email-verification', { title : 'Email verified succesfully!' });
  //     });
  //   });
  //












// app.post('/api/login', function(req, res, next) {
//   passport.authenticate('local', function(err, user, info) {
//     if (err) {
//       return next(err);
//     }
//     if (!user) {
//       return res.status(401).json({
//         err: info
//       });
//     }
//     req.logIn(user, function(err) {
//       if (err) {
//         return res.status(500).json({
//           err: 'Could not log in user'
//         });
//       }
//
//       var token = Verify.getToken(user);
//               res.status(200).json({
//         status: 'Login successful!',
//         success: true,
//         token: token
//       });
//     });
//   })(req,res,next);
// });
//


// router.get('/api/logout', function(req, res) {
//     req.logout();
//   res.status(200).json({
//     status: 'Bye!'
//   });
// });






// module.exports = router;
