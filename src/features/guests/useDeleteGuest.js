import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteGuest as deleteGuestsApi } from "../../services/apiGuests";
import toast from "react-hot-toast";


export function useDeleteGuest(){
    const queryClient = useQueryClient();
    const {isLoading:isDeleting,mutate:deleteGuests} = useMutation({
        mutationFn:id => deleteGuestsApi(id),
        onSuccess:() => {
            toast.success('Guests deleted');
            queryClient.invalidateQueries({queryKey:['guests']});
        },
        onError:err => toast.error(err.message),
    });
    return {isDeleting,deleteGuests};
}