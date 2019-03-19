import * as React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import { LogoProfileProps as Props } from './types';
import { styles } from './styles';

// tslint:disable:max-line-length
const path = 'M12.4 56.832C12.4 49.12 21.484 43.6 32 43.6c10.516 0 19.6 5.52 19.6 13.232v.4H12.4v-.4zM31.999 24.4c-5.072 0-9.199 4.128-9.199 9.2 0 5.073 4.127 9.2 9.199 9.2 5.073 0 9.201-4.127 9.201-9.2 0-5.072-4.128-9.2-9.201-9.2z';

// tslint:enable:max-line-length
const logoProfileImage = (
    <svg width="64" height="64" viewBox="0 0 64 64">
        <g fill="none" fillRule="evenodd" strokeWidth=".8">
            <circle cx="32" cy="32" r="31.6" stroke="#111"/>
            <path stroke="#000" d={path}/>
        </g>
    </svg>
);

export const LogoProfileComponent: React.SFC<Props> = ({classes}) => (
    <div className={classes.logoContainer}>
        <div className={classes.logo}>{logoProfileImage}</div>
    </div>
);

export const Logo = withStyles(styles)(LogoProfileComponent);
