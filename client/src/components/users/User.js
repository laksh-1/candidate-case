import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

const User = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    experience: "",
    others: ""
  });
  const { id } = useParams();
  useEffect(() => {
    loadUser();
  }, []);
  const loadUser = async () => {
    const res = await axios.get(`http://localhost:3004/users/${id}`);
    console.log(res);
    setUser(res.data[0]);
  };
  return (
    <div className="container py-4">
      <Link className="btn btn-primary" to="/">
        back to Home
      </Link>
      <h1 className="display-4">User Id: {id}</h1>
      <hr />
      <ul className="list-group w-50">
        <li className="list-group-item">
          <b>Name:</b> {user.name}
        </li>
        <li className="list-group-item">
          <b>Email:</b> {user.email}
        </li>
        <li className="list-group-item">
          <b>Experience:</b> {user.experience}
        </li>
        <li className="list-group-item">
          <b>Others:</b> {user.others}
        </li>
      </ul>
    </div>
  );
};

export default User;
