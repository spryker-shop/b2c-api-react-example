import { bindActionCreators, Dispatch } from 'redux';
import { reduxify } from '@hoc/Reduxify';
import { addItemToCartAction } from '@stores/actions/common/cart';
import { getCartId, isCartStateLoading } from '@stores/reducers/common/cart/selectors';
import { IReduxOwnProps, IReduxStore } from '@stores/reducers/types';

const mapStateToProps = (state: IReduxStore, ownProps: IReduxOwnProps) => {
    const isCartLoading: boolean = isCartStateLoading(state, ownProps);
    const cartId: string = getCartId(state, ownProps);

    return {
        cartId,
        isCartLoading
    };
};

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators({
    addItemToCartAction
}, dispatch);

export const connect = reduxify(mapStateToProps, mapDispatchToProps);
