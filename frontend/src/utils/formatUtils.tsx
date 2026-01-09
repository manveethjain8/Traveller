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

export const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);

export const getDay = (unixTimeStamp: number) => {
    const date = new Date(unixTimeStamp * 1000)
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    return days[date.getDay()]
}

export const formatDate = (unixTimeStamp: number) => {
    const date = new Date(unixTimeStamp * 1000)
    const day = String(date.getDate()).padStart(2, '0')
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const year = date.getFullYear()

    return `${day}/${month}/${year}`
}

export const getTime = (unixTimeStamp: number) => {
    const date = new Date(unixTimeStamp * 1000)
    const hours = date.getHours()

    if (hours === 0) return '12 am';
    if (hours === 12) return '12 pm';
    if (hours > 12) return `${hours - 12} pm`;
    return `${hours} am`;
}

export const get24Time = (unixTimeStamp: number) => {
    const date = new Date(unixTimeStamp * 1000)
    const hours = String(date.getHours()).padStart(2, '0')
    const mins = String(date.getMinutes()).padStart(2, '0')
    const sec = String(date.getSeconds()).padStart(2, '0')
    return `${hours}:${mins}:${sec}`
}