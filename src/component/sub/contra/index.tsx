import * as React from "react";
import { observer } from "mobx-react";
import ContraBG from "./contraBG";
import {
    SuperContraStore
} from "../../../store";
import {
    KeyCodeType,
    ContraDirectionType,
    DirectionTendencyType,
    ContraConfigType,
    TowardType,
} from "../../../common/constant";
import {
    isHitWall,
    getHitWall,
    isBeyondBottom
} from "../../../common/util";
import "./index.scss";

interface ContraState {
    status: ContraDirectionType;
    toward: TowardType;
    left: number;
    top: number;
}

interface ContraProps {
    store: SuperContraStore;
}

@observer
class Contra extends React.PureComponent<ContraProps, ContraState> {
    constructor(props) {
        super(props);

        const methodItems: Array<string> = ["onkeydownHandle", "onkeyupHandle", "setLeftGradient", "setTopGradient", "isHitLeftEdge",
            "setStatus", "setState", "setConfig", "updateHitWallStatus", "isHitTopWall", "isHitBottomWall"];
        methodItems.forEach(method => this[method] = this[method].bind(this));
    }
    state: ContraState = {
        status: 0,
        left: 0,
        top: 384,
        toward: 1,
    };
    config: ContraConfigType = {
        directionTendency: 0,
        jumpHeight: 160,
        beforeJumpTop: 384,
        parabolaParm: {
            a: 1.2,
            b: -30,
            step: 1,
            stepVal: 2
        }
    };
    moveInterval: any;
    updateHitWallStatusTimeOut: any;
    canFiringBullets: boolean = true;

