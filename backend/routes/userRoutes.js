const express = require('express');
const router = express.Router();
const User = require('./../models/User');
const Rating = require('./../models/Rating')
const {jwtAuthMiddleWare, generateToken} = require('./../jwt');

router.post('/signup', async (req,res) => {
    try{
        const data = req.body;
        const newUser = new User(data); //object bana liya
        const response = await newUser.save();
        console.log('data saved');

        const payload = {
            id: response.id
        }
        console.log(JSON.stringify(payload));
        const token = generateToken(payload);
        console.log("Token is: " , token);

        res.status(200).json({response: response, token: token});
    }catch(err){
        console.log(err)
        res.status(500).json({error: "internal server error"});
    }
})

router.post('/login', async (req, res) => {
    try{
        const {email, password} = req.body;
        console.log("Login attempt:", email, password);
        //finding the given username in the User Model.
        const user = await User.findOne({email: email});
        console.log("Login attempt:", email, password);

        if(!user || !(await user.comparePassword(password))){
            console.log(password, user)
           return res.status(401).json({error: 'Invalid username or password'});
        }
        const payload = {
            id : user.id,
        }
        const token = generateToken(payload);
        console.log("Token is: ", token);
        res.status(200).json({token: token, message:"login successfully"});
    }catch(err){
        res.status(500).json({error: "internal server error"});

    }
})

router.get('/profile',jwtAuthMiddleWare,async (req, res) => {
    try{
        const userData = req.user;
        const userId = userData.id;
        const user = await User.findById(userId);
        if(!user){
            return res.status(404).json({error: 'User not found'});
        }
        res.status(200).json({user});

    }catch(err){
        res.status(500).json({error: 'Internal server Error'});

    }
})

router.put('/profile/password', jwtAuthMiddleWare, async (req, res) => {
    //extracting the id from the token.
    try{
        const userId = req.user;
    const {currentPassword, newPassword} = req.body;

    const user = await User.findById(userId);

    if(!(await user.comparePassword(currentPassword))){
        return res.status(500).json({error: 'Incorrect passwrod'});
    }
    user.password = newPassword;
    await user.save();

    res.status(200).json({message: "Password Updated"});
    }
    catch(err){
        res.status(500).json({error: "internal Server Error"});
    }
})

router.post('/rating', async (req, res) => {
    try{

        const rating = req.body;
        const userId = req.user.id;
        const newRating = new Rating(rating);
        newRating.userID = userId;
        const response = await newRating.save();
        
        console.log(response);
    
        res.status(200).json({message: "Successfully Rated"});
    }catch(err){
        console.log(err);
        res.status(500).json({error: err})
    }
})



module.exports = router;