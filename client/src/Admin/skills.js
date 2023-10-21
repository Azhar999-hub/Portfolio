import { Add, Delete, Edit } from "@mui/icons-material";
import { Box, Divider } from "@mui/material";

import axios from "axios";

import { useEffect, useState } from "react";

import { Button, Table } from "react-bootstrap";

import { useDispatch, useSelector } from "react-redux";

import { Link } from "react-router-dom";

import { toast } from "react-toastify";

import Swal from "sweetalert2";

import Typewriter from "typewriter-effect";

import { getAllSkills, addSkill, deleteSkill } from "../slices/skillSlice";

import SmModal from "./Modal";
import SmInput from "./SmInput";

const Skills = () => {
  const [type, setType] = useState();
  const [level, setLevel] = useState();

  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const skills = useSelector((state) => state.skills.skills);

  const fetchSkill = async () => {
    try {
      const response = await axios.get("http://localhost:2000/skills");
      dispatch(getAllSkills(response.data));
    } catch (error) {
      console.log(error);
    }
  };
  fetchSkill();

  useEffect(() => {
    fetchSkill();
  });

  const Submit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:2000/skills", { type, level })
      .then((res) => {
        dispatch(addSkill(res.data));
        fetchSkill();
        toast.success("Skill Added Successfully!");
        setOpen(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You will not be able to recover this skill!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, keep it",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`http://localhost:2000/skills/${id}`)
          .then((res) => {
            dispatch(deleteSkill({ id }));

            toast.success("Skill Deleted Successfully!");
          })
          .catch((error) => {
            console.log(error);
          });
      }
    });
  };

  return (
    <>
      <div className="d-flex justify-content-between">
        <div>
        <h2 className="text-white fw-50">
        <Typewriter
          options={{
            autoStart: true,
            loop: true,
            delay: 70,
            strings: ["Skills"],
          }}
        />
      </h2>
        </div>
        <Button onClick={() => setOpen(true)} variant="primary">
          Add Skills <Add />
        </Button>
      </div>
      <Divider className="bg-primary mb-3" />
      <Table className="my-3">
        <thead>
          <tr>
            <th>Type</th>
            <th>Level</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {skills && skills.length > 0 ? (
            skills.map((skill, index) => {
              return (
                <tr key={index}>
                  <td>{skill.type}</td>
                  <td>{skill.level}</td>
                  <td>
                    <Link
                      to={`/Dashboard/SkillEdit/${skill.id}`}
                      onClick={() => setOpen(true)}
                      className="me-2 btn btn-success">
                      <Edit />
                    </Link>
                    <Button
                      variant="danger "
                      onClick={() => handleDelete(skill.id)}>
                      <Delete />
                    </Button>
                  </td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan="3">Loading skills...</td>
            </tr>
          )}
        </tbody>
      </Table>
      {/* --------------------Modal------------------------- */}
      <SmModal
        title="Add Skill"
        innerContent={
          <Box>
            <Box className="my-3">
              <SmInput
                label="Name"
                variant="standard"
                onChange={(e) => setType(e.target.value)}
              />
            </Box>
            <Box className="my-3">
              <SmInput
                label="Level"
                variant="standard"
                onChange={(e) => setLevel(e.target.value)}
              />
            </Box>
            <Box>
              <Button onClick={Submit}>Add Skill</Button>
            </Box>
          </Box>
        }
        close={(e) => setOpen(e)}
        open={open}
      />
    </>
  );
};

export default Skills;
