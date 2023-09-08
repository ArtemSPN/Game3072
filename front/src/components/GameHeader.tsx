import DisplayBlock from "./DisplayBlock.tsx"

interface GameHeaderProps {
    setGameMatrix: Function;
    size: number;
    currentScore: number;
    setCurrentScore: Function;
    highScore: number;
    onStart: any;
    onOpen: Function;
    setHighScore: Function;
    setIsGameOver: Function;
}

export default function GameHeader({setGameMatrix, onStart,onOpen,size, currentScore, setCurrentScore, highScore, setHighScore, setIsGameOver}:GameHeaderProps) {
    return <div className="flex flex-row justify-between mt-6 items-end mb-6 z-20 justify-self-end">
        <h1 className="font-extrabold justify-self-start self-start text-8xl ml-4">3072</h1>
        <DisplayBlock onStart={onStart} onOpen={onOpen} currentScore={currentScore} setCurrentScore={setCurrentScore} setGameMatrix={setGameMatrix} size={size} highScore={highScore} setHighScore={setHighScore} setIsGameOver={setIsGameOver}/>
    </div>
}