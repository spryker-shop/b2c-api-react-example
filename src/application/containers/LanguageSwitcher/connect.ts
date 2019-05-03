import { reduxify } from '@hoc/Reduxify';
import { switchLocaleAction } from '@stores/actions/common/init';
import { getAppLocale } from '@stores/reducers/common/init/selectors';
import { IReduxOwnProps, IReduxStore } from '@stores/reducers/types';
import { ILocaleActionPayload } from '@stores/reducers/common/init/types';

const mapStateToProps = (state: IReduxStore, ownProps: IReduxOwnProps) => {
    const appLocale = getAppLocale(state, ownProps);

    return ({
        appLocale,
    });
};

const mapDispatchToProps = (dispatch: Function) => ({
    dispatch,
    switchLocaleAction: (payload: ILocaleActionPayload) => dispatch(switchLocaleAction(payload))
});

export const connect = reduxify(mapStateToProps, mapDispatchToProps);
