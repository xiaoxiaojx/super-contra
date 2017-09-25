import * as React from "react";
import {
    getDisplayName,
    getImageStyles
} from "../util";
import {
    ContraDirectionType,
} from "../../../../common/constant";
import {
    isHitWall,
    isBeyondBottom
} from "../../../../common/util";
import "./index.scss";

interface WrappedDynamicSquareUtils {
    changeBackground: (parm: DynamicSquareOption) => void;
}

export interface DynamicSquareOption {
    imageName?: string;
    position?: string;
}

export interface DynamicSquareProps {
    hoc: WrappedDynamicSquareUtils;
}

interface HocSquareState {
    options: DynamicSquareOption;
    status: ContraDirectionType;
}

interface ComponentDecorator<TOwnProps> {
    (component: React.ComponentClass<DynamicSquareProps & TOwnProps>): React.ComponentClass<TOwnProps>;
}

function WithDynamicSquare<TOwnProps>(options: DynamicSquareOption): ComponentDecorator<TOwnProps> {
    return Component =>
        class HocSquare extends React.Component<TOwnProps, HocSquareState> {
            static displayName: string = `Hoc${getDisplayName(Component)}`;
            state = {
                options,
                status: 0
            };
            moveInterval: any;

            componentDidMount() {
                this.autoMove();
            }
            componentWillUnmount() {
                this.destroy();
            }
            autoMove() {
                this.initStatus();
            }
            setLeftGradient(step: number): void {
                const { updatePosition, index, position } = this.props as any;
                const currentPosition = Object.assign({}, position, {left: position.left + step});
                updatePosition(currentPosition, index);
            }
            setTopGradient(step: number): void {
                const { updatePosition, index, position } = this.props as any;
                const currentPosition = Object.assign({}, position, {top: position.top + step});
                updatePosition(currentPosition, index);
            }
            toRight(): void {
                const _self = this;
                this.clearMoveInterval();
                this.moveInterval = setInterval(() => {
                    const { position } = _self.props as any;
                    const { left, top } = position;
                    if (_self.isHitBottomWall(left, top) && !isHitWall(left + 32, top)) {
                        _self.setLeftGradient(2);
                    }
                    else if (isHitWall(left + 32, top)) {
                        _self.setStatus(2);
                    }
                    else {
                        _self.setStatus(4);
                    }
                }, 30);
            }
            toLeft(): void {
                const _self = this;
                this.clearMoveInterval();
                this.moveInterval = setInterval(() => {
                    const { position } = _self.props as any;
                    const { left, top } = position;
                    if (_self.isHitBottomWall(left, top) && !isHitWall(left, top)) {
                        _self.setLeftGradient(-2);
                    }
                    else if (isHitWall(left, top)) {
                        _self.setStatus(1);
                    }
                    else {
                        _self.setStatus(4);
                    }
                }, 30);
            }
            toBottom(): void {
                const _self = this;
                this.clearMoveInterval();
                this.moveInterval = setInterval(() => {
                    const { position } = _self.props as any;
                    const { top } = position;
                    if ( isBeyondBottom(top + 32) ) {
                        _self.destroy();
                    }
                    else if ( !_self.isHitBottomWall() ) {
                        _self.setTopGradient(4);
                    }
                    else {
                        _self.initStatus();
                    }
                }, 30);
            }
            isHitBottomWall(x: number = 0, y: number = 0): boolean {
                const { position } = this.props as any;
                const { left, top } = position;
                const currentX = x ? x : left;
                const currentY = y ? y : top;
                return isHitWall(currentX, currentY + 32) || isHitWall(currentX + 32, currentY + 32);
            }
            initStatus() {
                const { toward } = this.props as any;
                const status = toward === 1 ? 1 : 2;
                this.setStatus(status);
            }
            setOptions(parm: DynamicSquareOption) {
                this.setState({ options: parm });
            }
            setStatus(parm: ContraDirectionType) {
                this.setState({ status: parm }, this.statusListening);
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
                    case 4:
                        this.toBottom();
                        break;
                }
            }
            destroy() {
                this.clearMoveInterval();
            }
            clearMoveInterval(): void {
                if (this.moveInterval) {
                    clearInterval(this.moveInterval);
                    this.moveInterval = 0;
                }
            }
            changeBackground(parm: DynamicSquareOption): void {
                this.setOptions(parm);
            }
            render() {
                const passThroughProps: any = this.props;
                const { position } = passThroughProps;
                const { left, top } = position;
                const { options } = this.state;
                const staticProps: WrappedDynamicSquareUtils = {
                    changeBackground: this.changeBackground
                };
                const imageStyles = getImageStyles(options);
                const styles = {...imageStyles, left, top};

                return (
                    <div
                        className="dynamicHocWrap"
                        style={styles}>
                        <Component
                            hoc={staticProps}
                            {...passThroughProps} />
                    </div>
                );
            }
        };
}

export default WithDynamicSquare;