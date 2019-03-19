export const formattedDate: Function = (date: string): string => date.split(' ')[0];

export const formatDateToString = (date: Date): string => {
    const dd = (date.getDate() < 10 ? '0' : '') + date.getDate();
    const MM = ((date.getMonth() + 1) < 10 ? '0' : '') + (date.getMonth() + 1);
    const yyyy = date.getFullYear();

    // create the format you want
    return (dd + '.' + MM + '.' + yyyy);
};

export const getDateUtcUnix = (date: Date): number => {
    const dateUtcUnix = Date.UTC(
        date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds(),
    );

    return dateUtcUnix;
};
