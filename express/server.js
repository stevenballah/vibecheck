const express = require("express");
const { graphqlHTTP } = require("express-graphql");

const app = express();
const db = require("./models");
const graphql = require("./graphql");

const cors = require("cors");
const PORT = 4000;

//PARSE REQUESTS USING JSON
app.use(express.json());

//ENABLE CORS TO FETCH DATA
app.use(cors())

// Add GraphQL to express server.
// NOTE: You can use the GraphQL web-interface to test the GraphQL schema thanks to the graphiql parameter being true.
// Access the web-interface when the server is running here: http://localhost:4000/graphql
app.use(
  "/graphql",
  graphqlHTTP({
    schema: graphql.schema,
    rootValue: graphql.root,
    graphiql: true
  })
);

//SET THE API ROUTE
const usersRoutes = require("./routes/users.routes");
app.use("/api", usersRoutes)

const postsRoutes = require("./routes/posts.routes");
app.use("/api", postsRoutes)

const replyRoutes = require("./routes/replies.routes");
app.use("/api", replyRoutes)

const postRatingRoutes = require("./routes/post_rating.routes");
app.use("/api", postRatingRoutes)

const followingRoutes = require("./routes/follow.routes");
app.use("/api", followingRoutes)


db.sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
  });
});
