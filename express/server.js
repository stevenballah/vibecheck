const express = require("express");
const app = express();
const db = require("./models");
const cors = require("cors");
const PORT = 4000;

//PARSE REQUESTS USING JSON
app.use(express.json());

//ENABLE CORS TO FETCH DATA
app.use(cors())

//SET THE API ROUTE
const usersRoutes = require("./routes/users.routes");
app.use("/api", usersRoutes)

const postsRoutes = require("./routes/posts.routes");
app.use("/api", postsRoutes)

const replyRoutes = require("./routes/replies.routes");
app.use("/api", replyRoutes)

db.sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
  });
});
