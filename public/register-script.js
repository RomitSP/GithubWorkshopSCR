function confirmchoice() {
   var myform = document.forms[0];

   if (myform.fname.value == "") {
     myform.fname.focus();
     alert("First name can not be blank!");
     return false;
   }
   else if(myform.lname.value == "") {
     myform.lname.focus();
     alert("Last name can not be blank!");
     return false;
   }
   else if(!checkPC(myform.pCode.value)){
       myform.pCode.focus();
       alert("Invalid Postal Code.");
       return checkPC(myform.pCode.value);
   }

   return confirm("Are you sure you want to send?");
 }

 function checkPC(pCode) {
     var myReg = /^[a-z|A-Z][0-9][a-z|A-Z]\s?[0-9][a-z|A-Z][0-9]$/;

     return myReg.test(pCode);
 }

 var message = "";
 var formInfo = new Array();

 formInfo['fname'] = "Enter your first name here";
 formInfo['lname'] = "Enter your last name here";
 formInfo['addr'] = "Mailing address here";
 formInfo['city'] = "Your city name here";
 formInfo['pCode'] = "Postal Code (<i>E.g.</i>T1P 3H2)";
 formInfo['prov'] = "Select 2 digit province code";
 formInfo['email'] = "Valid email here";

 function focusText(element) {
     element.nextElementSibling.style.visibility = 'visible';
     element.nextElementSibling.innerHTML = formInfo[element.name];
 }
 function blurText(element) {
     element.nextElementSibling.style.visibility = 'hidden';
     element.nextElementSibling.innerHTML = "";
 }