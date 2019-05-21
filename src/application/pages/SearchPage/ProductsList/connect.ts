import { reduxify } from '@hoc/Reduxify';
import { getAppCurrency } from '@stores/reducers/common/init/selectors';
import { IReduxOwnProps, IReduxStore } from '@stores/reducers/types';
import { ISearchState } from '@stores/reducers/pages/search/types';

const mapStateToProps = (state: IReduxStore, ownProps: IReduxOwnProps) => {
    const pageSearchProps: ISearchState = state.pageSearch ? state.pageSearch : null;
    const currency: string | null = getAppCurrency(state, ownProps);

    return ({
        isLoading: pageSearchProps && pageSearchProps.pending ? pageSearchProps.pending : false,
        products: pageSearchProps && pageSearchProps.data ? pageSearchProps.data.items : null,
        currency
    });
};

export const connect = reduxify(mapStateToProps, null);
