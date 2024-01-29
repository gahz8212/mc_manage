import React, { useEffect } from 'react';
import InputComponent from './InputComponent';
import { useSelector, useDispatch } from 'react-redux';
import { ItemActions, ItemData } from '../../../store/slices/itemSlice';
import { FormActions, FormData } from '../../../store/slices/formSlice';
import { ExcelAction, ExcelData } from '../../../store/slices/excelSlice';
import { imageInsert } from '../../../lib/utils/createFormData';
import * as XLSX from 'xlsx'
const InputContainer = () => {
    const dispatch = useDispatch();
    const { input, images, status } = useSelector(ItemData);
    const { file, data: datas, status: excel_status } = useSelector(ExcelData)
    const addImages = async (e: any) => {
        const formData = imageInsert(e, images)
        dispatch(ItemActions.addImage(await formData))
    }
    const excel_onChange = (e: any) => {
        const fileTypes = ['application/vnd.ms-excel', 'text/csv', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'];
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            if (selectedFile && fileTypes.includes(selectedFile.type)) {
                const reader = new FileReader();
                reader.readAsArrayBuffer(selectedFile)
                reader.onload = (e: ProgressEvent<FileReader>) => {
                    dispatch(ExcelAction.onChange(e.target?.result))
                }
            }
        }
    }
    const onChange = (e: any) => {
        let { name, value } = e.target;
        if (name === 'use') {
            value = value === 'true' ? true : false
        }
        dispatch(ItemActions.changeInput({ key: name, value }))
    }
    const onSubmit = () => {
        dispatch(ItemActions.addItem({ category: input.category, name: input.name, descript: input.descript, unit: input.unit, price: input.price, point: input.point, use: input.use, images }))
    }
    const excel_onSubmit = () => {
        const workbook = XLSX.read(file, { type: 'buffer' })
        const sheetname = workbook.SheetNames[0];
        const worksheets = workbook.Sheets[sheetname]
        const excelData = XLSX.utils.sheet_to_json(worksheets)
        console.log(excelData)
        dispatch(ExcelAction.onSubmit(excelData))
        // dispatch(ExcelAction.initForm())
    }
    const closeForm = () => {
        dispatch(FormActions.toggleVisible({ form: 'input', value: false }))
        dispatch(ExcelAction.initForm())
    }
    useEffect(() => {
        if (status.message === 'addItem_ok') {
            const newItem = ({ ...input, ...{ Images: images } })
            dispatch(ItemActions.addedItemInsert(newItem))
        }
    }, [dispatch, status])
    useEffect(() => {
        dispatch(ItemActions.excelAddItem(datas))
        console.log(datas)
    }, [datas, dispatch])
    return (

        <InputComponent datas={datas} excel_onChange={excel_onChange} excel_onSubmit={excel_onSubmit} file={file} addImages={addImages} onChange={onChange} images={images} onSubmit={onSubmit} closeForm={closeForm} />

    );
};

export default InputContainer;