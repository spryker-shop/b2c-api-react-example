export interface IAppContainerStyles {
    maxWidth: React.CSSProperties['width'];
    width: React.CSSProperties['width'];
    marginLeft: React.CSSProperties['marginLeft'];
    marginRight: React.CSSProperties['marginRight'];
    position: React.CSSProperties['position'];
    paddingLeft: React.CSSProperties['paddingLeft'];
    paddingRight: React.CSSProperties['paddingRight'];
}

export const appContainerStyles: IAppContainerStyles = {
    maxWidth: 1200,
    width: '100%',
    marginLeft: 'auto',
    marginRight: 'auto',
    position: 'relative',
    paddingLeft: 16,
    paddingRight: 16
};
