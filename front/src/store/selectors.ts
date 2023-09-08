import { StateShame } from "./store";

export const getUsername = (state: StateShame) => state?.user?.username;

export const getAvatar = (state: StateShame) => state?.user?.avatar;

export const getGameCount = (state: StateShame) => state?.user?.gameCount;

export const getBestScore = (state: StateShame) => state?.user?.bestScore;

export const getId = (state: StateShame) => state?.user?.id;


