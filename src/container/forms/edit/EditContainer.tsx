import React, { useEffect } from 'react';
import EditComponent from './EditComponent';
import { useSelector, useDispatch } from 'react-redux';
import { ItemActions, ItemData } from '../../../store/slices/itemSlice';
import { FormActions, FormData } from '../../../store/slices/formSlice';
import { EditActions, EditData } from '../../../store/slices/editSlice';
import { imageInsert } from '../../../lib/utils/createFormData';
const EditContainer = () => {
    const dispatch = useDispatch()
    const { prev, next, status } = useSelector(EditData)
    const { items } = useSelector(ItemData)
    const onChange = (e: any) => {
        let { name, value } = e.target;
        if (name === 'use') {
            value = value === 'true' ? true : false
        }
        dispatch(EditActions.changeForm({ key: name, value }))
    }
    const editImage = async (e: any) => {

        const formData = imageInsert(e, next.Images)
        dispatch(EditActions.editImage(await formData))
    }

    const closeForm = () => {
        dispatch(FormActions.toggleVisible({ form: 'edit', value: false }))
    }
    const onSubmit = () => {
        let newItem: { [key: string]: "" | number | string | boolean | { url: string }[] } = {}
        const keys = Object.keys(next)
        for (let key of keys) {
            if (prev[key] !== next[key]) {
                newItem[key] = next[key]
                newItem.id = next.id
            }
        }
        dispatch(EditActions.editItem(newItem))

    }
    useEffect(() => {
        if (status.message === 'editItem_ok') {
            // alert('aaa')
            const idx = items.findIndex(item => item.id === next.id)
            // const newItems=items.splice(idx, 1, next)
            dispatch(ItemActions.changeItems({ idx, newItem: next }))

        }
    }, [status.message])
    return (

        <EditComponent onChange={onChange} closeForm={closeForm} next={next} editImage={editImage} onSubmit={onSubmit} />

    );
};

export default EditContainer;