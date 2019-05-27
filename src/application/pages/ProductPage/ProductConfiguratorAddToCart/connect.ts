import { bindActionCreators, Dispatch } from 'redux';
import { reduxify } from '@hoc/Reduxify';
import { getAnonymId } from '@stores/reducers/common/init/selectors';
import { isUserAuthenticated } from '@stores/reducers/pages/login';
import { addItemToCartAction } from '@stores/actions/common/cart';
import { getCartId, isCartCreated, isCartStateLoading } from '@stores/reducers/common/cart/selectors';
import { IReduxOwnProps, IReduxStore } from '@stores/reducers/types';

const mapStateToProps = (state: IReduxStore, ownProps: IReduxOwnProps) => {
    const isUserLoggedIn: boolean = isUserAuthenticated(state, ownProps);
    const cartCreated: boolean = isCartCreated(state, ownProps);
    const cartId: string = getCartId(state, ownProps);
    const anonymId: string = getAnonymId(state, ownProps);
    const isCartLoading: boolean = isCartStateLoading(state, ownProps);

    return {
        cartCreated,
        cartId,
        isUserLoggedIn,
        anonymId,
        isCartLoading
    };
};

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators({
    addItemToCartAction
}, dispatch);

export const connect = reduxify(mapStateToProps, mapDispatchToProps);
