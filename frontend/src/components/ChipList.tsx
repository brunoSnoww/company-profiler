import React  from 'react';

import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';


export const ChipList: React.FC<{
    title: string;
    items: string[];
    icon: React.ReactNode;
    color?: 'default' | 'primary' | 'secondary';
    variant?: 'filled' | 'outlined';
}> = ({ title, items, icon, color = 'default', variant = 'outlined' }) => (
    <Stack spacing={1.5} sx={{ mt: 2 }}>
        <Stack direction="row" alignItems="center" spacing={1}>
            {icon}
            <Typography variant="subtitle1" fontWeight="bold">
                {title}
            </Typography>
        </Stack>
        <Stack direction="row" useFlexGap flexWrap="wrap" spacing={1}>
            {items.map((item) => (
                <Chip key={item} label={item} size="small" variant={variant} color={color} />
            ))}
        </Stack>
    </Stack>
);

