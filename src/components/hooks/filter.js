function sumdate(string) {
  if (string != null) {
    let year = string.substring(0, 4);
    let sumYear = parseInt(year) + 543;
    let mount = string.substring(5, 7);
    let day = string.substring(8, 10);
    var months_th_mini = [
      "ม.ค.",
      "ก.พ.",
      "มี.ค.",
      "เม.ย.",
      "พ.ค.",
      "มิ.ย.",
      "ก.ค.",
      "ส.ค.",
      "ก.ย.",
      "ต.ค.",
      "พ.ย.",
      "ธ.ค.",
    ];
    let date = day + " " + months_th_mini[mount - 1] + " " + sumYear;
    return date;
  } else {
    return string;
  }
}

function sum_birthdate(value) {
  if (value) {
    var mdate = value.toString();
    var dobYear = parseInt(mdate.substring(0, 4), 10);
    var dobMonth = parseInt(mdate.substring(5, 7), 10);
    var dobDate = parseInt(mdate.substring(8, 10), 10);

    //get the current date from system
    var today = new Date();
    //date string after broking
    var birthday = new Date(dobYear, dobMonth - 1, dobDate);

    //calculate the difference of dates
    var diffInMillisecond = today.valueOf() - birthday.valueOf();

    //convert the difference in milliseconds and store in day and year variable
    var year_age = Math.floor(diffInMillisecond / 31536000000);
    var day_age = Math.floor((diffInMillisecond % 31536000000) / 86400000);

    //when birth date and month is same as today's date
    if (
      today.getMonth() == birthday.getMonth() &&
      today.getDate() == birthday.getDate()
    ) {
      alert("Happy Birthday!");
    }

    var month_age = Math.floor(day_age / 30);
    var day_ageday_age = day_age % 30;

    var tMnt = month_age + year_age * 12;
    // var tDays = tMnt * 30 + day_age;
    return ` ${year_age} ปี ${month_age} เดือน ${day_ageday_age} วัน`;
  }
}

function formatPrice(value) {
  let val = (value / 1).toFixed(2).replace(".", ".");
  return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export { sumdate, sum_birthdate, formatPrice}
