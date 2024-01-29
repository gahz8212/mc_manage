import React from 'react';
import { Link } from 'react-router-dom';
type Props = {
    user: { id: number | '', name: string } | null
    onLogout: () => void;
}
const HeaderComponent: React.FC<Props> = ({ user, onLogout }) => {
    return (
        <>
            <div className="header-container">
                <div className="header-wrapper">
                    <Link to='#'>REACT</Link>
                    {user ? <button onClick={onLogout}>로그아웃</button> : <Link to='/'>로그인</Link>}
                </div>
            </div>
            <div className="space"></div>
        </>
    );
};

export default HeaderComponent;