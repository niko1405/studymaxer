import type { Dispatch, SetStateAction } from "react";

export type AppState = 'get-started' | 'onboarding' | 'main';
export type SetState<T> = Dispatch<SetStateAction<T>>;

export type ActiveTab = 'home' | 'premium' | 'profile';