import { useMutation, useQueryClient } from '@tanstack/react-query';
import { login as loginApi } from '../../services/apiAuth';
import { useNavigate,useSearchParams } from 'react-router-dom';
import { toast } from 'react-hot-toast';



export function useLogin(){
	const queryClient = useQueryClient();
	const navigate = useNavigate();
	const [searchParams,setSearchParams] = useSearchParams();
	const redirectTo = searchParams.get('redirectTo') || null;
	const { mutate: login, isLoading:isLogin } = useMutation({
		mutationFn: ({ email, password }) => loginApi({ email, password }),
		onSuccess:user => {
			queryClient.setQueryData(['user'], user.user);
			redirectTo ? navigate(redirectTo) : navigate('/dashboard', { replace: true });
    	},
    	onError:err => {
      		console.log('ERROR', err);
      		toast.error('Provided email or password are incorrect');
    	},
  	});
	
	return {login,isLogin};
}
