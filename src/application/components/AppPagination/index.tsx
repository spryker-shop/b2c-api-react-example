import * as React from 'react';
import { withRouter } from 'react-router';
import { withStyles, Grid, BottomNavigationAction, BottomNavigation } from '@material-ui/core';
import { IAppPaginationProps as Props, IAppPaginationState as State } from './types';
import { FormattedMessage } from 'react-intl';
import { styles } from './styles';

@(withRouter as Function)
export class AppPaginationBase extends React.Component<Props, State> {
    public onChange = (event: React.ChangeEvent<{}>, value: number | string): void => {
        if (this.props.isAddURLParam) {
            const query = new URLSearchParams(this.props.history.location.search);
            query.set('page', String(value));
            this.props.history.replace({ ...this.props.history.location, search: query.toString() });
        }
        this.props.onChangeHandler(event, value);
    };

    public render(): JSX.Element {
        const {
            classes,
            pagination: {
                currentPage: page,
                maxPage: size
            },
            onChangeHandler,
            step = 1
        } = this.props;

        if (!page) {
            return null;
        }

        const numberClasses = {
            root: classes.item,
            selected: classes.selected,
            label: classes.label
        };
        const pages: JSX.Element[] = [];
        const isLast = (page === size);
        const isFirst = (page === 1);

        const add = (from: number, to: number) => {
            for (let i = from; i < to; i++) {
                pages.push(
                    <BottomNavigationAction
                        disabled={ page === i }
                        showLabel
                        label={ i }
                        value={ i }
                        key={ `page-${i}` }
                        classes={ numberClasses }
                    />);
            }
        };

        const dots = (i: number) => {
            pages.push(
                <BottomNavigationAction
                    showLabel
                    disabled
                    label={ `...` }
                    value={ 'dots' }
                    key={ `${i}-dots` }
                    classes={ numberClasses }
                />
            );
        };

        const last = () => {
            dots(size);
            pages.push(
                <BottomNavigationAction
                    showLabel
                    label={ size }
                    value={ size }
                    key={ `page-${size}` }
                    classes={ numberClasses }
                />
            );
        };

        const first = () => {
            pages.push(
                <BottomNavigationAction
                    showLabel
                    label={ 1 }
                    value={ 1 }
                    key={ `page-${1}` }
                    classes={ numberClasses }
                />
            );
            dots(1);
        };

        const build = () => {
            if (size < step * 2 + 6) {
                add(1, size + 1);
            }
            else {
                if (page < step * 2 + 1) {
                    add(1, step * 2 + 4);
                    last();
                }
                else {
                    if (page > size - step * 2) {
                        first();
                        add(size - step * 2 - 2, size + 1);
                    }
                    else {
                        first();
                        add(page - step, page + step + 1);
                        last();
                    }
                }
            }
        };

        build();

        return (
            <Grid container justify="center" alignItems="center" className={ classes.root }>
                <Grid item xs>
                    <BottomNavigation
                        value={ page }
                        onChange={ this.onChange }
                        classes={{
                            root: classes.container
                        }}
                    >
                        <BottomNavigationAction
                            disabled={ isFirst }
                            showLabel
                            label={ <FormattedMessage id={ 'word.previous.title' } /> }
                            value={ page - 1 }
                            key="prev"
                            classes={{
                                root: `${classes.item} ${classes.itemKeys} ${classes.itemLeft}`,
                                label: `${classes.label} ${classes.labelKeys}`
                            }}
                        />
                        { pages }
                        <BottomNavigationAction
                            disabled={ isLast }
                            showLabel
                            label={ <FormattedMessage id={ 'word.new.title' } /> }
                            value={ page + 1 }
                            key="next"
                            classes={{
                                root: `${classes.item} ${classes.itemKeys} ${classes.itemRight}`,
                                label: `${classes.label} ${classes.labelKeys}`
                            }}
                        />
                    </BottomNavigation>
                </Grid>
            </Grid>
        );
    }
}

export const AppPagination = withStyles(styles)(AppPaginationBase);
