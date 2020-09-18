const express = require('express');
const router = express.Router();
const jwtDecode = require('jwt-decode');

const User = require('../../models/User');
const { createToken, hashPassword } = require('./util')

router.post('/', async (req, res) => {
    try {
      const { email, firstName, lastName } = req.body;
  
      const hashedPassword = await hashPassword(
        req.body.password
      );
  
      const userData = {
        email: email.toLowerCase(),
        firstName,
        lastName,
        password: hashedPassword
      };
  
      const existingEmail = await User.findOne({
        email: userData.email
      });
  
      if (existingEmail) {
        return res
          .status(400)
          .json({ message: 'Email already exists' });
      }
  
      const newUser = new User(userData);
      const savedUser = await newUser.save();

      if (savedUser) {
        const token = createToken(savedUser);
        const decodedToken = jwtDecode(token);
        const expiresAt = decodedToken.exp;

        const {
          firstName,
          lastName,
          email,
        } = savedUser;
  
        const userInfo = {
          firstName,
          lastName,
          email,
        };
  
        res.cookie('token', token, {
          httpOnly: true
        })
  
        return res.json({
          message: 'User created!',
          userInfo,
          expiresAt
        });
      } else {
        return res.status(400).json({
          message: 'There was a problem creating your account'
        });
      }
    }
    catch (err) {
      return res.status(400).json({
        message: 'There was a problem creating your account'
      });
    }
  });

module.exports = router;