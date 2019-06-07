import { appBreakpoints } from '@theme/properties/overwritten/appBreakpoints';

export const resolutionChecker = (windowWidth: number, requiredValue: string) =>
    windowWidth < appBreakpoints.values[requiredValue];
