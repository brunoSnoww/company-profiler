import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import LabelIcon from '@mui/icons-material/Label';
import TextField from '@mui/material/TextField';
import { validateEmail } from "../utils/validateEmail";
import { ChipList } from "./ChipList";
import type {CompanyDataCardProps} from "../types/CompanyDataCardProps.ts";
import {Avatar} from "@mui/joy";

export const CompanyDataCard: React.FC<CompanyDataCardProps> = ({
                                                                    company_name,
                                                                    company_description,
                                                                    service_line,
                                                                    tier1_keywords,
                                                                    tier2_keywords,
                                                                }) => {
    const [editablePOC, setEditablePOC] = useState("");
    const [editableEmail, setEditableEmail] = useState('');
    const [editableEmails, setEditableEmails] = useState<string[]>([]);
    const [editableServiceLines, setEditableServiceLines] = useState(service_line);
    const [newServiceLine, setNewServiceLine] = useState('');
    const [emailError, setEmailError] = useState(false);

    const handleAddEmail = () => {
        if (editableEmail && !editableEmails.includes(editableEmail)) {
            if (validateEmail(editableEmail)) {
                setEditableEmails([...editableEmails, editableEmail]);
                setEditableEmail('');
                setEmailError(false);
            } else {
                setEmailError(true);
            }
        }
    };

    const handleDeleteEmail = (emailToDelete: string) => {
        setEditableEmails(editableEmails.filter(email => email !== emailToDelete));
    };

    const handleAddServiceLine = () => {
        if (newServiceLine) {
            setEditableServiceLines([...editableServiceLines, newServiceLine]);
            setNewServiceLine('');
        }
    };

    const handleDeleteServiceLine = (serviceLineToDelete: string) => {
        setEditableServiceLines(editableServiceLines.filter(serviceLine => serviceLine !== serviceLineToDelete));
    };

    return (
        <Card sx={{ maxWidth: 700, m: 2, borderRadius: 3, boxShadow: '0 4px 20px 0 rgba(0,0,0,0.12)' }}>
            <CardContent sx={{ p: 3 }}>
                <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 2 }}>
                    <Avatar>{company_name[0].toUpperCase()}</Avatar>
                    <Typography variant="h5" component="div" fontWeight="bold">
                        {company_name}
                    </Typography>
                </Stack>

                <Typography variant="body1" color="text.secondary">
                    {company_description}
                </Typography>
            </CardContent>

            <Divider variant="middle" />

            <CardContent sx={{ p: 3 }}>
                <Typography variant="subtitle1" fontWeight="bold">
                    Service Lines
                </Typography>
                <div style={{display: "flex", gap: "8px", alignItems: "center"}}>
                    <TextField
                        label="Add Line"
                        value={newServiceLine}
                        onChange={(e) => setNewServiceLine(e.target.value)}
                        fullWidth
                        variant="outlined"
                        sx={{ mt: 2 }}
                    />
                    <Button
                        onClick={handleAddServiceLine}
                        variant="contained"
                        sx={{ mt: 1 }}

                    >
                        Add
                    </Button>
                </div>

                <Stack direction="column" spacing={1} sx={{ mt: 2 }}>
                    {editableServiceLines.map((serviceLine) => (
                        <Stack direction="row" alignItems="center" key={serviceLine}>
                            <Chip label={serviceLine} variant="outlined" sx={{ mr: 1 }} />
                            <Button
                                size="small"
                                onClick={() => handleDeleteServiceLine(serviceLine)}
                                color="error">
                                Delete
                            </Button>
                        </Stack>
                    ))}
                </Stack>

                <ChipList
                    title="Keywords"
                    items={tier1_keywords}
                    icon={<LabelIcon color="action" />}
                    color="secondary"
                />
                <ChipList
                    title="Industry Topics"
                    items={tier2_keywords}
                    icon={<LabelIcon color="action" />}
                    color="default"
                />
            </CardContent>

            <CardContent sx={{ p: 3 }}>
                <TextField
                    label="Point of Contact"
                    value={editablePOC}
                    onChange={(e) => setEditablePOC(e.target.value)}
                    fullWidth
                    multiline
                    rows={4}
                    variant="outlined"
                    sx={{ mb: 2 }}
                />

                <TextField
                    label="Add Email"
                    value={editableEmail}
                    onChange={(e) => setEditableEmail(e.target.value)}
                    fullWidth
                    error={emailError}
                    helperText={emailError && "Incorrect email format."}
                    variant="outlined"
                    sx={{ mb: 2 }}
                />
                <Button onClick={handleAddEmail} variant="contained" sx={{ mb: 2 }}>
                    Add Email
                </Button>

                <Stack direction="column" spacing={1}>
                    {editableEmails.map((emailItem) => (
                        <Stack direction="row" alignItems="center" key={emailItem}>
                            <Chip label={emailItem} variant="outlined" sx={{ mr: 1 }} />
                            <Button
                                size="small"
                                onClick={() => handleDeleteEmail(emailItem)}
                                color="error">
                                Delete
                            </Button>
                        </Stack>
                    ))}
                </Stack>
            </CardContent>
        </Card>
    );
};
