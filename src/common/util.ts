import {
    levelOneMap
} from "./levelMap";

export const isEmpty = (x: number, y: number): boolean => {
    const row = x - 1 % 32 === 0 ? x - 1 / 32 : Math.floor(x / 32);
    const col = y - 1 % 32 === 0 ? y - 1 / 32 : Math.floor(y / 32);
    return levelOneMap[col + 1][row] === 0;
};

export const isHitRight = (x: number, y: number): boolean => {
    const row = x - 1 % 32 === 0 ? x - 1 / 32 : Math.floor(x / 32);
    const col = y - 1 % 32 === 0 ? y - 1 / 32 : Math.floor(y / 32);
    return levelOneMap[col][row + 1] !== 0;
};

export const isHitLeft = (x: number, y: number): boolean => {
    const row = x - 1 % 32 === 0 ? x - 1 / 32 : Math.floor(x / 32);
    const col = y - 1 % 32 === 0 ? y - 1 / 32 : Math.floor(y / 32);
    return levelOneMap[col][row - 1] !== 0;
};