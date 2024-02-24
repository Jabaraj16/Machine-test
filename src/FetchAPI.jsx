import React, { useState, useEffect } from "react";
import axios from "axios";

function FetchAPI() {
  const [users, setUsers] = useState([]);
  const [nameSearchkey, setSearchkey] = useState("");
  const [showKilcooleUsers, setShowKilcooleUsers] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    try {
      const response = await axios.get("https://fakestoreapi.com/users");
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const filteredUsers = users.filter((user) =>
    user.name.firstname.toLowerCase().includes(nameSearchkey.toLowerCase())
  );

  const kilcooleUsers = showKilcooleUsers
    ? filteredUsers.filter((user) => user.address.city === "kilcoole")
    : filteredUsers;
console.log(filteredUsers);
  return (
    <div className="container">
      <h1 className="text-center ">Users</h1>
      <div className="d-flex justify-content-between align-items-center ">
        <input
          onChange={(e) => setSearchkey(e.target.value)}
          type="text"
          className="p-2 rounded-2 m-2 "
          placeholder="Search user By First Name"
        />
       
      </div>
      <button
          onClick={() => setShowKilcooleUsers(!showKilcooleUsers)}
          className={`btn btn-success p-2 ${showKilcooleUsers ? "active" : ""}`}
        >
          {showKilcooleUsers ? "All Users" : "Users in Kilcoole"}
        </button>
      <table className="table  table-striped table-hover p-3 shadow-lg ">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Full Name</th>
            <th scope="col">Email</th>
            <th scope="col">Phone Number</th>
            <th scope="col">Street</th>
            <th scope="col">City</th>
          </tr>
        </thead>
        <tbody>
          {kilcooleUsers.map((user, index) => (
            <tr key={index}>
              <td>{user.id}</td>
              <td>
                {user.name.firstname} {user.name.lastname}
              </td>
              <td>{user.email}</td>
              <td>{user.phone}</td>
              <td>{user.address.street}</td>
              <td>{user.address.city}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default FetchAPI;