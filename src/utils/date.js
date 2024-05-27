function isDateSmallerThanCurrent(date) {
  let currentDate = new Date().getTime();
  if (date <= currentDate) {
    return true;
  } else {
    return false;
  }
}

function formatEpochToCustomDate(epoch) {
  // Create a new Date object with the given epoch time
  let date = new Date(epoch);

  // Get the date components
  let day = String(date.getDate()).padStart(2, "0");
  let month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-based
  let year = date.getFullYear();

  // Get the hours and minutes
  let hours = date.getHours();
  let minutes = String(date.getMinutes()).padStart(2, "0");

  // Determine AM/PM
  let ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12;
  hours = hours ? hours : 12; // The hour '0' should be '12'
  let formattedTime = `${hours}:${minutes} ${ampm}`;

  // Combine the components into the desired format
  let formattedDate = `${day}/${month}/${year} ${formattedTime}`;

  return formattedDate;
}

export { isDateSmallerThanCurrent, formatEpochToCustomDate };
