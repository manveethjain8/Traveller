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

export const formatDateAndTime = (type: "12h" | "24h", isoString: string):string => {
    const date = new Date(isoString)

    return date.toLocaleString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: type === '12h' ? true : false
    })
}

export const formatTimeWithUnix = (type: "12h" | "24h", unix: number, timzone: number): string => {
    const date = new Date((unix + timzone) * 1000)

    return date.toLocaleTimeString("en-IN", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: type === '12h' ? true : false,
        timeZone: "UTC"
    })
}