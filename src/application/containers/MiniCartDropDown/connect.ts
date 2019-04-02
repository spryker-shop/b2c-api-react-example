import { reduxify } from '@application/hoc/Reduxify';
import { getTotalItemsQuantity, getTotalProductsQuantity } from '@stores/reducers/common/cart/selectors';
import { IReduxOwnProps, IReduxStore } from '@stores/reducers/types';
import { getAppLocale, getIsTouch } from '@stores/reducers/common/init/selectors';

const mapStateToProps = (state: IReduxStore, ownProps: IReduxOwnProps) => ({
    cartItemsQuantity: getTotalItemsQuantity(state, ownProps),
    cartProductsQuantity: getTotalProductsQuantity(state, ownProps),
    locale: getAppLocale(state, ownProps),
    isTouch: getIsTouch(state, ownProps)
});

export const connect = reduxify(mapStateToProps);
