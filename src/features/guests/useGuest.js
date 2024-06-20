import { useQuery} from "@tanstack/react-query";
import { getGuest} from "../../services/apiGuests";
import {useParams} from 'react-router-dom';


export function useGuest(){
	const {guestId} = useParams();
	const{isLoading:isGuest,data:guest={},error} = useQuery({
		queryKey:['guest',guestId],
		queryFn:() => getGuest(guestId),
	});
	return {isGuest,guest};
}

