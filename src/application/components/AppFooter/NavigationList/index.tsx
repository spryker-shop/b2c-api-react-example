import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import withStyles from '@material-ui/core/styles/withStyles';
import { NavLink } from 'react-router-dom';
import { INavigationListProps as Props, INavigationListState as State } from './types';
import { ChevronIcon } from './icons';
import { styles } from './styles';
import { resolutionChecker } from '@helpers/common/resolutionChecker';

class NavigationListComponent extends React.Component<Props, State> {
    public readonly state: State = {
        isOpen: false
    };

    protected clickTitleHandler = (): void => {
        const isMobile = resolutionChecker(window.innerWidth, 'sm');

        if (isMobile) {
            this.setState(({isOpen}) => ({isOpen: !isOpen}));
        }
    };

    protected renderNavigationList = (): JSX.Element[] | null => {
        const { classes, navigationList, external = false } = this.props;

        if (!Boolean(navigationList.length)) {
            return null;
        }

        return navigationList.map(item => {
            const { name, path, formatted } = item;

            return (
                <li key={ name + path } className={ classes.linkItem }>
                    { external
                        ? (
                            <a href={ path } className={ classes.link } target="_blank">
                                <FormattedMessage id={ name } />
                            </a>
                        )
                        : (
                            <NavLink to={ path } className={ classes.link }>
                                { formatted ? <FormattedMessage id={ name } /> : name }
                            </NavLink>
                        )
                    }
                </li>
            );
        });
    };

    public render = (): JSX.Element => {
        const { isOpen } = this.state;
        const { classes, title } = this.props;

        return (
            <>
                <strong className={ classes.title } onClick={ this.clickTitleHandler }>
                    <FormattedMessage id={ title } />
                    <span className={ classes.chevron }>
                        <span className={`${classes.chevronIcon} ${isOpen ? classes.chevronIconOpened : ''}`}>
                            <ChevronIcon />
                        </span>
                    </span>
                </strong>

                <ul className={`${classes.linkList} ${isOpen ? classes.linkListOpened : ''}`}>
                    { this.renderNavigationList() }
                </ul>
            </>
        );
    }
}

export const NavigationList = withStyles(styles)(NavigationListComponent);
