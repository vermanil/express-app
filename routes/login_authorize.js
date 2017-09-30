import express from 'express';
var router = express.Router();

import { sign, verify } from 'jsonwebtoken';



//returns a signed JWT token based on given username and password

router.post('/login', function(req, res, next) {
  if (typeof req.body.username == 'undefined')
  {
      res.status(400);
      res.send("Missing username fields");
  }
  else if(typeof req.body.password == 'undefined') {
      res.status(400);
      res.send("Missing password fields");
  }
  else {
      var token = sign({ 'username': req.body.username, 'password': req.body.password }, 'anil');
      res.status(200);
      res.json({token: token});
  }
});


// this is for verify the token
router.post('/authorize', function (req, res, next) {
    if(req.headers && req.headers.authorization)
    {
        var token = req.headers.authorization;
        verify(token, "anil", function (err, decoded) {
            if(err) {
                res.status(500);
                res.send("Invalid signature");
            }
            else {
                res.status(200);
                res.json({'username': decoded.username, 'password': decoded.password});
            }
        })
    }
    else{
        res.status(500);
        res.send("Headers not found");
    }
   // console.log(req.headers);
   // console.log(req.headers.authorization);
});

module.exports = router;
