import * as React from "react";
import {
    getDisplayName,
    getImageStyles
} from "../util";
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
    styles: React.CSSProperties;
}

interface ComponentDecorator<TOwnProps> {
    (component: React.ComponentClass<DynamicSquareProps & TOwnProps>): React.ComponentClass<TOwnProps>;
}

function WithDynamicSquare<TOwnProps>(options: DynamicSquareOption): ComponentDecorator<TOwnProps> {
    return Component =>
        class HocSquare extends React.Component<TOwnProps, HocSquareState> {
            static displayName: string = `Hoc${getDisplayName(Component)}`;
            state = {
                styles: getImageStyles(options)
            };

            setStyles(parm: DynamicSquareOption): void {
                this.setState({
                    styles: getImageStyles(parm)
                });
            }
            changeBackground(parm: DynamicSquareOption): void {
                this.setStyles(parm);
            }
            autoMove() {
            //    const { toward } = this.props;
            }
            render() {
                const { styles } = this.state;
                const passThroughProps: any = this.props;
                const staticProps: WrappedDynamicSquareUtils = {
                    changeBackground: this.changeBackground
                };

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