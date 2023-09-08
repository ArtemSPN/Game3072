import React, { MouseEventHandler, useEffect, useState } from 'react';
import Button from './Button';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { userAction } from '../store/store';

interface AuthModalProps {
    onClose: any;
    closing: boolean;
    setIsUser: any
    setHighScore: any;
}

export const AuthModal = ({ onClose, closing, setHighScore,setIsUser }: AuthModalProps) => {
    const [isAuth, setIsAuth] = useState(false)
    const [isError, setIsError] = useState(false)
    const dispatch = useDispatch()
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [avatar, setAvatar] = useState('')

    useEffect(() => {
        setIsAuth(!!window.localStorage.getItem("isAuth"))
    }, [])

    const handleClick = async () => {
        if(isAuth && username.length > 2 && password.length >= 5){
            await axios.post('http://localhost:4444/login', {
                username,
                password,
            }).then((res) => {
                console.log(res.data);
                window.localStorage.setItem('user', JSON.stringify(res.data.user));
                setPassword('')
                setUsername('')
                dispatch(userAction.setUser({
                    username: res.data.user.username,
                    id: res.data.user._id,
                    gameCount: res.data.user.gameCount,
                    bestScore: res.data.user.bestScore,
                    avatar: res.data.user.avatar,
                    password: res.data.user.password,
                }))
                setHighScore(res.data.user.bestScore)
                setIsError(false)
                setIsUser(true);
                onClose()
            })
            .catch(() => setIsError(true))
        }
        else{
            if(username.length > 2 && password.length >= 5 && avatar.length != 0){
                await axios.post('http://localhost:4444/reg', {
                    username,
                    password,
                    avatar
                }).then(({data}) => { 
                    console.log(data); 
                    setAvatar('')
                    window.localStorage.setItem('user',JSON.stringify(data))
                    dispatch(userAction.setUser({
                        username: data.username,
                        gameCount: data.gameCount,
                        id: data._id,
                        bestScore: data.bestScore,
                        avatar: data.avatar,
                        password: data.password,
                    }))
                    setPassword('')
                    setUsername('')
                    setIsError(false)
                    setHighScore(data.bestScore)
                    setIsUser(true);
                    onClose()
                })
                .catch(() => {
                    setIsError(true)
                })
            }
           
        }
    }

    return (

        <div className={`modal-overlay ${closing ? 'closing' : ''}`}>
            <div className="modal">
                <div className="modal-content px-8">
                <div className="headerAuthModal">
                    {isAuth?'Вход':'Регистрация'}
                    <span className="close-button" onClick={onClose}>&times;</span>
                </div>
                <div className="inputZone">
                    <label htmlFor="name" className='text-field__label'>
                        Имя пользователя:
                    </label>
                    <input 
                        className='input' 
                        type="text" 
                        id='name' 
                        name='name' 
                        placeholder='имя пользователя'
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    {!isAuth && 
                        <>
                            <label htmlFor="name" className='text-field__label'>
                                Аватар профиля:
                            </label>
                            <input 
                                className='input' 
                                type="text" 
                                id='avatar' 
                                name='avatar' 
                                placeholder='аватар пользователя'
                                value={avatar}
                                onChange={(e) => setAvatar(e.target.value)}    
                            />
                        </>
                    }
                    <label htmlFor="password" className='text-field__label'>
                        Пароль:
                    </label>
                    <input 
                        className='input' 
                        type="password" 
                        name='password' 
                        placeholder='пароль'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                {
                    isError && 
                    <div className="error">
                        Произошла ошибка
                    </div>
                }
                <div className="acc" onClick={() => setIsAuth(!isAuth)}>
                    {!isAuth?'Уже есть аккаунт?':'Создать новый аккаунт?'}
                </div>
                <div className="btnReg">
                    <Button clickFunction={handleClick} buttonMessage={isAuth?'Вход':'Регистрация'}/>
                </div>
                </div>
            </div>
        </div>
    );
}