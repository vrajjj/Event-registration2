function doGet() {
  return HtmlService.createHtmlOutputFromFile('Page')
      .setTitle('Event Registration Form')
      .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

function registerUser(form) {
  var sheet = SpreadsheetApp.openById('19sh5IfChjom2QnX_2EnhE-NLyPXOqlvlJTH-eiyPHj4').getActiveSheet();
  var referenceNumber = Utilities.getUuid();
  var totalAmount = 0;
  var totalParticipants = 0;
  var names = [];
  
  if (form.registrationType === 'Individual') {
    totalParticipants = 1;
    names.push(form.firstName + ' ' + form.lastName);
  } else {
    totalParticipants = parseInt(form.adults) + parseInt(form.children) + parseInt(form.kids);
    totalAmount = (parseInt(form.adults) * 10) + (parseInt(form.children) * 6);
    // Collect names from the form
    for (var i = 0; i < form.adults; i++) {
      names.push(form['adultFirstName' + i] + ' ' + form['adultLastName' + i]);
    }
    for (var i = 0; i < form.children; i++) {
      names.push(form['childFirstName' + i] + ' ' + form['childLastName' + i]);
    }
    for (var i = 0; i < form.kids; i++) {
      names.push(form['kidFirstName' + i] + ' ' + form['kidLastName' + i]);
    }
  }

  var rowData = [
    form.registrationType,
    form.checkInType || '',
    form.email,
    names.join(', '),
    totalParticipants,
    totalAmount,
    referenceNumber
  ];
  
  sheet.appendRow(rowData);

  MailApp.sendEmail({
    to: form.email,
    subject: 'Registration Confirmation',
    body: 'Thank you for registering. Your reference number is ' + referenceNumber
  });

  return {
    totalParticipants: totalParticipants,
    names: names,
    referenceNumber: referenceNumber,
    totalAmount: totalAmount
  };
}
