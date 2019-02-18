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
        const head = document.head || document.getElementsByTagName('head')[0];
        const style = document.createElement('style');

        style.type = 'text/css';
        style.appendChild(document.createTextNode(fontCss));

        head.appendChild(style);
    };

    public render(): JSX.Element {
        return this.props.children;
    }
};
