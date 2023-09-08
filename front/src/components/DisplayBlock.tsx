import NewGameButton from "./NewGameButton.tsx";
import ProfileButton from "./ProfileButton.tsx";
import ScoreDisplays from "./ScoreDisplays.tsx";

interface DisplayBlockProps {
    currentScore: number;
    setCurrentScore: Function;
    setGameMatrix: Function;
    size: number;
    highScore: number;
    onOpen: Function;
    setHighScore: Function;
    setIsGameOver: Function;
    onStart: any
}

export default function DisplayBlock({currentScore, onStart,onOpen,setCurrentScore, setGameMatrix, size, highScore, setHighScore, setIsGameOver}:DisplayBlockProps) {
    return (
        <div className="flex flex-col">
            <ScoreDisplays currentScore={currentScore} highScore={highScore} setHighScore={setHighScore}/>
            <div className="flex">
                <ProfileButton onOpen={onOpen}/>
                <NewGameButton onStart={onStart} setGameMatrix={setGameMatrix} size={size} setCurrentScore={setCurrentScore} setIsGameOver={setIsGameOver}/>
            </div>
        </div>
    );
}
