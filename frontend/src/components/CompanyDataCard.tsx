import React, { useState, useEffect } from 'react';
import { Card, CardContent, Typography, Stack, Avatar, Divider, Box, Button, TextField, Chip } from '@mui/material';
import { ChipList } from "./ChipList.tsx"; // Assuming you have this component
import LabelIcon from '@mui/icons-material/Label';
import DownloadIcon from '@mui/icons-material/Download';
import type {CompanyDownloadData} from "../types/types.ts";
import { validateEmail } from "../utils/validateEmail.ts";
import { handleDownload } from "../utils/downloadJson.ts";

interface CompanyDataCardProps {
    profile: CompanyDownloadData
}

export const CompanyDataCard: React.FC<CompanyDataCardProps> = ({ profile }) => {
    const [serviceLines, setServiceLines] = useState(profile.service_line);

    const [poc, setPoc] = useState('');
    const [emails, setEmails] = useState<string[]>([]);

    const [newServiceLine, setNewServiceLine] = useState('');
    const [newEmail, setNewEmail] = useState('');
    const [emailError, setEmailError] = useState(false);

    useEffect(() => {
        setServiceLines(profile.service_line);
        setPoc('');
        setEmails([]);
    }, [profile]);

    const handleAddServiceLine = () => {
        if (newServiceLine && !serviceLines.includes(newServiceLine)) {
            setServiceLines(prev => [...prev, newServiceLine]);
            setNewServiceLine('');
        }
    };

    const handleDeleteServiceLine = (serviceToDelete: string) => {
        setServiceLines(prev => prev.filter(sl => sl !== serviceToDelete));
    };

    const handleAddEmail = () => {
        if (newEmail && validateEmail(newEmail) && !emails.includes(newEmail)) {
            setEmails(prev => [...prev, newEmail]);
            setNewEmail('');
            setEmailError(false);
        } else {
            setEmailError(true);
        }
    };

    const handleDeleteEmail = (emailToDelete: string) => {
        setEmails(prev => prev.filter(e => e !== emailToDelete));
    };

    const onDownloadClick = () => {
        const downloadData = {
            company_name: profile.company_name,
            company_description: profile.company_description,
            service_line: serviceLines,
            tier1_keywords: profile.tier1_keywords,
            tier2_keywords: profile.tier2_keywords,
            poc: poc,
            emails: emails,
        };
        handleDownload(downloadData);
    };

    if (!profile) return null;

    return (
        <Card sx={{ maxWidth: 800, m: 2, borderRadius: 3, boxShadow: '0 4px 20px 0 rgba(0,0,0,0.12)' }}>
            {/* Display-Only Header */}
            <CardContent sx={{ p: 3 }}>
                <Stack direction="row" spacing={2} justifyContent="space-between" alignItems="center">
                    <Stack direction="row" spacing={2} alignItems="center">
                        <Avatar>{profile.company_name[0]?.toUpperCase()}</Avatar>
                        <Typography variant="h5" component="div" fontWeight="bold">
                            {profile.company_name}
                        </Typography>
                    </Stack>
                    <Button variant="outlined" startIcon={<DownloadIcon />} onClick={onDownloadClick}>
                        Download JSON
                    </Button>
                </Stack>
                <Typography variant="body1" color="text.secondary" sx={{ mt: 2 }}>
                    {profile.company_description}
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
                    {serviceLines.map((service) => (
                        <Chip key={service} label={service} onDelete={() => handleDeleteServiceLine(service)} />
                    ))}
                </Stack>
            </CardContent>

            <Divider />

            <CardContent>
                <ChipList title="Keywords" items={profile.tier1_keywords} icon={<LabelIcon />} color="secondary" />
                <ChipList title="Industry Topics" items={profile.tier2_keywords} icon={<LabelIcon />} />
            </CardContent>

            <Divider />

            {/* Editable Section for Contacts */}
            <CardContent>
                <Typography variant="subtitle1" fontWeight="bold" sx={{ mb: 2 }}>Contact Information 📞</Typography>
                <TextField fullWidth label="Point of Contact (POC)" value={poc} onChange={(e) => setPoc(e.target.value)} variant="outlined" sx={{ mb: 3 }} />
                <Box sx={{ display: 'flex', gap: 1, my: 2 }}>
                    <TextField fullWidth size="small" label="Add Contact Email" value={newEmail} onChange={(e) => setNewEmail(e.target.value)} error={emailError} helperText={emailError ? "Invalid email format" : ""} />
                    <Button variant="contained" onClick={handleAddEmail}>Add</Button>
                </Box>
                <Stack direction="row" useFlexGap flexWrap="wrap" spacing={1}>
                    {emails.map((email) => (
                        <Chip key={email} label={email} onDelete={() => handleDeleteEmail(email)} />
                    ))}
                </Stack>
            </CardContent>
        </Card>
    );
};