import { Edit } from "@mui/icons-material";
import { Card, CardContent, Typography } from "@mui/material";

import React from "react";

import { Link } from "react-router-dom";

const SmCard = (props) => {
  let { name, info, roles,  editClick} = props;

  return (
    <Card elevation={8} className="card-design img-fluid" style={{ color: "white" }}>
      <div className="row">
        <div className="col-md-8">
          <CardContent>
            <Typography variant="h5" className="">
              <span className="ms-2">Name : {" "} {name}</span>{" "}
            </Typography>
            {/* <Typography variant="h5" className="">
              <span className="ms-2"> Roles : {roles}</span>{" "}
            </Typography> */}
            <Typography variant="h5" className="">
              <span className="ms-2">Info : {info}</span>{" "}
            </Typography>
            <div className="mt-3">
              <Link to={editClick} className="btn btn-primary ms-3 me-3">
                <Edit /> Edit
              </Link>
            </div>
          </CardContent>
        </div>
      </div>
    </Card>
  );
};

export default SmCard;
