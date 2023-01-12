import { useRouter } from "next/router";
import { setUser } from "../utlis/token/token";
import { trpc } from "../utlis/trpc/trpc";

const useSignup = () => {
    const router = useRouter();

    const { mutate, isLoading } = trpc.user.signup.useMutation({
        onSuccess: (data) => {
            if(data?.token){
                setUser(data?.token)
            } 
            router.push("/myfiles")
        }
    });

    const signup = (): void => {
        mutate()
    }

    return { signup, isLoading };
}

export default useSignup;