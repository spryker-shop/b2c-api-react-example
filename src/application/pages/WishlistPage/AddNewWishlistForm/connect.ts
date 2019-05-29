import { bindActionCreators, Dispatch } from 'redux';
import { reduxify } from '@hoc/Reduxify';
import { addWishlistAction } from '@stores/actions/pages/wishlist';

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators({
    addWishlistAction
}, dispatch);

export const connect = reduxify(null, mapDispatchToProps);
