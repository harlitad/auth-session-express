const express = require("express");
const { routerAuth } = require("./src/route/auth");
const app = express();
const port = process.env.PORT || 3000;
const router = express.Router()
console.log()
app.use(express.json());
router.use("/auth", routerAuth);
app.use("/api/v1", router);
app.get("/", (req, res, next) => {
  res.json({
    message: "welcome !",
  });
});

app.listen(port, () => console.log(`app run in localhost:${port}`));
