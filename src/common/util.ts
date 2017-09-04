import {
    levelOneMap
} from "./levelMap";

export const isEmpty = (x: number, y: number): boolean => {
    const row = Math.floor(x / 33);
    const col = Math.floor(y / 33);
    return levelOneMap[col + 1][row] === 0;
};

export const isHitRight = (x: number, y: number): boolean => {
    const row = Math.floor(x / 32);
    const col = Math.floor(y / 33);
    return levelOneMap[col][row] !== 0;
};

export const isHitLeft = (x: number, y: number): boolean => {
    const row = Math.floor(x - 1 / 33);
    const col = Math.floor(y / 33);
    return levelOneMap[col][row] !== 0;
};