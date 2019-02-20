import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import withStyles from '@material-ui/core/styles/withStyles';
import { NavLink } from 'react-router-dom';
import { INavigationListProps as Props } from './types';
import { styles } from './styles';

export const NavigationListComponent: React.SFC<Props> = (props): JSX.Element => {
    const {classes, title, navigationList, external = false} = props;

    return (
        <div>
            <p className={classes.title}>
                <strong>
                    <FormattedMessage id={title} />
                </strong>
            </p>

            <ul className={classes.linkList}>
                {navigationList.map(item => (
                    <li key={item.name + item.path} className={classes.linkItem}>
                        {external ? (
                            <a href={item.path} className={classes.link} target="_blank">
                                <FormattedMessage id={item.name} />
                            </a>
                        ) : (
                            <NavLink to={item.path} className={classes.link}>
                                <FormattedMessage id={item.name} />
                            </NavLink>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export const NavigationList = withStyles(styles)(NavigationListComponent);
