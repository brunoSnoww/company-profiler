import {CompanyDataCard} from "./CompanyDataCard.tsx";
import {CardSkeleton} from "./CardSkeleton.tsx";
import {useNotification} from "../contexts/NotificationContext.tsx";
import {useQuery} from "@tanstack/react-query";
import type {CompanyDataCardProps} from "../types/CompanyDataCardProps.ts";
import {getCompanyProfile} from "../api/companyProfile.ts";

interface CompanyCardProps {
    url: string;
    onLoad: () => void;
    onError: () => void;
}

const companyProfileKey = (url: string) => ['companyProfile', url];

export const CompanyCard: React.FC<CompanyCardProps> = (
    { url, onLoad, onError}) => {
    const { triggerNotification } = useNotification();

    const queryFn = async () => {
        try {
            return await getCompanyProfile(url);
        } catch (error: any) {
            // Check if error.response.status is 403 (Axios style)
            if (error.response?.status === 403) {
                triggerNotification({
                    message: `Website ${url} not supported due to request restrictions`,
                });
            } else {
                triggerNotification({
                    message: 'An error occurred when fetching the profile',
                });
            }
            onError();
            throw error;
        } finally {
            onLoad();
        }
    };


    const { data, isError } = useQuery<CompanyDataCardProps | null>({
        queryKey: companyProfileKey(url),
        queryFn,
        enabled: Boolean(url),
        retry: 1,
    });

    if(isError) return null

    return data == null  ? (
        <CardSkeleton />
    ) : (
        <CompanyDataCard {...data} />
    );
};
