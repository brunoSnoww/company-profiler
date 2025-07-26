import {Box} from "@mui/material";
import Typography from "@mui/material/Typography";

export const ErrorCard = () =>
    <Box sx={{ p: 3, textAlign: 'center', color: 'error.main' }}>
        <Typography variant="h6">Error Loading Profile</Typography>
        <Typography>The website may be offline or the selected model failed.</Typography>
    </Box>