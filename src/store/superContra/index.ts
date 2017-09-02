import { observable, useStrict, action } from "mobx";
import {
    GameStatusType
} from "./constant";

useStrict(true);

class SuperContraStore {
    @observable public gameStatus: GameStatusType = 0;
    @action.bound public updateGameStatus(parm: GameStatusType) {
        this.gameStatus = parm;
    }
}

export default SuperContraStore;