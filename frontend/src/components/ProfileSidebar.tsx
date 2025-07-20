import React, { useState } from 'react';
import { Box, Button, List, ListItemButton, ListItemText, TextField, Select, MenuItem, FormControl, InputLabel } from "@mui/material";
import { isValidUrl } from "../utils/isValidUrl.ts";
import type {CompanyProfile, Model} from "../types/types.tsx";

interface ProfileSidebarProps {
    profiles: CompanyProfile[];
    activeUrl: string | null;
    onProfileSelect: (url: string) => void;
    onGenerate: (url:string) => void;
    selectedModel: string;
    onModelChange: (model: Model) => void;
}

const models: Model[] = ['openai', 'google'];

export const ProfileSidebar: React.FC<ProfileSidebarProps> = ({ profiles, activeUrl, onProfileSelect, onGenerate, selectedModel, onModelChange }) => {
    const [textInput, setTextInput] = useState("https://www.hcltech.com/");
    const [isInvalidUrl, setIsInvalidUrl] = useState(false);

    const handleClick = () => {
        if (!isValidUrl(textInput)) {
            setIsInvalidUrl(true);
        } else {
            setIsInvalidUrl(false);
            onGenerate(textInput);
        }
    };

    return (
        <Box sx={{ p: 2, height: '100%', borderRight: '1px solid #ddd' }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4, mb: 2 }}>
                <TextField
                    fullWidth
                    size="small"
                    label="Company Website"
                    value={textInput}
                    onChange={(e) => setTextInput(e.target.value)}
                    error={isInvalidUrl}
                    helperText={isInvalidUrl ? "Invalid URL format" : ""}
                />
                <FormControl fullWidth size="small">
                    <InputLabel>Language Model</InputLabel>
                    <Select
                        value={selectedModel}
                        label="Language Model"
                        onChange={(e) => onModelChange(e.target.value as Model)}
                    >
                        {models.map(modelName => (
                            <MenuItem key={modelName} value={modelName}>
                                {modelName.charAt(0).toUpperCase() + modelName.slice(1)}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <Button variant="contained" onClick={handleClick}>Generate</Button>
            </Box>
            <List component="nav">
                {profiles.map((profile) => (
                    <ListItemButton
                        key={profile.url}
                        selected={activeUrl === profile.url}
                        onClick={() => onProfileSelect(profile.url)}
                    >
                        <ListItemText primary={profile.company_name} secondary={profile.url} />
                    </ListItemButton>
                ))}
            </List>
        </Box>
    );
};