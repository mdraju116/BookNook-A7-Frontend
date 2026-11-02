import toast from "react-hot-toast";
import { authClient } from "./auth-client";


//accessing jwt token for client component  
export const getClientToken = async () => {
   
    const { data, error } = await authClient.token();

    // console.log("Token response:", { data, error });
    
    if (error || !data?.token) {
        toast.error("Error accessing JWT token")
        return
    }
    

    const jwtToken = data.token;
    //console.log(jwtToken);
    return jwtToken;
}