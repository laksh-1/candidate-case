import React, { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

const AddUser = () => {
  let history = useHistory();
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

  const {
    name,
    email,
    experience,
    others,
    academics,
    handle,
    salary,
    offerInHand,
    company,
    profile,
    startDate,
    endDate,
    age,
    location,
  } = user;
  const onInputChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:3004/users", user);
    history.push("/");
  };
  return (
    <div className="container">
      <div className="w-75 mx-auto shadow p-5">
        <h2 className="text-center mb-4">Add A Candidate</h2>
        <form onSubmit={(e) => onSubmit(e)}>
          <div className="form-group">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Enter Your Name"
              name="name"
              value={name}
              onChange={(e) => onInputChange(e)}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Enter Your Age"
              name="age"
              value={age}
              onChange={(e) => onInputChange(e)}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Enter Your Current Location"
              name="location"
              value={location}
              onChange={(e) => onInputChange(e)}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Enter Your Expected CTC (in Lakhs)"
              name="salary"
              value={salary}
              onChange={(e) => onInputChange(e)}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="email"
              className="form-control form-control-lg"
              placeholder="Enter Your E-mail Address"
              name="email"
              value={email}
              onChange={(e) => onInputChange(e)}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Enter Your Experience in years"
              name="experience"
              value={experience}
              onChange={(e) => onInputChange(e)}
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Enter your Skills"
              name="others"
              value={others}
              onChange={(e) => onInputChange(e)}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Academics"
              name="academics"
              value={academics}
              onChange={(e) => onInputChange(e)}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Enter Your LinkedIn Handle"
              name="handle"
              value={handle}
              onChange={(e) => onInputChange(e)}
            />
          </div>
          <div className="form-group">
            <label className="form-control form-control-lg">
              Offer in hand{" "}
            </label>
            <select
              name="offerInHand"
              value={offerInHand}
              className="form-control form-control-lg"
              onChange={(e) => onInputChange(e)}
              required
            >
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Enter Your last Company"
              name="company"
              value={company}
              onChange={(e) => onInputChange(e)}
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Enter Your Profile for above"
              name="profile"
              value={profile}
              onChange={(e) => onInputChange(e)}
            />
          </div>
          <div className="form-group">
            <label className="form-control form-control-lg">Start Date </label>
            <br />
            <input
              type="month"
              className="form-control form-control-lg"
              placeholder="Academics"
              name="startDate"
              value={startDate}
              onChange={(e) => onInputChange(e)}
            />
          </div>
          <div className="form-group">
            <label className="form-control form-control-lg">End Date </label>

            <input
              type="month"
              className="form-control form-control-lg"
              name="endDate"
              value={endDate}
              onChange={(e) => onInputChange(e)}
            />
          </div>
          <button className="btn btn-primary btn-block">Add Candidate</button>
        </form>
      </div>
    </div>
  );
};

export default AddUser;
