import './App.css';
import { useState } from "react";
import { Button } from "@mui/material";
import { isValidUrl } from "./utils/isValidUrl.ts";
import { CompanyCard } from "./components/CompanyCard.tsx";
import { TextInput } from "./components/TextInput.tsx";

function App() {
    const [textInput, setTextInput] = useState("https://www.atera.com/");
    const [isInvalidUrl, setIsInvalidUrl] = useState(false);
    const [urlList, setUrlList] = useState<Array<string>>([]);
    const [isButtonDisabled, setIsDisabled] = useState(false);
    const handleClick = (url: string) => {
        if (!isValidUrl(url)) {
            setIsInvalidUrl(true);
        } else {
            setIsInvalidUrl(false);
            if (!urlList.includes(url)) {
                setIsDisabled(true)
                setUrlList(prevList => [url, ...prevList]);
            }
        }
    };

    return (
        <>
            <header className="app-header">
                <h1>Profile Generator 🏢</h1>
            </header>

            <main className="container">
                <section className="header-section">
                    <h2 className="input-label">
                        Enter a company website to generate a profile.
                    </h2>
                    <div className="input-area">
                        <TextInput
                            error={isInvalidUrl}
                            input={textInput}
                            setInput={setTextInput}
                        />
                        <Button
                            variant="contained"
                            size="large"
                            onClick={() => handleClick(textInput)}
                            disabled={isButtonDisabled}
                        >
                            Generate
                        </Button>
                    </div>
                </section>
            </main>

            <section className="url-list-section">
                {urlList.map(url => (
                    <div key={url} className="url-card">
                        <CompanyCard
                            url={url}
                            // not the best way to share such state, kept this way for simplicity
                            onLoad={() => setIsDisabled(false)}
                        />
                    </div>
                ))}
            </section>
        </>
    );
}

export default App;