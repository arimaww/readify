import { useCurrentQuery } from "../../app/services/auth";
import { LoadingPage } from "../../components/LoadingPage";

export const Auth = ({children}: {children: JSX.Element}) => {
    const {isLoading} = useCurrentQuery();

    if(isLoading) return <LoadingPage />

    return children;
}