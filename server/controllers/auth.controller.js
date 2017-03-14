import jwt from 'jsonwebtoken';
import config from '../config/env';

/**
 * Returns jwt token if valid username and password is provided
 * @param req
 * @param res
 * @param next
 * @returns {*}
 */
function login (req, res, next) {
  // Ideally you'll fetch this from the db
  // Idea here was to show how jwt works with simplicity
  const { user } = req;
  jwt.sign(user, config.jwtSecret, { expiresIn: '1h' }, (err, token) => {
    if (err) {
      console.error(`Error with login: ${err}`);
      res.status(400).json({ success: false, message: 'Failed' });
      return;
    }

    res.status(200).json({ success: true, user, token });
  });
}

/**
 * This is a protected route. Will return random number only if jwt token is provided in header.
 * @param req
 * @param res
 * @returns {*}
 */
function getRandomNumber (req, res) {
  // req.user is assigned by jwt middleware if valid token is provided
  return res.json({
    num: Math.random() * 100
  });
}

export default { login, getRandomNumber };
