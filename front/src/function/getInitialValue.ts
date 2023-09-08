
export const getInitialValue = () => {
    const defObject = localStorage.getItem('user');

    let user = {
        username: '',
        avatar: '',
        password: '',
        id: '',
        gameCount:  0,
        bestScore: 0,
    };
    
    if(defObject){
        const localStorageUser = JSON.parse(defObject)
        console.log(localStorageUser)
        console.log(localStorageUser.bestScore)
        user = {
            username: localStorageUser.username,
            avatar: localStorageUser.avatar,
            password: localStorageUser.password,
            id: localStorageUser._id,
            gameCount: localStorageUser.gameCount,
            bestScore: localStorageUser.bestScore,
        }
        console.log(user)
    }

    return user;
}