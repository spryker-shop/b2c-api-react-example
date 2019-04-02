export const getAnonymId = (): string => {
    let anonymId: string = localStorage.getItem('anonymId');

    if (!Boolean(anonymId)) {
        anonymId = `_${Math.random().toString(36).substr(2, 9)}`;
        localStorage.setItem('anonymId', anonymId);
    }

    return anonymId;
};

export const clearAnonymId = (): void => localStorage.removeItem('anonymId');
