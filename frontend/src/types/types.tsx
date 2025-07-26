export interface ServiceLine {
    name: string;
    description: string;
    tier1_keywords: string[];
    tier2_keywords: string[];
}

export interface CompanyProfile {
    url: string;
    company_name: string;
    service_line: ServiceLine[];
    poc?: string;
    emails?: string[];
}

export interface CompanyDownloadData {
    company_name: string;
    company_description: string;
    service_line: string[];
    tier1_keywords: string[];
    tier2_keywords: string[];
    poc?: string;
    emails?: string[];
}

export type Model = 'openai' | 'google'