const express = require('express');
const router = express.Router();
const Request = require('./../models/Request')
const {jwtAuthMiddleWare, generateToken} = require('./../jwt');

router.post('/request', async (req, res) => {
    try{

        const request = req.body;
        const newRequest = new Request(request);
        const response = await newRequest.save();
        
        console.log(response);
    
        res.status(200).json({message: "Request sent successfully"});
    }catch(err){
        console.log(err);
        res.status(500).json({error: err})
    }
})
router.get('/request', jwtAuthMiddleWare, async (req, res) => {
  try {
    const hospitalId = req.user.id; // from JWT

    const requests = await Request.find({ hospitalId });

    if (!requests || requests.length === 0) {
      return res.status(404).json({ message: "No requests found" });
    }

    res.status(200).json({
      message: "Requests fetched successfully",
      response: requests
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
});


module.exports = router;