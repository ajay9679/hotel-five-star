import {useQuery,useQueryClient} from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings";
import {useSearchParams} from 'react-router-dom';
import {PAGE_SIZE} from './../../utils/constants';


export function useBookings(){
	const queryClient = useQueryClient();
	const [searchParams] = useSearchParams();
	
	// FILTER
	const filterValue = searchParams.get('status');
	const filter = !filterValue || filterValue === 'all' ? null : {field:'status',value:filterValue};
	
	// SORTING
	const sortByRaw = searchParams.get('sortBy') || 'startDate-desc';
	// console.log('sort:',sortByRaw)
	const [field,direction] = sortByRaw.split('-');
	const sortBy = {field,direction};
	// console.log(sortBy)

	//PAGINATION
	const page = !searchParams.get('page') ? 1 : +searchParams.get('page');
	const{isLoading,data:{data:bookings,count}={},error} = useQuery({
		queryKey:['bookings',filter,sortBy,page],
		queryFn:() => getBookings({filter,sortBy,page}),
	});

	const pageCount = Math.ceil(count / PAGE_SIZE);
	if(page < pageCount)
		queryClient.prefetchQuery({
			queryKey:['bookings',filter,sortBy,page+1],
			queryFn:() => getBookings({filter,sortBy,page:page+1}),
		});

	if(page > 1)
		queryClient.prefetchQuery({
			queryKey:['bookings',filter,sortBy,page-1],
			queryFn:() => getBookings({filter,sortBy,page:page-1}),
		});

	return {isLoading,bookings,count,error};
}



