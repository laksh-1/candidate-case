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
    age,
    location,
  } = user;
  const onInputChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    console.log(JSON.stringify(formFields));
    await axios.post("https://candidate-dashboard.herokuapp.com/users", {
      user,
      formFields,
    });
    // await axios.post("https://candidate-dashboard.herokuapp.com/company", formFields);

    history.push("/");
  };
  const [formFields, setFormFields] = useState([
    { work: "", profile: "", startDate: "", endDate: "" },
  ]);
  const handleFormChange = (event, index) => {
    let data = [...formFields];
    data[index][event.target.name] = event.target.value;
    setFormFields(data);
  };
  const addFields = (e) => {
    e.preventDefault();
    let object = {
      work: "",
      startDate: "",
      endDate: "",
      profile: "",
    };
    setFormFields([...formFields, object]);
  };

  const removeFields = (index) => {
    let data = [...formFields];
    data.splice(index, 1);
    setFormFields(data);
    // console.log(index);
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
          <div>
            {formFields.map((form, index) => {
              return (
                <form key={index}>
                  <div>
                    <label className="form-control form-control-lg">
                      Work Experience :{" "}
                    </label>
                    <input
                      type="text"
                      name="work"
                      className="form-control form-control-lg"
                      placeholder="company name"
                      onChange={(e) => handleFormChange(e, index)}
                      value={form.work}
                    />
                    <br />
                    <div className="row">
                      <div className="col-sm-6">
                        <h4>Start date: </h4>
                        <input
                          type="month"
                          name="startDate"
                          className="form-control form-control-lg"
                          required
                          onChange={(e) => handleFormChange(e, index)}
                          value={form.startDate}
                        />
                      </div>

                      <br />
                      <br />
                      <div className="col-sm-6">
                        <h4>End date: </h4>
                        <input
                          type="month"
                          name="endDate"
                          className="form-control form-control-lg"
                          required
                          onChange={(e) => handleFormChange(e, index)}
                          value={form.endDate}
                        />
                      </div>
                    </div>
                    <br />

                    <h4>Profile: </h4>
                    <input
                      type="text"
                      name="profile"
                      className="form-control form-control-lg"
                      onChange={(e) => handleFormChange(e, index)}
                      value={form.profile}
                    />
                    <br />
                    <button
                      type="button"
                      className="btn btn-danger "
                      onClick={() => removeFields(index)}
                    >
                      Remove
                    </button>
                    <br />
                    <br />
                  </div>
                </form>
              );
            })}
            <button className="btn btn-success " onClick={(e) => addFields(e)}>
              Add
            </button>
            <br />
          </div>
          <br />
          <button className="btn btn-primary btn-block">Add Candidate</button>
        </form>
      </div>
    </div>
  );
};

export default AddUser;
