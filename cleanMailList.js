function removeUnsubscribedAndDuplicates() {
  var sheet = SpreadsheetApp.getActiveSheet();
  var data = sheet.getDataRange().getValues();
  var header = data.shift();
  var emailIndex = header.indexOf("Email Address");
  var unsubscribeIndex = header.indexOf("Unsubscribe?");
  
  // Remove rows with "Yes" in the "Unsubscribe?" column
  var unsubscribedEmails = [];
  for (var i = data.length - 1; i >= 0; i--) {
    if (data[i][unsubscribeIndex] == "Yes") {
      unsubscribedEmails.push(data[i][emailIndex]);
      data.splice(i, 1);
    }
  }
  
  // Remove rows with emails that have unsubscribed
  for (var i = data.length - 1; i >= 0; i--) {
    if (unsubscribedEmails.indexOf(data[i][emailIndex]) > -1) {
      data.splice(i, 1);
    }
  }
  
  // Remove duplicate emails
  var uniqueEmails = [];
  for (var i = data.length - 1; i >= 0; i--) {
    if (uniqueEmails.indexOf(data[i][emailIndex]) > -1) {
      data.splice(i, 1);
    } else {
      uniqueEmails.push(data[i][emailIndex]);
    }
  }
  
  // Update sheet with new data
  data.unshift(header);
  sheet.clearContents();
  sheet.getRange(1, 1, data.length, header.length).setValues(data);
}
