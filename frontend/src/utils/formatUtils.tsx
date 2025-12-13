import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

export const dateFormater = (date: string): string => {
    const dateCopy = date
    const dateArray = dateCopy.split('-')
    return (`${dateArray[2]} - ${dateArray[1]} - ${dateArray[0]}`)
}

export const timeAgoFormat = (date: string): string => {
    dayjs.extend(relativeTime)
    return (dayjs(date).fromNow())
}