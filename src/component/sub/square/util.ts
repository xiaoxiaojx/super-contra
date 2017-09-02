export const getUrl =  ( imgName: string ): string => {
    const img = require(`../../../image/${imgName}`);
    return `url(${img})`;
};