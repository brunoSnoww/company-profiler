import type {CompanyDownloadData, Model} from "../types/types.tsx";

export async function getCompanyProfile(url: string,model: Model): Promise<CompanyDownloadData | null> {
    const fullUrl =
        `https://company-profiler-be-production.up.railway.app/profiler?url=${url}&model=${model}`;

    const response = await fetch(fullUrl);
    if (!response.ok) {
        throw new Error('Failed to fetch company profile');
    }
    const data = await response.json();

    return {
        company_name: data.company_name,
        company_description: data.company_description,
        service_line: data.service_line,
        tier1_keywords: data.tier1_keywords,
        tier2_keywords: data.tier2_keywords,
    } as CompanyDownloadData;

}

