// Utility function to wrap async API calls with error handling and toast notifications

// toast is a library for displaying notifications in React applications
import { toast } from 'react-hot-toast';

export const wrapAsyncApi = async (apiCall) => {
    try {
        const response = await apiCall();
        let {status, data} = response;
        const res = {status, data};
        if (data.message) toast.success(data.message);
        return res;
    } catch (err) {
        let {status, data} = err.response;
        const res = {status, data};
        console.log("Status: ", res.status, "| Message: ", res.data.message);
        toast.error(data.message||"error");
        return res;
    }
};