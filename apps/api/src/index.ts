import express from "express";

const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send("SomMhai is up! 🚀");
});

app.listen(port, () => {
  console.log(`SomMhai app listening on port ${port}`);
});
