import { bindActionCreators, Dispatch } from 'redux';
import { reduxify } from '@hoc/Reduxify';
import { push } from 'connected-react-router';
import { IReduxOwnProps, IReduxStore } from '@stores/reducers/types';
import { getCategoriesLocalizedName } from '@stores/reducers/pages/search';
import { setCurrentCategoryAction } from '@stores/actions/pages/search';

const mapStateToProps = (state: IReduxStore, ownProps: IReduxOwnProps) => {
    const categoriesLocalizedName: string | null = getCategoriesLocalizedName(state, ownProps);

    return {
        categoriesLocalizedName
    };
};

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators({
    push,
    setCurrentCategoryAction
}, dispatch);

export const connect = reduxify(mapStateToProps, mapDispatchToProps);
