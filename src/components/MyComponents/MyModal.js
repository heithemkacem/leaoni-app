import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Typography from "@mui/material/Typography";
import MDButton from "components/MDButton";
import PropTypes from "prop-types";
import AdornmentInput from "./AdornmentInput";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  borderRadius: "1%",
  boxShadow: 24,
  p: 4,
};

export default function MyModal(props) {
  const { open, handleClose, modalTitle, modalContent } = props;

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <Typography id="transition-modal-title" variant="h6" component="h2">
              {modalTitle}
            </Typography>
            <Typography id="transition-modal-description" sx={{ mt: 2 }}>
              {modalContent}
            </Typography>
            <AdornmentInput
              name="Temperature value"
              placeholder="New temperature value"
              width="75%"
              ind="°C"
            />
            <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
              <MDButton variant="gradient" color="info">
                Save
              </MDButton>
            </Box>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}

MyModal.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  modalTitle: PropTypes.string.isRequired,
  modalContent: PropTypes.string.isRequired,
};
