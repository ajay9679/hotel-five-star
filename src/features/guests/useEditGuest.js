import {updateGuest as updateGuestApi} from './../../services/apiGuests'
import {useMutation,useQueryClient} from '@tanstack/react-query'
import toast from 'react-hot-toast'


export function useEditGuest(){
	const queryClient = useQueryClient();
	const {isLoading:isEditing,mutate:editGuest} = useMutation({
		mutationFn:updateGuestApi,
		onSuccess:() => {
			toast.success('Guest Updated');
			queryClient.invalidateQueries({queryKey:['guests']});
		},
		onError:err => toast.error(err.message),
	});
	return {isEditing,editGuest};
}