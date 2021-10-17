import { request, gql } from "graphql-request";

const GRAPH_QL_URL = "http://localhost:4000/graphql";

async function getUsers() {
  //QUERY TO GET ALL USERS
  const query = gql`
    {
      all_users {
        user_id
        email
        firstname
        lastname
        account_created
      }
    }
  `;

  const data = await request(GRAPH_QL_URL, query);

  return data.all_users;
}

async function getPosts() {
  //QUERY TO GET ALL POSTS WITH REPLIES LINKED TO EACH
  const query = gql`
    {
      all_posts {
        post_id
        user_id
        title
        message
        image_url
        timestamp
        replies {
          reply_id
          user_id
          title
          message
          timestamp
        }
      }
    }
  `;

  const data = await request(GRAPH_QL_URL, query);

  return data.all_posts;
}

async function getReplies() {
  //QUERY TO GET ALL POSTS WITH REPLIES LINKED TO EACH
  const query = gql`
    {
      all_replies {
        reply_id
        user_id
        title
        message
        timestamp
      }
    }
  `;

  const data = await request(GRAPH_QL_URL, query);

  return data.all_replies;
}

async function getUser(user_id) {
  const query = gql`
    query ($user_id: String) {
      user(user_id: $user_id) {
        user_id
        email
        firstname
        lastname
        account_created
        profile_pic_url
      }
    }
  `;

  const variables = { user_id };
  const data = await request(GRAPH_QL_URL, query, variables);

  return data.user;
}

async function updateUser(user_id) {
  const query = gql`
    mutation (
      $user_id: String
      $firstname: String
      $lastname: String
      $email: String
    ) {
      update_user(
        input: {
          user_id: $user_id
          firstname: $firstname
          lastname: $lastname
          email: $email
        }
      ) {
        user_id
        firstname
        lastname
        email
      }
    }
  `;

  const variables = user_id;

  const data = await request(GRAPH_QL_URL, query, variables);

  return data.update_user;
}

async function deleteUser(user_id) {
  const query = gql`
    mutation ($user_id: String) {
      delete_user(user_id: $user_id)
    }
  `;

  const variables = { user_id };

  const data = await request(GRAPH_QL_URL, query, variables);

  return data.delete_user;
}

export { getUsers, getPosts, getReplies, getUser, updateUser, deleteUser };
