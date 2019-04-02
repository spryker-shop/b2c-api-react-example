import * as React from 'react';
import { connect } from './connect';
import { FormattedMessage, FormattedPlural } from 'react-intl';
import { ISortPanelProps as Props, ISortPanelState as State } from './types';
import { SprykerSelect } from '@application/components/UI/SprykerSelect';
import { Grid, Typography, withStyles } from '@material-ui/core';
import { styles } from './styles';

@connect
class SortPanelComponent extends React.Component<Props, State> {
    public readonly state: State = {
        sort: this.props.currentSort,
        itemsPerPage: this.props.currentItemsPerPage
    };

    protected handleSetSorting = async (event: React.ChangeEvent<HTMLSelectElement>): Promise<void> => {
        await this.setState({ sort: event.target.value });

        this.props.setSortAction({
            sort: event.target.value,
            itemsPerPage: this.props.currentItemsPerPage
        });
    };

    protected handleSetItemsPerPage = async (event: React.ChangeEvent<HTMLSelectElement>): Promise<void> => {
        await this.setState({ itemsPerPage: Number(event.target.value) });

        this.props.setSortAction({
            sort: this.props.currentSort,
            itemsPerPage: Number(event.target.value)
        });
    };

    protected itemsPerPageMenuItems = (): object => (
        this.props.pagination.validItemsPerPageOptions.map((item: number) => ({ value: item, name: item }))
    );

    protected sortMenuItems = (): object => (
        this.props.sortParams.filter((item: string) => item !== 'rating').map((item: string) => ({
            value: item,
            name:
                this.props.sortParamLocalizedNames && this.props.sortParamLocalizedNames[item]
                    ? this.props.sortParamLocalizedNames[item]
                    : `${item}`
        }))
    );

    public render = (): JSX.Element => {
        const {
            classes,
            currentSort,
            currentItemsPerPage,
            pagination,
            sortParams
        } = this.props;

        if (!pagination.validItemsPerPageOptions.length || !sortParams.length || !pagination.numFound) {
            return null;
        }

        return (
            <Grid container alignItems="center" className={ classes.root }>
                <Grid item xs={ 12 } sm={ 3 }>
                    <Typography color="textSecondary" component="span" variant="subheading">
                        { pagination.numFound
                            ? [
                                `${pagination.numFound} `,
                                <FormattedPlural
                                    value={ pagination.numFound }
                                    key="formatted-text"
                                    one={ <FormattedMessage id={ 'search.page.one.found.items' } /> }
                                    other={ <FormattedMessage id={ 'search.page.multiple.found.items' } /> }
                                />
                            ]
                            : <FormattedMessage id={ 'no.found.message' } />
                        }
                    </Typography>
                </Grid>

                <Grid item xs={ 12 } sm={ 9 }>
                    <Grid container spacing={ 24 } className={ classes.sortsOuter }>
                        <Grid item xs={ 4 } md={ 5 }>
                            { sortParams.length &&
                                <SprykerSelect
                                    currentMode={ currentSort ? currentSort : ' ' }
                                    changeHandler={ this.handleSetSorting }
                                    menuItems={ this.sortMenuItems() }
                                    menuItemFirst={{
                                        value: ' ',
                                        name: <FormattedMessage id={ 'relevance.sort.model.title' } />,
                                        disabled: !(this.props.sortParams.length > 0)
                                    }}
                                    name="sort"
                                    classes={{ menu: classes.relevanceSortMenu }}
                                />
                            }
                        </Grid>
                        <Grid item>
                            { pagination.validItemsPerPageOptions &&
                                <SprykerSelect
                                    currentMode={ currentItemsPerPage }
                                    changeHandler={ this.handleSetItemsPerPage }
                                    menuItems={ this.itemsPerPageMenuItems() }
                                    menuItemFirst={{
                                        value: ' ',
                                        name: <FormattedMessage id={ 'products.per.page.title' } />,
                                        disabled: true
                                    }}
                                    name="pages"
                                />
                            }
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        );
    };
}

export const SortPanel = withStyles(styles)(SortPanelComponent);
