import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import EditableText from "../components/EditableText";
import UserControlModal from "../components/UserControlModal";
import Navbar1 from "../components/layouts/Navbar1";
import Footer from "../components/layouts/Footer";

function Control() {
  const [suc, setSuc] = useState(null);
  const [users, setUsers] = useState([]); // State to store users data
  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const navigate = useNavigate();
  axios.defaults.withCredentials = true;

  useEffect(() => {
    axios
      .get("http://localhost:3001/api/control")
      .then((res) => {
        if (res.data === "Success") {
          setSuc("Succeeded OK");
          // Fetch users data if verification succeeds
          axios
            .get("http://localhost:3001/api/import/users")
            .then((res) => {
              setUsers(res.data);
            })
            .catch((err) => {
              console.log("Error fetching users:", err);
            });
        } else {
          navigate("/");
        }
      })
      .catch((err) => {
        console.log(err);
        navigate("/"); // Navigate to the homepage or login page if there's an error
      });
  }, [navigate]);

  const handleCreateUser = () => {
    setSelectedUser(null);
    setShowModal(true);
  };

  const handleSaveUser = (user) => {
    if (selectedUser) {
      axios
        .put(`http://localhost:3001/api/import/users/${selectedUser._id}`, user)
        .then((res) => {
          setUsers(
            users.map((u) => (u._id === selectedUser._id ? res.data : u))
          );
        })
        .catch((err) => {
          console.error("Update user error: ", err);
        });
    } else {
      axios
        .post("http://localhost:3001/api/verify/register", user)
        .then((res) => {
          setUsers([...users, res.data]);
        })
        .catch((err) => {
          console.error("Create user error: ", err);
        });
    }
    setShowModal(false);
  };

  const handleDeleteUser = (id) => {
    axios
      .delete(`http://localhost:3001/api/import/users/${id}`)
      .then(() => {
        setUsers(users.filter((user) => user._id !== id));
      })
      .catch((err) => {
        console.error("Delete user error: ", err);
      });
  };

  const handleUpdateUser = (user) => {
    setSelectedUser(user);
    setShowModal(true);
  };

  return (
    <div>
      <Navbar1 />

      <div className="container bg-light border border-primary border-3 rounded mt-2 mb-2 p-3">
        <button onClick={handleCreateUser} className="btn btn-success mb-3">
          Create User
        </button>
        <table>
          <thead>
            <tr>
              <th>S.no</th>
              <th>User Name</th>
              <th>Email</th>
              <th>User Type</th>
              <th>Service</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user._id}>
                <td>{index + 1}</td>
                <td>
                  <EditableText
                    text={user.name}
                    onSave={(value) => handleSaveUser({ ...user, name: value })}
                  />
                </td>
                <td>
                  <EditableText
                    text={user.email}
                    onSave={(value) =>
                      handleSaveUser({ ...user, email: value })
                    }
                  />
                </td>
                <td>
                  <EditableText
                    text={user.role}
                    onSave={(value) => handleSaveUser({ ...user, role: value })}
                  />
                </td>
                <td>
                  <EditableText
                    text={user.service}
                    onSave={(value) =>
                      handleSaveUser({ ...user, service: value })
                    }
                  />
                </td>
                <td>
                  <button
                    onClick={() => handleUpdateUser(user)}
                    className="btn btn-primary"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => handleDeleteUser(user._id)}
                    className="btn btn-danger ms-2"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Footer />

      <UserControlModal
        show={showModal}
        handleClose={() => setShowModal(false)}
        handleSave={handleSaveUser}
        user={selectedUser}
      />
    </div>
  );
}

export default Control;
