export const TimeAgo = {
  dateToTimeAgo: function (dateString, currDate) {
    const postDate = new Date(dateString);
    
    var milisecondsAgo = currDate.getTime() - postDate.getTime();
    var secondsAgo = milisecondsAgo / 1000;
    var minutesAgo = secondsAgo / 60;
    var hoursAgo = minutesAgo / 60;
    var daysAgo = hoursAgo / 24;
    var weeksAgo = daysAgo / 7;
    var monthsAgo = weeksAgo / 4;
    var yearsAgo = monthsAgo / 12;

    if (secondsAgo < 60) {
      if (Math.floor(secondsAgo) === 1) {
        return Math.floor(secondsAgo) + " second " + "ago";
      }
      return Math.floor(secondsAgo) + " seconds " + "ago";
    } else if (minutesAgo < 60) {
      if (Math.floor(minutesAgo) === 1) {
        return Math.floor(minutesAgo) + " minute " + "ago";
      }
      return Math.floor(minutesAgo) + " minutes " + "ago";
    } else if (hoursAgo < 24) {
      if (Math.floor(hoursAgo) === 1) {
        return Math.floor(hoursAgo) + " hour " + "ago";
      }
      return Math.floor(hoursAgo) + " hours " + "ago";
    } else if (daysAgo < 7) {
      if (Math.floor(daysAgo) === 1) {
        return Math.floor(daysAgo) + " day " + "ago";
      }
      return Math.floor(daysAgo) + " days " + "ago";
    } else if (weeksAgo < 4) {
      if (Math.floor(weeksAgo) === 1) {
        return Math.floor(weeksAgo) + " week " + "ago";
      }
      return Math.floor(weeksAgo) + " weeks " + "ago";
    } else if (monthsAgo < 12) {
      if (Math.floor(monthsAgo) === 1) {
        return Math.floor(monthsAgo) + " month " + "ago";
      }
      return Math.floor(monthsAgo) + " months " + "ago";
    } else {
      if (Math.floor(yearsAgo) === 1) {
        return Math.floor(yearsAgo) + " year " + "ago";
      }
      return Math.floor(yearsAgo) + " years " + "ago";
    }
  }
};

