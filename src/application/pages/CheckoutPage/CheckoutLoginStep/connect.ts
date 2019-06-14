import { bindActionCreators, Dispatch } from 'redux';
import { reduxify } from '@hoc/Reduxify';
import { clearCheckoutDataForm } from '@stores/actions/pages/checkout';
import { IReduxOwnProps, IReduxStore } from '@stores/reducers/types';
import { isUserAuthenticated } from '@stores/reducers/pages/login/selectors';

const mapStateToProps = (state: IReduxStore, ownProps: IReduxOwnProps) => {
    const isUserLoggedIn: boolean = isUserAuthenticated(state, ownProps);

    return {
        isUserLoggedIn
    };
};

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators({
    clearCheckoutDataForm
}, dispatch);

export const connect = reduxify(mapStateToProps, mapDispatchToProps);
