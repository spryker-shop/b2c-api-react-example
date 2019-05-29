import { bindActionCreators, Dispatch } from 'redux';
import { isUserAuthenticated } from '@stores/reducers/pages/login/selectors';
import { reduxify } from '@hoc/Reduxify';
import { logoutAction } from '@stores/actions/pages/login';
import { IReduxOwnProps, IReduxStore } from '@stores/reducers/types';
import { getAppLocale, getIsTouch } from '@stores/reducers/common/init/selectors';

const mapStateToProps = (state: IReduxStore, ownProps: IReduxOwnProps) => {
    const isUserLoggedIn: boolean = isUserAuthenticated(state, ownProps);
    const locale: string = getAppLocale(state, ownProps);
    const isTouch: boolean = getIsTouch(state, ownProps);

    return {
        isUserLoggedIn,
        locale,
        isTouch
    };
};

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators({
    logoutAction
}, dispatch);

export const connect = reduxify(mapStateToProps, mapDispatchToProps);
