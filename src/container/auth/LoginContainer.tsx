import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import AuthForm from './Form/AuthForm';
import AuthTemplate from './Form/AuthTemplate';
import { AuthActions, AuthData } from '../../store/slices/authSlice';
import { UserActions, UserData } from '../../store/slices/userSlice';
const LoginContainer = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { login, status } = useSelector(AuthData);
    const { user } = useSelector(UserData)
    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target

        dispatch(AuthActions.changeInput({ form: 'login', key: name, value }))
    }
    const onSubmit = () => {
        dispatch(AuthActions.login({ email: login.email, password: login.password }))
    }
    useEffect(() => {
        if (status.message === 'login_ok')
            dispatch(UserActions.check())
    }, [status, dispatch])
    useEffect(() => {
        if (user) {
            navigate('/home');
            try {
                localStorage.setItem('user', JSON.stringify(user))
            } catch (e) { console.error(e) }
        }
    }, [navigate, user])
    useEffect(() => {
        return () => {
            dispatch(AuthActions.initForm('login'))
        }
    }, [dispatch])
    return (
        <AuthTemplate>
            <AuthForm type='login' onChange={onChange} onSubmit={onSubmit} input={login} />
        </AuthTemplate>
    );
};

export default LoginContainer;