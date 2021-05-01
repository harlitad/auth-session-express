const session = require("express-session");
const parseurl = require("parseurl");
const redis = require('redis')
const redisClient = redis.createClient()
const redisStore = require('connect-redis')(session)

function configSession() {
  return session({
    store: new redisStore({client : redisClient}),
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false, maxAge: 60000 },
  });
}

function checkSession(req, res, next) {
  const {user} = req.session
  if (user) {
    req.user = user
    next(); //If session exists, proceed to page
  } else {
    res.status(404).json({
      message: "Please login !",
    }); //Error, trying to access unauthorized page!
  }
}

function viewsSession(req, res, next) {
  if (!req.session.views) {
    req.session.views = {};
  }
  var pathname = parseurl(req).pathname;
  req.session.views[pathname] = (req.session.views[pathname] || 0) + 1;
  next();
}

module.exports = {
  configSession,
  checkSession,
  viewsSession,
};
