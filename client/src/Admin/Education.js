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

import { deleteEducation, getEducation } from "../slices/educationSlice";

const Education = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const educations = useSelector((state) => state.education.educations);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const response = await axios.get("http://localhost:2000/education");
        dispatch(getEducation(response.data.educations));
        console.log(getEducation(response.data.educations));
      } catch (error) {
        console.log(error);
      }
    };
    fetchProject();
  }, [dispatch]);

  const goToAdd = () => {
    navigate(`/Dashboard/CreateEducation`);
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You will not be able to recover this Education!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, keep it",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`http://localhost:2000/education/${id}`)
          .then((res) => {
            dispatch(deleteEducation({ id }));
            toast.success("Education Deleted Successfully!");
          })
          .catch((error) => {
            console.log(error);
          });
      }
    });
  };

  const formatDate = (inputDate) => {
    const experienceDate = new Date(inputDate);

    // Get the year and month from the date
    const year = experienceDate.getFullYear();
    const month = experienceDate.toLocaleString("default", { month: "short" });

    // Format the date as "MMM YYYY"
    const formattedDate = `${month} ${year}`;

    return formattedDate;
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
            strings: ["Education"],
          }}
        />
      </h2>
        </div>
        <div>
          <Button onClick={goToAdd} variant="primary">
            Add Education <Add />
          </Button>
        </div>
      </div>
        <Divider className="bg-primary mb-3"/>
      <Table className="my-3">
        <thead>
          <tr>
            <th>Title</th>
            <th>School</th>
            <th>Description</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Image</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {educations.length > 0 ? (
            educations.map((education, index) => (
              <tr key={index}>
                <td>{education.title}</td>
                <td>{education.school}</td>
                <td>{education.description}</td>
                <td>{formatDate(education.startDate)}</td>
                <td>{formatDate(education.endDate)}</td>
                <td>
                  {education.image && (
                    <img
                      src={`http://localhost:2000/${education.image}`}
                      alt="company_image"
                      width={"100px"}
                    />
                  )}
                </td>
                <td>
                  <Link
                    to={`/Dashboard/EditEducation/${education.id}`}
                    className="me-2 btn btn-success">
                    <Edit />
                  </Link>
                  <Button
                    variant="danger"
                    onClick={() => handleDelete(education.id)}>
                    <Delete />
                  </Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7">Loading Projects...</td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  );
};

export default Education;
