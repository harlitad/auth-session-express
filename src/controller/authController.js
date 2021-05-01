const bcrypt = require("bcrypt");
const db = require("../db/models");
const saltRounds = 10;

const authController = {
  register: async (req, res, next) => {
    try {
      const { first_name, password, last_name, email } = req.body;
      const salt = bcrypt.genSaltSync(saltRounds);
      const hash = bcrypt.hashSync(password, salt);
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
      console.error(error);
    }
  },
  login: async (req, res, next) => {
    const { email, password } = req.body;
    try {
      const user = await db.User.findOne({ where: { email } });
      if (user) {
        const checkPassword = bcrypt.compareSync(password, user.password);
        if (checkPassword) {
          return res.json({
            message: "success login!",
            data: {
              email: insertUser.email,
            },
          });
        } else {
          throw new Error("Password doesn't match!");
        }
      } else {
        throw new Error("User not found!");
      }
    } catch (error) {
      return res.json({
        message: error.message,
        data: {
          email,
          password,
        },
      });
    }
  },
};

module.exports = {
  authController,
};
