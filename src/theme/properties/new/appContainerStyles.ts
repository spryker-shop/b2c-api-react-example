import { baseTheme } from '@theme/';
import { appFixedDimensions } from '@theme/properties/new/appFixedDimensions';

export interface IAppContainerStyles {
    maxWidth: React.CSSProperties['width'];
    width: React.CSSProperties['width'];
    marginLeft: React.CSSProperties['marginLeft'];
    marginRight: React.CSSProperties['marginRight'];
    position: React.CSSProperties['position'];
}

export const appContainerStyles: IAppContainerStyles = {
    maxWidth: 1200,
    width: '100%',
    marginLeft: 'auto',
    marginRight: 'auto',
    position: 'relative',
    [baseTheme.breakpoints.down(appFixedDimensions.customBreakpoints.tablet)]: {
        maxWidth: '100%',
        paddingLeft: baseTheme.spacing.unit * 2,
        paddingRight: baseTheme.spacing.unit * 2,
    },
};
