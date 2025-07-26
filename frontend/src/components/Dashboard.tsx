import React from 'react';
import { Grid } from "@mui/material";
import { ProfileSidebar } from "./ProfileSidebar.tsx";
import { Outlet, useNavigate } from "react-router-dom";
import {useModel} from "../contexts/Model.tsx";

export const Dashboard: React.FC = () => {
    const navigate = useNavigate();
    const { model,setModel } = useModel();
    const handleGenerateProfile = (url: string) => {
        navigate(`/profile/${encodeURIComponent(url)}?model=${model}`);
    };

    return (
        <Grid container spacing={2} sx={{ height: 'calc(100vh - 100px)' }}>
            <Grid sx={{ display: { xs: 'none', md: 'block' } }}>
                <ProfileSidebar
                    profiles={[]}
                    onGenerate={handleGenerateProfile}
                    selectedModel={model}
                    onModelChange={setModel}
                />
            </Grid>
            <Grid>
                <Outlet />
            </Grid>
        </Grid>
    );
};