// src/components/Project.js

import { Add, Delete, Edit } from "@mui/icons-material";
import { Divider } from "@mui/material";

import React, { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";

import { Button, Table } from "react-bootstrap";

import axios from "axios";

import Swal from "sweetalert2";

import { toast } from "react-toastify";

import { Link, useNavigate } from "react-router-dom";

import Typewriter from "typewriter-effect";

import { deleteProject, getProject } from "../slices/projectSlice";

const Project = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const projects = useSelector((state) => state.projects.projects);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const response = await axios.get("http://localhost:2000/projects");
        dispatch(getProject(response.data.projects));
      } catch (error) {
        console.log(error);
      }
    };
    fetchProject();
  }, [dispatch]);

  const goToAdd = () => {
    navigate(`/Dashboard/CreateProject`);
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You will not be able to recover this Project!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, keep it",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`http://localhost:2000/projects/${id}`)
          .then((res) => {
            dispatch(deleteProject({ id }));
            toast.success("Project Deleted Successfully!");
          })
          .catch((error) => {
            console.log(error);
          });
      }
    });
  };

  return (
    <div>
      <div className="d-flex justify-content-between">
        <div>
        <h2 className="text-white fw-50">
        <Typewriter
          options={{
            autoStart: true,
            loop: true,
            delay: 70,
            strings: ["Projects"],
          }}
        />
      </h2>

        </div>
        <div>
          <Button onClick={goToAdd} variant="primary">
            Add Project <Add />
          </Button>
        </div>
      </div>
      <Divider className="bg-primary mb-3"/>
      <Table className="my-3">
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Technologies</th>
            <th>Image</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {projects && projects.length > 0 ? (
            projects.map((project, index) => {
              return (
                <tr key={index}>
                  <td>{project.title}</td>
                  <td>{project.descriptions}</td>
                  <td>{project.technologies}</td>
                  <td>
                    {project.image && (
                      <img
                        src={`http://localhost:2000/${project.image}`}
                        alt="company_image"
                        width={"80px"}
                      />
                    )}
                  </td>
                  <td>
                    <Link
                      to={`/Dashboard/EditProject/${project.id}`}
                      className="me-2 btn btn-success">
                      <Edit />
                    </Link>
                    <Button
                      variant="danger"
                      onClick={() => handleDelete(project.id)}>
                      <Delete />
                    </Button>
                  </td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan="5">Loading Projects...</td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  );
};

export default Project;
