import { getAppLocale } from '@stores/reducers/common/init';
import { reduxify } from '@application/hoc/Reduxify';
import { IReduxOwnProps, IReduxStore } from '@stores/reducers/types';
import { bindActionCreators, Dispatch } from 'redux';
import { getMainNavigationAction } from '@stores/actions/common/navigations';

const mapStateToProps = (state: IReduxStore, ownProps: IReduxOwnProps) => {
    const locale = getAppLocale(state, ownProps);

    return ({ locale });
};

const mapDispatchToProps = (dispatch: Dispatch) =>
    bindActionCreators(
        {
            getMainNavigationAction
        },
        dispatch,
    );

export const connect = reduxify(mapStateToProps, mapDispatchToProps);
