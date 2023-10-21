import { Add, Delete, Edit } from "@mui/icons-material";
import { Divider } from "@mui/material";

import axios from "axios";

import React, { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";

import { Link, useNavigate } from "react-router-dom";

import { Button, Table } from "react-bootstrap";

import Swal from "sweetalert2";

import { toast } from "react-toastify";

import Typewriter from "typewriter-effect";

import { deleteExperience, getExperience } from "../slices/experienceSlice";

const Experience = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const experiences = useSelector((state) => state.experiences.experiences);

  useEffect(() => {
    const fetchExperience = async () => {
      try {
        const response = await axios.get("http://localhost:2000/experience");
        dispatch(getExperience(response.data.experiences));
      } catch (error) {
        console.log(error);
      }
    };
    fetchExperience();
  }, [dispatch]);

  const goToAdd = () => {
    navigate(`/Dashboard/CreateExperience`);
  };

  const formatDate = (inputDate) => {
    const experienceDate = new Date(inputDate);

    const year = experienceDate.getFullYear();
    const month = experienceDate.toLocaleString("default", { month: "short" });
    const formattedDate = `${month} ${year}`;

    return formattedDate;
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You will not be able to recover this Experience!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, keep it",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`http://localhost:2000/experience/${id}`)
          .then((res) => {
            dispatch(deleteExperience({ id }));

            toast.success("Experience Deleted Successfully!");
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
            strings: ["Experience"],
          }}
        />
      </h2>
        </div>
        <div>
          <Button onClick={goToAdd} variant="primary">
            Experience <Add />
          </Button>
        </div>
      </div>
      <Divider className="bg-primary mb-3" />
      <Table className="my-3">
        <thead>
          <tr>
            <th>Title</th>
            <th>Company</th>
            <th>City</th>
            <th>Description</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Technologies</th>
            <th>Image</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {experiences && experiences.length > 0 ? (
            experiences.map((experience, index) => {
              return (
                <tr key={index}>
                  <td>{experience.title}</td>
                  <td>{experience.company}</td>
                  <td>{experience.city}</td>
                  <td>{experience.description}</td>
                  <td>{formatDate(experience.startDate)}</td>
                  <td>{formatDate(experience.endDate)}</td>
                  <td>{experience.technologies}</td>
                  <td>
                    {experience.image && (
                      <img
                        src={`http://localhost:2000/${experience.image}`}
                        alt="company_image"
                        width={"80px"}
                      />
                    )}
                  </td>
                  <td>
                    <Link
                      to={`/Dashboard/ExperienceEdit/${experience.id}`}
                      className="me-2 btn btn-success">
                      <Edit />
                    </Link>
                    <Button
                      variant="danger "
                      onClick={() => handleDelete(experience.id)}>
                      <Delete />
                    </Button>
                  </td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan="3">Loading experiences...</td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  );
};

export default Experience;
