import React, { useEffect } from 'react';
import ContentsComponent from './ContentsComponent';
import { useSelector, useDispatch } from 'react-redux';
import { ItemActions, ItemData } from '../../store/slices/itemSlice'
import { FormActions, FormData } from '../../store/slices/formSlice';
import { EditActions, EditData } from '../../store/slices/editSlice';
const ContentsContainer = () => {
    const dispatch = useDispatch();
    const { items } = useSelector(ItemData)
    const { edit } = useSelector(FormData)

    const openEditForm = (form: string, id: number | '') => {
        const item = items.filter(item => item.id === id)
        dispatch(EditActions.editForm(item[0]))
        dispatch(FormActions.toggleVisible({ form: 'edit', value: true }))
        // if (edit.visible === true)
    }
    useEffect(() => {

        dispatch(ItemActions.getItems())
    }, [dispatch])
    return (
        <ContentsComponent items={items} openEditForm={openEditForm} />


    );
};

export default ContentsContainer;