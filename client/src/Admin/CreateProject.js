import { Divider } from "@mui/material";

import React, { useState } from "react";

import { useDispatch, useSelector } from "react-redux";

import { useNavigate } from "react-router-dom";

import axios from "axios";

import { toast } from "react-toastify";

import { Button, Form } from "react-bootstrap";

import Typewriter from "typewriter-effect";

import { addProject } from "../slices/projectSlice";

function CreateProject() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const status = useSelector((state) => state.projects.status);

  const [title, setTitle] = useState("");
  const [descriptions, setDescription] = useState("");
  const [technologies, setTechnologies] = useState("");
  const [image, setImage] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Create a FormData object to send the form data to the server
    const formData = new FormData();
    formData.append("title", title);
    formData.append("descriptions", descriptions);
    formData.append("technologies", technologies);
    formData.append("image", image);

    // Log the FormData to the console for debugging
    console.log(formData);

    // Send a POST request to the server with the FormData
    axios
      .post("http://localhost:2000/projects", formData)
      .then((res) => {
        // Handle the successful response from the server
        dispatch(addProject(res.data));
        toast.success("Project Added Successfully!");
        navigate(`/Dashboard/project`);
      })
      .catch((error) => {
        // Handle errors, e.g., display an error message to the user
        console.log(error);
      });
  };

  const handleImageChange = (e) => {
    // Update the 'image' state variable with the selected image file
    const selectedImage = e.target.files[0];
    setImage(selectedImage);
  };

  return (
    <div>
    <h2 className="text-white fw-50">
        <Typewriter
          options={{
            autoStart: true,
            loop: true,
            delay: 70,
            strings: ["Add Project"],
          }}
        />
      </h2>
    <Divider className="bg-primary mb-3"/>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-2" controlId="title">
          <Form.Label>Title</Form.Label>
          <Form.Control
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            type="text"
            placeholder="Enter Name of Project..."
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="description">
          <Form.Label>Description</Form.Label>
          <Form.Control
            name="descriptions"
            as="textarea"
            placeholder="Enter Description..."
            rows={3}
            value={descriptions}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="technologies">
          <Form.Label>Technologies</Form.Label>
          <Form.Control
            name="technologies"
            value={technologies}
            onChange={(e) => setTechnologies(e.target.value)}
            type="text"
            placeholder="Enter Technologies..."
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="image">
          <Form.Label>Image</Form.Label>
          <input
            name="image"
            className="form-control"
            type="file"
            placeholder="Enter Project Image..."
            accept=".jpg, .jpeg, .png"
            onChange={handleImageChange}
          />
        </Form.Group>

        <Button type="submit" variant="primary" disabled={status === "loading"}>
          {status === "loading" ? "Creating..." : "Add Project"}
        </Button>
      </Form>
    </div>
  );
}

export default CreateProject;
