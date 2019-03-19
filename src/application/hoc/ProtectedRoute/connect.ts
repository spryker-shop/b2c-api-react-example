import { bindActionCreators, Dispatch } from 'redux';
import { reduxify } from '@application/hoc/Reduxify';
import { isUserAuthenticated } from '@stores/reducers/pages/login';
import { getAnonymId, isAppStateFulfilled } from '@stores/reducers/common/init';
import { getGuestCartAction } from '@stores/actions/common/cart';
import { IReduxOwnProps, IReduxStore } from '@stores/reducers/types';

const mapStateToProps = (state: IReduxStore, ownProps: IReduxOwnProps) => {
    const isUserLoggedIn = isUserAuthenticated(state, ownProps);
    const isInitStateFulfilled: boolean = isAppStateFulfilled(state, ownProps);
    const anonymId = getAnonymId(state, ownProps);

    return ({
        isUserLoggedIn,
        isInitStateFulfilled,
        anonymId,
    });
};

const mapDispatchToProps = (dispatch: Dispatch) => (
    bindActionCreators(
        {
            getGuestCartAction,
        },
        dispatch,
    )
);

export const connect = reduxify(mapStateToProps, mapDispatchToProps);
