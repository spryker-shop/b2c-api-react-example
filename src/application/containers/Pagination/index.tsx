import * as React from 'react';
import { withRouter } from 'react-router-dom';
import { withStyles, Grid, Button, withWidth, Hidden } from '@material-ui/core';
import { IPaginationProps as Props, IPaginationState as State } from './types';
import { FormattedMessage } from 'react-intl';
import { ClickEvent } from '@interfaces/common';
import { styles } from './styles';
import { isWidthUp } from '@material-ui/core/withWidth';
import { PrevIcon, NextIcon } from './icons';

@(withRouter as Function)
class PaginationComponent extends React.Component<Props, State> {
    public readonly state: State = {
        pagination: null
    };

    public componentDidMount = (): void => {
        this.buildPagination();
    };

    public componentDidUpdate = (prevProps: Props): void => {
        const { pagination, width } = this.props;
        const isChangedPagination = pagination !== prevProps.pagination;
        const isChangedOnMobile = isWidthUp('md', prevProps.width) !== isWidthUp('md', width);
        const shouldRerenderPagination = isChangedOnMobile || isChangedPagination;

        if (shouldRerenderPagination) {
            this.buildPagination();
        }
    };

    protected onChange = (value: number | string) => (event: ClickEvent): void => {
        if (this.props.isAddURLParam) {
            const query = new URLSearchParams(this.props.history.location.search);
            query.set('page', String(value));
            this.props.history.replace({ ...this.props.history.location, search: query.toString() });
        }
        this.props.onChangeHandler(value);
    };

    protected renderPaginationButton = (value: number | string, disabled = false): JSX.Element => {
        const { classes, pagination: { currentPage, maxPage } } = this.props;
        const isLast = (currentPage === maxPage);
        const isFirst = (currentPage === 1);
        const isActive = value === currentPage;
        const isDots = String(value).includes('dots');
        const dotsClass = isDots ? classes.buttonDot : '';
        const activeClass = isActive ? classes.buttonActive : '';
        const printValue = !isDots ? value : '...';
        const isPrevious = value === 'prev';
        const isAdditionalButtons = value === 'next' || isPrevious;
        const previousButtonClass = isPrevious ? classes.buttonAdditionalPrevious : '';
        const additionalButtonIcon = isPrevious ? <PrevIcon /> : <NextIcon />;
        const additionalButtonRedirectPath = isPrevious ? currentPage - 1 : currentPage + 1;

        if (isAdditionalButtons) {
            return (
                <Button
                    disabled={ isPrevious ? isFirst : isLast }
                    onClick={ this.onChange(additionalButtonRedirectPath) }
                    className={`${classes.button} ${classes.buttonAdditional} ${previousButtonClass}`}
                    classes={{ disabled: classes.buttonDisabled }}
                >
                    <Hidden only={['xs', 'sm']} implementation="css">
                        <FormattedMessage id={`${ isPrevious ? 'word.previous.title' : 'word.next.title'}`} />
                    </Hidden>
                    <Hidden mdUp implementation="css">
                        <span className={ classes.additionalButtonIcon }>{ additionalButtonIcon }</span>
                    </Hidden>
                </Button>
            );
        }

        return (
            <Grid item key={`page-${value}`} className={ classes.pageItem }>
                <Button
                    disabled={ disabled }
                    onClick={ this.onChange(value) }
                    className={`${classes.button} ${activeClass} ${dotsClass}`}
                >
                    { printValue }
                </Button>
            </Grid>
        );
    };

    protected buildPagination = (): void => {
        const { pagination: { currentPage, maxPage }, extremePagesLimit = 1, nearbyPagesLimit = 2, width } = this.props;

        const pagination: JSX.Element[] = [];
        const nearbyPagesLimitDependsOnResolution = isWidthUp('md', width) ? nearbyPagesLimit : 1;

        if (currentPage > 1) {
            for (let i = 1; i <= extremePagesLimit; i++) {
                if (i < currentPage - nearbyPagesLimitDependsOnResolution) {
                    pagination.push(
                        this.renderPaginationButton(i)
                    );
                }
            }

            if (extremePagesLimit + 1 < currentPage - nearbyPagesLimitDependsOnResolution) {
                pagination.push(
                    this.renderPaginationButton('dots-before-current-page')
                );
            }

            for (let i = currentPage - nearbyPagesLimitDependsOnResolution; i <= currentPage - 1; i++) {
                if (i > 0) {
                    pagination.push(
                        this.renderPaginationButton(i)
                    );
                }
            }
        }

        pagination.push(
            this.renderPaginationButton(currentPage, true)
        );

        if (currentPage < maxPage) {
            for (let i = currentPage + 1; i <= currentPage + nearbyPagesLimitDependsOnResolution; i++) {
                if (i <= maxPage) {
                    pagination.push(
                        this.renderPaginationButton(i)
                    );
                }
            }

            if ((maxPage - extremePagesLimit) > (currentPage + nearbyPagesLimitDependsOnResolution)) {
                pagination.push(
                    this.renderPaginationButton('dots-after-current-page')
                );
            }

            for (let i = maxPage - extremePagesLimit + 1; i <= maxPage; i++) {
                if (i > currentPage + nearbyPagesLimitDependsOnResolution) {
                    pagination.push(
                        this.renderPaginationButton(i)
                    );
                }
            }
        }

        this.setState({pagination});
    };

    public render = (): JSX.Element => {
        const { classes, pagination: { currentPage } } = this.props;

        if (!currentPage) {
            return null;
        }

        return (
            <div className={ classes.root }>
                { this.renderPaginationButton('prev') }
                <Grid container className={ classes.pages }>
                    { this.state.pagination }
                </Grid>
                { this.renderPaginationButton('next') }
            </div>
        );
    }
}

export const Pagination = withWidth()(withStyles(styles)(PaginationComponent));
