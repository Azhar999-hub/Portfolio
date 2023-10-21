import {
  Avatar,
  Card,
  CardContent,
  Divider,
  Typography,
} from "@mui/material";

import React from "react";

const SmCard = (props) => {
  let { id, car, price,height } = props;
  return (
    <Card elevation={10} sx={{ height }}>
      <CardContent>
        <Avatar  className="my-1" sx={{ bgcolor: "red" }} aria-label="recipe">
          {id}
        </Avatar>
        <Typography variant="h5" color="text.secondary">
          Title
        </Typography>
        <Typography variant="h6" color="text.secondary">
          {car}
        </Typography>
        <Divider />
        <Typography variant="p" color="text.secondary">
          {price}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default SmCard;
