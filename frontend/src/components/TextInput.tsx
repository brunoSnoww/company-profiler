import TextField from '@mui/material/TextField';

type TextInputProps = {
    error: boolean,
    input: string,
    setInput: any
}

export function TextInput({error, input, setInput}: TextInputProps) {
    return (
        <TextField
            fullWidth
            error={error}
            helperText={error && "Incorrect URL format."}
            id={'text-input'}
            label="Company URL"
            value={input}
            onChange={e => setInput(e.currentTarget.value)}
        />
    );
}