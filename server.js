const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

app.get("/", (req, res, next) => {
  res.json({
    message: "welcome !",
  });
});

app.listen(port, () => console.log(`app run in localhost:${port}`));
