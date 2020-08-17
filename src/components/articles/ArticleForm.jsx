import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";

const ArticleForm = ({ history }) => {
  const [values, setValues] = useState(null);
  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("/articles", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    })
      .then((res) => {
        if (res.ok) {
          alert("Article successfully created");
          return res.json().then((article) => {
            history.push(`/articles/${article._id}`);
          });
        }
      })
      .catch((error) => alert(error));
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            placeholder="Title of your article..."
            required={true}
            onChange={(e) => setValues({ ...values, title: e.target.value })}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Text</Form.Label>
          <Form.Control
            as="textarea"
            rows="5"
            placeholder="Text for your article..."
            required={true}
            onChange={(e) => setValues({ ...values, text: e.target.value })}
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </>
  );
};

export default ArticleForm;
