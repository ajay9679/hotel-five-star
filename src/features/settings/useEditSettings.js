import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateSetting } from "../../services/apiSettings";
import toast from "react-hot-toast";


export function useEditSettings(){
	const queryClient = useQueryClient();
	const {isLoading:isEditing,mutate:editSetting} = useMutation({
		mutationFn:obj => updateSetting(obj),
		onSuccess:() => {
			toast.success('Settings updated');
			queryClient.invalidateQueries({queryKey:['settings']});
		},
		onError:err => toast.error(err.message),
	});
	return {isEditing,editSetting};
}