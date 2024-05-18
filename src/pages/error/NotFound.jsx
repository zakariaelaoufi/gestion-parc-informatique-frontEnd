import { Link } from "react-router-dom";
import { Button, Typography } from "@mui/material";
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import { Box } from '@mui/system';

function NotFound() {

    return (
        <Box sx={{
            width: "100%",
            height: "100vh",
            bgcolor: "background.main",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
        }} >
            <Box sx={{
                backgroundColor: "background.light",
                p: "72px 8%",
                m: "auto 5%",
                minWidth: "45%",
                boxShadow: "0px 8px 24px",
                color: "shadow.main",
                borderRadius: 5
            }} >
                <Typography variant="h2" sx={{ color: "primary.main", mb: 6 }} >
                    <Box sx={{ fontWeight: 700 }}> 404 </Box> page non trouvée
                </Typography>

                <Link component="button" to="/">
                    <Button variant="text" endIcon={<ArrowRightAltIcon />} size="large" >Retour à l&apos;accueil</Button>
                </Link>
            </Box>
        </Box >
    );
}

export default NotFound;