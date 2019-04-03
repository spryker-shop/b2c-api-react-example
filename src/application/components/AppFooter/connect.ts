import { IReduxOwnProps, IReduxStore } from '@stores/reducers/types';
import { ICategory } from '@interfaces/category';
import { getCategoriesTree } from '@stores/reducers/common/init/selectors';
import { reduxify } from '@hoc/Reduxify';

const mapStateToProps = (state: IReduxStore, ownProps: IReduxOwnProps) => {
    const categoriesTree: ICategory[] = getCategoriesTree(state, ownProps);

    return { categoriesTree };
};

export const connect = reduxify(mapStateToProps);
