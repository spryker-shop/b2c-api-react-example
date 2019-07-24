import * as React from 'react';
import { IErrorBoundaryProps as Props, IErrorBoundaryState as State } from './types';

export class ErrorBoundary extends React.PureComponent<Props, State> {
    public readonly state: State = {
        hasError: false,
        error: null,
        info: null
    };

    public componentDidCatch(error: Error, info: object): void {
        this.setState({ hasError: true, error, info });
        console.error('ErrorBoundary->componentDidCatch->error', error);
        console.error('ErrorBoundary->componentDidCatch->info', info);
    }

    public render(): JSX.Element  {
        if (this.state.hasError) {
            return <h1>{ this.state.error.toString() }</h1>;
        }

        return this.props.children;
    }
}
