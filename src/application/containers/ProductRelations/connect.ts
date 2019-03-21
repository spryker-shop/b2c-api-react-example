import { reduxify } from '@application/hoc/Reduxify';
import { push } from 'connected-react-router';
import { IReduxOwnProps, IReduxStore } from '@stores/reducers/types';
import { TProductSKU } from '@interfaces/product';
import { IProductRelationsState } from '@stores/reducers/common/productRelations/types';
import { getProductRelationsAction } from '@stores/actions/common/productRelations';
import { IProductRelationsItem } from '@interfaces/productRelations';
import { getAppCurrency } from '@stores/reducers/common/init';
import { TAppCurrency } from '@interfaces/currency';

const mapStateToProps = (state: IReduxStore, ownProps: IReduxOwnProps) => {
    const productRelationsState: IProductRelationsState = state.productRelations ? state.productRelations : null;
    const isLoading: boolean = productRelationsState.pending;
    const products: IProductRelationsItem[] = productRelationsState.data.products;
    const currency: TAppCurrency = getAppCurrency(state, ownProps);

    return {
        isLoading,
        products,
        currency
    };
};

const mapDispatchToProps = (dispatch: Function) => ({
    getProductRelations: (sku: TProductSKU) => dispatch(getProductRelationsAction(sku)),
    changeLocation: (location: string) => dispatch(push(location))
});

export const connect = reduxify(mapStateToProps, mapDispatchToProps);
