import * as React from 'react';
import { withStyles, Grid } from '@material-ui/core';
import { CategoryTeaser } from './CategoryTeaser';
import {
    ICategoriesTeasersData as TeaserData,
    ICategoriesTeasersProps as Props
} from './types';
import { categoriesTeasersData as teasers } from './fixtures';
import { styles } from './styles';

export const CategoriesTeasersBase: React.SFC<Props> = (props): JSX.Element => {
    const {classes} = props;

    if (!teasers || !Array.isArray(teasers) || !teasers.length) {
        return null;
    }

    return (
        <Grid container className={classes.root}>
            <Grid item xs={12} className={classes.container}>
                {teasers.map((teaser: TeaserData, index: number) =>
                    (
                        <CategoryTeaser
                            key={teaser.title}
                            title={teaser.title}
                            text={teaser.text}
                            img={teaser.img}
                            path={teaser.path}
                            linkTitle={teaser.linkTitle}
                            isOdd={Boolean(index % 2)}
                        />
                    ))}
            </Grid>
        </Grid>
    );
};

export const CategoriesTeasers = withStyles(styles)(CategoriesTeasersBase);
