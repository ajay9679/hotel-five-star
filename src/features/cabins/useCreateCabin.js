import {createEditCabin as createEditCabinApi} from './../../services/apiCabins'
import {useMutation,useQueryClient} from '@tanstack/react-query'
import toast from 'react-hot-toast'


export function useCreateCabin(){
	const queryClient = useQueryClient();
	const {isLoading:isCreating,mutate:createCabin} = useMutation({
		mutationFn:newCabin => createEditCabinApi(newCabin),
		onSuccess:() => {
			toast.success('Cabin Created');
			queryClient.invalidateQueries({queryKey:['cabins']});
		},
		onError:err => toast.error(err.message),
	});
	return {isCreating,createCabin};
}