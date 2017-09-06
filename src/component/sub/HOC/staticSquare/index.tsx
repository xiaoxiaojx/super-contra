import * as React from "react";
import {
    getDisplayName,
    getImageStyles
} from "../util";
import "./index.scss";

interface WrappedStaticSquareUtils {
    changeBackground: (parm: StaticSquareOption) => void;
}

export interface StaticSquareOption {
    imageName?: string;
    position?: string;
}

export interface StaticSquareProps {
    hocProps: WrappedStaticSquareUtils;
}

interface HocSquareState {
    styles: React.CSSProperties;
}

interface ComponentDecorator<TOwnProps> {
    (component: React.ComponentClass<StaticSquareProps & TOwnProps>): React.ComponentClass<TOwnProps>;
}

function WithStaticSquare<TOwnProps>(options?: StaticSquareOption): ComponentDecorator<TOwnProps> {
    return Component =>
        class HocSquare extends React.Component<TOwnProps, HocSquareState> {
            constructor(props) {
                super(props);

                this.changeBackground = this.changeBackground.bind(this);
            }
            static displayName: string = `Hoc(${getDisplayName(Component)})`;
            state: HocSquareState = {
                styles: getImageStyles(options)
            };

            changeBackground(parm: StaticSquareOption): void {
                const styles = getImageStyles(parm);
                this.setState({ styles });
            }
            render() {
                const { styles } = this.state;
                const passThroughProps: any = this.props;
                const staticProps: WrappedStaticSquareUtils = {
                    changeBackground: this.changeBackground
                };

                return (
                    <div className="hocWrap" style={styles}>
                        <Component
                            hocProps={staticProps}
                            {...passThroughProps}/>
                    </div>
                );
            }
        };
}

export default WithStaticSquare;