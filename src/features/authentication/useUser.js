import {getCurrentUser} from './../../services/apiAuth';
import {useQuery} from '@tanstack/react-query';


export function useUser(){
	const {isLoading:isSignin,data:user} = useQuery({
		queryKey:['user'],
		queryFn:getCurrentUser,
	});
	return {isSignin,user,isAuth:user?.role === 'authenticated'};
}

