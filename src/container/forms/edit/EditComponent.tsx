import React from 'react';
type Props = {
    onChange: (e: any) => void;
    editImage: (e: any) => void;
    closeForm: () => void;
    onSubmit: () => void;
    next: {
        [key: string]: "" | string | number | boolean | { url: string }[];
        id: number | "";
        category: string;
        name: string;
        descript: string;
        unit: string;
        price: number;
        point: number;
        use: boolean;
        Images: { url: string }[];
    }
}
const EditComponent: React.FC<Props> = ({ onChange, closeForm, next, editImage, onSubmit }) => {

    return (
        <form className={`form edit ${next.category}`}
            onSubmit={(e) => {
                e.preventDefault();
                onSubmit()
            }}
        >
            <div className="title edit">수정</div>
            <div className="category">
                <input type="radio" name="category" id="회로_edit" value="회로" onChange={onChange} checked={next.category === '회로'} /><label htmlFor="회로_edit">회로</label>
                <input type="radio" name="category" id="전장_edit" value="전장" onChange={onChange} checked={next.category === '전장'} /> <label htmlFor="전장_edit">전장</label>
                <input type="radio" name="category" id="기구_edit" value="기구" onChange={onChange} checked={next.category === '기구'} /><label htmlFor="기구_edit">기구</label>
                <input type="radio" name="category" id="포장_edit" value="포장" onChange={onChange} checked={next.category === '포장'} /><label htmlFor="포장_edit">포장</label>
                <input type="radio" name="category" id="기타_edit" value="기타" onChange={onChange} checked={next.category === '기타'} /><label htmlFor="기타_edit">기타</label>
            </div>
            <input type="text" name="name" id="name_edit" value={next.name} onChange={onChange} onFocus={e => e.target.select()} />
            <div>
                <textarea name="descript" id="descript_edit" cols={30} rows={10} className="descript" value={next.descript} onChange={onChange} onFocus={e => e.target.select()}></textarea>
            </div>
            <div className="unit-price">
                <div className="unit">
                    <input type="radio" name="unit" id="￦_edit" value={'￦'} onChange={onChange} checked={next.unit === '￦'} /><label htmlFor="￦_edit">￦</label>
                    <input type="radio" name="unit" id="$_edit" value={'$'} onChange={onChange} checked={next.unit === '$'} /><label htmlFor="$_edit">$</label>
                    <input type="radio" name="unit" id="￥_edit" value={'￥'} onChange={onChange} checked={next.unit === '￥'} /><label htmlFor="￥_edit">￥</label>
                </div>
                <input type="number" name="price" id="" value={next.price} onChange={onChange}  onFocus={e => e.target.select()}/></div>
            <input type="number" name="point" id="" value={next.point} onChange={onChange}  onFocus={e => e.target.select()}/>
            <div className="use">
                <input type="radio" name="use" id="use_edit" value="true" onChange={onChange} checked={next.use === true} /><label htmlFor="use_edit">사용</label>
                <input type="radio" name="use" id="no-use_edit" value="false" onChange={onChange} checked={next.use === false} /><label htmlFor="no-use_edit">미사용</label>
            </div>
            <label htmlFor="file_edit">사진 올리기</label><input type="file" name="file" id="file_edit" onChange={editImage} multiple accept='images/*' />
            <div className="imageList">
                {next.Images.map((image, index) => <div key={index}><img src={image.url} alt='' width='80px' /></div>)}
            </div>

            <div className="buttons">
                <button type='submit'>수정</button>
                <button type='button'>삭제</button>
                <button type='button' onClick={() => { closeForm() }}>닫기</button>
            </div>
        </form>
    );
};

export default EditComponent;