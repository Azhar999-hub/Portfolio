import { Box, Divider } from "@mui/material";
import { Edit } from "@mui/icons-material";

import axios from "axios";

import { useDispatch, useSelector } from "react-redux";

import { useNavigate, useParams } from "react-router-dom";

import { toast } from "react-toastify";

import { useState } from "react";

import { Form } from "react-bootstrap";

import Typewriter from "typewriter-effect";

import { updateAbout } from "../slices/aboutSlice";

const AboutEdit = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  const abouts = useSelector((state) => state.abouts.abouts);
  const about = abouts.find((u) => u.id === id);
  console.log(about);

  const [name, setName] = useState(about ? about.name : ""); // Check if about exists
  const [info, setInfo] = useState(about ? about.info : ""); // Check if about exists

  const handleUpdate = (e) => {
    e.preventDefault();
    axios
      .put(`http://localhost:2000/about/${id}`, { name, info })
      .then((res) => {
        dispatch(updateAbout({ id, name, info }));
        toast.success("About Me Updated Successfully!");
        navigate(`/Dashboard/About`);
      })
      .catch((error) => {
        console.log(error);
        toast.error("About me Not Updated !", error);
      });
  };

  return (
    <div>
      <form onSubmit={handleUpdate}>
      <h2 className="text-white fw-50">
        {" "}
        <Typewriter
          options={{
            autoStart: true,
            loop: true,
            delay: 70,
            strings: ["Edit About Me"],
          }}
        />
      </h2>
        <Divider className="bg-primary mb-3"/>
        <Form.Group className="mb-2 transparent-input" controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control
            name="title"
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
            placeholder="Enter Name..."
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            placeholder="Enter Info..."
            rows={4}
            value={info}
            onChange={(e) => setInfo(e.target.value)}
          />
        </Form.Group>
        <Box className="my-3">
          <button className="btn btn-primary">
            Edit <Edit />
          </button>
        </Box>
      </form>
    </div>
  );
};

export default AboutEdit;
