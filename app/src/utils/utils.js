const toTime = (num) => {
    try {
        const hour = parseInt(num);
        const decimal = num - hour;
        const minute = parseInt(Math.ceil(decimal * 60));

        return `${hour}:${minute > 10 ? minute : `0${minute}`}`;
    } catch (e) {
        return null;
    }

};

const timeToNum = (time, limitInDay = false) => {
    if (!time || (time && time.trim().length === 0)) {
        time = '0:0';
    }
    if (!isTime(time, limitInDay)) {
        return null;
    }
    const arr = time.split(':');
    const hours = parseInt(arr[0]);
    let minute = 0;
    if (arr.length > 1) {
        minute = parseInt(arr[1]);
    }
    return Math.round((hours + minute / 60 + Number.EPSILON) * 100) / 100;
};

const isTime = (str, limitInDay = false) => {
    if(limitInDay)
        return /^(([0-1]?[0-9]|2[0-3])((:[0-5][0-9])|(:[0-9]))?|24(:00?)?)$/.test(str);
    return /^(\d+)((:[0-5][0-9])|(:[0-9]))?$/.test(str);
};

export default {
    toTime,
    isTime,
    timeToNum
};
