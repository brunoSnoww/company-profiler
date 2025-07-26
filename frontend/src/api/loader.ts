import type {Model} from "../types/types.tsx";
import {getCompanyProfile} from "./companyProfile.ts";
import type {LoaderFunctionArgs} from "react-router-dom";

export const profileDetailsQuery = (profileUrl: string,model:Model) => ({
    queryKey: ['profile', profileUrl,model],
    queryFn: () => getCompanyProfile(profileUrl,model),
});

export const loader =  ({ params, request }: LoaderFunctionArgs) => {
    const url = new URL(request.url);

    const model = url.searchParams.get('model') || 'openai';
    const profileUrl = params.profileUrl;

    if (!profileUrl) {
        throw new Response("", { status: 404, statusText: "Not Found" });
    }

    return getCompanyProfile(profileUrl,model as Model);

};