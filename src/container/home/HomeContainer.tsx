import React from 'react';
import { useSelector, useDispatch } from 'react-redux'
import HomeComponent from './HomeComponent';
import { FormActions, FormData } from '../../store/slices/formSlice';
const HomeContainer = () => {
    const dispatch = useDispatch()
    const { input, edit, search } = useSelector(FormData)
    const changePosition = (form: string, position: { x: number, y: number }) => {
        dispatch(FormActions.changePosition({ form, position }))
    }
    const openForm = () => {
        dispatch(FormActions.toggleVisible({ form: 'input', value: true }))
    }
    return (
        <HomeComponent input={input} edit={edit} changePosition={changePosition} openForm={openForm} />


    );
};

export default HomeContainer;