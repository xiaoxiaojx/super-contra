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
    "normalWall" = 3
}

export enum SquareStatusType {
    "normal" = 0,
    "hit" = 1
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