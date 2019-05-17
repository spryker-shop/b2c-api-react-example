import { reduxify } from '@hoc/Reduxify';
import { IReduxOwnProps, IReduxStore } from '@stores/reducers/types';
import { ISearchState } from '@stores/reducers/pages/search/types';
import { push } from 'connected-react-router';
import { setCurrentCategoryAction } from '@stores/actions/pages/search';

const mapStateToProps = (state: IReduxStore, ownProps: IReduxOwnProps) => {
    const pageSearchProps: ISearchState = state.pageSearch ? state.pageSearch : null;

    return {
        currentCategoryId: pageSearchProps && pageSearchProps.data ? pageSearchProps.data.currentCategoryId : null,
    };
};

const mapDispatchToProps = (dispatch: Function) => ({
    changeLocation: (location: string) => dispatch(push(location)),
    setCurrentCategory: (categoryId: number) => dispatch(setCurrentCategoryAction(categoryId))
});

export const connect = reduxify(mapStateToProps, mapDispatchToProps);
