import { Edit } from "@mui/icons-material";
import { Divider } from "@mui/material";

import React, { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";

import axios from "axios";

import { Link } from "react-router-dom";

import { Table } from "react-bootstrap";

import Typewriter from "typewriter-effect";

import { getAbout } from "../slices/aboutSlice";

const About = () => {
  const dispatch = useDispatch();
  const abouts = useSelector((state) => state.abouts.abouts);

  useEffect(() => {
    const fetchAbout = async () => {
      try {
        const response = await axios.get("http://localhost:2000/about");
        dispatch(getAbout(response.data.aboutMe));
      } catch (error) {
        console.log(error);
      }
    };
    fetchAbout();
  }, [dispatch]);

  return (
    <div>
      <h2 className="text-white fw-50">
        {" "}
        <Typewriter
          options={{
            autoStart: true,
            loop: true,
            delay: 70,
            strings: ["About Me"],
          }}
        />
      </h2>
      <Divider className="bg-primary mb-3" />
      <Table className="my-3">
        <thead>
          <tr>
            <th>Name</th>
            <th>Info</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {abouts && abouts.length > 0 ? (
            abouts.map((about, index) => {
              return (
                <tr key={index}>
                  <td>{about.name}</td>
                  <td>{about.info}</td>
                  <td>
                    <Link
                      to={`/Dashboard/AboutEdit/${about.id}`}
                      className="me-2 btn btn-success">
                      <Edit />
                    </Link>
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
    </div>
  );
};

export default About;
