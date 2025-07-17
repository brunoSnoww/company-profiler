import {Box, Skeleton} from "@mui/material";

export const CardSkeleton = () => (
    <Box sx={{ marginRight: 0.5, my: 5 }}>
        <Skeleton variant="rectangular" width={500} height={300} />
    </Box>
);
