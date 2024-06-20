import React from 'react';
import {useUser} from './../features/authentication/useUser';
import styled from 'styled-components';
import Spinner from './Spinner';
import {useNavigate} from 'react-router-dom';


const FullPage = styled.div`
	height:100vh;
	background-color:var(--color-grey-50);
	display:flex;
	align-items:center;
	justify-content:center;
`;

export default function ProtectedRoute({children}){
	const navigate = useNavigate();
	const {user,isSignin,isAuth} = useUser();
	const pathName = window.location.pathname;

	React.useEffect(function(){
		if(!isAuth && !isSignin){
			if(pathName !== '/')
				navigate(`/login?redirectTo=${pathName}&message=Please, Login`);
			else navigate('/login');
		}
	},[isAuth,isSignin,navigate,pathName]);

	if(isSignin) return <FullPage><Spinner /></FullPage>

	if(isAuth) return children;
}
