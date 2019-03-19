import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { withStyles, Typography, Grid } from '@material-ui/core';
import { IProductAttributesProps } from './types';
import { styles } from './styles';

export const ProductAttributesBase: React.SFC<IProductAttributesProps> = (props): JSX.Element => {
    const {classes, attributes, attributeNames} = props;

    if (!attributes) {
        return null;
    }

    return (
        <div>
            <Typography component="h3" color="inherit" className={classes.attributesTitle}>
                <FormattedMessage id={'product.details.title'} />
            </Typography>
            <Grid container justify="center" className={classes.root}>
                {
                    Object.entries(attributes).map((data: [string, string]) => (
                        <Grid key={data[0]} item xs={12} sm={12} md={6} className={classes.element}>
                            <Typography component="div" color="inherit" gutterBottom={true}
                                        className={classes.valuesBlock}>
                                <p>
                                    <Typography variant="subheading" component="strong">
                                        {`${attributeNames[data[0]]
                                            ? attributeNames[data[0]]
                                            : <FormattedMessage id={'no.translations.title'} />}: `
                                        }
                                    </Typography>
                                </p>
                                <Typography variant="subheading" component="span">
                                    {data[1]}
                                </Typography>
                            </Typography>
                        </Grid>
                    ))
                }
            </Grid>
        </div>
    );
};

export const ProductAttributes = withStyles(styles)(ProductAttributesBase);
