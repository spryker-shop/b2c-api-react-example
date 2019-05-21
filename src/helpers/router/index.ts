import { IReduxOwnProps, IReduxStore } from '@stores/reducers/types';

export function getRouterMatchParam(state: IReduxStore, props: IReduxOwnProps, paramName: string ): string | null {
    if (!paramName || !props.match || !props.match.params) {
        return null;
    }

    if (props.match.params.hasOwnProperty(paramName)) {
        return props.match.params[paramName];
    }

    return null;
}

export function getRouterHistoryPush(state: IReduxStore, props: IReduxOwnProps): Function | null {
    if (!props.history || !props.history.push) {
        return null;
    }

    return props.history.push;
}

export function getRouterHistoryBack(state: IReduxStore, props: IReduxOwnProps): Function | null {
    if (!props.history || !props.history.goBack) {
        return null;
    }

    return props.history.goBack;
}
