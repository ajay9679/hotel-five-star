import React,{ useState } from "react";
import {useNavigate} from 'react-router-dom';

import Button from "../../ui/Button";
import Form from "../../ui/Form";
import FormRowVertical from "../../ui/FormRowVertical";
import SpinnerMini from "../../ui/SpinnerMini";
import Input from "../../ui/Input";
import Spinner from "../../ui/Spinner";

import {useLogin} from './useLogin';
import {useUser} from './useUser';


export default function LoginForm(){
    const navigate = useNavigate();
    const {login,isLogin} = useLogin();
    const {isAuth,isSignin} = useUser();
    const [email, setEmail] = useState("shima@gmail.com");
    const [password, setPassword] = useState("test1234");
    
    function handleSubmit(e){
        e.preventDefault();
        if(!email || !password) return;
        login({email,password},{
            onSettled:() => {
                setEmail('');
                setPassword('');
            }
        });
    }

    React.useEffect(function(){
        if(isAuth) navigate('/dashboard',{replace:true});
    },[isAuth,navigate]);

    if(isSignin) return <Spinner />
    
    return <Form onSubmit={handleSubmit}>
        <FormRowVertical label="Email address" orientation="vertical">
            <Input type="email" id="email" autoComplete="username" value={email} onChange={(e) => setEmail(e.target.value)} disabled={isSignin} />
        </FormRowVertical>
        <FormRowVertical label="Password" orientation="vertical">
            <Input type="password" id="password" autoComplete="current-password" value={password} onChange={(e) => setPassword(e.target.value)} disabled={isSignin} />
        </FormRowVertical>
        <FormRowVertical orientation="vertical">
            <Button disabled={isSignin} size="large">
                {!isSignin ? 'Login' : <SpinnerMini />}
            </Button>
        </FormRowVertical>
    </Form>
}


