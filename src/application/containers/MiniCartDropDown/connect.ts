import { reduxify } from '@hoc/Reduxify';
import { getTotalItemsQuantity, getTotalProductsQuantity } from '@stores/reducers/common/cart/selectors';
import { IReduxOwnProps, IReduxStore } from '@stores/reducers/types';
import { getAppLocale, getIsTouch } from '@stores/reducers/common/init/selectors';

const mapStateToProps = (state: IReduxStore, ownProps: IReduxOwnProps) => {
    const cartItemsQuantity: number = getTotalItemsQuantity(state, ownProps);
    const cartProductsQuantity: number = getTotalProductsQuantity(state, ownProps);
    const locale: string = getAppLocale(state, ownProps);
    const isTouch: boolean = getIsTouch(state, ownProps);

    return {
        cartItemsQuantity,
        cartProductsQuantity,
        locale,
        isTouch
    };
};

export const connect = reduxify(mapStateToProps);
