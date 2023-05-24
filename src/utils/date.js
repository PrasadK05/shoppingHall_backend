module.exports.giveDate = () => {
  let timestamp = Date.now();
  let arrayOfMonth = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  let date = new Date(timestamp).getDate();
  let month = arrayOfMonth[new Date(timestamp).getMonth()];
  let year = new Date(timestamp).getFullYear();

  return { timestamp, date, month, year };
};
