import { observable, useStrict, action } from "mobx";
import {
    GameStatusType,
    LevelType,
    StaticSquareManagementType,
    StaticSquareStatusType,
    BulletManagementType,
    DynamicSquareManagementType,
} from "../../common/constant";
import {
    getStaticSquareMap
} from "../../common/util";

useStrict(true);

class SuperContraStore {
    constructor() {
        this.staticSquareMap = getStaticSquareMap(this.level);
    }

    private canUpdateInGameGBLeft: boolean = true;

    @observable public level: LevelType = 1;
    @action.bound public updateLevel(parm: LevelType): void {
        this.level = parm;
    }

    @observable public gameStatus: GameStatusType = 0;
    @action.bound public updateGameStatus(parm: GameStatusType): void {
        this.gameStatus = parm;
    }

    @observable public inGameGBLeft: number = 0;
    @action.bound public updateInGameGBLeft(): void {
        if ( this.canUpdateInGameGBLeft ) {
            const _self = this;
            this.canUpdateInGameGBLeft = false;
            this.inGameGBLeft -= 512;
            setTimeout(() => {
                _self.canUpdateInGameGBLeft = true;
            }, 2000);
        }
    }

    @observable public staticSquareMap: StaticSquareManagementType[][];
    @action.bound public updateStaticSquareMap(col: number, row: number, status: StaticSquareStatusType): void {
        const preVal = this.staticSquareMap[col][row].status;
        if ( preVal !==  status) {
            this.staticSquareMap[col][row].status = status;
        }
    }

    @observable public dynamicSquareMap: DynamicSquareManagementType[] = [];
    @action.bound public  addDynamicSquare (parm: DynamicSquareManagementType) {
        this.dynamicSquareMap.push(parm);
    }
    @action.bound public deleteDynamicSquare (parm: number) {
        this.dynamicSquareMap.splice(parm, 1);
    }
    @action.bound public updateDynamicSquare (parm: Partial<DynamicSquareManagementType>, index: number) {
        this.dynamicSquareMap[index] = Object.assign({}, this.dynamicSquareMap[index], parm);
    }

    @observable public bulletMap: Array<BulletManagementType | null> = Array(10).fill(null);
    @action.bound public addBullet (parm: BulletManagementType) {
        for (let i = 0; i < this.bulletMap.length; i ++) {
            if (!this.bulletMap[i]) {
                this.bulletMap[i] = parm;
                return;
            }
        }
    }
    @action.bound public deleteBullet (parm: number) {
        this.bulletMap[parm] = null;
    }
}

export default SuperContraStore;