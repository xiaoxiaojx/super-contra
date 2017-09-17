import {
    levelOneMap,
} from "./levelMap";
import {
    LevelType,
    SquareSpeciesType,
    StaticSquareManagementType,
    GetHitWallType
} from "./constant";

export function isHitWall (x: number, y: number): boolean {
    if ( y < 0 || y - 32 < 0 ) {
        return false;
    }
    const row = x - 1 % 32 === 0 ? x - 1 / 32 : Math.floor(x / 32);
    const col = y - 1 % 32 === 0 ? y - 1 / 32 : Math.floor(y / 32);
    return levelOneMap[col][row] !== 0;
}

export function isBeyondBottom(y: number): boolean {
    const col = y - 1 % 32 === 0 ? y - 1 / 32 : Math.floor(y / 32);
    return col >= levelOneMap.length;
}

export function getHitWall (x: number, y: number): GetHitWallType {
    const row = x - 1 % 32 === 0 ? x - 1 / 32 : Math.floor(x / 32);
    const col = y - 1 % 32 === 0 ? y - 1 / 32 : Math.floor(y / 32);
    if ( levelOneMap[col] && levelOneMap[col][row] ) {
        return {
            col,
            row
        };
    }
    return false;
}

export function getLevelMap (level: LevelType): SquareSpeciesType[][] {
    switch (level) {
        case 1:
            return levelOneMap;
        default:
            return levelOneMap;
    }
}

export function getStaticSquareMap (level: LevelType): StaticSquareManagementType[][] {
    const levelMap = getLevelMap(level);
    return levelMap.map(items =>
        items.map(item => {
            return {
                type: item,
                status: 0
            };
        }));
}