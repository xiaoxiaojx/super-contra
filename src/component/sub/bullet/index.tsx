import * as React from "react";
import {
    BulletStatusType
} from "../../../common/constant";
import "./index.scss";

interface BulletProps {
    left: number;
    top: number;
}

interface BulletState {
    left: number;
    top: number;
    status: BulletStatusType;
}

class Bullet extends React.Component<BulletProps, BulletState> {
    constructor(props) {
        super(props);

        this.setLeft = this.setLeft.bind(this);
    }
    state: BulletState = {
        left: 0,
        top: 0,
        status: 0
    };
    autoFlightInterval: any;

    componentDidMount() {
        this.initState();
    }
    componentWillUnmount() {
        this.destroy();
    }
    setLeft() {
        this.setState(preState => ({
            left: preState.left + 2
        }));
    }
    autoFlight() {
        this.clearAutoFlightInterval();
        this.autoFlightInterval = setInterval(() => {
            this.setLeft();
        }, 100);
    }
    clearAutoFlightInterval() {
        if (this.autoFlightInterval) {
            clearInterval(this.autoFlightInterval);
            this.autoFlightInterval = 0;
        }
    }
    destroy() {
        this.clearAutoFlightInterval();
    }
    initState() {
        const { left, top } = this.props;
        this.setState({
            left,
            top
        });
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