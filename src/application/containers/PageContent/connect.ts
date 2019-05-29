import { bindActionCreators, Dispatch } from 'redux';
import { reduxify } from '@hoc/Reduxify';
import { IReduxOwnProps, IReduxStore } from '@stores/reducers/types';
import { isStateLoading } from '@stores/reducers';
import {
    getAnonymId,
    getAppLocale,
    isAppInitiated,
    isAppStateFulfilled,
    getIsPageLocked
} from '@stores/reducers/common/init/selectors';
import { isUserAuthenticated } from '@stores/reducers/pages/login';
import { isCustomerCartCreated } from '@stores/reducers/common/cart/selectors';
import { initApplicationDataAction, setAuthFromStorageAction } from '@stores/actions/common/init';
import { getCustomerCartsAction } from '@stores/actions/common/cart';
import { clearSearchTermAction } from '@stores/actions/pages/search';

const mapStateToProps = (state: IReduxStore, ownProps: IReduxOwnProps) => {
    const isLoading: boolean = isStateLoading(state, ownProps) || false;
    const locale: string = getAppLocale(state, ownProps);
    const isAppDataSet: boolean = isAppInitiated(state, ownProps);
    const isCustomerAuth: boolean = isUserAuthenticated(state, ownProps);
    const anonymId: string = getAnonymId(state, ownProps);
    const cartCreated: boolean = isCustomerCartCreated(state, ownProps);
    const isInitStateFulfilled: boolean = isAppStateFulfilled(state, ownProps);
    const isPageLocked: boolean = getIsPageLocked(state, ownProps);

    return {
        isLoading,
        locale,
        isAppDataSet,
        isCustomerAuth,
        anonymId,
        isCartCreated,
        isInitStateFulfilled,
        isPageLocked
    };
};

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators({
    initApplicationDataAction,
    setAuthFromStorageAction,
    getCustomerCartsAction,
    clearSearchTermAction
}, dispatch);

export const connect = reduxify(mapStateToProps, mapDispatchToProps);
