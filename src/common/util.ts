import {
    levelOneMap,
} from "./levelMap";
import {
    LevelType,
    StaticSquareSpeciesType,
    StaticSquareManagementType,
    GetHitWallType,
    SquareHitType
} from "./constant";

export function isHitWall (x: number, y: number): boolean {
    if ( y < 0 || y - 32 < 0 ) {
        return false;
    }
    const row = x - 1 % 32 === 0 ? x - 1 / 32 : Math.floor(x / 32);
    const col = y - 1 % 32 === 0 ? y - 1 / 32 : Math.floor(y / 32);
    return levelOneMap.length > col &&
    levelOneMap[col].length > row &&
    levelOneMap[col][row] !== 0;
}

export function isBeyondBottom(y: number): boolean {
    const col = y - 1 % 32 === 0 ? y - 1 / 32 : Math.floor(y / 32);
    return col >= levelOneMap.length;
}

export function isHit(m: SquareHitType, n: SquareHitType): boolean {
    let returnValue = false;
    if (m.left < n.left) {
        if (m.top < n.top) {
            if (m.left + m.width >= n.left && m.top + m.height >= n.top) {
                returnValue = true;
            }
        }
        else {
            if (m.left + m.width >= n.left && n.top + n.height >= m.top) {
                returnValue = true;
            }
        }
    }
    else {
        if (m.top < n.top) {
            if (m.left <= n.left + n.width && m.top + m.height > n.top) {
                returnValue = true;
            }
        }
        else {
            if (n.left + n.width >= m.left && n.top + n.height >= m.top) {
                returnValue = true;
            }
        }
    }
    return returnValue;
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

export function getLevelMap (level: LevelType): StaticSquareSpeciesType[][] {
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