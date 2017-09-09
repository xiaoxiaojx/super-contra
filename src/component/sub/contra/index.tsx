import * as React from "react";
import {
    KeyCodeType,
    ContraDirectionType,
    DirectionTendencyType
} from "common/constant";
import {
    isHitWall
} from "common/util";
import { observer } from "mobx-react";
import ContraBG from "./contraBG";
import {
    SuperContraStore
} from "../../../store";
import "./index.scss";

interface ContraState {
    status: ContraDirectionType;
    left: number;
    top: number;
}

interface ConfigType {
    beforeJumpTop: number;
    beforeJumpLeft: number;
    jumpHeight: number;
    jumpWidth: number;
    directionTendency: DirectionTendencyType;
}

interface ContraProps {
    superContraStore: SuperContraStore;
}

@observer
class Contra extends React.Component<ContraProps, ContraState> {
    constructor(props) {
        super(props);

        this.onkeydownHandle = this.onkeydownHandle.bind(this);
        this.onkeyupHandle = this.onkeyupHandle.bind(this);
        this.setLeftGradient = this.setLeftGradient.bind(this);
        this.setTopGradient = this.setTopGradient.bind(this);
        this.isHitLeftEdge = this.isHitLeftEdge.bind(this);
        this.setStatus = this.setStatus.bind(this);
        this.setState = this.setState.bind(this);
        this.setConfig = this.setConfig.bind(this);
    }
    state: ContraState = {
        status: 0,
        left: 0,
        top: 384,
    };
    config: ConfigType = {
        directionTendency: 0,
        jumpHeight: 128,
        jumpWidth: 160,
        beforeJumpTop: 384,
        beforeJumpLeft: 0
    };
    moveInterval: any;

    componentDidMount() {
        this.onkeydown();
        this.onkeyup();
    }
    componentWillUnmount() {
        this.destroy();
    }
    componentWillUpdate(nextProps, nextState) {
        this.updateLeftListening(nextState);
        return true;
    }
    setConfig(parm: Partial<ConfigType>) {
        const currentConfig = Object.assign({}, this.config, parm);
        this.config = currentConfig;
    }
    setStatus(parm: ContraDirectionType, listening: boolean = true): void {
        listening ?
        this.setState({
            status: parm
        }, this.statusListening)
        :
        this.setState({
            status: parm
        });
    }
    setDirectionTendency(parm: DirectionTendencyType): void {
        const directionTendency = { directionTendency:  parm};
        this.setConfig(directionTendency);
        setTimeout(() => {
            this.setConfig({directionTendency: 0});
        }, 200);

    }
    setLeftGradient(step: number): void {
        this.setState(preState => ({ left: preState.left + step }));
    }
    setTopGradient(step: number): void {
        this.setState(preState => ({ top: preState.top + step }));
    }
    updateLeftListening(nextState): void {
        if ( nextState.left % 512 === 0 &&  this.state.left > 0) {
            const { updateInGameGBLeft } = this.props.superContraStore;
            updateInGameGBLeft();
        }
    }
    updateConfigJumpInfo(): void {
        const { left, top } = this.state;
        const currentConfig = Object.assign({}, this.config, {beforeJumpTop: top, beforeJumpLeft: left});
        this.config = currentConfig;
    }
    onkeydownHandle(e: KeyboardEvent): void {
        const { status } = this.state;
        const { directionTendency } = this.config;
        const keyCode: KeyCodeType = e.keyCode;
        if (status === 0 || status === 1 || status === 2 ) {
            switch ( keyCode ) {
                case 68:
                    this.setStatus(1);
                    break;
                case 65:
                    this.setStatus(2);
                    break;
                case 74:
                    if ( directionTendency === 2 ) {
                        this.setStatus(5);
                    } else if (directionTendency === 1 ) {
                        this.setStatus(6);
                    } else {
                        this.setStatus(3);
                    }
                    break;
            }
        }
    }
    onkeyupHandle(): void {
        const { status } = this.state;
        if ( status === 0 || status === 1 || status === 2 ) {
            this.clearRunInterval();
        }
    }
    onkeydown(): void {
        window.addEventListener("keydown", this.onkeydownHandle);
    }
    onkeyup(): void {
        window.addEventListener("keyup", this.onkeyupHandle);
    }
    toRight(): void {
        this.clearRunInterval();
        this.setDirectionTendency(1);
        const { left, top } = this.state;
        this.moveInterval = setInterval(() => {
            if (!isHitWall(left + 32, top)) {
                this.setLeftGradient(2);
            }
        }, 10);
    }
    toLeft(): void {
        this.clearRunInterval();
        this.setDirectionTendency(2);
        const { left, top } = this.state;
        this.moveInterval = setInterval(() => {
            if ( !this.isHitLeftEdge() && !isHitWall(left, top) ) {
                this.setLeftGradient(-2);
            }
        }, 10);
    }
    toTop(): void {
        const _self = this;
        const { beforeJumpTop, jumpHeight } = this.config;
        this.clearRunInterval();
        this.updateConfigJumpInfo();
        const maxHeight = beforeJumpTop - jumpHeight;
        this.moveInterval = setInterval(() => {
            if ( !isHitWall(_self.state.left, _self.state.top) && !isHitWall(_self.state.left + 32, _self.state.top) && _self.state.top > maxHeight ) {
                this.setTopGradient(-4);
            } else {
                this.setStatus(4);
            }
        }, 10);
    }
    toBottom(): void {
        const _self = this;
        this.clearRunInterval();
        this.moveInterval = setInterval(() => {
            if ( !isHitWall(_self.state.left, _self.state.top + 32) ) {
                this.setTopGradient(4);
            } else {
                this.setStatus(0);
            }
        }, 20);
    }
    toRightTop(): void {
        const { top } = this.state;
        const { beforeJumpTop, jumpHeight } = this.config;
        this.clearRunInterval();
        this.updateConfigJumpInfo();
        const maxHeight = beforeJumpTop - jumpHeight;
        this.moveInterval = setInterval(() => {
            if ( top > maxHeight ) {
                this.setState(preState => ({ top: preState.top - 2, left: preState.left + 1}));
            } else {
                if ( top < beforeJumpTop ) {
                    this.setState(preState => ({ top: preState.top + 2, left: preState.left + 1}));
                } else {
                    this.setStatus(0);
                }
            }
        }, 10);
    }
    statusListening(): void {
        const { status } = this.state;
        switch (status) {
            case 0:
                this.clearRunInterval();
                break;
            case 1:
                this.toRight();
                break;
            case 2:
                this.toLeft();
                break;
            case 3:
                this.toTop();
                break;
            case 4:
                this.toBottom();
                break;
            case 5:
                this.toRightTop();
                break;
        }
    }
    isHitLeftEdge(): boolean {
        const { inGameGBLeft } = this.props.superContraStore;
        const { left } = this.state;
        return Math.abs(inGameGBLeft) === left - 10;
    }
    clearRunInterval(): void {
        if (this.moveInterval) {
            clearInterval(this.moveInterval);
            this.moveInterval = 0;
        }
    }
    destroy(): void {
        window.removeEventListener("keydown", this.onkeydownHandle);
        window.removeEventListener("onkeyup", this.onkeyupHandle);
        console.log("英雄死亡! Contra Component destroy ....");
    }
    render() {
        const { left, top, status } = this.state;

        return (
            <ContraBG
                left={left}
                top={top}
                status={status}>
            </ContraBG>
        );
    }
}

export default Contra;