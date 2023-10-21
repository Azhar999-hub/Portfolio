import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Button, Menu, MenuItem } from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import ComputerIcon from "@mui/icons-material/Computer";
import PsychologyIcon from "@mui/icons-material/Psychology";
import DriveFileRenameOutlineRoundedIcon from "@mui/icons-material/DriveFileRenameOutlineRounded";
import SchoolRoundedIcon from "@mui/icons-material/SchoolRounded";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { Logout } from "@mui/icons-material";

import React, { useState } from "react";

import { Nav } from "react-bootstrap";

import { FaSignInAlt, FaSignOutAlt } from "react-icons/fa";

import { LinkContainer } from "react-router-bootstrap";

import { useSelector, useDispatch } from "react-redux";

import { Link, useNavigate } from "react-router-dom";
import { Route, Routes } from "react-router-dom";

import { toast } from "react-toastify";

import { logout } from "../slices/authSlice";
import { useLogoutMutation } from "../slices/usersApiSlice";

import About from "./About";
import AboutEdit from "./AboutEdit";
import CreateEducation from "./CreateEducation";
import CreateExperience from "./CreateExperience";
import CreateProject from "./CreateProject";
import EditEducation from "./EditEducation";
import EditProject from "./EditProject";
import Education from "./Education";
import Experience from "./Experience";
import ExperienceEdit from "./ExperienceEdit";
import SkillEdit from "./SkillEdit";
import Project from "./project";
import Skills from "./skills";

const drawerWidth = 200;

function Dashboard(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = useState(false);

  const navigation = useNavigate();

  const [menuList, setMenuList] = useState([
    {
      name: "About",
      route: "About",
      icon: <InfoIcon color="primary" />,
    },
    {
      name: "Skills",
      route: "skills",
      icon: <ComputerIcon color="primary" />,
    },
    {
      name: "Experience",
      route: "Experience",
      icon: <PsychologyIcon color="primary" />,
    },
    {
      name: "Project",
      route: "project",
      icon: <DriveFileRenameOutlineRoundedIcon color="primary" />,
    },
    {
      name: "Education",
      route: "Education",
      icon: <SchoolRoundedIcon color="primary" />,
    },
  ]);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const { userInfo } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [logoutApiCall] = useLogoutMutation();

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate("/");
      toast.success("Logout Succesfully!");
    } catch (err) {
      console.error(err);
    }
  };

  // const firstLetter = userData.name ? userData.name.charAt(0) : "";

  // const fullName = () => {
  //   setShowFullName(!showFullName);
  // };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const moveScreen = (route) => {
    navigation(route);

    // Close the drawer on small screens
    setMobileOpen(false);
  };

  const drawer = (
    <div>
      <Toolbar />
      <Divider />
      <List>
        {menuList.map((x, index) => (
          <ListItem className="" key={index} disablePadding>
            <ListItemButton onClick={() => moveScreen(x.route)}>
              <ListItemIcon>{x.icon}</ListItemIcon>
              <ListItemText
                className="text-primary d-button"
                primary={x.name}
              />
            </ListItemButton>
          </ListItem>
        ))}
        <Divider />
        <ListItem className="text-bg-danger" disablePadding>
          <ListItemButton onClick={logoutHandler}>
            <ListItemIcon className="text-white">
              <Logout />
            </ListItemIcon>
            <ListItemText>Logout</ListItemText>
          </ListItemButton>
        </ListItem>
      </List>
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box
      sx={{
        display: "flex",
        backgroundImage: `url('https://static.vecteezy.com/system/resources/previews/002/037/924/non_2x/abstract-blue-background-with-beautiful-fluid-shapes-free-vector.jpg')`,
        backgroundSize: "cover",
        minHeight: "100vh",
      }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}>
            <MenuIcon />
          </IconButton>
          <Typography
            srtyle={{ fontSize: "9vw" }}
            variant="h6"
            noWrap
            component="div">
            Admin Panel
          </Typography>
          <Typography className="ms-auto" variant="h6" noWrap component="div">
            {userInfo ? (
              <div>
                <Button
                  style={{ backgroundColor: "#12824C", color: "#FFFFFF" }}
                  id="basic-button"
                  aria-controls={open ? "basic-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? "true" : undefined}
                  onClick={handleClick}>
                  {userInfo.name} <ArrowDropDownIcon />
                </Button>
                <Menu
                  className="ms-3"
                  id="basic-menu"
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                  MenuListProps={{
                    "aria-labelledby": "basic-button",
                  }}>
                  <Link to={"/profile"}>
                    <MenuItem>Profile</MenuItem>
                  </Link>

                  <MenuItem onClick={logoutHandler}>Logout</MenuItem>
                </Menu>
              </div>
            ) : (
              <>
                <LinkContainer to="/login">
                  <Nav.Link>
                    <FaSignInAlt /> Sign In
                  </Nav.Link>
                </LinkContainer>
                <LinkContainer to="/register">
                  <Nav.Link>
                    <FaSignOutAlt /> Sign Up
                  </Nav.Link>
                </LinkContainer>
              </>
            )}
          </Typography>
        </Toolbar>
      </AppBar>

      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders">
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}>
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          open>
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}>
        <Toolbar />
        <Routes>
          <Route path="/" element={<About />} />

          <Route path="/About" element={<About />} />
          <Route path="/skills" element={<Skills />} />
          <Route path="/Experience" element={<Experience />} />
          <Route path="/Education" element={<Education />} />
          <Route path="/project" element={<Project />} />

          <Route path="/CreateExperience" element={<CreateExperience />} />
          <Route path="/CreateProject" element={<CreateProject />} />
          <Route path="/CreateEducation" element={<CreateEducation />} />

          <Route path="/SkillEdit/:id" element={<SkillEdit />} />
          <Route path="/AboutEdit/:id" element={<AboutEdit />} />
          <Route path="/ExperienceEdit/:id" element={<ExperienceEdit />} />
          <Route path="/EditProject/:id" element={<EditProject />} />
          <Route path="/EditEducation/:id" element={<EditEducation />} />
        </Routes>
      </Box>
    </Box>
  );
}

export default Dashboard;
