import React from 'react';
type Props = {
    children: React.ReactNode
}
const AuthTemplate: React.FC<Props> = ({ children }) => {
    return (
        <div className='whitebox'>
            <div className="logo-area">
                REACT
            </div>
            {children}
        </div>
    );
};

export default AuthTemplate;