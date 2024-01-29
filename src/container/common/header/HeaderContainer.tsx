import React from 'react';
import HeaderComponent from './HeaderComponent';
import { useSelector, useDispatch } from 'react-redux'
import { UserActions, UserData } from '../../../store/slices/userSlice';
const HeaderContainer = () => {
    const dispatch = useDispatch();
    const { user } = useSelector(UserData)
    const onLogout = () => {
        dispatch(UserActions.logout())
    }
    return (
        <HeaderComponent user={user} onLogout={onLogout} />
    );
};

export default HeaderContainer;