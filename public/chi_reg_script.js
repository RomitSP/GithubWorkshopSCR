function confirmchoice() {
  var myform = document.forms[0];

  if (myform.fname.value == "") {
    myform.fname.focus();
    alert("First name can not be blank!");
    return false;
  }
  else if (myform.lname.value == "") {
    myform.lname.focus();
    alert("Last name can not be blank!");
    return false;
  }
  // Postal Code Validation
  else if (!checkPC(myform.pCode.value)) {
    myform.pCode.focus();
    alert("Invalid Postal Code");
    return checkPC(myform.pCode.value);
  }
  // Email Validation
  else if (!checkEmail(myform.email.value)) {
    alert("Invalid Email address");
    return checkEmail(myform.email.value);
  }
  else return true;
}

// Strick Canadian Postal Code Validation
// https://stackoverflow.com/questions/15774555/efficient-regex-for-canadian-postal-code-function
function checkPC(pCode) {
  var myReg = /^[ABCEGHJ-NPRSTVXY][0-9][ABCEGHJ-NPRSTV-Z]\s?[0-9][ABCEGHJ-NPRSTV-Z][0-9]$/i;

  return myReg.test(pCode);
}

// Email validation
// https://www.regular-expressions.info/email.html
function checkEmail(email) {
  var myReg = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

  return myReg.test(email);
}

var helpInfo = {
  'fname': "Enter your first name here",
  'lname': "Enter your last name here",
  'addr': "Mailing address",
  'city': "Your city name",
  'prov': "Select 2 digit province code",
  'pCode': "Postal Code (<i>E.g.</i>T1P 3H2)",
  'country': "Your country",
  'hPhone': "Your Home Phone #",
  'bPhone': "Your Business Phone #",
  'email': "Valid email here"
};

function focusText(element) {
  element.nextElementSibling.style.visibility = 'visible';
  element.nextElementSibling.innerHTML = helpInfo[element.name];
}
function blurText(element) {
  element.nextElementSibling.style.visibility = 'hidden';
  element.nextElementSibling.innerHTML = "";
}