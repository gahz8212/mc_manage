import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import AuthForm from './Form/AuthForm';
import AuthTemplate from './Form/AuthTemplate';
import { AuthActions, AuthData } from '../../store/slices/authSlice';
const JoinContainer = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { join, status } = useSelector(AuthData);
    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        dispatch(AuthActions.changeInput({ form: 'join', key: name, value }))
    }
    const onSubmit = () => {
        dispatch(AuthActions.join({ email: join.email, name: join.name, password: join.password }))
    }
    useEffect(() => {
        if (status.message === 'join_ok')
            navigate('/');

    }, [status, navigate])
    useEffect(() => {
        return () => {
            dispatch(AuthActions.initForm('join'))
        }
    }, [dispatch])
    return (
        <AuthTemplate>
            <AuthForm type='join' onChange={onChange} onSubmit={onSubmit} input={join} />
        </AuthTemplate>
    );
};

export default JoinContainer;