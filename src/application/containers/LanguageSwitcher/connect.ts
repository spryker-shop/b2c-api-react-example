import { reduxify } from '@hoc/Reduxify';
import { switchLocaleAction } from '@stores/actions/common/init';
import { getAppLocale } from '@stores/reducers/common/init/selectors';
import { IReduxOwnProps, IReduxStore } from '@stores/reducers/types';
import { bindActionCreators, Dispatch } from 'redux';

const mapStateToProps = (state: IReduxStore, ownProps: IReduxOwnProps) => {
    const appLocale = getAppLocale(state, ownProps);

    return ({
        appLocale
    });
};

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators({
    switchLocaleAction
}, dispatch);

export const connect = reduxify(mapStateToProps, mapDispatchToProps);
