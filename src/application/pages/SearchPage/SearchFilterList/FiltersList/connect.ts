import { bindActionCreators, Dispatch } from 'redux';
import { reduxify } from '@hoc/Reduxify';
import { IReduxOwnProps, IReduxStore } from '@stores/reducers/types';
import { ISearchState } from '@stores/reducers/pages/search/types';
import { push } from 'connected-react-router';
import { setCurrentCategoryAction } from '@stores/actions/pages/search';
import { getRouterMatchParam } from '@helpers/common';

const mapStateToProps = (state: IReduxStore, ownProps: IReduxOwnProps) => {
    const pageSearchProps: ISearchState = state.pageSearch ? state.pageSearch : null;
    const locationCategoryId: string | null = getRouterMatchParam(state, ownProps, 'categoryId');
    const currentCategoryId: number = pageSearchProps && pageSearchProps.data
        ? pageSearchProps.data.currentCategoryId : null;

    return {
        currentCategoryId,
        locationCategoryId
    };
};

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators({
    setCurrentCategoryAction,
    push
}, dispatch);

export const connect = reduxify(mapStateToProps, mapDispatchToProps);
