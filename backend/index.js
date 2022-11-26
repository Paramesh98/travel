const express = require("express");
var cors = require("cors");

const mongoose = require("mongoose");
const Detail = require("./schema");

const url = `mongodb+srv://param:param@cluster0.1yguy.mongodb.net/travel?retryWrites=true&w=majority`;

const connectionParams = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};
mongoose
  .connect(url, connectionParams)
  .then(() => {
    console.log("Connected to the database ");
  })
  .catch((err) => {
    console.error(`Error connecting to the database. ${err}`);
  });

const router = express.Router();

const app = express();
app.use(cors());
const port = process.env.PORT || 5000;
app.use(express.json());

app.get("/", (req, res) => {
  res.send("hello");
});

app.post("/detail", (req, res) => {
  const { name, email, budget, destination, travellers } = req.body;
  if (!name || !email || !budget || !destination || !travellers) {
    return res.status(400).json({ message: "Please provide all the details" });
  }
  try {
    const detail = new Detail({ ...req.body });
    detail.save().then(() => {
      return res.status(200).json({ message: "Successfully saved" });
    });
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
});

app.get("/detail", async (req, res) => {
  try {
    const details = await Detail.find({});
    if (details.length > 0) {
      return res.status(200).json({
        data: details,
      });
    } else {
      return res.status(404).json({
        message: "No data found",
      });
    }
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
});

app.listen(port, () => {
  console.log("Server is up on port " + port);
});
