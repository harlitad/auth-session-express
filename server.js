const express = require("express");
const { routerAuth } = require("./src/route/auth");
const { routerUser } = require("./src/route/user");
const app = express();
const port = process.env.PORT || 3000;
const router = express.Router();
const {
  checkSession,
  viewsSession,
  configSession,
} = require("./src/middleware/session");

app.use(express.json());
app.use(configSession());
app.use(viewsSession);

router.use("/auth", routerAuth);
router.use("/profile", checkSession, routerUser);
app.use("/api/v1", router);
app.get("/", (req, res, next) => {
  res.json({
    message: "welcome !",
  });
});

app.listen(port, () => console.log(`app run in localhost:${port}`));
