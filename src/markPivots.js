let data = require("./stockData.js");

function markPivots (daysArray, ticker) {
  // Init storage arrays for pivots if undefined.
  data.quotes[ticker]["pivotHighs"] = data.quotes[ticker]["pivotHighs"] || [];
  data.quotes[ticker]["pivotLows"] = data.quotes[ticker]["pivotLows"] || [];

  // Calculate a 14-day volume average for each day.
  for (let i = 14; i < daysArray.length; i++) {
    let last14Days = daysArray.slice(i-14, i);
    let avgVol = last14Days.map(day => day.v).reduce((a,b)=>{ return a + b; })/14;
    // console.log(avgVol);
    daysArray[i].averageVol = parseInt(avgVol);
  }

  // Mark pivot highs.
  for (let i = 1; i < daysArray.length; i++) {
    if (daysArray[i+1] === undefined) { // Mark most recent day as pivot high.
      if (daysArray[i].h > daysArray[i-1].h) {
        daysArray[i].pivotHigh = true;
        // Extract next day close for analytics:
        daysArray[i].tomorrowClose = "N/A";
        data.quotes[ticker]["pivotHighs"].push(daysArray[i]);
      }
    } else { // Mark all days with a pivot high and add to storage array.
      if (daysArray[i].h > daysArray[i-1].h && daysArray[i].h > daysArray[i+1].h) {
        daysArray[i].pivotHigh = true;
        // Extract next day close for analytics:
        daysArray[i].tomorrowClose = daysArray[i+1].c;
        data.quotes[ticker]["pivotHighs"].push(daysArray[i]);
      }
    }
  }

  // Mark pivot lows.
  for (let i = 1; i < daysArray.length; i++) {
    if (daysArray[i+1] === undefined) { // Mark most recent day as pivot low.
      if (daysArray[i].l < daysArray[i-1].l) {
        daysArray[i].pivotLow = true;
        // Extract next day close for analytics:
        daysArray[i].tomorrowClose = "N/A";
        data.quotes[ticker]["pivotLows"].push(daysArray[i]);
      }
    } else { // Mark all days with a pivot high and add to storage array.
      if (daysArray[i].l < daysArray[i-1].l && daysArray[i].l < daysArray[i+1].l) { 
        daysArray[i].pivotLow = true;
        // Extract next day close for analytics:
        daysArray[i].tomorrowClose = daysArray[i+1].c;
        data.quotes[ticker]["pivotLows"].push(daysArray[i]);
      }
    }
  }
}

module.exports = markPivots;
