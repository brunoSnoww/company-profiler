import React, { useState } from 'react';
import { Grid } from "@mui/material";
import { ProfileSidebar } from "./ProfileSidebar.tsx";
import { ProfileDisplay } from "./ProfileDisplay.tsx";
import type {CompanyProfile, Model} from "../types/types.tsx";

export const Dashboard: React.FC = () => {
    const [profiles, setProfiles] = useState<CompanyProfile[]>([]);
    const [activeUrl, setActiveUrl] = useState<string | null>(null);
    const [selectedModel, setSelectedModel] = useState<Model>('openai');

    const handleGenerateProfile = (url: string) => {
        if (!profiles.some(p => p.url === url)) {
            const newProfile: CompanyProfile = {
                url,
                company_name: "Loading...",
                service_lines: []
            };
            setProfiles(prev => [newProfile, ...prev]);
        }
        setActiveUrl(url);
    };

    const handleUpdateProfile = (updatedProfile: CompanyProfile) => {
        setProfiles(prev => prev.map(p => p.url === updatedProfile.url ? updatedProfile : p));
    };

    const activeProfile = profiles.find(p => p.url === activeUrl) ?? null;

    return (
        <Grid container spacing={2} sx={{ height: 'calc(100vh - 100px)' }}>
            <Grid
                sx={{ display: { xs: 'none', md: 'block' } }}
            >
                <ProfileSidebar
                    profiles={profiles}
                    activeUrl={activeUrl}
                    onProfileSelect={setActiveUrl}
                    onGenerate={handleGenerateProfile}
                    selectedModel={selectedModel}
                    onModelChange={setSelectedModel}
                />
            </Grid>

            <Grid>
                <ProfileDisplay
                    key={`${activeUrl}-${selectedModel}`}
                    profile={activeProfile}
                    onProfileUpdate={handleUpdateProfile}
                    model={selectedModel}
                />
            </Grid>
        </Grid>
    );
};