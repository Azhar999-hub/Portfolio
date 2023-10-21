import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

import * as React from "react";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 280,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 2,
};

export default function SmModal(props) {
  const { title, open, close, innerContent, footer } = props;

  const handleClose = () => {
    close(false);
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
        <Box sx={style}>
          <Box className="d-flex justify-content-between align-items-center">
            <Typography id="modal-modal-title" variant="h6" component="h2">
              {title}
            </Typography>
            <IconButton onClick={handleClose}>
              <CloseIcon className="text-white bg-danger" />
            </IconButton>
          </Box>
          <Box>{innerContent}</Box>
          <Box>{footer}</Box>
        </Box>
      </Modal>
    </div>
  );
}
