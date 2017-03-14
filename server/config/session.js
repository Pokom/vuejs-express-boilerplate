import session from 'express-session';
import uuid from 'uuid';

module.exports = function (app, config) {
  const sess = session({
    secret: 'keyboard cat',
    genid: () => {
      return uuid();
    },
    resave: true,
    saveUninitialized: false
  });

  if (config.env === 'production') {
    app.set('trust proxy', 1);
    sess.cookie.secure = true;
  }

  return sess;
};
