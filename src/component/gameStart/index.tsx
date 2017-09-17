import * as React from "react";
import { observer } from "mobx-react";
import {
    KeyCodeType
} from "../../common/constant";
import {
    SuperContraStore
} from "../../store";
import "./index.scss";

interface GameStartProps {
    store: SuperContraStore;
}

@observer
class GameStart extends React.Component<GameStartProps, {}> {
    constructor(props) {
        super(props);

        this.onkeydownHandle = this.onkeydownHandle.bind(this);
    }
    componentDidMount() {
        this.onkeydown();
    }
    componentWillUnmount() {
        this.destroy();
    }
    destroy(): void {
        console.log("游戏开始! GameStart Component destroy ....");
        window.removeEventListener("keydown", this.onkeydownHandle);
    }
    onkeydownHandle(e: KeyboardEvent): void {
        const keyCode: KeyCodeType = e.keyCode;
        const {  store } = this.props;
        const { updateGameStatus } = store;
        switch ( keyCode ) {
            case 72:
                updateGameStatus(1);
                break;
        }
    }
    onkeydown(): void {
        window.addEventListener("keydown", this.onkeydownHandle);
    }
    render() {
        return (
            <div className="gameStartWrap">
            </div>
        );
    }
}

export default GameStart;