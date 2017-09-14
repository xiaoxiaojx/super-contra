import { observable, useStrict, action } from "mobx";
import {
    GameStatusType,
    LevelType,
    StaticSquareManagementType,
    StaticSquareStatusType
} from "common/constant";
import {
    getStaticSquareMap
} from "../../common/util";

useStrict(true);

class SuperContraStore {
    constructor() {
        this.staticSquareMap = getStaticSquareMap(this.level);
    }

    private couldUpdateInGameGBLeft: boolean = true;

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
        if ( this.couldUpdateInGameGBLeft ) {
            const _self = this;
            this.couldUpdateInGameGBLeft = false;
            this.inGameGBLeft -= 512;
            setTimeout(() => {
                _self.couldUpdateInGameGBLeft = true;
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
}

export default SuperContraStore;