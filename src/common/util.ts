import {
    levelOneMap,
} from "./levelMap";
import {
    LevelType,
    SquareSpeciesType
} from "./constant";

export function isHitWall (x: number, y: number): boolean {
    if ( y < 0 || y - 32 < 0 ) {
        return false;
    }
    const row = x - 1 % 32 === 0 ? x - 1 / 32 : Math.floor(x / 32);
    const col = y - 1 % 32 === 0 ? y - 1 / 32 : Math.floor(y / 32);
    return levelOneMap[col][row] !== 0;
}

export function getLevelMap (level: LevelType): SquareSpeciesType[][] {
    switch (level) {
        case 1:
            return levelOneMap;
        default:
            return levelOneMap;
    }
}