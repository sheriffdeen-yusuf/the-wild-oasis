import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login as loginApi } from "../../services/apiAuth";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export function useAuth() {
  const naviagte = useNavigate();
  const queryClient = useQueryClient();

  const { mutate: login, isLoading } = useMutation({
    mutationFn: ({ email, password }) => loginApi({ email, password }),
    onSuccess: (user) => {
      queryClient.setQueryData(["user"], user.user);
      naviagte("/dashboard");
    },
    onError: (error) => {
      console.log("error", error);
      toast.error("provided email or password is incorrect!");
    },
  });
  return {
    login,
    isLoading,
  };
}
