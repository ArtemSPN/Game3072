import Button from "./Button.tsx";

interface ProfileButtonProps {
    onOpen: Function;
}

export default function ProfileButton({onOpen}: ProfileButtonProps) {

    const handleClick = () => {
        onOpen()
    }

    return (
        <Button clickFunction={handleClick} buttonMessage={'Профиль'}/>
    );
}