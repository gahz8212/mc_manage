import React from 'react';
type Props = {
    addImages: (e: any) => void;
    onChange: (e: any) => void;
    onSubmit: () => void;
    images: { url: string }[];
    closeForm: () => void;
    excel_onChange: (e: any) => void;
    excel_onSubmit: () => void;
    file: ArrayBuffer | undefined | null;
    datas: any[] | null;
}
const InputComponent: React.FC<Props> = ({ datas, excel_onChange, excel_onSubmit, file, addImages, onChange, images, onSubmit, closeForm }) => {
    return (
        <form className='form input'
            onSubmit={(e) => {
                e.preventDefault();
                onSubmit()
            }}>
            <div className="title input">등록</div>
            <div className="category">
                <input type="radio" name="category" id="회로_input" value="회로" onChange={onChange} /><label htmlFor="회로_input">회로</label>
                <input type="radio" name="category" id="전장_input" value="전장" onChange={onChange} /><label htmlFor="전장_input">전장</label>
                <input type="radio" name="category" id="기구_input" value="기구" onChange={onChange} /><label htmlFor="기구_input">기구</label>
                <input type="radio" name="category" id="포장_input" value="포장" onChange={onChange} /><label htmlFor="포장_input">포장</label>
                <input type="radio" name="category" id="기타_input" value="기타" onChange={onChange} /><label htmlFor="기타_input">기타</label>
            </div>
            <input type="text" name="name" id="name_input" onChange={onChange} onFocus={e => e.target.select()} />
            <div>
                <textarea name="descript" id="descript_input" cols={30} rows={10} className="descript" onChange={onChange} onFocus={e => e.target.select()}></textarea>
            </div>
            <div className="unit-price">
                <div className="unit">
                    <input type="radio" name="unit" id="￦_input" value="￦" onChange={onChange} /><label htmlFor="￦_input">￦</label>
                    <input type="radio" name="unit" id="$_input" value="$" onChange={onChange} /><label htmlFor="$_input">$</label>
                    <input type="radio" name="unit" id="￥_input" value="￥" onChange={onChange} /><label htmlFor="￥_input">￥</label>
                </div>
                <input type="number" name="price" id="" onChange={onChange} onFocus={e => e.target.select()} /></div>
            <input type="number" name="point" id="" onChange={onChange} onFocus={e => e.target.select()} />
            <div className="use">
                <input type="radio" name="use" id="use_input" value="true" onChange={onChange} /><label htmlFor="use_input">사용</label>
                <input type="radio" name="use" id="no-use_input" value="false" onChange={onChange} /><label htmlFor="no-use_input">미사용</label>
            </div>
            <label htmlFor="file_input">사진 올리기</label><input type="file" name="file" id="file_input" onChange={addImages} multiple accept='image/*' />
            <div className="imageList">
                {images.map((image, index) => <div key={index}><img src={image.url} alt='' width='80px' /></div>)}
            </div>
            <div className="buttons">

                <label htmlFor="excel"><img src="./images/excel.png" alt="" /></label>
                <input type="file" name="file" id="excel" onChange={excel_onChange} />

                {file ? <button type='button' onClick={() => { excel_onSubmit() }}>엑셀등록</button> : <button type='submit'>등록</button>}
                <button onClick={() => closeForm()}>닫기</button>
            </div>
        </form>
    );
};

export default InputComponent;