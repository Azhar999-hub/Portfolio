import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

import React, {useEffect } from "react";

import Typewriter from "typewriter-effect";

import axios from "axios";

import { useDispatch, useSelector } from "react-redux";

import HeroBgAnimation from "../HeroBgAnimation";
import HeroImg from "../../images/HeroImage.png";
import { getAbout } from "../../slices/aboutSlice";

import {
  HeroContainer,
  HeroBg,
  HeroLeftContainer,
  Img,
  HeroRightContainer,
  HeroInnerContainer,
  TextLoop,
  Title,
  Span,
  SubTitle,
} from "./HeroStyle";

const HeroSection = () => {
  const Bio = {
    roles: [
      "Full Stack Developer",
      "Mern Stack Developer",
      "Frontend Developer"
    ],
  };
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
    <div id="about" className="mb-5">
      <HeroContainer>
        <HeroBg>
          <HeroBgAnimation />
        </HeroBg>
        <HeroInnerContainer>
          <HeroLeftContainer id="Left">
            {Array.isArray(abouts) && abouts.length > 0 ? (
              abouts.map((item, index) => (
                <div key={index}>
                  <Title>
                    Hi, I am <br /> {item.name}
                  </Title>
                  <TextLoop>
                    I am a
                    <Span>
                      <Typewriter
                        options={{
                          strings: Bio.roles,
                          autoStart: true,
                          loop: true,
                        }}
                      />
                    </Span>
                  </TextLoop>
                  <SubTitle>{item.info}</SubTitle>

                  <div className="d-flex justify-content-start">
                    <div>
                      <a
                        className="btns btn-gradient btn-glow"
                        href="https://drive.google.com/drive/u/0/folders/1gS1gabinl-zWduuqJSzeGsDJMrKhLfMq"
                        target="display">
                        Check Resume
                      </a>
                    </div>
                    <div>
                      <a
                        className="icon"
                        href={"https://github.com/Azhar999-hub"}
                        target="display">
                        <GitHubIcon style={{ fontSize: 40, color: "#0A66C2" }} />
                      </a>
                      <a
                        className="icon"
                        href={
                          "https://www.linkedin.com/in/azhar-zafar-54509b264/"
                        }
                        target="display">
                        <LinkedInIcon style={{ fontSize: 40, color: "#0A66C2", }} />
                      </a>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p>No About Me data available</p>
            )}
          </HeroLeftContainer>

          <HeroRightContainer id="Right">
            <Img src={HeroImg} alt="hero-image" />
          </HeroRightContainer>
        </HeroInnerContainer>
      </HeroContainer>
    </div>
  );
};

export default HeroSection;
