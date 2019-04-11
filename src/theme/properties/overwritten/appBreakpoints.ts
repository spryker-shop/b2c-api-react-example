import { BreakpointValues } from '@material-ui/core/es/styles/createBreakpoints';

export interface IAppBreakpoints {
    values: BreakpointValues & {[key: string]: number};
}

export const appBreakpoints: IAppBreakpoints = {
    values: {
        xs: 320,
        sm: 550,
        md: 768,
        lg: 1024,
        xl: 1200
    }
};
