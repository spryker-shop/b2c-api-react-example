import * as React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import { NavLink } from 'react-router-dom';
import { IAppBtnLinkProps as Props } from './types';
import { styles } from './styles';

export const AppBtnLinkBase: React.SFC<Props> = (props): JSX.Element => {
    const {
        classes, title, path, extraClassName, type
    } = props;

    let classNames = classes.root;
    if (extraClassName) {
        classNames += ` ${extraClassName}`;
    }
    if (type === 'black') {
        classNames += ` ${classes.black}`;
    }

    return (
        <NavLink className={classNames} to={path}>
            {title}
        </NavLink>
    );
};

export const AppBtnLink = withStyles(styles)(AppBtnLinkBase);
