import '../css/App.css';
import Game3072 from "./Game3072.tsx";
import "../css/Cell.css";
import "../firebase.ts";
import InstructionsModal from "./InstructionsModal.tsx";
import { useEffect, useState } from "react";
import { AuthModal } from './AuthModal.tsx';
import { ProfileModal } from './ProfileModal.tsx';
import { useDispatch, useSelector } from 'react-redux';
import { getInitialValue } from '../function/getInitialValue.ts';
import { userAction } from '../store/store.ts';
import { getBestScore } from '../store/selectors.ts';

const SIZE = 4;
export default function App() {
    const [showRuleModal, setShowRuleModal] = useState(true);
    const [showAuthModal, setShowAuthModal] = useState(false);
    const [isUser, setIsUser] = useState(!!localStorage.getItem('user'))

    const [closing1, setClosing1] = useState(false);
    const [closing2, setClosing2] = useState(false);

    const onClose1 = () => {
        setClosing1(true);
        setTimeout(() => {
            setShowRuleModal(false);
            setClosing1(false);
        }, 1000);
    };

    const onOpen = () => {
        setClosing2(false);
        setShowAuthModal(true);
    }

    const onClose2 = () => {
        setClosing2(true);
        setTimeout(() => {
            setShowAuthModal(false);
            setClosing2(false);
        }, 1000);
    };
    const dispatch = useDispatch()
    const [highScore, setHighScore] = useState(useSelector(getBestScore));

    const exit = () => {
        localStorage.removeItem("user")
        dispatch(userAction.setUser(getInitialValue()))
        setHighScore(0);
        setIsUser(false)
    }


    return (
        <div className={`${closing1 || closing2 ? 'closing' : ''}`}>
            {showAuthModal && !isUser && 
            <AuthModal 
                setHighScore={setHighScore} 
                setIsUser={setIsUser} 
                onClose={onClose2}  
                closing={closing2}
            />}
            {showAuthModal && isUser && 
                <ProfileModal 
                    exit={exit} 
                    onClose={onClose2}  
                    closing={closing2}
            />}
            {showRuleModal && <InstructionsModal onClose={onClose1}  closing={closing1}/>}
            <div className={`game-container ${showRuleModal ? 'filter blur-md' : ''}`}>
                <Game3072 
                    highScore={highScore} 
                    setHighScore={setHighScore} 
                    size={SIZE} 
                    isUser={isUser} 
                    onOpen={onOpen}
                />
            </div>
        </div>
    );
}

