const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect("YOUR_MONGO_URI");

const User = mongoose.model("User", {
  userId: String,
  history: [String],
  favorites: [String],
  playlist: [String]
});

// SAVE HISTORY
app.post("/history", async (req, res) => {
  const { userId, song } = req.body;

  let user = await User.findOne({ userId });
  if (!user) user = new User({ userId });

  user.history.unshift(song);
  await user.save();

  res.send("ok");
});

app.listen(3000);
