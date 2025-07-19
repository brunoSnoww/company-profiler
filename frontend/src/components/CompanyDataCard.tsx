import React, { useState } from 'react';
import { Card, CardContent, Typography, Stack, Avatar, Divider, Box, Button, TextField, Chip } from '@mui/material';
import { ChipList } from "./ChipList.tsx";
import LabelIcon from '@mui/icons-material/Label';
import DownloadIcon from '@mui/icons-material/Download';
import type {CompanyDownloadData, CompanyProfile, ServiceLine} from "../types/types.ts";
import { validateEmail } from "../utils/validateEmail.ts";
import { handleDownload } from "../utils/downloadJson.ts";

interface CompanyDataCardProps {
    profile: CompanyProfile;
    onUpdate: (profile: CompanyProfile) => void;
}

export const CompanyDataCard: React.FC<CompanyDataCardProps> = ({ profile, onUpdate }) => {
    const [newServiceLine, setNewServiceLine] = useState('');
    const [newEmail, setNewEmail] = useState('');
    const [emailError, setEmailError] = useState(false);

    const mainServiceData = profile.service_lines[0] || { description: '', tier1_keywords: [], tier2_keywords: [] };

    const handleUpdatePOC = (poc: string) => {
        onUpdate({ ...profile, poc });
    };

    const handleAddServiceLine = () => {
        if (newServiceLine && !profile.service_lines.find(sl => sl.name === newServiceLine)) {
            const addedServiceLine: ServiceLine = {
                name: newServiceLine,
                description: mainServiceData.description,
                tier1_keywords: mainServiceData.tier1_keywords,
                tier2_keywords: mainServiceData.tier2_keywords,
            };
            onUpdate({ ...profile, service_lines: [...profile.service_lines, addedServiceLine] });
            setNewServiceLine('');
        }
    };

    const handleDeleteServiceLine = (serviceNameToDelete: string) => {
        const updatedServiceLines = profile.service_lines.filter(sl => sl.name !== serviceNameToDelete);
        onUpdate({ ...profile, service_lines: updatedServiceLines });
    };

    const handleAddEmail = () => {
        if (newEmail && validateEmail(newEmail)) {
            const updatedEmails = Array.from(new Set([...(profile.emails || []), newEmail]));
            onUpdate({ ...profile, emails: updatedEmails });
            setNewEmail('');
            setEmailError(false);
        } else {
            setEmailError(true);
        }
    };

    const handleDeleteEmail = (emailToDelete: string) => {
        const updatedEmails = profile.emails?.filter(e => e !== emailToDelete);
        onUpdate({ ...profile, emails: updatedEmails });
    };

    const onDownloadClick = () => {
        const downloadData: CompanyDownloadData = {
            company_name: profile.company_name,
            company_description: mainServiceData.description,
            service_line: profile.service_lines.map(sl => sl.name),
            tier1_keywords: mainServiceData.tier1_keywords,
            tier2_keywords: mainServiceData.tier2_keywords,
            // Add the POC and emails to the download object
            poc: profile.poc,
            emails: profile.emails,
        };
        handleDownload(downloadData);
    };

    return (
        <Card sx={{ maxWidth: 800, m: 2, borderRadius: 3, boxShadow: '0 4px 20px 0 rgba(0,0,0,0.12)' }}>
            <CardContent sx={{ p: 3 }}>
                <Stack direction="row" spacing={2} justifyContent="space-between" alignItems="center">
                    <Stack direction="row" spacing={2} alignItems="center">
                        <Avatar>{profile.company_name[0]?.toUpperCase()}</Avatar>
                        <Typography variant="h5" component="div" fontWeight="bold">
                            {profile.company_name}
                        </Typography>
                    </Stack>
                    <Button
                        variant="outlined"
                        startIcon={<DownloadIcon />}
                        onClick={onDownloadClick}
                    >
                        Download JSON
                    </Button>
                </Stack>
                <Typography variant="body1" color="text.secondary" sx={{mt: 2}}>
                    {mainServiceData.description}
                </Typography>
            </CardContent>

            <Divider />

            <CardContent>
                <Typography variant="subtitle1" fontWeight="bold">Service Lines</Typography>
                <Box sx={{ display: 'flex', gap: 1, my: 2 }}>
                    <TextField fullWidth size="small" label="Add new service line" value={newServiceLine} onChange={(e) => setNewServiceLine(e.target.value)} />
                    <Button variant="contained" onClick={handleAddServiceLine}>Add</Button>
                </Box>
                <Stack direction="row" useFlexGap flexWrap="wrap" spacing={1}>
                    {profile.service_lines.map((service) => (
                        <Chip key={service.name} label={service.name} onDelete={() => handleDeleteServiceLine(service.name)} />
                    ))}
                </Stack>
            </CardContent>

            <Divider />

            <CardContent>
                <ChipList title="Keywords" items={mainServiceData.tier1_keywords} icon={<LabelIcon />} color="secondary" />
                <ChipList title="Industry Topics" items={mainServiceData.tier2_keywords} icon={<LabelIcon />} />
            </CardContent>

            <Divider />

            <CardContent>
                <Typography variant="subtitle1" fontWeight="bold" sx={{ mb: 2 }}>Contact Information 📞</Typography>
                <TextField fullWidth label="Point of Contact (POC)" value={profile.poc || ''} onChange={(e) => handleUpdatePOC(e.target.value)} variant="outlined" sx={{ mb: 3 }} />
                <Box sx={{ display: 'flex', gap: 1, my: 2 }}>
                    <TextField fullWidth size="small" label="Add Contact Email" value={newEmail} onChange={(e) => setNewEmail(e.target.value)} error={emailError} helperText={emailError ? "Invalid email format" : ""} />
                    <Button variant="contained" onClick={handleAddEmail}>Add</Button>
                </Box>
                <Stack direction="row" useFlexGap flexWrap="wrap" spacing={1}>
                    {profile.emails?.map((email) => (
                        <Chip key={email} label={email} onDelete={() => handleDeleteEmail(email)} />
                    ))}
                </Stack>
            </CardContent>
        </Card>
    );
};