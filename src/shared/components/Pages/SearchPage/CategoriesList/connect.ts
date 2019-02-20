import { push } from 'react-router-redux';
import { reduxify } from 'src/shared/lib/redux-helper';
import { IReduxOwnProps, IReduxStore } from '@stores/reducers/types';
import { getCategoriesLocalizedName } from '@stores/reducers/pages/search';
import { setCurrentCategoryAction } from '@stores/actions/pages/search';

const mapStateToProps = (state: IReduxStore, ownProps: IReduxOwnProps) => {
    const categoriesLocalizedName = getCategoriesLocalizedName(state, ownProps);

    return ({
        localizedName: categoriesLocalizedName
    });
};

const mapDispatchToProps = (dispatch: Function) => ({
    changeLocation: (location: string) => dispatch(push(location)),
    setCurrentCategory: (categoryId: number) => dispatch(setCurrentCategoryAction(categoryId))
});

export const connect = reduxify(mapStateToProps, mapDispatchToProps);
