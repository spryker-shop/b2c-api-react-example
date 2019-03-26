import { getAppLocale, getCategoriesTree } from '@stores/reducers/common/init/selectors';
import { reduxify } from '@application/hoc/Reduxify';
import { IReduxOwnProps, IReduxStore } from '@stores/reducers/types';
import { ICategory } from '@interfaces/category';

const mapStateToProps = (state: IReduxStore, ownProps: IReduxOwnProps) => {
    const categoriesTree: ICategory[] = getCategoriesTree(state, ownProps);
    const locale = getAppLocale(state, ownProps);

    return ({ categoriesTree, locale });
};

export const connect = reduxify(mapStateToProps);
