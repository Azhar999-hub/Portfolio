import { Divider } from "@mui/material";

import React, { useState, useEffect } from "react";

import { useNavigate, useParams } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";

import axios from "axios";

import { toast } from "react-toastify";

import { Button, Form } from "react-bootstrap";

import Typewriter from "typewriter-effect";

import { editExperience } from "../slices/experienceSlice";

const ExperienceEdit = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  const experiences = useSelector((state) => state.experiences.experiences);
  const experience = experiences.find((u) => u.id === id);

  // Use local component state for form fields
  const [formData, setFormData] = useState({
    title: experience ? experience.title : "",
    company: experience ? experience.company : "",
    city: experience ? experience.city : "",
    description: experience ? experience.description : "",
    startDate: experience ? new Date(experience.startDate) : new Date(),
    endDate: experience ? new Date(experience.endDate) : new Date(),
    technologies: experience ? experience.technologies : "",
    image: experience ? experience.image : "",
  });
 
  
  useEffect(() => {
    setFormData({
      title: experience ? experience.title : "",
      company: experience ? experience.company : "",
      city: experience ? experience.city : "",
      description: experience ? experience.description : "",
      startDate: experience ? new Date(experience.startDate) : new Date(),
      endDate: experience ? new Date(experience.endDate) : new Date(),
      technologies: experience ? experience.technologies : "",
      image: experience ? experience.image : "",
      
    });
  }, [experience]);

  console.log(formData.image)

  const handleUpdate = (e) => {
    e.preventDefault();

    const {
      title,
      company,
      city,
      description,
      startDate,
      endDate,
      technologies,
      image,    } = formData;

    const isoStartDate = startDate.toISOString();
    const isoEndDate = endDate.toISOString();

    axios
      .put(`http://localhost:2000/experience/${id}`,
       {
        title,
        company,
        city,
        description,
        startDate: isoStartDate,
        endDate: isoEndDate,
        technologies,
        image : experience.newImage,
      })
      .then((res) => {
        // Assuming your API returns the updated data
        dispatch(
          editExperience({
            id,
            title,
            company,
            city,
            description,
            startDate: isoStartDate,
            endDate: isoEndDate,
            technologies,
            image : experience.newImage,
          })
        );
        toast.success("Experience Updated Successfully!");
        navigate(`/Dashboard/Experience`);
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
            strings: [" Edit Experience"],
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
            placeholder="Enter Title of Job..."
          />
        </Form.Group>

        <Form.Group className="mb-2" controlId="company">
          <Form.Label>Company Name</Form.Label>
          <Form.Control
            name="company"
            value={formData.company}
            onChange={handleChange}
            type="text"
            placeholder="Enter Company Name..."
          />
        </Form.Group>

        <Form.Group className="mb-2" controlId="city">
          <Form.Label>City</Form.Label>
          <Form.Control
            name="city"
            value={formData.city}
            onChange={handleChange}
            type="text"
            placeholder="Enter City..."
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
          <Form.Label>Description</Form.Label>
          <Form.Control
            name="description"
            as="textarea"
            placeholder="Enter Description..."
            rows={3}
            value={formData.description}
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

        <div className="row">
          <div className="col-4">
            <div className="date-picker">
              <Form.Group className="mb-3" controlId="startDate">
                <Form.Label>Start Date</Form.Label>
                <input
                  name="startDate"
                  type="date"
                  className="form-control"
                  value={formData.startDate.toISOString().split("T")[0]}
                  onChange={handleChange}
                />
              </Form.Group>
            </div>
          </div>

          <div className="col-4">
            <div className="date-picker">
              <Form.Group className="mb-3" controlId="endDate">
                <Form.Label>End Date</Form.Label>
                <input
                  name="endDate"
                  type="date"
                  className="form-control"
                  value={formData.endDate.toISOString().split("T")[0]}
                  onChange={handleChange}
                />
              </Form.Group>
            </div>
          </div>

          <div className="col-3">
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
          </div>
        </div>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default ExperienceEdit;
