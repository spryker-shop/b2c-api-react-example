import * as React from 'react';
import { withRouter } from 'react-router';
import { withStyles, Grid, BottomNavigationAction, BottomNavigation } from '@material-ui/core';
import { IAppPaginationProps as Props, IAppPaginationState as State } from './types';
import { FormattedMessage } from 'react-intl';
import { styles } from './styles';

@(withRouter as Function)
export class AppPaginationComponent extends React.Component<Props, State> {
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
                currentPage: currentPage,
                maxPage: size
            },
            onChangeHandler,
            step = 1
        } = this.props;

        if (!currentPage) {
            return null;
        }

        const numberClasses = {
            root: classes.item,
            selected: classes.selected,
            label: classes.label
        };
        const pages: JSX.Element[] = [];
        const isLast = (currentPage === size);
        const isFirst = (currentPage === 1);

        const extremePagesLimit = 1;
        const nearbyPagesLimit = 2;

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

        const build = (): void => {
            if (currentPage > 1) {
                for (let i = 1; i <= extremePagesLimit; i++) {
                    if ( i < currentPage - nearbyPagesLimit) {
                        pages.push(
                            <BottomNavigationAction
                                showLabel
                                label={ i }
                                value={ i }
                                key={ `page-${i}` }
                                classes={ numberClasses }
                            />);
                    }
                }

                if (extremePagesLimit + 1 < currentPage - nearbyPagesLimit) {
                    dots(1);
                }

                for (let i = currentPage - nearbyPagesLimit; i <= currentPage - 1; i++) {
                    if ( i > 0) {
                        pages.push(
                            <BottomNavigationAction
                                showLabel
                                label={ i }
                                value={ i }
                                key={ `page-${i}` }
                                classes={ numberClasses }
                            />);
                    }
                }
            }

            pages.push(
                <BottomNavigationAction
                    disabled
                    showLabel
                    label={ currentPage }
                    value={ currentPage }
                    key={ `page-${currentPage}` }
                    classes={ numberClasses }
                />);

            if (currentPage < size) {
                for (let i = currentPage + 1; i <= currentPage + nearbyPagesLimit; i++) {
                    if ( i <= size) {
                        pages.push(
                            <BottomNavigationAction
                                showLabel
                                label={ i }
                                value={ i }
                                key={ `page-${i}` }
                                classes={ numberClasses }
                            />);
                    }
                }

                if ((size - extremePagesLimit) > (currentPage + nearbyPagesLimit)) {
                    dots(size);
                }

                for (let i = size - extremePagesLimit + 1; i <= size; i++) {
                    if ( i > currentPage + nearbyPagesLimit) {
                        pages.push(
                            <BottomNavigationAction
                                showLabel
                                label={ i }
                                value={ i }
                                key={ `page-${i}` }
                                classes={ numberClasses }
                            />);
                    }
                }
            }
        };

        build();

        return (
            <Grid container justify="center" alignItems="center" className={ classes.root }>
                <Grid item xs>
                    <BottomNavigation
                        value={ currentPage }
                        onChange={ this.onChange }
                        classes={{
                            root: classes.container
                        }}
                    >
                        <BottomNavigationAction
                            disabled={ isFirst }
                            showLabel
                            label={ <FormattedMessage id={ 'word.previous.title' } /> }
                            value={ currentPage - 1 }
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
                            value={ currentPage + 1 }
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

export const AppPagination = withStyles(styles)(AppPaginationComponent);
