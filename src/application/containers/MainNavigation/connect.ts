import { getAppLocale } from '@stores/reducers/common/init';
import { reduxify } from '@application/hoc/Reduxify';
import { IReduxOwnProps, IReduxStore } from '@stores/reducers/types';
import { bindActionCreators, Dispatch } from 'redux';
import { getMainNavigationAction } from '@stores/actions/common/navigations';

const mapStateToProps = (state: IReduxStore, ownProps: IReduxOwnProps) => {
    const mainNavigation = state.navigations.mainNavigation;
    const locale = getAppLocale(state, ownProps);
    const nodesTree = mainNavigation.nodesTree ? mainNavigation.nodesTree : null;
    const isFulfilled = mainNavigation.fulfilled;

    return ({ locale, nodesTree, isFulfilled });
};

const mapDispatchToProps = (dispatch: Dispatch) =>
    bindActionCreators(
        {
            getMainNavigationAction
        },
        dispatch,
    );

export const connect = reduxify(mapStateToProps, mapDispatchToProps);
