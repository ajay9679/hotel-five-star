import { useQuery,useQueryClient } from "@tanstack/react-query";
import { getGuests } from "../../services/apiGuests";
import {useSearchParams,useLocation} from 'react-router-dom';
import {PAGE_SIZE} from './../../utils/constants'


export function useGuests(){
	const queryClient = useQueryClient();
	const [searchParams] = useSearchParams();
	const location = useLocation();
	// console.log('loc:',location)
	let filter,sortBy,page;
	// Only do filtering, sorting and pagination if on the guests page
	if(location.pathname === '/guests'){
		const filterValue = searchParams.get('bookings') || 'all';
		filter = !filterValue || filterValue === 'all' ? null : {field:'bookings.status',value:filterValue}
		// console.log(filter)
		const sortByValue = searchParams.get('sortBy') || 'fullName-asc';
		const [field,direction] = sortByValue.split('-');
		sortBy = {field,direction};

		//PAGINATION
		page = !searchParams.get('page') ? 1 : +searchParams.get('page');
	}
	const{isLoading:isLoadingGuests,data:{data:guests,count}={},error} = useQuery({
		queryKey:['guests',filter,sortBy,page],
		queryFn:() => getGuests(filter,sortBy,page),
	});
	const pageCount = Math.ceil(count / PAGE_SIZE);
	if(page < pageCount){
		queryClient.prefetchQuery({
			queryKey: ['guests', filter, sortBy, page + 1],
			queryFn: () => getGuests(filter, sortBy, page + 1),
		});
	}
	if(page > 1){
		queryClient.prefetchQuery({
			queryKey: ['guests', filter, sortBy, page - 1],
			queryFn: () => getGuests(filter, sortBy, page - 1),
		});
	}
	
	return {isLoadingGuests,guests,error,count};
}