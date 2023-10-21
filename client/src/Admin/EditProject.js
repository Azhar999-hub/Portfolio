import { Divider } from "@mui/material";

import React, { useState, useEffect } from "react";

import { useNavigate, useParams } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";

import axios from "axios";

import { toast } from "react-toastify";

import { Button, Form } from "react-bootstrap";

import Typewriter from "typewriter-effect";

import { editProject } from "../slices/projectSlice";

const ExperienceEdit = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  const projects = useSelector((state) => state.projects.projects);
  const project = projects.find((u) => u.id === id);

  // Use local component state for form fields
  const [formData, setFormData] = useState({
    title: project ? project.title : "",
    descriptions: project ? project.descriptions : "",
    technologies: project ? project.technologies : "",
    image: project ? project.image : "",
  });

  useEffect(() => {
    setFormData({
      title: project ? project.title : "",

      descriptions: project ? project.descriptions : "",

      technologies: project ? project.technologies : "",
      image: project ? project.image : "",
    });
  }, [project]);

  const handleUpdate = (e) => {
    e.preventDefault();

    const {
      title,

      descriptions,
      technologies,
      image,
    } = formData;

    axios
      .put(`http://localhost:2000/projects/${id}`, {
        title,
        descriptions,
        technologies,
        image: project.image,
      })
      .then((res) => {
        // Assuming your API returns the updated data
        dispatch(
          editProject({
            id,
            title,
            descriptions,
            technologies,
            image: project.image,
          })
        );
        toast.success("Experience Updated Successfully!");
        navigate(`/Dashboard/project`);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];
    setFormData({ ...formData, image: selectedImage });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div>
      <h2 className="text-white fw-50">
        <Typewriter
          options={{
            autoStart: true,
            loop: true,
            delay: 70,
            strings: ["Edit Project"],
          }}
        />
      </h2>
      <Divider className="bg-primary mb-3"/>
      <Form onSubmit={handleUpdate}>
        <Form.Group className="mb-2" controlId="title">
          <Form.Label>Title</Form.Label>
          <Form.Control
            name="title"
            value={formData.title}
            onChange={handleChange}
            type="text"
            placeholder="Enter Title of Project..."
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
          <Form.Label>Description</Form.Label>
          <Form.Control
            name="descriptions"
            as="textarea"
            placeholder="Enter Description..."
            rows={3}
            value={formData.descriptions}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="technologies">
          <Form.Label>Technologies</Form.Label>
          <Form.Control
            name="technologies"
            value={formData.technologies}
            onChange={handleChange}
            type="text"
            placeholder="Enter Technologies..."
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="image">
          <Form.Label>Image</Form.Label>
          <input
            name="image"
            className="form-control"
            type="file"
            accept=".jpg, .jpeg, .png"
            onChange={handleImageChange}
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default ExperienceEdit;
