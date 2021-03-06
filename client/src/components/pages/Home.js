import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaEye, FaPen, FaTrash, FaPlus } from "react-icons/fa";
import { Link } from "react-router-dom";
import Pagination from "../Pagination";

const Home = () => {
  const [users, setUser] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    const result = await axios.get(
      "https://candidate-dashboard.herokuapp.com/users"
    );
    // console.log(result.data);
    setUser(result.data);
    // console.log(users);
  };

  const deleteUser = async (id) => {
    await axios.delete(`https://candidate-dashboard.herokuapp.com/users/${id}`);
    loadUsers();
  };
  // get current users
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentUsers = users
    .filter((val) => {
      if (searchTerm == "") {
        return val;
      } else if (val.name.toLowerCase().includes(searchTerm.toLowerCase())) {
        return val;
      }
    })
    .slice(indexOfFirstPost, indexOfLastPost);

  // change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
      <div className="container">
        <div className="py-4">
          <div className="d-flex justify-content-between">
            <div>
              <h1>Employee List</h1>
            </div>
            <form className="form-inline">
              <input
                className="form-control mr-sm-2"
                type="search"
                placeholder="Search"
                onChange={(event) => {
                  setSearchTerm(event.target.value);
                }}
              />
            </form>
            <div>
              <Link className="btn btn-light btn-outline-dark" to="/users/add">
                Add <FaPlus />
              </Link>
            </div>
          </div>

          <table className="table border shadow">
            <thead className="thead-dark">
              <tr>
                <th scope="col">#</th>
                <th scope="col">Name</th>
                <th scope="col">Location</th>
                <th scope="col">Email</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {currentUsers.map((user, index) => (
                <tr key={user.id}>
                  <th scope="row">{index + 1}</th>
                  <td>{user.name}</td>
                  <td>{user.location}</td>
                  <td>{user.email}</td>
                  <td>
                    <Link
                      className="btn btn-outline-primary mr-2"
                      to={`/users/${user.id}`}
                    >
                      <FaEye />
                    </Link>
                    <Link
                      className="btn btn-outline-dark mr-2"
                      to={`/users/edit/${user.id}`}
                    >
                      <FaPen />
                    </Link>
                    <Link
                      className="btn btn-outline-danger"
                      onClick={() => deleteUser(user.id)}
                      to="/"
                    >
                      <FaTrash />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Pagination
          postsPerPage={postsPerPage}
          totalPosts={users.length}
          paginate={paginate}
        />
      </div>
    </div>
  );
};

export default Home;
