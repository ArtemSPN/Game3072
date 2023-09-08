import Button from "./Button.tsx";
import {MouseEventHandler} from "react";

interface InstructionsModalProps {
    onClose: MouseEventHandler<HTMLSpanElement>
    closing: boolean
}

export default function InstructionsModal({ onClose, closing }: InstructionsModalProps) {
    return (
        <div className={`modal-overlay ${closing ? 'closing' : ''}`}>
            <div className="modal">
                <div className="modal-content px-8">
                    <span className="close-button" onClick={onClose}>&times;</span>
                    <h1 className="mt-6 text-2xl">Добро пожаловать в 3072!</h1>
                    <ul className="list-disc my-6 font-medium">
                        <li>Игра ведется на поле 4х4.</li>
                        <li>Используйте стрелочки, чтобы двигать блоки.</li>
                        <li>Когда два блока с одинаковым значением соприкасаются, они объединяются, а значения складываются </li>
                        <li>Цель игры комбинировать блоки, чтобы собрать блок со значением "3072".</li>
                        <li>Игра заканчивается, когда поле заполнено и вы не можете сделать правильный ход.</li>
                        <li>Для того чтобы начать необходимо войти в аккаунт.</li>
                    </ul>
                    <Button clickFunction={onClose} buttonMessage={"Ознакомился"}/>
                </div>
            </div>
        </div>
    );
}
