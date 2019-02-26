import * as React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import { NavigationList } from './NavigationList';
import { PartnerLogos } from './PartnerLogos';
import { categoriesLinks, socialMediaLinks } from './fixtures';
import { AppLogo } from '@application/components/AppLogo';
import { IAppFooterProps as Props } from './types';
import { styles } from './styles';
import { LanguageSwitcher } from '@application/containers/LanguageSwitcher';
import { ErrorBoundary } from '@application/hoc/ErrorBoundary';

export const AppFooterComponent: React.SFC<Props> = (props): JSX.Element => {
    const {classes} = props;

    return (
        <div className={classes.footer}>
            <div className={classes.footerContainer}>
                <div className={`${classes.footerCol} ${classes.footerColLogo}`}>
                    <AppLogo />
                </div>
                <div className={classes.footerCol}>
                    <NavigationList
                        title="categories.panel.title"
                        navigationList={categoriesLinks}
                    />
                </div>
                <div className={classes.footerCol}>
                    <NavigationList
                        title="social.media.title"
                        navigationList={socialMediaLinks}
                        external
                    />
                </div>
                <div className={`${classes.footerCol} ${classes.partners}`}>
                    <PartnerLogos />
                </div>
                <div className={classes.footerCol}>
                    <ErrorBoundary>
                        <LanguageSwitcher />
                    </ErrorBoundary>
                </div>
            </div>
        </div>
    );
};

export const AppFooter = withStyles(styles)(AppFooterComponent);
