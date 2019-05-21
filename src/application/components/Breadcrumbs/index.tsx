import * as React from 'react';
import { NavLink } from 'react-router-dom';
import { IBreadcrumbItem } from '@interfaces/common';
import { IBreadcrumbsProps as Props } from './types';
import { pathHomePage } from '@constants/routes';
import { withStyles } from '@material-ui/core';
import { styles } from './styles';
import { FormattedMessage } from 'react-intl';

const BreadcrumbsComponent: React.SFC<Props> = (props): JSX.Element => {
    const { breadcrumbsList, classes } = props;

    return (
        <div className={ classes.layout }>
            <div className={ classes.container }>
                <ul className={ classes.list }>
                    <li className={ classes.item }>
                        <NavLink className={ classes.link } to={ pathHomePage }>
                            <FormattedMessage id={ 'word.home.title' } />
                        </NavLink>
                        { breadcrumbsList && <span className={ classes.separator }>/</span> }
                    </li>
                    { breadcrumbsList &&
                        breadcrumbsList.map((value: IBreadcrumbItem, index: number) => {
                            const { name, path, current } = value;
                            const currentClassName = current ? classes.current : null;

                            return (
                                <li className={ classes.item } key={ `${path}-${index}` }>
                                    <NavLink className={ `${classes.link} ${currentClassName}` } to={ path }>
                                        { name }
                                    </NavLink>
                                    { !current && <span className={ classes.separator }>/</span> }
                                </li>
                            );
                        })
                    }
                </ul>
            </div>
        </div>
    );
};

export const Breadcrumbs = withStyles(styles)(BreadcrumbsComponent);
