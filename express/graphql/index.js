//CODE REFERENCED FROM WEEK10 GRAPHQL EXAMPLE
const { buildSchema } = require("graphql");
const db = require("../models");

const graphql = {};

graphql.schema = buildSchema(`
    type Users {
    user_id: String,
    email: String,
    firstname: String,
    lastname: String,
    account_created: String,
    profile_pic_url: String
  }

  type Posts {
    post_id: String,
    user_id: String,
    title: String,
    message: String,
    image_url: String,
    timestamp: String,
    replies: [Replies]
  }

  type Replies {
    reply_id: String,
    user_id: String,
    title: String,
    message: String,
    timestamp: String,
  }

  # The input type can be used for incoming data.
  input UserInput {
    user_id: String,
    firstname: String,
    lastname: String,
    email: String
  }

  # Queries (read-only operations).
  type Query {
    all_users: [Users]
    all_posts: [Posts]
    all_replies: [Replies]
    user(user_id: String): Users
  }

  # Mutations (modify data in the underlying data-source, i.e., the database).
  type Mutation {
      update_user(input: UserInput): Users
      delete_user(user_id: String): Boolean
  }
`);

// The root provides a resolver function for each API endpoint.
graphql.root = {
  //QUERIES
  all_users: async () => {
    return await db.users.findAll();
  },
  all_posts: async () => {
    return await db.posts.findAll({
      include: { model: db.replies, as: "replies" },
    });
  },
  all_replies: async () => {
    return await db.replies.findAll({
      include: { model: db.users, as: "user" },
    });
  },
  user: async (args) => {
    return await db.users.findByPk(args.user_id);
  },

  //MUTATIONS
  update_user: async (args) => {
    const user = await db.users.findByPk(args.input.user_id);

    // Update user fields.
    user.firstname = args.input.firstname;
    user.lastname = args.input.lastname;
    user.email = args.input.email;

    await user.save();

    return user;
  },
  delete_user: async (args) => {
    const user = await db.users.findByPk(args.user_id);

    if (user === null) return false;


    // Remove all users posts
    await db.posts.destroy({ where: { user_id: user.user_id } });
    await user.destroy();

    return true;
  },
};

module.exports = graphql;
