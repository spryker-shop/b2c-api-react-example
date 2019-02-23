type TIndexSugnature =  {
    [key: string]: any;
};

export const getFullOffset = (node: React.RefObject<HTMLDivElement>, direction: string): number => {
    let element: TIndexSugnature = node.current;
    let offset = 0;

    do {
        if (!isNaN(element[direction])) {
            offset += element[direction];
        }
        element = element.offsetParent;
    } while (!!element);

    return offset;
};
