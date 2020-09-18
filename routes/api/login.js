const express = require('express');
const router = express.Router();
const jwtDecode = require('jwt-decode');

const User = require('../../models/User');
const { createToken, verifyPassword } = require('./util')

router.get('/', async (req, res) => {
  try {
    const users = await User.estimatedDocumentCount();
    if(!users) res.json({ message: '0' });
    res.status(200).json({ users });
  } catch (error) {
    res.status(400).json({ message: 'Unable to fetch users' })
  }
})

router.post('/', async (req, res) => {
    try {
      const { email, password } = req.body;
  
      const user = await User.findOne({
        email
      }).lean();
  
      if (!user) {
        return res.status(403).json({
          message: 'Wrong email or password.'
        });
      }
  
      const passwordValid = await verifyPassword(
        password,
        user.password
      );
  
      if (passwordValid) {
        const { password, ...rest } = user;
        const userInfo = Object.assign({}, { ...rest });

        const token = createToken(userInfo);

        const decodedToken = jwtDecode(token);
        console.log(decodedToken);
        const expiresAt = decodedToken.exp;
  
        res.cookie('token', token, {
          httpOnly: true
        })
  
        res.json({
          message: 'Authentication successful!',
          userInfo,
          expiresAt
        });
      } else {
        res.status(403).json({
          message: 'Wrong email or password.'
        });
      }
    } catch (err) {
      console.log(err);
      return res
        .status(400)
        .json({ message: 'Something went wrong.' });
    }
  });

module.exports = router;