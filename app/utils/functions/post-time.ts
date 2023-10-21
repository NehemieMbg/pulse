export function postTimeConverter(postDate: string): string {
  const now = new Date();
  const postTime = new Date(postDate);
  const secondsDifference = Math.floor(
    (now.getTime() - postTime.getTime()) / 1000
  ); // getTime() returns milliseconds

  if (secondsDifference < 60) {
    return `${secondsDifference}s`;
  } else if (secondsDifference < 3600) {
    // Less than 1 hour
    return `${Math.floor(secondsDifference / 60)}m`;
  } else if (secondsDifference < 86400) {
    // Less than 1 day
    return `${Math.floor(secondsDifference / 3600)}h`;
  } else if (secondsDifference < 2592000) {
    // Less than 1 month (assuming 30 days in a month)
    return `${Math.floor(secondsDifference / 86400)}d`;
  } else if (secondsDifference < 31536000) {
    // Less than 1 year
    return `${Math.floor(secondsDifference / 2592000)}mo`;
  } else {
    return `${Math.floor(secondsDifference / 31536000)}y`;
  }
}
