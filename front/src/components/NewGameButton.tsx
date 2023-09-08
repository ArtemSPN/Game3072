import {getFreshMatrix} from "../util.ts";
import Button from "./Button.tsx";
interface NewGameButtonProps {
    setGameMatrix: Function;
    size: number;
    setCurrentScore: Function;
    buttonMessage?: string;
    setIsGameOver: Function;
    onStart: any
}

export default function NewGameButton({setGameMatrix,onStart, size, setCurrentScore, buttonMessage="Новая игра", setIsGameOver}:NewGameButtonProps) {

    const handleClick = () => {
        setGameMatrix(getFreshMatrix(size));
        setCurrentScore(0);
        setIsGameOver(false);
        onStart();
    }

    return (
        <Button clickFunction={handleClick} buttonMessage={buttonMessage}/>
    );
}