import * as React from "react";
import {
    KeyCodeType,
    ContraDirectionType,
    DirectionTendencyType,
    ParabolaParmType,
    ConfigType,
    TowardType
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
    toward: TowardType;
    left: number;
    top: number;
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
        this.isFlightCheck =  this.isFlightCheck.bind(this);
    }
    state: ContraState = {
        status: 0,
        left: 0,
        top: 384,
        toward: 1
    };
    config: ConfigType = {
        directionTendency: 0,
        jumpHeight: 160,
        beforeJumpTop: 384,
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
    setToward(parm: TowardType): void {
        if ( this.state.toward !== parm ) {
            this.setState({ toward: parm });
        }
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
        this.setConfig({ directionTendency:  parm});
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
    getParabolaParm(): ParabolaParmType {
        const { beforeJumpTop} = this.config;
        const c = beforeJumpTop;
        return {
            a: 1.2,
            b: -30,
            c,
            step: 1,
            stepVal: 2
        };
    }
    updateLeftListening(nextState): void {
        if ( nextState.left % 512 >= 500 &&  this.state.left > 0 && (this.state.status === 1 || this.state.status === 5)) {
            const { updateInGameGBLeft } = this.props.superContraStore;
            updateInGameGBLeft();
        }
    }
    updateConfigJumpInfo(): void {
        const { top } = this.state;
        const currentConfig = Object.assign({}, this.config, {beforeJumpTop: top});
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
            this.setStatus(0);
        }
    }
    onkeydown(): void {
        window.addEventListener("keydown", this.onkeydownHandle);
    }
    onkeyup(): void {
        window.addEventListener("keyup", this.onkeyupHandle);
    }
    toRight(): void {
        const _self = this;
        this.clearRunInterval();
        this.setDirectionTendency(2);
        this.setToward(1);
        this.moveInterval = setInterval(() => {
            if (this.isFlightCheck(_self.state.left, _self.state.top) && !isHitWall(_self.state.left + 32, _self.state.top)) {
                this.setLeftGradient(2);
            } else {
                this.setStatus(4);
            }
        }, 10);
    }
    toLeft(): void {
        const _self = this;
        this.clearRunInterval();
        this.setDirectionTendency(1);
        this.setToward(0);
        this.moveInterval = setInterval(() => {
            if (this.isFlightCheck(_self.state.left, _self.state.top) && !this.isHitLeftEdge() && !isHitWall(_self.state.left, _self.state.top) ) {
                this.setLeftGradient(-2);
            } else {
                this.setStatus(4);
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
            if ( !isHitWall(_self.state.left, _self.state.top + 32) && !isHitWall(_self.state.left + 32, _self.state.top + 32) ) {
                this.setTopGradient(4);
            } else {
                this.setStatus(0);
            }
        }, 10);
    }
    toRightTop(): void {
        const _self = this;
        const { beforeJumpTop, jumpHeight } = this.config;
        this.clearRunInterval();
        this.updateConfigJumpInfo();
        this.setToward(1);
        const maxHeight = beforeJumpTop - jumpHeight;
        const {a, b, c, stepVal} = this.getParabolaParm();
        let { step } = this.getParabolaParm();
        let isTop: boolean = true;
        this.moveInterval = setInterval(() => {
            //  向上阶段
            if ( _self.state.top > maxHeight && isTop ) {
                if (  isHitWall(_self.state.left, _self.state.top) || isHitWall(_self.state.left + 32, _self.state.top) || (isHitWall(_self.state.left + 32, _self.state.top + 32) && beforeJumpTop !== _self.state.top)) {
                    this.setStatus(4);
                } else {
                    this.setState(preState => {
                        const x = preState.left + step;
                        const y = a * step * step + b * step + c;
                        step += stepVal;
                       return ({ top: parseInt(y.toString()), left: parseInt(x.toString())});
                    });
                }
            }
            //  向下阶段
            else {
                isTop = false;
                if ( isHitWall(_self.state.left + 32, _self.state.top + 32) || isHitWall(_self.state.left, _self.state.top + 32) ) {
                    this.setStatus(0);
                } else {
                    this.setState(preState => {
                        const x = preState.left + step;
                        const y = a * step * step + b * step + c;
                        step += stepVal;
                        if ( isHitWall(x + 32, y + 32) || isHitWall(x, y + 32) ) {
                            this.setStatus(4);
                            return ({status: 4});
                        }
                        else {
                            return ({ top: parseInt(y.toString()), left: parseInt(x.toString())});
                        }
                    });
                }
            }
        }, 40);
    }
    toLeftTop() {
        const _self = this;
        const { beforeJumpTop, jumpHeight } = this.config;
        this.clearRunInterval();
        this.updateConfigJumpInfo();
        this.setToward(0);
        const maxHeight = beforeJumpTop - jumpHeight;
        const {a, b, c, stepVal} = this.getParabolaParm();
        let { step } = this.getParabolaParm();
        let isTop: boolean = true;
        this.moveInterval = setInterval(() => {
            if ( _self.state.top > maxHeight && isTop ) {
                if (  isHitWall(_self.state.left, _self.state.top) || isHitWall(_self.state.left + 32, _self.state.top)) {
                    this.setStatus(4);
                } else {
                    this.setState(preState => {
                        const x = preState.left + step;
                        const y = a * step * step + b * Math.abs(step) + c;
                        step -= stepVal;
                       return ({ top: parseInt(y.toString()), left: parseInt(x.toString())});
                    });
                }
            }
            else {
                isTop = false;
                if ( isHitWall(_self.state.left + 32, _self.state.top + 32) || isHitWall(_self.state.left, _self.state.top + 32) ) {
                    this.setStatus(0);
                } else {
                    this.setState(preState => {
                        const x = preState.left + step;
                        const y = a * step * step + b * Math.abs(step) + c;
                        step -= stepVal;
                        if ( isHitWall(x + 32, y + 32) || isHitWall(x, y + 32) ) {
                            this.setStatus(4);
                            return ({status: 4});
                        }
                        else {
                            return ({ top: parseInt(y.toString()), left: parseInt(x.toString())});
                        }
                    });
                }
            }
        }, 40);
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
            case 6:
                this.toLeftTop();
                break;
        }
    }
    isHitLeftEdge(): boolean {
        const { inGameGBLeft } = this.props.superContraStore;
        const { left } = this.state;
        return Math.abs(inGameGBLeft) === left - 10;
    }
    isFlightCheck(left: number, top: number): boolean {
        if ( !isHitWall(left + 32, top + 32) && !isHitWall(left, top + 32) ) {
            return false;
        }
        return true;
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
        const { left, top, status, toward } = this.state;

        return (
            <ContraBG
                left={left}
                top={top}
                status={status}
                toward={toward}>
            </ContraBG>
        );
    }
}

export default Contra;