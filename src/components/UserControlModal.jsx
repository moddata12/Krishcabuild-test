import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";

function UserControlModal({ show, handleClose, handleSave, user }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "",
    service: "",
    password: "",
  });

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        email: user.email || "",
        role: user.role || "",
        service: user.service || "",
        password: "",
      });
    } else {
      setFormData({ name: "", email: "", role: "", service: "", password: "" });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const onSave = () => {
    handleSave(formData);
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{user ? "Update User" : "Create User"}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group>
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Role</Form.Label>
            <Form.Control
              type="text"
              name="role"
              value={formData.role}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Service</Form.Label>
            <Form.Control
              type="text"
              name="service"
              value={formData.service}
              onChange={handleChange}
            />
          </Form.Group>
          {!user && (
            <Form.Group>
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
              />
            </Form.Group>
          )}
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={onSave}>
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default UserControlModal;
