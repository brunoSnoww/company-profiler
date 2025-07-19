import type {CompanyDownloadData} from "../types/types.tsx";

export const handleDownload = (data: CompanyDownloadData) => {
    const json = JSON.stringify(data, null, 2);
    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${data.company_name.replace(/\s+/g, "_")}_data.json`;
    a.click();
    URL.revokeObjectURL(url);
};