import * as React from 'react';
import { IScrollToTopRouteProps, IScrollToTopRouteState } from './types';
import { withRouter } from 'react-router';

@(withRouter as Function)
export class ScrollToTopRoute extends React.Component<IScrollToTopRouteProps, IScrollToTopRouteState> {
    public state: IScrollToTopRouteState = {};

    public componentDidUpdate = (prevProps: IScrollToTopRouteProps, prevState: IScrollToTopRouteState): void => {
        if (this.props.location !== prevProps.location) {
            window.scrollTo(0, 0);
        }
    };

    public render(): React.ReactNode {
        return this.props.children;
    }
}
