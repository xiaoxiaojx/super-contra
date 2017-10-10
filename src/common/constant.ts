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
    "cheeseBodyRight",
    "mushWall"
}

export enum DynamicSquareSpeciesType {
    "mushroom",
    "growUpMushroom"
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

export enum LifeStatusType {
    "normal",
    "receive mushrooms",
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

export interface SquareHitType {
    left: number;
    top: number;
    width: number;
    height: number;
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

export interface ContraInfoType {
    position: PositionType;
    lifeStatus: LifeStatusType;
}

export interface NormalEnemyProps {
    index: number;
    dynamicData: DynamicSquareManagementType;
    inGameGBLeft: number;
    contraInfo: ContraInfoType;
    updatePosition: (position: PositionType, index: number) => void;
    updateGameStatus: (parm: GameStatusType) => void;
    deleteDynamicSquare: (parm: number) => void;
    updateContraLifeStatus: (parm: LifeStatusType) => void;
}