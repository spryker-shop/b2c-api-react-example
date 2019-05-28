import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { withStyles, Typography, Grid, Tabs, Tab } from '@material-ui/core';
import { ContentCollapser } from '@containers/ContentCollapser';
import { IProductDetailProps as Props, IProductDetailState as State } from './types';
import { styles } from './styles';
import { ClickEvent } from '@interfaces/common';

class ProductDetailComponent extends React.Component<Props, State> {
    public readonly state: State = {
        value: 0
    };

    protected handleChangeTab = (event: ClickEvent, value: number): void => this.setState({ value });

    public render(): JSX.Element {
        const { classes, descriptionAttributes, description, sku } = this.props;
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
                        <ContentCollapser>
                            <Grid container spacing={ 16 }>
                                { Boolean(descriptionAttributes.length) ? descriptionAttributes.map(attribute => (
                                    <Grid item xs={ 12 } sm={ 6 } md={ 4 } key={`${attribute.name}-${attribute.value}`}>
                                        <div className={ classes.attributes }>
                                            <strong className={ classes.attributesName }>
                                                { attribute.name }
                                            </strong>
                                            <span className={ classes.attributesValue }>{ attribute.value }</span>
                                        </div>
                                    </Grid>
                                )) : null }
                            </Grid>
                        </ContentCollapser>
                    }

                    { value === 1 &&
                        <ContentCollapser>
                            <div className={ classes.descriptionContent }>
                                <Typography color="textSecondary" component="p" className={ classes.description }>
                                    { description }
                                </Typography>
                                <span className={ classes.descriptionSku }>
                                    <FormattedMessage id={ 'product.sku.title' } />: { sku }
                                </span>
                            </div>
                        </ContentCollapser>
                    }
                </div>
            </div>
        );
    }
}

export const ProductDetail = withStyles(styles)(ProductDetailComponent);
