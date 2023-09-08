import Grid from "./Grid.tsx";
import {getFreshMatrix} from "../util.ts";
import GameHeader from "./GameHeader.tsx";
import {useEffect, useMemo, useState} from "react";
import {handleArrowKey} from "../util.ts";
import { useDispatch, useSelector } from "react-redux";
import { getBestScore, getGameCount, getId } from "../store/selectors.ts";
import axios from "axios";
import { userAction } from "../store/store.ts";
import { set } from "firebase/database";

interface Game3072Props {
    size: number;
    onOpen: Function;
    isUser: boolean;
    highScore: number;
    setHighScore: any
}

export default function Game3072({size, onOpen, highScore, setHighScore, isUser}: Game3072Props) {

    const startMatrix = getFreshMatrix(size);

    const [start, setStart] = useState(false)
    const [gameMatrix, setGameMatrix] = useState(startMatrix);
    const [justGenerated, setJustGenerated] = useState(startMatrix.map( row => row.map(cell => cell !== 0)));
    const [justMergedMatrix, setJustMergedMatrix] = useState([
        [false, false, false, false],
        [false, false, false, false],
        [false, false, false, false],
        [false, false, false, false],
    ]);

       

    const id = useSelector(getId)
    const count = useSelector(getGameCount)
    const dispatch = useDispatch()

    const onStart = async () => {
        if(isUser){
            await axios.get(`http://localhost:4444/plusGame/${id}`);
            dispatch(userAction.incrementGameCount(""));
            setStart(true)
        }
 
    }



    const [currentScore, setCurrentScore] = useState(0);
    const [isGameOver, setIsGameOver] = useState(false);

    useEffect(() => {
        if(!isUser){
            setCurrentScore(0)
            setStart(false)
        }
        if(isGameOver) setStart(false)
        const handleKeyDown = (evt: KeyboardEvent) => {
                let key = "";
            switch (evt.code) {
                case("ArrowLeft"):
                    key = "left";
                    break;
                case("ArrowRight"):
                    key = "right";
                    break;
                case("ArrowUp"):
                    key = "up";
                    break;
                case("ArrowDown"):
                    key = "down";
                    break;
            }
            console.log({currentScore, highScore})
            key && (setIsGameOver(handleArrowKey(gameMatrix, key, setGameMatrix, setJustGenerated, setJustMergedMatrix, setCurrentScore, setHighScore, currentScore)));
        }

        start && window.addEventListener("keydown", handleKeyDown);

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        }
    }, [currentScore, highScore, start]); // depend on currentScore, highScore

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
        }}>
            <GameHeader
                onStart={onStart}
                setGameMatrix={setGameMatrix}
                size={size}
                onOpen={onOpen}
                currentScore={currentScore}
                setCurrentScore={setCurrentScore}
                highScore={highScore}
                setHighScore={setHighScore}
                setIsGameOver={setIsGameOver}/>
            <Grid
                onStart={onStart}
                curScore={currentScore}
                gameMatrix={gameMatrix}
                justGenerated={justGenerated}
                justMergedMatrix={justMergedMatrix}
                setGameMatrix={setGameMatrix}
                setCurrentScore={setCurrentScore}
                isGameOver={isGameOver}
                setIsGameOver={setIsGameOver}/>
        </div>
    )
}
