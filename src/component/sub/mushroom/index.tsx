import * as React from "react";
import {
    MushroomStatusType
} from "../../../common/constant";
import {
    isEmpty,
    isHitRight,
    isHitLeft
} from "../../../common/util";
import "./index.scss";

interface MushroomProps {
    left: number;
    top: number;
    status?: MushroomStatusType;
}

interface MushroomState {
    left: number;
    top: number;
    status: MushroomStatusType;
}

class Mushroom extends React.Component<MushroomProps, MushroomState> {
    constructor(props) {
        super(props);

        this.initState();
    }
    state: MushroomState = {
        left: 0,
        top: 0,
        status: 0
    };
    runInterval: number;

    componentDidMount() {
        this.autoRun();
    }
    componentWillUnmount() {
        this.destroy();
    }
    destroy(): void {
        this.clearRunInterval();
    }
    clearRunInterval(): void {
        if (this.runInterval) {
            clearInterval(this.runInterval);
        }
    }
    setStatus(parm: MushroomStatusType): void {
        this.setState({ status: parm });
    }
    initState(): void {
        const { left, top, status = 0 } = this.props;
        this.setState({
            left,
            top,
            status
        });
    }
    runCheck(cb: Function): void {
        const { left, top } = this.state;
        if (isEmpty(left, top + 32)) {
            this.setStatus(1);
        }
        else if (isHitRight(left + 32, top)) {
            this.setStatus(2);
        }
        else if (isHitLeft(left, top)) {
            this.setStatus(3);
        }
        else {
            this.clearRunInterval();
            this.runInterval = setInterval(cb, 100);
        }
    }
    death(): void {

    }
    runLeft(): void {
        const { left } = this.state;
        this.runCheck(() => {
            this.setState({
                left: left - 1
            });
        });
    }
    runBottom(): void {
        const { top } = this.state;
        this.runCheck(() => {
            this.setState({
                top: top + 1
            });
        });
    }
    runRight(): void {
        const { left } = this.state;
        this.runCheck(() => {
            this.setState({
                left: left + 1
            });
        });
    }
    autoRun(): void {
        const { status } = this.state;
        switch ( status ) {
            case 1:
                this.runBottom();
                break;
            case 2:
                this.runLeft();
                break;
            case 4:
                this.death();
                break;
            default:
                this.runRight();
        }
    }
    render() {
        const { left, top } = this.props;

        return (
            <div
                className="mushroomWrap"
                style={{left, top}}>
            </div>
        );
    }
}

export default Mushroom;