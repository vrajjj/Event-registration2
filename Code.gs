function doGet() {
  return HtmlService.createHtmlOutputFromFile('Page.html');
}

function processForm(formData) {
  try {
    var referenceNumber = new Date().getTime() + Math.floor(Math.random() * 1000);

    // Open the specific Google Sheet using the provided ID
    var sheetId = '19sh5IfChjom2QnX_2EnhE-NLyPXOqlvlJTH-eiyPHj4';
    var sheet = SpreadsheetApp.openById(sheetId).getActiveSheet();

    // Append the registration data to the sheet
    sheet.appendRow([
      referenceNumber,
      formData.registrationType,
      formData.adults,
      formData.children,
      formData.kids,
      formData.email,
      formData.totalAmount
    ]);

    // Send email confirmation
    var emailBody = 'Thank you for registering! Your reference number is ' + referenceNumber;
    MailApp.sendEmail(formData.email, 'Registration Confirmation', emailBody);

    return referenceNumber;
  } catch (error) {
    // Handle error
    console.error(error);
    throw new Error('An error occurred while processing your registration. Please try again later.');
  }
}
