

const express = require('express');
const router = express.Router();
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const config = require('../config/database');
const passport =require('passport');

router.post("/register",function (req,res){
    console.log(req.body);


    const newUser = new User({

        username:req.body.username,
        email:req.body.email,
        password:req.body.password,
        passwordrepeat:req.body.passwordrepeat,
    });

    User.saveUser(newUser,function (err,user) {
        if(err){
            res.json({state:false,msg:"data not inserted"});
        }
        if(user){
            res.json({state:true,msg:"data  inserted"});
        }

    });
});

router.post("/login",function (req,res){

    const email = req.body.email;
    const password = req.body.password;

    console.log(email);
    console.log(password);

    User.findByEmail(email,function (err,user) {
        if(err) throw err;

        if (!user){
            res.json({state:false,msg:"No user found"});
            return false;

        }

        User.passwordCheck(password,user.password,function (err,match) {
            if (err) throw  err;

            if (match){
                const profile = {
                    id:user._id,
                    username:user.username,
                    email:user.email
                };

                const token = jwt.sign(profile, config.secret,{expiresIn:86400*3});
                res.json(
                    {
                        state:true,
                        token:"JWT " + token,
                        user:profile
                    }
                    )
            }else {
                res.json({state:false,msg:"password does not match"});
            }

        });

    });


});


router.get('/locations', passport.authenticate('jwt', { session: false}), function(req, res) {
        res.json({user:req.user});
    }
);



module.exports = router;
