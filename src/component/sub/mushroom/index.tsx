import * as React from "react";
import {
    MushroomStatusType
} from "../../../common/constant";
import {
    isHitWall
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
    }
    state: MushroomState = {
        left: 0,
        top: 0,
        status: 0
    };
    runInterval: number;

    componentDidMount() {
        this.initState();
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
        }, this.autoRun);
    }
    runCheck(cb: Function): void {
        const { left, top, status } = this.state;
        if (isHitWall(left, top + 32)) {
            this.setStatus(1);
            console.log("isEmpty...");
        }
        else if (isHitWall(left + 32, top)) {
            this.setStatus(2);
            console.log("isHitRight...");
        }
        else if (isHitWall(left, top) && status !== 0 && status !== 3) {
            this.setStatus(3);
            console.log("isHitLeft...");
        }
        else if ( status !== 0 ) {
            this.setStatus(0);
        }
        else {
            this.clearRunInterval();
            this.runInterval = setInterval(cb, 100);
        }
    }
    death(): void {

    }
    runLeft(): void {
        this.runCheck(() => {
            this.setState(preState => ({
                left: preState.left - 4
            }));
        });
    }
    runBottom(): void {
        this.runCheck(() => {
            this.setState(preState => ({
                top: preState.top + 4
            }));
        });
    }
    runRight(): void {
        this.runCheck(() => {
            this.setState(preState => ({
                left: preState.left + 4
            }));
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
        const { left, top } = this.state;

        return (
            <div
                className="mushroomWrap"
                style={{left, top}}>
            </div>
        );
    }
}

export default Mushroom;