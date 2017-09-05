import * as React from "react";
import {
    getDisplayName
} from "../util";
import "./index.scss";

export interface StaticSquareOption {
    imageName?: string;
    position?: string;
}

export interface StaticSquareProps {
    hocProps: {
        changeBackground: (parm: StaticSquareOption) => void
    };
}

interface HocSquareState {
    styles: React.CSSProperties;
}

interface ComponentDecorator<TOwnProps> {
    (component: React.ComponentClass<StaticSquareProps & TOwnProps>): React.ComponentClass<TOwnProps>;
}

function createStaticSquare<TOwnProps>(options?: StaticSquareOption): ComponentDecorator<TOwnProps> {
    const getStyles = (parm?: StaticSquareOption): React.CSSProperties => {
        const { imageName = "", position = "" } = parm;
        const requireImg = require(`../../../../image/${imageName}`);
        const normalStyle = imageName ? {
            backgroundImage: `url(${requireImg})`
        } : {};
        const positionStyle = position ? {
            backgroundPosition: position
        } : {};
        const styles = {...normalStyle, ...positionStyle};
        return styles;
    };
    console.log(options);

    return Component =>
        class HocSquare extends React.Component<TOwnProps, HocSquareState> {
            constructor(props) {
                super(props);

                this.changeBackground = this.changeBackground.bind(this);
            }
            static displayName: string = `Hoc(${getDisplayName(Component)})`;
            state: HocSquareState = {
                styles: getStyles(options)
            };

            changeBackground(parm: StaticSquareOption): void {
                const styles = getStyles(parm);
                this.setState({ styles });
            }
            render() {
                const { styles } = this.state;
                const hocProps: StaticSquareProps = {
                    hocProps: {
                        changeBackground: this.changeBackground
                    }
                };
                const allProps: any = Object.assign({}, hocProps, this.props);

                return (
                    <div className="hocWrap" style={styles}>
                        <Component
                            { ...allProps }/>
                    </div>
                );
            }
        };
}

export default createStaticSquare;