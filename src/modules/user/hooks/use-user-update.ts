import { useMutation, useQueryClient } from "@tanstack/react-query";
import { UserPut } from "../types/user";
import { updateUser } from "../actions/user";
import { toast } from "@pheralb/toast";

const useUserUpdate = () => {
  const queryClient = useQueryClient();
  const { mutateAsync: updateUserFn, isPending } = useMutation({
    mutationKey: ["user", "update"],
    mutationFn: async ({ data }: { data: FormData }) => {
      return updateUser(data);
    },
    onSuccess: ({
      message,
      user,
      status,
      success,
      errors,
    }: {
      message: string;
      user: UserPut | null;
      status: number;
      success: boolean;
      errors?: { key: string; error: string }[];
    }) => {
      if (status === 201 || (status === 200 && success)) {
        toast.success({
          text: message,
          description: user
            ? `Usuario ${user.name} actualizado correctamente! ✨`
            : "",
          theme: "light",
          delayDuration: 7000,
        });
      }

      if (status === 422 && !success) {
        errors?.forEach((err, index) => {
          setTimeout(() => {
            toast.warning({
              text: "Advertencia",
              description: err.error,
              theme: "light",
              delayDuration: 7000,
            });
          }, index * 700);
        });
      }

      if (status === 500 && !success) {
        toast.error({
          text: message,
          description: "Ocurrio un error, comuníquese con los administradores",
          theme: "light",
          delayDuration: 7000,
        });
      }

      queryClient.invalidateQueries({
        queryKey: ["user", "all"],
      });
    },
  });

  return { updateUserFn, isPending };
};

export default useUserUpdate;
