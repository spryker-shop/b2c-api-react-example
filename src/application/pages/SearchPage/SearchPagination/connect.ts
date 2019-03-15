import { reduxify } from '@application/hoc/Reduxify';
import { IReduxOwnProps, IReduxStore } from '@stores/reducers/types';
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