    componentDidMount() {
        this.onkeydown();
        this.onkeyup();
    }
    componentWillUnmount() {
        this.destroy();
    }
    componentWillUpdate(nextProps, nextState) {
        this.updateLeftListening(nextState);
    }
    shouldComponentUpdate(nextProps, nextState) {
        const { status, left, top, toward } = this.state;
        return nextState.status !== status ||
            nextState.left !== left ||
            nextState.top !== top ||
            nextState.toward !== toward;
    }
    setConfig(parm: Partial<ContraConfigType>): ContraConfigType {
        const currentConfig = Object.assign({}, this.config, parm);
        this.config = currentConfig;
        return currentConfig;
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
    setPositionGradient(step: number): boolean {
        const { status } = this.state;
        const {a, b} = this.config.parabolaParm;
        const c  = this.config.beforeJumpTop;
        let isTop: boolean = true;

        this.setState(preState => {
            const x = preState.left + step;
            const y = status === 5 ? a * step * step + b * step + c : a * step * step + b * Math.abs(step) + c;
            isTop = y < preState.top;
            if ( !isTop && isBeyondBottom(y + 32) ) {
                this.destroy();
            }
            else if ( !isTop && this.isHitBottomWall(x, y) ) {
                this.setStatus(4);
                return ({status: 4});
            }
           return ({ top: parseInt(y.toString()), left: parseInt(x.toString())});
        });
        return isTop;
    }
    updateLeftListening(nextState): void {
        if ( nextState.left % 512 >= 490 &&  this.state.left > 0 && (this.state.status === 1 || this.state.status === 5)) {
            const { updateInGameGBLeft } = this.props.store;
            updateInGameGBLeft();
        }
    }
    updateHitWallStatus(): void {
        const { updateStaticSquareMap } = this.props.store;
        const { left, top } = this.state;
        if ( typeof getHitWall(left + 18, top) === "object") {
            const { col, row } = getHitWall(left + 18, top) as any;
            updateStaticSquareMap(col, row, 1);
            this.clearUpdateHitWallStatusTimeOut();
            this.updateHitWallStatusTimeOut = setTimeout(() => {
                updateStaticSquareMap(col, row, 0);
            }, 1000);
        }
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
                    if ( this.isFireBullets() ) {
                        this.firingBullets();
                    }
                    break;
                case 75:
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
        this.clearMoveInterval();
        this.setDirectionTendency(2);
        this.setToward(1);
        this.moveInterval = setInterval(() => {
            if (this.isHitBottomWall(_self.state.left, _self.state.top) && !isHitWall(_self.state.left + 32, _self.state.top)) {
                this.setLeftGradient(2);
            } else {
                this.setStatus(4);
            }
        }, 10);
    }
    toLeft(): void {
        const _self = this;
        this.clearMoveInterval();
        this.setDirectionTendency(1);
        this.setToward(0);
        this.moveInterval = setInterval(() => {
            if (this.isHitBottomWall(_self.state.left, _self.state.top) && !this.isHitLeftEdge() && !isHitWall(_self.state.left, _self.state.top) ) {
                this.setLeftGradient(-2);
            } else {
                this.setStatus(4);
            }
        }, 10);
    }
    toTop(): void {
        const _self = this;
        const { beforeJumpTop, jumpHeight } = this.setConfig({ beforeJumpTop: this.state.top });
        const maxHeight = beforeJumpTop - jumpHeight;
        this.clearMoveInterval();
        this.moveInterval = setInterval(() => {
            if ( !this.isHitTopWall() && _self.state.top > maxHeight ) {
                this.setTopGradient(-4);
            } else {
                this.updateHitWallStatus();
                this.setStatus(4);
            }
        }, 10);
    }
    toBottom(): void {
        const _self = this;
        this.clearMoveInterval();
        this.moveInterval = setInterval(() => {
            if ( isBeyondBottom(_self.state.top + 32) ) {
                this.destroy();
            }
            else if ( !this.isHitBottomWall() ) {
                this.setTopGradient(4);
            } else {
                this.setStatus(0);
            }
        }, 10);
    }
    toRightTop(): void {
        const _self = this;
        const { beforeJumpTop, parabolaParm } = this.setConfig({ beforeJumpTop: this.state.top });
        let { step, stepVal } = parabolaParm;
        this.clearMoveInterval();
        this.setToward(1);
        let isTop: boolean = true;
        this.moveInterval = setInterval(() => {
            //  向上阶段
            if ( isTop ) {
                if (  this.isHitTopWall() || (isHitWall(_self.state.left + 32, _self.state.top + 32) && beforeJumpTop !== _self.state.top)) {
                    this.setStatus(4);
                } else {
                    isTop = this.setPositionGradient(step);
                    step += stepVal;
                }
            }
            //  向下阶段
            else {
                isTop = false;
                if ( isBeyondBottom(_self.state.top + 32) ) {
                    this.destroy();
                }
                else if ( this.isHitBottomWall() ) {
                    this.setStatus(0);
                } else {
                    this.setPositionGradient(step);
                    step += stepVal;
                }
            }
        }, 40);
    }
    toLeftTop(): void {
        const _self = this;
        const { beforeJumpTop, parabolaParm } = this.setConfig({ beforeJumpTop: this.state.top });
        let { step, stepVal } = parabolaParm;
        this.clearMoveInterval();
        this.setToward(0);
        let isTop: boolean = true;
        this.moveInterval = setInterval(() => {
            if ( isTop ) {
                if (  this.isHitTopWall() || (isHitWall(_self.state.left, _self.state.top + 32) && beforeJumpTop !== _self.state.top) ) {
                    this.setStatus(4);
                } else {
                    this.setPositionGradient(step);
                    step -= stepVal;
                }
            }
            else {
                isTop = false;
                if ( isBeyondBottom(_self.state.top + 32) ) {
                    this.destroy();
                }
                else if ( this.isHitBottomWall() ) {
                    this.setStatus(0);
                } else {
                    this.setPositionGradient(step);
                    step -= stepVal;
                }
            }
        }, 40);
    }
    firingBullets() {
        const _self = this;
        const { toward, left, top } = this.state;
        const { addBullet } = this.props.store;
        if ( this.canFiringBullets) {
            this.canFiringBullets = false;
            if ( toward === 0 ) {
                addBullet({
                    left: left - 10,
                    top: top + 7,
                    toward
                });
            } else {
                addBullet({
                    left: left + 32,
                    top: top + 7,
                    toward
                });
            }
            setTimeout(() => {
                _self.canFiringBullets = true;
            }, 100);
        }
    }
    statusListening(): void {
        const { status } = this.state;
        switch (status) {
            case 0:
                this.clearMoveInterval();
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
    isHitTopWall(x: number = 0, y: number = 0): boolean {
        const { left, top } = this.state;
        const currentX = x ? x : left;
        const currentY = y ? y : top;
        return isHitWall(currentX, currentY) || isHitWall(currentX + 32, currentY);
    }
    isHitBottomWall(x: number = 0, y: number = 0): boolean {
        const { left, top } = this.state;
        const currentX = x ? x : left;
        const currentY = y ? y : top;
        return isHitWall(currentX, currentY + 32) || isHitWall(currentX + 32, currentY + 32);
    }
    isHitLeftEdge(): boolean {
        const { inGameGBLeft } = this.props.store;
        const { left } = this.state;
        return Math.abs(inGameGBLeft) === left - 10;
    }
    isFireBullets(): boolean {
        const { status } = this.state;
        return status !== 3 && status !== 4 && status !== 5 && status !== 6;
    }
    clearMoveInterval(): void {
        if (this.moveInterval) {
            clearInterval(this.moveInterval);
            this.moveInterval = 0;
        }
    }
    clearUpdateHitWallStatusTimeOut(): void {
        if (this.updateHitWallStatusTimeOut) {
            clearTimeout(this.updateHitWallStatusTimeOut);
            this.updateHitWallStatusTimeOut = 0;
        }
    }
    destroy(): void {
        const { updateGameStatus } = this.props.store;
        this.clearMoveInterval();
        this.clearUpdateHitWallStatusTimeOut();
        window.removeEventListener("keydown", this.onkeydownHandle);
        window.removeEventListener("onkeyup", this.onkeyupHandle);
        console.log("英雄死亡! Contra Component destroy ....");
        updateGameStatus(3);
    }
    render() {
        console.log("Contra update ...");
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