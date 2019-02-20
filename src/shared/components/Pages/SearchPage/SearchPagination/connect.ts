import { reduxify } from 'src/shared/lib/redux-helper';
import { IReduxOwnProps, IReduxStore } from 'src/shared/stores/reducers/types';
import { setPaginationPageAction } from '@stores/actions/pages/search';

const mapStateToProps = (state: IReduxStore, ownProps: IReduxOwnProps) => {
    const pageSearchState = state.pageSearch.data;

    return ({
        pagination: pageSearchState.pagination
    });
};

const mapDispatchToProps = (dispatch: Function) => ({
    setPaginationPage: (page: string) => dispatch(setPaginationPageAction(page))
});

export const connect = reduxify(mapStateToProps, mapDispatchToProps);
