import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getUsers, deleteUser } from "../data/repository";
import dateformat from "dateformat";

export default function UserTables() {
  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState("");

  //FORMAT THE DATE FROM DATABASE
  function formatDate(date) {
    const formatDate = dateformat(date, "mmmm dS, yyyy - h:MM TT");
    return formatDate;
  }

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    const allUsers = await getUsers();
    setUsers(allUsers);
  };

  const handleDelete = async (user_id) => {
    if (!window.confirm(`Are you sure you want to delete ${user_id} ?`)) return;

    const isDeleted = await deleteUser(user_id);

    if (isDeleted) {
      //refresh users
      await loadUsers();

      setMessage(
        <>
          <strong>{user_id}</strong> has been deleted successfully.
        </>
      );
    }
  };

  return (
    <div className="container-fluid mt-4">
      <div className="jumbotron jumbotron-fluid rounded">
        <div className="container">
          <h1 className="display-4">Users Table</h1>
          <p className="lead">All users registered to VibeCheck</p>
        </div>
      </div>

      <div className="rounded">
        <table className="table table-hover table-light">
          <thead>
            <tr>
              <th>User ID</th>
              <th>Email</th>
              <th>Name</th>
              <th>Account Created</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.email}>
                <td>{user.user_id}</td>
                <td>{user.email}</td>
                <td>
                  {user.firstname} {user.lastname}
                </td>
                <td>
                  {formatDate(new Date().toISOString(user.account_created))}
                </td>
                <td>
                  <Link
                    className="btn btn-primary"
                    to={`/Tables/users/edit/${user.user_id}`}
                  >
                    Manage
                  </Link>
                </td>
                <td>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDelete(user.user_id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
