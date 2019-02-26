import { IReduxOwnProps, IReduxStore } from '@stores/reducers/types';
import { TRouterMatchParam } from './types';

export function getRouterMatchParam(state: IReduxStore, props: IReduxOwnProps, paramName: string ): TRouterMatchParam {
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
