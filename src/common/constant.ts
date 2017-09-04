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