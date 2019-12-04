$(document).ready(function () {
  $('#myForm').bootstrapValidator({
      // To use feedback icons, ensure that you use Bootstrap v3.1.0 or later
      feedbackIcons: {
          valid: 'glyphicon glyphicon-ok',
          invalid: 'glyphicon glyphicon-remove',
          validating: 'glyphicon glyphicon-refresh'
      },
      fields: {
          first_name: {
              validators: {
                  stringLength: {
                      min: 2,
                  },
                  notEmpty: {
                      message: 'Please enter your first name'
                  }
              }
          },
          last_name: {
              validators: {
                  stringLength: {
                      min: 2,
                  },
                  notEmpty: {
                      message: 'Please enter your last name'
                  }
              }
          },
          email: {
              validators: {
                  notEmpty: {
                      message: 'Please enter your email address'
                  },
                  emailAddress: {
                      message: 'Email address is not valid'
                  }
              }
          },
          phone: {
              validators: {
                  notEmpty: {
                      message: 'Please enter your phone number'
                  },
                  phone: {
                      country: 'US',
                      message: 'Please enter a vaild phone number with area code'
                  }
              }
          },
          address: {
              validators: {
                  stringLength: {
                      min: 8,
                  },
                  notEmpty: {
                      message: 'Please enter your street address'
                  }
              }
          },
          city: {
              validators: {
                  stringLength: {
                      min: 4,
                  },
                  notEmpty: {
                      message: 'Please enter your city'
                  }
              }
          },
          country: {
              validators: {
                  stringLength: {
                      min: 2,
                  },
                  notEmpty: {
                      message: 'Please select your country'
                  }
              }
          },
          province: {
              validators: {
                  notEmpty: {
                      message: 'Please select your province'
                  }
              }
          },
          pCode: {
              validators: {
                  notEmpty: {
                      message: 'Please enter your postal code'
                  },
                  zipCode: {
                      country: 'countrySelect',
                      message: 'This is not a vaild %s code'
                  }
              }
          },
          comment: {
              validators: {
                  stringLength: {
                      min: 10,
                      max: 200,
                      message: 'Please enter at least 10 characters and no more than 200'
                  },
                  notEmpty: {
                      message: 'Please supply a description of your project'
                  }
              }
          }
      }
  }).on('success.form.bv', function (e) {
        $('#success_message').slideDown({ opacity: "show" }, "slow") // Do something ...
        $('#contact_form').data('bootstrapValidator').resetForm();

        // Prevent form submission
        e.preventDefault();

        // Get the form instance
        var $form = $(e.target);

        // Get the BootstrapValidator instance
        var bv = $form.data('bootstrapValidator');
    });
});

