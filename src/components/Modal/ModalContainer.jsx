import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";


export default function ModalContainer({ children , handleClose , state }) {
  
    return (
      <Modal
        open={state}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            minWidth: "500px",
            bgcolor: "background.paper",
            border: "1px solid #24242455",
            borderRadius: 8,
            boxShadow: "0px 1px 5px #24242433 ",
            px: 4,
            py: 6,
          }}
        >
          {children}
        </Box>
      </Modal>
    );
  }
  

//   ModalContainer.propTypes = {
//     children: PropTypes.node,
//   };