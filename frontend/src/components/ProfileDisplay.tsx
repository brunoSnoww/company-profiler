import React, { useEffect } from 'react';
import { useQuery } from "@tanstack/react-query";
import { getCompanyProfile } from "../api/companyProfile.ts";
import { CompanyDataCard } from "./CompanyDataCard.tsx";
import { CardSkeleton } from "./CardSkeleton.tsx";
import { Box, Typography } from "@mui/material";
import type {CompanyProfile, Model, ServiceLine} from "../types/types.tsx";

interface ProfileDisplayProps {
    profile: CompanyProfile | null;
    onProfileUpdate: (profile: CompanyProfile) => void;
    model: Model;
}

export const ProfileDisplay: React.FC<ProfileDisplayProps> = ({ profile, onProfileUpdate, model }) => {
    const { data, status, isError } = useQuery({
        queryKey: ['companyProfile', profile?.url],
        queryFn: () => getCompanyProfile(profile!.url, model),
        enabled: !!profile && profile.service_lines.length === 0,
        retry: 1,
    });

    useEffect(() => {
        if (status === 'success' && data) {
            const structuredServiceLines: ServiceLine[] = (data.service_line || []).map((name: string) => ({
                name: name,
                description: data.company_description,
                tier1_keywords: data.tier1_keywords,
                tier2_keywords: data.tier2_keywords
            }));

            onProfileUpdate({
                url: profile!.url,
                company_name: data.company_name,
                service_lines: structuredServiceLines,
                poc: "",
                emails: []
            });
        }
    }, [data, status, onProfileUpdate, profile]);

    const isLoading = status === 'pending';
    const hasNoData = profile?.service_lines.length === 0;

    if (!profile) {
        return (
            <Box sx={{ p: 3, textAlign: 'center', color: 'text.secondary' }}>
                <Typography variant="h6">Welcome!</Typography>
                <Typography>Select a profile or generate a new one to begin.</Typography>
            </Box>
        );
    }

    if (isLoading || (hasNoData && !isError)) {
        return <CardSkeleton />;
    }

    if (isError) {
        return (
            <Box sx={{ p: 3, textAlign: 'center', color: 'error.main' }}>
                <Typography variant="h6">Error Loading Profile</Typography>
                <Typography>The website may be offline or the selected model failed.</Typography>
            </Box>
        );
    }

    return <CompanyDataCard profile={profile} onUpdate={onProfileUpdate} />;
};