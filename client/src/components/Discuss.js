import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
const Discuss = (id) => {
  const myId = id.id;
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    loadUsers();
  }, []);
  const loadUsers = async () => {
    const result = await axios.get(`http://localhost:3004/review/${myId}`);
    // console.log(result.data);
    setPosts(result.data);
  };

  let history = useHistory();
  const [message, setMessage] = useState({
    content: "",
    time: "",
    id,
  });

  const { content, time } = message;
  const onInputChange = (e) => {
    setMessage({ ...message, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    // e.preventDefault();
    message.time = new Date().toLocaleString();
    // console.log(message);
    await axios.post(`http://localhost:3004/review`, message);
    loadUsers();
    setMessage({
      content: "",
      time: "",
      id,
    });
  };

  return (
    <div>
      <div className="row">
        {posts.map((post, index) => (
          <div className="col-md-6">
            <div
              className="card text-white bg-success mb-3"
              style={{ maxWidth: "25rem" }}
            >
              <div className="card-header">User</div>
              <div className="card-body">
                <h5 className="card-title">{post.post}</h5>
                <p className="card-text">{post.time}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <textarea
        type="text-area"
        className="form-control form-control-lg"
        placeholder="Enter your review"
        name="content"
        value={content}
        onChange={(e) => onInputChange(e)}
      />
      <br />

      <button className="btn btn-secondary " onClick={() => onSubmit()}>
        Post
      </button>
    </div>
  );
};

export default Discuss;
