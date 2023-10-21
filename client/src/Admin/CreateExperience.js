import React, { useState } from "react";

import { useDispatch, useSelector } from "react-redux";

import { useNavigate } from "react-router-dom";

import axios from "axios";

import { toast } from "react-toastify";

import { Button, Form } from "react-bootstrap";

import Typewriter from "typewriter-effect";

import { addExperience } from "../slices/experienceSlice";

function CreateExperience() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const status = useSelector((state) => state.experiences.status);

  const [title, setTitle] = useState("");
  const [company, setCompany] = useState("");
  const [city, setCity] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [technologies, setTechnologies] = useState("");
  const [image, setImage] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("company", company);
    formData.append("city", city);
    formData.append("description", description);
    formData.append("startDate", startDate);
    formData.append("endDate", endDate);
    formData.append("technologies", technologies);
    formData.append("image", image); // Add the image to FormData

    axios
      .post("http://localhost:2000/experience", formData)
      .then((res) => {
        dispatch(addExperience(res.data));
        toast.success("Experience Added Successfully!");
        navigate(`/Dashboard/Experience`);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleImageChange = (e) => {
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
            strings: ["Add Experience"],
          }}
        />
      </h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-2" controlId="title">
          <Form.Label>Title</Form.Label>
          <Form.Control
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            type="text"
            placeholder="Enter Title of Job..."
            required
          />
        </Form.Group>

        <Form.Group className="mb-2" controlId="company">
          <Form.Label>Company Name</Form.Label>
          <Form.Control
            name="company"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            type="text"
            placeholder="Enter Company Name..."
          />
        </Form.Group>

        <Form.Group className="mb-2" controlId="company">
          <Form.Label>City</Form.Label>
          <Form.Control
            name="company"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            type="text"
            placeholder="Enter city Name..."
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
          <Form.Label>Description</Form.Label>
          <Form.Control
            name="description"
            as="textarea"
            placeholder="Enter Description..."
            rows={3}
            value={description}
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

        <div className="row">
          <div className="col-4">
            <div className="date-picker">
              <Form.Group className="mb-3" controlId="startDate">
                <Form.Label>Start Date</Form.Label>
                <input
                  name="startDate"
                  type="date"
                  className="form-control"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  required
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
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
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

        <Button type="submit" variant="primary" disabled={status === "loading"}>
          {status === "loading" ? "Creating..." : "Add Experience"}
        </Button>
      </Form>
    </div>
  );
}

export default CreateExperience;
