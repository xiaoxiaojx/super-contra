import * as React from "react";
import { observer } from "mobx-react";
import {
    SuperContraStore
} from "../../store";
import "./index.scss";

interface GameOverProps {
    store: SuperContraStore;
}

@observer
class GameOver extends React.Component<GameOverProps, {}> {
    render() {
        return (
            <div className="gameOverWrap">
                <div className="background"></div>
                <div className="content">Game Over</div>
            </div>
        );
    }
}

export default GameOver;