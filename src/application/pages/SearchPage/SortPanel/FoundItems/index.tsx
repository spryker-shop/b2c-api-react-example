import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { IFoundItemsProps } from './types';

import { Grid, Typography, withStyles } from '@material-ui/core';
import { styles } from './styles';

export const FoundItemsBase: React.SFC<IFoundItemsProps> = props => {
    const {
        classes,
        numberFound,
    } = props;

    return (
        <Grid
            container
            justify="flex-start"
            alignItems="center"
            className={classes.root}
        >
            <Grid item xs={12}>
                <Typography color="inherit" component="p" className={classes.paragraph}>
                    { numberFound
                        ? <FormattedMessage
                            id={ (numberFound === 1)
                                ? 'search.page.one.found.items'
                                : 'search.page.multiple.found.items'
                            }
                            values={ { itemsNumber: numberFound } }
                        />
                        : <FormattedMessage id={ 'no.found.message' } />
                    }
                </Typography>
            </Grid>
        </Grid>
    );
};

export const FoundItems = withStyles(styles)(FoundItemsBase);
