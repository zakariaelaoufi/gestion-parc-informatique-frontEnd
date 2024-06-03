import PropTypes from "prop-types";
// import loginImg from "/src/assets/auth_bg_img_1.jpg";
import assetIMG from "/src/assets/asset_image.jpeg";
import auth_bg_img_3 from "/src/assets/auth_bg_img_3.jpg";
import { Box } from "@mui/system";
import { motion } from "framer-motion";

function AuthLayout({ children }) {
  const MotionBox = motion(Box);

  return (
    <Box
      sx={{
        display: "flex",
        width: "100%",
        minHeight: "100vh",
        backgroundColor: "background.light",
        borderLeftStyle: "solid",
        borderLeftColor: "secondary.main",
        borderLeftWidth: "30px ",
        overflow: "hidden",
      }}
    >
      <MotionBox
        initial={{ opacity: 0.7, y: 28 }}
        animate={{ opacity: 1, y: -28 }}
        transition={{ ease: "easeInOut", duration: 0.35 }}
        sx={{
          flex: "5",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          // flexDirection: "column",
          // my: 8,
        }}
      >
        <>{children}</>
      </MotionBox>
      <Box
        sx={{
          flex: "7",
          width: "100%",
          height: "100vh",
        }}
      >
        <motion.img
          //  initial={{ opacity: 0.7, x: 28 }}
          //  animate={{ opacity: 1, x: 0 }}
          //  transition={{ ease: "easeInOut", duration: 0.35 }}
          src={auth_bg_img_3}
          style={{
            width: "100%",
            height: "100vh",
            objectFit: "contain",
            objectPosition: "start",
          }}
        />
      </Box>
    </Box>
  );
}

export default AuthLayout;
AuthLayout.propTypes = {
  children: PropTypes.node.isRequired,
};
