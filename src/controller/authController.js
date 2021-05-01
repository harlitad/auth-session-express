const bcrypt = require("bcrypt");
const db = require("../db/models");
const saltRounds = 10;

const authController = {
  register: async (req, res, next) => {
    try {
      const { first_name, password, last_name, email } = req.body;
      const salt = bcrypt.genSaltSync(saltRounds);
      const hash = bcrypt.hashSync(password, salt);
      const checkEmail = await db.User.findOne({where : {email}})
      if(checkEmail){
        throw new Error("email exist, register with another email !")
      }
      const insertUser = await db.User.create({
        first_name,
        password: hash,
        last_name,
        email,
      });
      return res.json({
        message: "success register!",
        data: {
          email: insertUser.email,
        },
      });
    } catch (error) {
      res.status(500).json({
        message : error.message,
      })
    }
  },
  login: async (req, res, next) => {
    const { email, password } = req.body;
    try {
      const user = await db.User.findOne({ where: { email } });
      if (user) {
        const checkPassword = bcrypt.compareSync(password, user.password);
        if (checkPassword) {
          req.session.user = {
            id: user.id,
            email: user.email,
            first_name: user.first_name,
            last_name: user.last_name,
          };
          return res.json({
            message: "success login!",
            data: {
              email: user.email,
            },
          });
        } else {
          throw new Error("Password doesn't match!");
        }
      } else {
        throw new Error("User not found!");
      }
    } catch (error) {
      res.status(403);
      return res.json({
        message: error.message,
      });
    }
  },
  logout: async (req, res, next) => {
    if (req.session.user !== undefined) {
      req.session.destroy();
      return res.json({
        message: "user logged out !",
      });
    } else {
      return res.json({
        message: "you already logged out !",
      });
    }
  },
};

module.exports = {
  authController,
};
