import * as React from 'react';
import { NavLink } from 'react-router-dom';
import withStyles from '@material-ui/core/styles/withStyles';
import { IMainNavProps as Props } from './types';
import { styles } from './styles';
import { connect } from './connect';
import { fixtures } from './fixtures';
import { FormattedMessage } from 'react-intl';

class MainNavigationComponent extends React.PureComponent<Props> {
    public componentDidMount = (): void => {
        console.log(this.props.locale);

        // this.props.getMainNavigationAction();
    };

    public componentDidUpdate = (prevProps: Props): void => {
        console.log(this.props.locale);
        if (prevProps.locale !== this.props.locale) {
            console.log('tasfkvuyasvafisyvalsifuavsfiuasvfisuavf');
            // this.props.getMainNavigationAction();
            console.log(prevProps.locale, this.props.locale);
        }
    };

    public render() {
        const { classes, mobileNavState } = this.props;

        return (
            <nav className={ `${classes.mainNav} ${mobileNavState ? classes.mainNavOpened : ''}` }>
                { fixtures.map(category => (
                    <span key={ category.name + category.path } className={ classes.mainNavItem }>
                        <NavLink className={ classes.mainNavLink } to={ category.path }>
                            <FormattedMessage id={ category.name } />
                        </NavLink>
                    </span>
                )) }
            </nav>
        );
    }
}

export const MainNavigation = connect(withStyles(styles)(MainNavigationComponent));
