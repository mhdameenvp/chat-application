const express = require("express");
const cors = require("cors");
const axios = require("axios");
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors({ origin: true }));

app.post("/authenticate", async (req, res) => {
  const { username } = req.body;
  try {
    const response = await axios.put(
      'https://api.chatengine.io/users/',
      {
        username: username,
        secret: username, 
        first_name: username
      },
      { headers: { "private-key": process.env.CHAT_ENGINE_PRIVATE_KEY } }
    );
    return res.status(response.status).json(response.data);
  } catch (error) {
    if (error.response) {
      return res.status(error.response.status).json(error.response.data);
    } else {
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  }
});

app.listen(3001, () => {
  console.log("Server is running on port 3001");
});
