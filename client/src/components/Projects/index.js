import React, { useEffect } from "react";
import { useState } from "react";

import axios from "axios";

import { useDispatch, useSelector } from "react-redux";

import ProjectCard from "../Cards/ProjectCards";
import { getProject } from "../../slices/projectSlice";

import {
  Container,
  Wrapper,
  Title,
  Desc,
  CardContainer,
} from "./ProjectsStyle";

const Projects = () => {
  const dispatch = useDispatch();
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

  return (
    <Container id="projects">
      <Wrapper>
        <Title>Projects</Title>
        <Desc>
          I have worked on a wide range of web apps projects. Here are some of
          my projects.
        </Desc>

        <CardContainer>
          {projects.map((item, index) => (
            <ProjectCard
              key={index}
              image={item.image}
              title={item.title}
              description={item.descriptions}
              technologies={item.technologies}
            />
          ))}

          {/* {projects
            .filter((item) => item.category == toggle)
            .map((project) => (
              <ProjectCard project={project} openModal={openModal} setOpenModal={setOpenModal}/>
            ))} */}
        </CardContainer>
      </Wrapper>
    </Container>
  );
};

export default Projects;
