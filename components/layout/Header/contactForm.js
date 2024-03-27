// ContactForm.js
import { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your form submission logic here
    console.log('Form submitted:', formData);
    // You can send the form data to your server or perform other actions
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="formName">
        <Form.Label style={{ width:"100%", textAlign:"left" }}>Name</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter your name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </Form.Group>

      <Form.Group controlId="formEmail">
        <Form.Label style={{ width:"100%", textAlign:"left" }}>Email address</Form.Label>
        <Form.Control
          type="email"
          placeholder="Enter your email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </Form.Group>

      <Form.Group controlId="formMessage">
        <Form.Label style={{ width:"100%", textAlign:"left" }}>Message</Form.Label>
        <Form.Control
          as="textarea"
          rows={4}
          placeholder="Enter your message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          required
        />
      </Form.Group>

      <Button variant="primary" style={{ marginTop:"10px" }} type="submit">
        Submit
      </Button>
    </Form>
  );
};

export default ContactForm;
