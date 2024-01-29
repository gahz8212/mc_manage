import React from 'react';
import { Link } from 'react-router-dom';
type Props = {
    type: string
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onSubmit: () => void
    input: { [key: string]: string }
}
const AuthForm: React.FC<Props> = ({ type, onSubmit, onChange, input }) => {
    const typeMap: { [key: string]: string } = { login: '로그인', join: '회원가입' }
    const text = typeMap[type]
    return (
        <form onSubmit={e => {
            e.preventDefault();
            onSubmit()
        }}>
            <input type="text" name='email' value={input.email} onChange={onChange} placeholder='이메일 입력' required />
            {text === '회원가입' && <input type="text" name="name" value={input.name} onChange={onChange} placeholder='이름 입력' required/>}
            <input type="text" name="password" value={input.password} onChange={onChange} placeholder='비번 입력' required/>
            <button type='submit'>{text}</button>
            {text === '로그인' ? <Link to='/join'>회원가입</Link> : <Link to='/'>로그인</Link>}
        </form>
    );
};

export default AuthForm;