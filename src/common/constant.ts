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

export enum StaticSquareSpeciesType {
    "none",
    "normalFloor",
    "questionWall",
    "normalWall",
    "cheeseHeadLeft",
    "cheeseHeadRight",
    "cheeseBodyLeft",
    "cheeseBodyRight"
}

export enum DynamicSquareSpeciesType {
    "mushroom"
}

export enum MushroomStatusType {
    "normal",
    "empty",
    "hitRight",
    "hitLeft",
    "death"
}

export enum ContraDirectionType {
    "static",
    "toRight",
    "toLeft",
    "toTop",
    "toBottom",
    "toRightTop",
    "toLeftTop"
}

export enum DirectionTendencyType {
    "normal",
    "toLeft",
    "toRight"
}

export enum TowardType {
    "left",
    "right"
}

export enum StaticSquareStatusType {
    "normal",
    "wasHit"
}

export enum DynamicSquareStatusType {
    "normal",
    "wasHit"
}

export enum BulletStatusType {
    "normal",
    "death"
}

export type LevelType = 1 | 2 | 3 | 4 | 5;

export type GetHitWallType = boolean | {
    col: number;
    row: number;
};

export interface PositionType {
    left: number;
    top: number;
}

export interface ParabolaParmType {
    a: number;
    b: number;
    step: number;
    stepVal: number;
}

export interface ContraConfigType {
    beforeJumpTop: number;
    jumpHeight: number;
    directionTendency: DirectionTendencyType;
    parabolaParm: ParabolaParmType;
}

export interface StaticSquareManagementType {
    type: StaticSquareSpeciesType;
    status: StaticSquareStatusType;
}

export interface DynamicSquareManagementType {
    type: DynamicSquareSpeciesType;
    status: DynamicSquareStatusType;
    toward: TowardType;
    position: PositionType;
}

export interface BulletManagementType {
    left: number;
    top: number;
    toward: TowardType;
}