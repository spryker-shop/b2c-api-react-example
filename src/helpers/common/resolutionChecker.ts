import { appBreakpoints } from '@theme/properties/overwritten/appBreakpoints';

export const resolutionChecker = (windowWidth: number, requiredМalue: string) =>
    windowWidth < appBreakpoints.values[requiredМalue];
