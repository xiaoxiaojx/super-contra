export enum KeyCodeType {
    "A" = 65,
    "D" = 68,
    "K" = 75,
    "J" = 74,
    "H" = 72,
}

export enum GameStatusType {
    "notStart",
    "start",
    "pause",
    "end"
}

export enum SquareSpeciesType {
    "none" = 0,
    "normalFloor" = 1,
    "questionWall" = 2,
    "normalWall" = 3,
    "cheeseHeadLeft" = 4,
    "cheeseHeadRight" = 5,
    "cheeseBodyLeft" = 6,
    "cheeseBodyRight" = 7
}

export enum MushroomStatusType {
    "normal" = 0,
    "empty" = 1,
    "hitRight" = 2,
    "hitLeft" = 3,
    "death" = 4
}

export enum ContraDirectionType {
    "static" = 0,
    "toRight" = 1,
    "toLeft" = 2,
    "toTop" = 3,
    "toBottom" = 4,
    "toRightTop" = 5,
    "toLeftTop" = 6
}

export enum DirectionTendencyType {
    "normal" = 0,
    "toLeft" = 1,
    "toRight" = 2
}

export enum TowardType {
    "left" = 0,
    "right" = 1
}

export enum StaticSquareStatusType {
    "normal" = 0,
    "wasHit" = 1
}

export type LevelType = 1 | 2 | 3 | 4 | 5;

export type GetHitWallType = boolean | {
    col: number;
    row: number;
};

export interface ParabolaParmType {
    a: number;
    b: number;
    c: number;
    step: number;
    stepVal: number;
}

export interface ConfigType {
    beforeJumpTop: number;
    jumpHeight: number;
    directionTendency: DirectionTendencyType;
}

export interface StaticSquareManagementType {
    type: SquareSpeciesType;
    status: StaticSquareStatusType;
}