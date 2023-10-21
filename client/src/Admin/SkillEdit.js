import { Box, Divider } from "@mui/material";
import { Edit } from "@mui/icons-material";

import React, { useState } from "react";

import { useNavigate, useParams } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";

import axios from "axios";

import { toast } from "react-toastify";

import { Form } from "react-bootstrap";

import Typewriter from "typewriter-effect";

import { updateSkill } from "../slices/skillSlice";

const SkillEdit = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  const skills = useSelector((state) => state.skills.skills);
  const skill = skills.find((u) => u.id === id);
  const [type, setType] = useState(skill ? skill.type : ""); // Check if skill exists
  const [level, setLevel] = useState(skill ? skill.level : ""); // Check if skill exists

  const handleUpdate = (e) => {
    e.preventDefault();
    axios
      .put(`http://localhost:2000/skills/${id}`, { type, level })
      .then((res) => {
        dispatch(updateSkill({ id, type, level }));
        toast.success("Skill Updated Successfully!");
        navigate(`/Dashboard/skills`);
      })
      .catch((error) => {
        console.log(error);
        toast.error("Skill Not Updated !", error);
      });
  };

  return (
    <form onSubmit={handleUpdate}>
     <h2 className="text-white fw-50">
        <Typewriter
          options={{
            autoStart: true,
            loop: true,
            delay: 70,
            strings: ["Edit Skill"],
          }}
        />
      </h2>
      <Divider className="bg-primary mb-3"/>
      <Form.Group className="mb-2" controlId="company">
        <Form.Label>Skill Name</Form.Label>
        <Form.Control
          name="school"
          value={type}
          onChange={(e) => setType(e.target.value)}
          type="text"
          placeholder="Enter Skill Name..."
        />
      </Form.Group>

      <Form.Group className="mb-2" controlId="company">
        <Form.Label>Skill level</Form.Label>
        <Form.Control
          name="school"
          value={level}
          onChange={(e) => setLevel(e.target.value)}
          type="number"
          placeholder="Enter Skill Level..."
        />
      </Form.Group>

      <Box className="my-3">
        <button className="btn btn-primary">
          Edit <Edit />
        </button>
      </Box>
    </form>
  );
};

export default SkillEdit;
