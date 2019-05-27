import { reduxify } from '@hoc/Reduxify';
import { getAppCurrency } from '@stores/reducers/common/init/selectors';
import { IReduxOwnProps, IReduxStore } from '@stores/reducers/types';
import { ISearchState } from '@stores/reducers/pages/search/types';
import { IProductCard } from '@interfaces/product';

const mapStateToProps = (state: IReduxStore, ownProps: IReduxOwnProps) => {
    const pageSearchProps: ISearchState = state.pageSearch ? state.pageSearch : null;
    const currency: string | null = getAppCurrency(state, ownProps);
    const isLoading: boolean = pageSearchProps && pageSearchProps.pending ? pageSearchProps.pending : false;
    const products: IProductCard[] = pageSearchProps && pageSearchProps.data ? pageSearchProps.data.items : null;

    return ({
        isLoading,
        products,
        currency
    });
};

export const connect = reduxify(mapStateToProps);
