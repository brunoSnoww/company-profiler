import React from 'react';
import { CompanyDataCard } from "./CompanyDataCard.tsx";
import { Box } from "@mui/material";
import {useParams, useSearchParams} from "react-router-dom";
import {profileDetailsQuery} from "../api/loader.ts";
import {useQuery} from "@tanstack/react-query";
import type {Model} from "../types/types.tsx";
import {CardSkeleton} from "./CardSkeleton.tsx";

export const ProfileDisplay: React.FC = () => {
    const [searchParams] = useSearchParams();
    const params = useParams();
    const model = searchParams.get('model') as Model || 'openai'
    const profileUrl = params.profileUrl as string;

    const {data: profile } = useQuery({
        ...profileDetailsQuery(profileUrl,model)
    })

    if (!profile) {
        return (
            <Box sx={{ p: 3, textAlign: 'center', color: 'text.secondary' }}>
              <CardSkeleton />
            </Box>
        );
    }

    return <CompanyDataCard profile={profile}  />
};