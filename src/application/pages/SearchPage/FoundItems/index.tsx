import * as React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { styles } from './styles';
import { IFoundItemsProps } from '@application/pages/SearchPage/FoundItems/types';
import { FormattedMessage } from 'react-intl';

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
