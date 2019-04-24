import { reduxify } from '@application/hoc/Reduxify';
import { IReduxOwnProps, IReduxStore } from '@stores/reducers/types';
import { isUserAuthenticated } from '@stores/reducers/pages/login';
import { ICheckoutRequest } from '@interfaces/checkout';
import { clearCheckoutDataForm, getCheckoutDataAction, sendCheckoutDataAction } from '@stores/actions/pages/checkout';
import { TCustomerReference } from '@interfaces/customer';
import { getCustomerProfileAction } from '@stores/actions/pages/customerProfile';

const mapStateToProps = (state: IReduxStore, ownProps: IReduxOwnProps) => {
    const isUserLoggedIn: boolean = isUserAuthenticated(state, ownProps);

    return ({
        isUserLoggedIn
    });
};

const mapDispatchToProps = (dispatch: Function) => ({
    dispatch,
    clearCheckoutDataForm: (): void => dispatch(clearCheckoutDataForm())
});

export const connect = reduxify(mapStateToProps, mapDispatchToProps);
