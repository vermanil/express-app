import express from 'express';
var router = express.Router();

import { sign, verify } from 'jsonwebtoken';


/**
 * This function returns a signed JWT token based on the given username and Password
 * @name Login
 * @param {object} req body contains username and password
 * @param {object} res contains the output json with token
 * @param {function} next
 * @return {json} signed JWT token, {token: JWT_TOKEN}
 */

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

/**
 * Token Verification
 * @name verify Token
 * @param {object} req contains headers
 * @param {object} res contains the decoded username and password
 * @param {function} next
 */
//
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
