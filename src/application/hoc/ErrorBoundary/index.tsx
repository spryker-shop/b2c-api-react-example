import * as React from 'react';
import { IProps, IState } from './types';

export class ErrorBoundary extends React.PureComponent<IProps, IState> {
    public state: IState = {
        hasError: false,
        error: null,
        info: null
    };

    public componentDidCatch(error: Error | null, info: object): void {
        this.setState({hasError: true, error, info});
        console.error('ErrorBoundary->componentDidCatch->error', error);
        console.error('ErrorBoundary->componentDidCatch->info', info);
    }

    public render(): React.ReactNode  {
        if (this.state.hasError) {
            return <h1>{this.state.error.toString()}</h1>;
        }

        return this.props.children;
    }
}
