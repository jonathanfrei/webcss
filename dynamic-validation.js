 $(document).ready(function () {

    $('#form830').validate({  // tied to any form using Eloqua action
    
            // Jquery Validate Plug-In
			focusInvalid: false, // don't jump to the invalid element
			ignore: ".ignore", // ignore fields w/ this class conditionally
            rules: {
                emailAddress: {
                    required: true,
                    email: true
                },
				industry1: "required",
				subIndustry1: "required",
                jobLevel1: "required",
                jobFunction1: "required",
                jobRole1: "required"
            },
			// place error message next to submit button
			/*
			errorPlacement: function(error, element) { 
				  error.insertBefore("input.submit-button");

		    },*/
			errorLabelContainer: "#messageBox",
  			wrapper: "li",
		    messages: {
				industry1: "Please select your industry.",
				subIndustry1: "Please select your sub industry.",
				jobLevel1: "Please select your job level.",
				jobFunction1: "Please select your job function.",
				jobRole1: "Please select your job role."
			}
    });
    
    // override default error message
    jQuery.extend(jQuery.validator.messages, {
        required: "This field is required.",
        email: "Enter a valid email address."
    });
    
    
}); // ready
