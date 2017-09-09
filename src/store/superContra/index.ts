import { observable, useStrict, action } from "mobx";
import {
    GameStatusType
} from "../../common/constant";

useStrict(true);

class SuperContraStore {
    private couldUpdateInGameGBLeft: boolean = true;

    @observable public gameStatus: GameStatusType = 0;
    @action.bound public updateGameStatus(parm: GameStatusType) {
        this.gameStatus = parm;
    }

    @observable public inGameGBLeft: number = 0;
    @action.bound public updateInGameGBLeft() {
        if ( this.couldUpdateInGameGBLeft ) {
            const _self = this;
            this.couldUpdateInGameGBLeft = false;
            this.inGameGBLeft -= 512;
            setTimeout(() => {
                _self.couldUpdateInGameGBLeft = true;
            }, 2000);
        }
    }
}

export default SuperContraStore;