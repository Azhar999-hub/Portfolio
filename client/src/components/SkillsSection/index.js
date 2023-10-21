import React, { useEffect } from "react";

import SkillBar from "react-skillbars";

import styled from "styled-components";

import axios from "axios";

import { useDispatch, useSelector } from "react-redux";

import { getAllSkills } from "../../slices/skillSlice";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  z-index: 1;
  align-items: center;
`;

const Wrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  width: 100%;
  max-width: 1150px;
  gap: 12px;
  @media (max-width: 960px) {
    flex-direction: column;
  }
`;

export const Title = styled.div`
  font-size: 42px;
  text-align: center;
  font-weight: 600;
  margin-top: 20px;
  color: ${({ theme }) => theme.text_primary};
  @media (max-width: 768px) {
    margin-top: 12px;
    font-size: 32px;
  }
`;

export const Desc = styled.div`
  font-size: 18px;
  text-align: center;
  max-width: 800px;
  color: ${({ theme }) => theme.text_secondary};
  @media (max-width: 768px) {
    font-size: 16px;
  }
`;

const SkillsContainer = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  margin-top: 30px;
  gap: 20px;
  justify-content: center;
`;

const Skill = styled.div`
  width: 100%;
  max-width: 950px;
  background: ${({ theme }) => theme.card};
  border: 0.1px solid #854ce6;
  box-shadow: rgba(23, 92, 230, 0.15) 0px 4px 24px;
  border-radius: 16px;
  padding: 18px 36px;
  @media (max-width: 768px) {
    max-width: 400px;
    padding: 10px 36px;
  }
  @media (max-width: 500px) {
    max-width: 330px;
    padding: 10px 20px;
  }
`;

const SkillTitle = styled.h2`
  font-size: 28px;
  font-weight: 600;
  color: ${({ theme }) => theme.text_secondary};
  margin-bottom: 15px;
  text-align: center;
`;


const colors = {
  bar: "#3498db",
  border:"white 2px solid",
  title: {
    text: "#fff",
    background: "#2980b9",
  },
};

const Skills = () => {
  const dispatch = useDispatch();
  const skills = useSelector((state) => state.skills.skills);

  useEffect(() => {
    const fetchSkill = async () => {
      try {
        const response = await axios.get("http://localhost:2000/skills");
        dispatch(getAllSkills(response.data));
      } catch (error) {
        console.log(error);
      }
    };
    fetchSkill();
  }, [dispatch]);

  return (
    <Container id="skills">
      <Wrapper>
        <Title>Skills</Title>
        <Desc>
          Here are some of my skills on which I have been working on for the
          past 2 years.
        </Desc>
        <SkillsContainer>
          <Skill>
            {skills &&
              skills.map((item, index) => (
                <div key={index}>
                  <SkillTitle>{item.type}</SkillTitle>
                  <SkillBar
                    skills={[{ type: item.type, level: item.level }]}
                    colors={colors} 
                    animationDelay={1000}
                  />
                </div>
              ))}
          </Skill>
        </SkillsContainer>
      </Wrapper>
    </Container>
  );
};

export default Skills;
