import * as React from 'react';
import { connect } from './connect';
import { FormattedMessage } from 'react-intl';

import { ISortPanelProps as Props, ISortPanelState as State } from './types';

import { FoundItems } from './FoundItems';
import { SprykerSelect } from '@application/components/UI/SprykerSelect';
import { Grid, withStyles } from '@material-ui/core';
import { styles } from './styles';

@connect
class SortPanelBase extends React.Component<Props, State> {
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
                    <FoundItems numberFound={ pagination.numFound } />
                </Grid>

                <Grid item xs={ 12 } sm={ 9 }>
                    <div className={ classes.sortsOuter }>
                        <div className={ classes.sort }>
                            { pagination.validItemsPerPageOptions &&
                                <SprykerSelect
                                    currentMode={ currentItemsPerPage }
                                    changeHandler={ this.handleSetItemsPerPage }
                                    menuItems={ this.itemsPerPageMenuItems() }
                                    menuItemFirst={ null }
                                    name="pages"
                                />
                            }
                        </div>
                        <div className={ classes.sort }>
                            { sortParams.length &&
                                <SprykerSelect
                                    currentMode={ currentSort ? currentSort : ' ' }
                                    changeHandler={ this.handleSetSorting }
                                    menuItems={ this.sortMenuItems() }
                                    menuItemFirst={ null }
                                    name="sort"
                                />
                            }
                        </div>
                    </div>
                </Grid>
            </Grid>
        );
    };
}

export const SortPanel = withStyles(styles)(SortPanelBase);
