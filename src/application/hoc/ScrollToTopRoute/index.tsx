import * as React from 'react';
import { IScrollToTopRouteProps as Props, IScrollToTopRouteState as State } from './types';
import { withRouter } from 'react-router';

@(withRouter as Function)
export class ScrollToTopRoute extends React.Component<Props, State> {
    public state: State = {};

    public componentDidUpdate = (prevProps: Props): void => {
        if (this.props.location.pathname !== prevProps.location.pathname) {
            window.scrollTo(0, 0);
        }
    };

    public render(): JSX.Element {
        return this.props.children;
    }
}
