export const dateFormater = (date: string): string => {
    const dateCopy = date
    const dateArray = dateCopy.split('-')
    return (`${dateArray[2]} - ${dateArray[1]} - ${dateArray[0]}`)
}