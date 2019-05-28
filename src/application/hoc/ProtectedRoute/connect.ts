import { bindActionCreators, Dispatch } from 'redux';
import { reduxify } from '@hoc/Reduxify';
import { isUserAuthenticated } from '@stores/reducers/pages/login/selectors';
import { getAnonymId, isAppStateFulfilled } from '@stores/reducers/common/init/selectors';
import { getCustomerCartsAction } from '@stores/actions/common/cart';
import { IReduxOwnProps, IReduxStore } from '@stores/reducers/types';

const mapStateToProps = (state: IReduxStore, ownProps: IReduxOwnProps) => {
    const isUserLoggedIn: boolean = isUserAuthenticated(state, ownProps);
    const isInitStateFulfilled: boolean = isAppStateFulfilled(state, ownProps);
    const anonymId: string = getAnonymId(state, ownProps);

    return {
        isUserLoggedIn,
        isInitStateFulfilled,
        anonymId
    };
};

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators({
    getCustomerCartsAction
}, dispatch);

export const connect = reduxify(mapStateToProps, mapDispatchToProps);
