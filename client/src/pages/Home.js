import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';
const Home = () => {
  const [users, setUsers] = useState([]);
  const [reRender, setReRender] = useState(false);
  const [input, setInput] = useState({
    name: "",
    email: "",
    age: "",
  })
  useEffect(() => {
    const getAllUserData = async () => {
      const res = await axios.get("http://localhost:8000/api/v1/users");
      setUsers(res.data);
      setInput({
        name: "",
        email: "",
        age: ""
      })
    }
    getAllUserData();
  }, [reRender]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:8000/api/v1/users", input);
    setReRender(true);
  };
  // handle delete 
  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:8000/api/v1/users/${id}`);
    const userAfterDelete = users.filter((item) => {
      return item._id !== id;
    });
    setUsers(userAfterDelete);
  };
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div style={{ backgroundColor: "gray" }}>
              <h1 className="text-white text-center mt-2"> MERN CURD </h1>
            </div>
          </div>
          <div className="col-md-6">
            <form onSubmit={handleSubmit}>
              <div class="mb-3">
                <label for="exampleInputEmail1" class="form-label">Name</label>
                <input
                  name="name"
                  value={input.name}
                  onChange={(e) => setInput({ ...input, [e.target.name]: e.target.value })}
                  type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />

              </div>
              <div class="mb-3">
                <label for="exampleInputPassword1" class="form-label">Email</label>
                <input
                  name="email"
                  value={input.email}
                  onChange={(e) => setInput({ ...input, [e.target.name]: e.target.value })}
                  type="email" class="form-control" id="exampleInputPassword1" />
                <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
              </div>
              <div class="mb-3">
                <label for="exampleInputPassword1" class="form-label">Age</label>
                <input
                  name="age"
                  value={input.age}
                  onChange={(e) => setInput({ ...input, [e.target.name]: e.target.value })}
                  type="number" class="form-control" id="exampleInputPassword1" />
              </div>

              <button type="submit" class="btn btn-primary">Submit</button>
            </form>

          </div>
          <div className="col-md-6">
            <table class="table">
              <thead>
                <tr>
                  <th scope="col">Name</th>
                  <th scope="col">Email</th>
                  <th scope="col">Age</th>
                  <th scope="col">Edit</th>
                  <th scope="col">Delete</th>
                </tr>
              </thead>
              <tbody>
                {
                  users && users.map((user) => {
                    return (
                      <tr key={user._id}>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                        <td>{user.age}</td>
                        <td>
                          {/* <Link to={`/edit/${user._id`}><button className="btn btn-primary">Edit</button> </Link> */}
                          <Link to={`/edit/${user._id}`}><button className="btn btn-primary">Edit</button></Link>
                        </td>
                        <td><button onClick={() => handleDelete(user._id)} className="btn btn-danger">Delete</button></td>
                      </tr>
                    )
                  })
                }


              </tbody>
            </table>
          </div>
        </div>
      </div>

    </>
  )
}

export default Home