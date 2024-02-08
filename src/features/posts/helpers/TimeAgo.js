import { parseISO, formatDistanceToNow } from 'date-fns'

export const timeAgo = (timeStamp) => {
  let timeAgo = ''
  if (timeStamp) {
    const date = parseISO(timeStamp)
    const timePeriod = formatDistanceToNow(date)
    timeAgo = `${timePeriod} ago`
  }
  return timeAgo
}
