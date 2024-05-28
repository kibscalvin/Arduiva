export const adjustMapPadding = (snapIndex) => {
    const paddingMap = {
        0: { top: 100, right: 100, bottom: 300, left: 100 },
        1: { top: 100, right: 100, bottom: 700, left: 100 },
    };
    return paddingMap[snapIndex] || { top: 100, right: 100, bottom: 100, left: 100 };
};