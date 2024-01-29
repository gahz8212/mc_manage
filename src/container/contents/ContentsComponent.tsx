import React from 'react';
type Props = {
    items: {
        id: "" | number;
        category: string;
        name: string;
        descript: string;
        unit: string;
        price: number;
        point: number;
        use: boolean;
        Images: { url: string }[];
    }[];
    openEditForm: (form: string, id: number | '') => void;
}
const ContentsComponent: React.FC<Props> = ({ items, openEditForm }) => {

    return (
        <div className='item-container'>
            {items.map((item, index) => <div key={index} className='items' onClick={() => { openEditForm('edit', item.id) }}>
                <div className={`item text ${item.category}`}>
                    <div className="category">{item.category}</div>
                    <div className="name">{item.name}</div>
                    <div className="unit">{item.unit} {item.price}</div>
                </div>
                <div className="item image">
                    {item.Images.length && <img src={item.Images[0].url} alt='' />}
                </div>

            </div>)}
        </div>
    );
};

export default ContentsComponent;