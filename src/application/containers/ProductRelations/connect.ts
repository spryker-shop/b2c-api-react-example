import { reduxify } from '@application/hoc/Reduxify';
import { IReduxOwnProps, IReduxStore } from '@stores/reducers/types';
import { TProductSKU } from '@interfaces/product';
import { IProductRelationsState } from '@stores/reducers/common/productRelations/types';

import { getProductRelationsAction } from '@stores/actions/common/productRelations';
import { IProductRelationsItem } from '@interfaces/productRelations';
import { getAppCurrency } from '@stores/reducers/common/init';
import { TAppCurrency } from '@interfaces/currency';

const mapStateToProps = (state: IReduxStore, ownProps: IReduxOwnProps) => {
    const productRelationsState: IProductRelationsState = state.productRelations ? state.productRelations : null;
    const products: IProductRelationsItem[] = productRelationsState.data.products;
    const currency: TAppCurrency = getAppCurrency(state, ownProps);

    return {
        products,
        currency
    };
};

const mapDispatchToProps = (dispatch: Function) => ({
    getProductRelations: (sku: TProductSKU) => dispatch(getProductRelationsAction(sku))
});

export const connect = reduxify(mapStateToProps, mapDispatchToProps);
