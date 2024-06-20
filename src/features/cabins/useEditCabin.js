import {createEditCabin as createEditCabinApi} from './../../services/apiCabins'
import {useMutation,useQueryClient} from '@tanstack/react-query'
import toast from 'react-hot-toast'


export function useEditCabin(){
	const queryClient = useQueryClient();
	const {isLoading:isEditing,mutate:editCabin} = useMutation({
		mutationFn:({newCabin,id}) => createEditCabinApi(newCabin,id),
		onSuccess:() => {
			toast.success('Cabin Updated');
			queryClient.invalidateQueries({queryKey:['cabins']});
		},
		onError:err => toast.error(err.message),
	});
	return {isEditing,editCabin};
}