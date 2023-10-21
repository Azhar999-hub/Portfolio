import { Divider } from "@mui/material";

import React, { useState, useEffect } from "react";

import { useNavigate, useParams } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";

import axios from "axios";

import { toast } from "react-toastify";

import { Button, Form } from "react-bootstrap";

import Typewriter from "typewriter-effect";

import { editEducation } from "../slices/educationSlice";

const EditEducation = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  const educations = useSelector((state) => state.education.educations);
  const education = educations.find((u) => u.id === id);

  const [formData, setFormData] = useState({
    title: education ? education.title : "",
    school: education ? education.school : "",
    description: education ? education.description : "",
    startDate: education ? new Date(education.startDate) : new Date(),
    endDate: education ? new Date(education.endDate) : new Date(),
    image: education ? education.image : "",
  });

  useEffect(() => {
    setFormData({
      title: education ? education.title : "",
      school: education ? education.school : "",
      description: education ? education.description : "",
      startDate: education ? new Date(education.startDate) : new Date(),
      endDate: education ? new Date(education.endDate) : new Date(),
      image: education ? education.image : "",
    });
  }, [education]);

  const handleUpdate = (e) => {
    e.preventDefault();

    const { title, school, description, startDate, endDate, image } = formData;
    const isoStartDate = startDate.toISOString();
    const isoEndDate = endDate.toISOString();

    axios
      .put(`http://localhost:2000/education/${id}`, {
        title,
        school,
        description,
        startDate: isoStartDate,
        endDate: isoEndDate,
        image: education.image,
      })
      .then((res) => {
        dispatch(
          editEducation({
            id,
            title,
            school,
            description,
            startDate: isoStartDate,
            endDate: isoEndDate,
            image: education.image,
          })
        );
        toast.success("Education Updated Successfully!");
        navigate(`/Dashboard/Education`);
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
            strings: ["Edit Education"],
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
            placeholder="Enter Title of Degree..."
          />
        </Form.Group>

        <Form.Group className="mb-2" controlId="company">
          <Form.Label>School Name</Form.Label>
          <Form.Control
            name="school"
            value={formData.school}
            onChange={handleChange}
            type="text"
            placeholder="Enter Company Name..."
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="description">
          <Form.Label>Description</Form.Label>
          <Form.Control
            name="descriptions"
            as="textarea"
            placeholder="Enter Description..."
            rows={3}
            value={formData.description}
            onChange={handleChange}
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

export default EditEducation;
