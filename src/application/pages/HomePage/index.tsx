import * as React from 'react';
import { withStyles } from '@material-ui/core';
import { FormattedMessage } from 'react-intl';
import { pathCategoryComputers } from '@constants/routes';
import { CategoriesTeasers } from '@components/CategoriesTeasers';
import { AppMain } from '@components/AppMain';
import { Banner } from '@components/Banner';
import { IHomePageProps as Props } from './types';
import { styles } from './styles';

const homepageHeroSrc = require('./img/hero.png');

const HomePageComponent: React.SFC<Props> = (props): JSX.Element => {
    const { classes } = props;

    return (
        <>
            <Banner
                titleFirst={ <FormattedMessage id="home.page.banner.title.first" /> }
                titleSecond={ <FormattedMessage id="home.page.banner.title.second" /> }
                intro={ <FormattedMessage id="home.page.banner.title.intro" /> }
                linkPath={ pathCategoryComputers }
                linkTitle={ <FormattedMessage id="home.page.banner.button.title" /> }
                imagePath={ homepageHeroSrc }
            />
            <AppMain classes={{ layout: classes.appMainLayout }}>
                <CategoriesTeasers />
            </AppMain>
        </>
    );
};

export const HomePage = withStyles(styles)(HomePageComponent);
