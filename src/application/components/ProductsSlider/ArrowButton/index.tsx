import *as React from 'react';
import { IArrowButton } from './types';

export const ArrowButton = (props: IArrowButton): JSX.Element => {
    const { currentSlide, slideCount, customClass, icon, ...arrowProps } = props;

    return (
        <div { ...arrowProps } >
            <div className={ customClass }>
                { icon }
            </div>
        </div>
    );
};
