import * as React from 'react';
import { NavLink } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import { categoriesTeasersData as teasers } from './fixtures';
import { withStyles, Grid, Typography, Button } from '@material-ui/core';
import { ICategoriesTeasersData as TeaserData, ICategoriesTeasersProps as Props } from './types';
import { styles } from './styles';

const CategoriesTeasersComponent: React.FC<Props> = (props): JSX.Element => {
    const { classes } = props;

    if (!teasers || !Array.isArray(teasers) || !teasers.length) {
        return null;
    }

    const renderCategoriesTeasers = (): JSX.Element[] => (
        teasers.map((teaser: TeaserData, index: number) => {
            const { title, text, img, path, linkTitle, transparentImage, differentBg } = teaser;
            const isOdd = Boolean(index % 2);

            return (
                <div className={`${classes.item} ${differentBg ? classes.itemDifferentBg : ''}`} key={ title }>
                    <div className={ classes.container }>
                        <Grid container spacing={ 24 } className={ classes.grid }>
                            <Grid item
                                  xs={ 12 }
                                  md={ 6 }
                                  className={ `${isOdd ? classes.oddImage : ''}` }
                            >
                            <span
                                className={`
                                    ${classes.thumbnail}
                                    ${isOdd ? classes.oddThumbnail : ''}
                                    ${transparentImage ? classes.transparentThumbnail : ''}
                                `}
                            >
                                <span style={{ backgroundImage: `url(${img})` }} className={ classes.thumbnailInner } />
                            </span>
                            </Grid>
                            <Grid item xs={ 12 } md={ 6 } className={ classes.contentHolder }>
                                <Grid item xs={ 12 } className={ classes.content }>
                                    <Typography component="h2" variant="h1" className={ classes.title }>
                                        <FormattedMessage id={ title } />
                                    </Typography>

                                    <Typography component="p" className={ classes.text }>
                                        <FormattedMessage id={ text } />
                                    </Typography>

                                    <Button
                                        component={ ({ innerRef, ...props }) => <NavLink { ...props } to={ path } /> }
                                        variant="outlined"
                                        className={ classes.btn }
                                    >
                                        <FormattedMessage id={ linkTitle } />
                                    </Button>
                                </Grid>
                            </Grid>
                        </Grid>
                    </div>
                </div>
            );
        })
    );

    return (
        <div className={classes.list}>
            { renderCategoriesTeasers() }
        </div>
    );
};

export const CategoriesTeasers = withStyles(styles)(CategoriesTeasersComponent);
