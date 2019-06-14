import { IReduxOwnProps, IReduxStore } from '@stores/reducers/types';

export function getRouterMatchParam(state: IReduxStore, props: IReduxOwnProps, paramName: string ): string {
    if (!paramName || !props.match || !props.match.params) {
        return null;
    }

    if (props.match.params.hasOwnProperty(paramName)) {
        return props.match.params[paramName];
    }

    return null;
}
