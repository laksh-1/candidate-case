import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { FaBackward } from "react-icons/fa";
import axios from "axios";
import { FaCloudDownloadAlt } from "react-icons/fa";
const fs = require("fs");

const User = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    age: "",
    location: "",
    experience: "",
    offerInHand: "No",
    handle: "",
    salary: "",
    academics: "",
    company: "",
    startDate: "",
    endDate: "",
    profile: "",
    others: "",
  });
  const { id } = useParams();
  useEffect(() => {
    loadUser();
  }, []);
  var text = "";
  const loadUser = async () => {
    const res = await axios.get(`http://localhost:3004/users/${id}`);
    console.log(res);
    setUser(res.data[0]);
  };
  const download = () => {
    const filename = "Candidate_" + user.name;
    var element = document.createElement("a");
    const text1 = " Name : " + user.name;
    const text2 = " Age : " + user.age;
    const text3 = " Location : " + user.location;
    const text4 = " Expected CTC : " + user.salary;
    const text5 = " Email : " + user.email;
    const text13 = " Skills : " + user.others;
    const text6 = " LinkedIn  : " + user.handle;
    const text7 = " Offer in Hand : " + user.offerInHand;
    const text8 = " Academics : " + user.academics;
    const text9 = " Last Company : " + user.company;
    const text10 = " Profile : " + user.profile;
    const text11 = " Start Date : " + user.startDate;
    const text12 = " End Date : " + user.endDate;

    text = text.concat(
      text1,
      text2,
      text3,
      text4,
      text5,
      text13,
      text6,
      text7,
      text8,
      text9,
      text10,
      text11,
      text12
    );
    element.setAttribute(
      "href",
      "data:text/plain;charset=utf-8," + encodeURIComponent(text)
    );
    element.setAttribute("download", filename);

    element.style.display = "none";
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
  };
  return (
    <div className="container py-4">
      <Link className="btn btn-primary" to="/">
        <FaBackward />
      </Link>
      <FaCloudDownloadAlt
        size="40px"
        className="navbar-nav ml-auto"
        onClick={() => download()}
      />
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
          <b>Age:</b> {user.age}
        </li>
        <li className="list-group-item">
          <b>Location:</b> {user.location}
        </li>
        <li className="list-group-item">
          <b>LinkedIn Handle:</b> {user.handle}
        </li>
        <li className="list-group-item">
          <b>Skills:</b> {user.others}
        </li>
        <li className="list-group-item">
          <b>Academics:</b> {user.academics}
        </li>
        <li className="list-group-item">
          <b>Offer In Hand:</b> {user.offerInHand}
        </li>
        <li className="list-group-item">
          <b>Last Company:</b> {user.company}
        </li>
        <li className="list-group-item">
          <b>Profile:</b> {user.profile}
        </li>
        <li className="list-group-item">
          <b>Start Date:</b> {user.startDate}
        </li>
        <li className="list-group-item">
          <b>End Date:</b> {user.endDate}
        </li>
      </ul>
    </div>
  );
};

export default User;
