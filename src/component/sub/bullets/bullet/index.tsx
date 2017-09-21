import * as React from "react";
import { observer } from "mobx-react";
import {
    SuperContraStore
} from "../../../../store";
import {
    BulletStatusType,
    TowardType
} from "../../../../common/constant";
import "./index.scss";

interface BulletProps {
    index: number;
    left: number;
    top: number;
    toward: TowardType;
    store: SuperContraStore;
}

interface BulletState {
    left: number;
    top: number;
    status: BulletStatusType;
    toward: TowardType;
}

@observer
class Bullet extends React.Component<BulletProps, BulletState> {
    constructor(props) {
        super(props);

        this.setLeft = this.setLeft.bind(this);
        this.isBeyondDistance = this.isBeyondDistance.bind(this);
    }
    state: BulletState = {
        left: 0,
        top: 0,
        status: 0,
        toward: 0
    };
    autoFlightInterval: any;

    componentDidMount() {
        this.initState();
    }
    componentWillUnmount() {
        this.destroy();
    }
    shouldComponentUpdate(nextProps, nextState) {
        const { status, left, top, toward } = this.state;
        return nextState.status !== status ||
            nextState.left !== left ||
            nextState.top !== top ||
            nextState.toward !== toward;
    }
    setLeft() {
        const { toward } = this.state;
        const step = toward === 0 ? -4 : 4;
        this.setState(preState => ({
            left: preState.left + step
        }));
    }
    autoFlight() {
        this.clearAutoFlightInterval();
        this.autoFlightInterval = setInterval(() => {
            if (this.isBeyondDistance()) {
                this.destroy();
            }
            else {
                this.setLeft();
            }
        }, 10);
    }
    clearAutoFlightInterval() {
        if (this.autoFlightInterval) {
            clearInterval(this.autoFlightInterval);
            this.autoFlightInterval = 0;
        }
    }
    destroy() {
        const { deleteBullet } = this.props.store;
        const { index } = this.props;
        this.clearAutoFlightInterval();
        deleteBullet(index);
        console.log("One Bullet destroy ...");
    }
    isBeyondDistance() {
        const { store, index } = this.props;
        const { left } = this.state;
        const { bulletMap } = store;
        return !bulletMap[index] || left < bulletMap[index].left - 512 || left > bulletMap[index].left + 512;
    }
    initState() {
        const { left, top, toward } = this.props;
        this.setState({
            left,
            top,
            toward
        }, this.autoFlight);
    }
    render() {
        const { left, top } = this.state;
        const styles = {
            left,
            top
        };
        return (
            <div
                className="bulletWrap"
                style={styles}>
            </div>
        );
    }
}

export default Bullet;