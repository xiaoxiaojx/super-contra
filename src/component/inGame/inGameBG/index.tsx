import * as React from "react";
import { observer } from "mobx-react";
// import {
//     KeyCodeType
// } from "common/constant";
import {
    levelOneMap
} from "common/levelMap";
import {
    Square
} from "../../sub";
import {
    SuperContraStore
} from "../../../store";
import "./index.scss";

interface InGameProps {
    superContraStore: SuperContraStore;
    children: React.ReactNode;
    className?: string;
}

interface InGameState {
    left: number;
}

@observer
class InGameBG extends React.Component<InGameProps, InGameState> {
    // constructor(props) {
    //     super(props);

    //     this.onkeydownHandle = this.onkeydownHandle.bind(this);
    //     this.onkeyupHandle = this.onkeyupHandle.bind(this);
    // }
    // state: InGameState = {
    //     left: 0
    // };
    // moveInterval: any;

    // componentDidMount() {
    //     this.onkeydown();
    //     this.onkeyup();
    // }
    // componentWillUnmount() {
    //     this.destroy();
    // }
    // clearRunInterval(): void {
    //     if (this.moveInterval) {
    //         clearInterval(this.moveInterval);
    //         this.moveInterval = 0;
    //     }
    // }
    // destroy(): void {
    //     window.removeEventListener("keydown", this.onkeydownHandle);
    //     window.removeEventListener("onkeyup", this.onkeyupHandle);
    //     console.log("游戏结束! InGameBG Component destroy ....");
    // }
    // backgroundMove() {
    //     const _self = this;
    //     if ( this.moveInterval ) {
    //         return;
    //     }
    //     this.moveInterval = setInterval(() => {
    //         _self.setState(preState => ({
    //             left: preState.left - 10
    //         }));
    //     }, 100);
    // }
    // onkeydownHandle(e: KeyboardEvent): void {
    //     const keyCode: KeyCodeType = e.keyCode;
    //     switch ( keyCode ) {
    //         case 68:
    //             this.backgroundMove();
    //             break;
    //     }
    // }
    // onkeyupHandle(e: KeyboardEvent): void {
    //     const keyCode: KeyCodeType = e.keyCode;
    //     switch ( keyCode ) {
    //         case 68:
    //             this.clearRunInterval();
    //             break;
    //     }
    // }
    // onkeydown(): void {
    //     window.addEventListener("keydown", this.onkeydownHandle);
    // }
    // onkeyup(): void {
    //     window.addEventListener("keyup", this.onkeyupHandle);
    // }
    render() {
        const { className = "", children, superContraStore } = this.props;
        const { inGameGBLeft } = superContraStore;
        const currentClassName = className ? `inGameBGWrap ${className}` : "inGameBGWrap";

        return (
            <div
                className={currentClassName}
                style={{left: inGameGBLeft}}>
                <div className="gameBackground">
                    {
                        levelOneMap.map((items, indexX) =>
                            <div className="col" key={`col-${indexX}`}>
                                {
                                    items.map((item, indexY) =>
                                        <Square
                                            key={`col-${indexX},row-${indexY}`}
                                            squareSpecies={item}/>)
                                }
                            </div>
                        )
                    }
                </div>
                <div className="gameContent"> { children } </div>
            </div>
        );
    }
}

export default InGameBG;