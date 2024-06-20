import {updateCurrentUser} from './../../services/apiAuth'
import {useMutation,useQueryClient} from '@tanstack/react-query'
import toast from 'react-hot-toast'


export function useUpdatedUser(){
	const queryClient = useQueryClient();
	const {isLoading:isUpdating,mutate:updateUser} = useMutation({
		mutationFn:updateCurrentUser,
		onSuccess:() => {
			toast.success('User Updated');
			queryClient.invalidateQueries({queryKey:['user']});
		},
		onError:err => toast.error(err.message),
	});
	return {isUpdating,updateUser};
}