import React, { MouseEventHandler, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getGameCount, getBestScore, getUsername, getAvatar } from '../store/selectors';
import Button from './Button';
import { userAction } from '../store/store';
import { getInitialValue } from '../function/getInitialValue';

interface ProfileModalProps {
    onClose: MouseEventHandler<HTMLSpanElement>
    closing: boolean;
    exit: any
}

export const ProfileModal = ({ onClose, closing, exit }: ProfileModalProps) => {
    const avatar = useSelector(getAvatar);
    const gameCount = useSelector(getGameCount);
    const bestScore = useSelector(getBestScore);
    const username = useSelector(getUsername);
    const dispatch = useDispatch()

    const func = () => {
        exit()
        //@ts-ignore
        onClose()
    }

    return (

        <div className={`modal-overlay ${closing ? 'closing' : ''}`}>
            <div className="modal">
                <div className="modal-content px-8">
                   <div className="profileModal">
                        <span className="close-button" onClick={onClose}>&times;</span>
                        <div className='avatarWrap'>
                            <img src={avatar} alt="" className="avatar"/>
                        </div>
                        <div className="info">
                            <p>
                                {`Никнейм: ${username}`}
                            </p>
                            <p>
                                {`Кол-во игр: ${gameCount}`}
                            </p>
                            <p>
                                {`Лучший счет: ${bestScore}`}
                            </p>
                        </div>
                   </div>
                   <Button buttonMessage='Выйти' clickFunction={func} />
                </div>
            </div>
        </div>
    );
}