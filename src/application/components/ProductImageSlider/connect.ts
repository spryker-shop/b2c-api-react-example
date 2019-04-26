import { reduxify } from '@hoc/Reduxify';
import { IReduxOwnProps, IReduxStore } from '@stores/reducers/types';

const mapStateToProps = (state: IReduxStore, ownProps: IReduxOwnProps) => {
    const productPage = state.pageProduct.data.selectedProduct;
    const productLabels = productPage && productPage.productLabels ? productPage.productLabels : null;

    return ({ productLabels });
};

export const connect = reduxify(mapStateToProps, null);
