import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { withStyles, Typography, Grid, Tabs, Tab } from '@material-ui/core';
import { IProductDetailProps as Props, IProductDetailState as State } from './types';
import { styles } from './styles';

export class ProductDetailComponent extends React.Component<Props, State> {
    public readonly state: State = {
        value: 0
    };

    protected handleChangeTab = (event: React.MouseEvent<HTMLElement>, value: number) => this.setState({ value });

    public render() {
        const { classes, attributes, attributeNames, description, sku } = this.props;
        const { value } = this.state;

        return (
            <div className={ classes.root }>
                <Tabs value={ value } onChange={ this.handleChangeTab } classes={{ indicator: classes.tabIndicator }}>
                    <Tab
                        label={ <FormattedMessage id={ 'product.details.title' } /> }
                        classes={{
                            root: classes.tabTriggerRoot,
                            wrapper: classes.tabTriggerWrapper,
                            labelContainer: classes.tabTriggerLabelContainer,
                            selected: classes.tabTriggerSelected
                        }}
                    />
                    <Tab
                        label={ <FormattedMessage id={ 'product.description.title' } /> }
                        classes={{
                            root: classes.tabTriggerRoot,
                            wrapper: classes.tabTriggerWrapper,
                            labelContainer: classes.tabTriggerLabelContainer,
                            selected: classes.tabTriggerSelected
                        }}
                    />
                </Tabs>

                <div className={ classes.tabContent }>
                    { value === 0 &&
                        <Grid container spacing={ 16 }>
                            { Object.entries(attributes).map((data: [string, string]) => (
                                <Grid item xs={ 12 } sm={ 6 } md={ 4 } key={`${attributeNames[data[0]] }-${ data[1]}`}>
                                    <div className={ classes.attributes }>
                                        <strong className={ classes.attributesName }>
                                            { `${ attributeNames[data[0]]
                                                ? attributeNames[data[0]]
                                                : <FormattedMessage id={ 'no.translations.title' } /> }: `
                                            }
                                        </strong>
                                        <span className={ classes.attributesValue }>{ data[1] }</span>
                                    </div>
                                </Grid>
                            )) }
                        </Grid>
                    }

                    { value === 1 &&
                        <div className={ classes.descriptionContent }>
                            <Typography color="textSecondary" component="p" className={ classes.description }>
                                { description }
                            </Typography>
                            <span className={ classes.descriptionSku }>
                                <FormattedMessage id={ 'product.sku.title' } />: { sku }
                            </span>
                        </div>
                    }
                </div>
            </div>
        );
    }
}

export const ProductDetail = withStyles(styles)(ProductDetailComponent);
