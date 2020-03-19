import React from "react";

function Users({ users }) {
  return (
    <div className="createdUsers">
      {users.map(user => {
        return (
          <div key={user.id} className="user">
            <p>{user.name}</p>
            <p>{user.email}</p>
          </div>
        );
      })}
    </div>
  );
}

export default Users;
