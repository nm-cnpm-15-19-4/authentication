const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const account = require('../models/account.model');
const info = require('../models/info.model');
const tokenSchema = require('../models/token.model');
const nodemailer = require("nodemailer");
const { cookie } = require("express/lib/response");

const saltRound = 10;

exports.register = async (req,res) => {
    console.log(req.body)
    const name = req.body.name1;
    const email = req.body.email1;
    const password = req.body.password1;
    if (!name)
    {
        return res.render('Login',{message: 'Invalid name!'});
    }
    if (!password || password.length < 6 )
    {
        return res.render('Login',{message: 'Invalid password! Please enter password more than 6 characters.'});
    }
    
    let isExist = await account.findOne({email});
    if(isExist) 
    {
        return res.render('Login',{message: 'Email already taken!'});
    }
    else
    {
        const encryptPass = await bcrypt.hash(password, saltRound)
        
        try{
            const id = await bcrypt.hash(email, saltRound)
            const registerUser = new account({
            id:id,
            email,
            password: encryptPass,
            role:"Student",
            })
            await registerUser.save()
            return res.render('Login',{message: 'User account created successfully! Please login.'})
        
        }catch(err){
            res.json({message: err.message})
        }
    }
    
}


exports.login = async (req,res) => {
    const email = req.body.email;
    const password = req.body.password;
    const user = await account.findOne({email})
    if(!user) 
    {
        return res.render('Login',{message: 'User not found!'});
    }
    let token = undefined;
    if(await bcrypt.compare(password,user.password)){
        /// generate access token
        token = jwt.sign({email: email}, process.env.KEY, {expiresIn: 3600})
        res.cookie('auth',token);
        // res.status(201).json({
        //     message: 'Authorization successful',
        //     token: token
        // })
        const userToken = new tokenSchema({
        id:user.id,
        token,
        })
        
        try{
            await userToken.save()
        
        }catch(err){
            res.json({message: err.message})
        }
    }
    else
    {
        return res.render('Login',{message: 'Invalid password!'});
    }
    //res.setHeader('Authorization', 'Bearer '+ token);
    res.redirect('/profile');
};

exports.forgotpassword = async (req,res) => {
    const email = req.body.email;
    const user = await account.findOne({email});
    if(!user) 
    {
        return res.status(401).json({message: 'Invalid email!'});
    }

    const secret = process.env.KEY + user.password;
    const payload = {
        email:user.email
    }

    const token = jwt.sign(payload,secret,{expiresIn: '10m'})

    let transporter = nodemailer.createTransport({
        host: "gmail.com",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
          user: 'noreply.nmcnpm@gmail.com', // generated ethereal user
          pass: '123abcd!', // generated ethereal password
        },
    });
    
    let info = await transporter.sendMail({
        from: "Educ", // sender address
        to: user.email, // list of receivers
        subject: "Reset Password", // Subject line
        //text: "You're receiving this e-mail because you requested a password reset for your account. Please click the link: {", // plain text body
        html: `<h3>You're receiving this e-mail because you requested a password reset for your account. Please click the following link.
            </h3> <p>${process.env.URL}/resetpassword/$token</p>`, // html body
    });
    transporter.sendMail(info, (error,info) => {
        if(error)
            return res.status(404);

        console.log("Message sent: %s", info.messageId);
        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

        return res.status(201).json({message: "Sent"});
    })

}

exports.profile = async (req,res) => {
    const token = req.cookies.auth;
    const userToken = await tokenSchema.findOne({token});
    const id = userToken.id;
    //console.log(userInfo)
    //res.json({data:userInfo});
    res.render('Student', {layout: 'student.hbs'});
}

exports.logout = async (req,res) => {
    const token = req.cookies.auth;
    const userToken = await tokenSchema.findOneAndDelete({token:token});
    res.redirect('/');

}