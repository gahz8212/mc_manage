import React from 'react';
import HeaderContainer from '../common/header/HeaderContainer';
import InputContainer from '../forms/input/InputContainer';
import EditContainer from '../forms/edit/EditContainer';
import ContentsContainer from '../contents/ContentsContainer';
import { useDrag } from 'react-use-gesture'

type Props = {
    input: { visible: boolean; position: { x: number; y: number } };
    edit: { visible: boolean; position: { x: number; y: number } };
    changePosition: (form: string, position: { x: number, y: number }) => void
    openForm: () => void;
}
const HomeComponent: React.FC<Props> = ({ input, edit, changePosition, openForm }) => {

    const inputPos = useDrag(params => { changePosition('input', { x: params.offset[0], y: params.offset[1] }) })
    const editPos = useDrag(params => { changePosition('edit', { x: params.offset[0], y: params.offset[1] }) })
    return (
        <div>
            <HeaderContainer />
            <div className='drag' ></div>

            {input.visible && <div {...inputPos()} style={{ position: 'absolute', top: input.position.y, left: input.position.x }}>
                <InputContainer />
            </div>}


            {edit.visible && <div {...editPos()} style={{ position: 'absolute', top: edit.position.y, left: edit.position.x }}>
                <EditContainer />
            </div>}
            <ContentsContainer />
            <div className="write-button" onClick={() => {
                openForm();
            }}>

                <span className="material-symbols-outlined">
                    edit_document
                </span>
            </div>
        </div >
    );
};

export default HomeComponent;