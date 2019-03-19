import * as React from 'react';
import { IFontLoaderProps as Props } from './types';

const fontCss = `
     @font-face {
          font-family: 'Circular';
          font-style: normal;
          font-weight: 500;
          src: url('https://s3.eu-central-1.amazonaws.com/spryker/fonts/circular-pro/lineto-circular-pro-medium.woff2')
               format('woff2');
    }
`;

export class FontLoader extends React.Component<Props> {
    public componentDidMount = (): void => {
        const style = document.createElement('style');

        document.head.appendChild(style);

        const styleSheets: CSSStyleSheet = style.sheet as CSSStyleSheet;
        styleSheets.insertRule(fontCss, 0);
    };

    public render(): JSX.Element {
        return this.props.children;
    }
};
