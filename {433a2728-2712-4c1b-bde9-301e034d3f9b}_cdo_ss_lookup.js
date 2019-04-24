/*******************************/
/*  Authentication Rules      */
/*****************************/
var systemSource = "";
var actSource = "";
var email = "";
var cname = "";
var sid = "";
var eid = "";
var elqDigest = "";
var contactExists = "";
var contactCDOExists = "";
var filterPass = true;
var errURL = "https://global.gartner.com/preferences-error";

// grab url params
function gup( name, url )
{
name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
var regexS = "[\\?&]"+name+"=([^&#]*)";
var regex = new RegExp( regexS, 'i' );
if ( url == null )
	url = window.location.href;
var results = regex.exec( url );
if( results == null )
  return "";
else
  return unescape(results[1]);
}

//store qs values
window.systemSource = gup("ss");
window.actSource = gup("act");
window.email = gup("email");
window.elqDigest = gup("elq_digest");
window.cname = gup("cname");
window.sid = gup("sid");
window.eid = gup("eid");

// check ss - check 1
if(systemSource != "") { 
	cdo_ss_lookup();
} else {
	console.log("ss param fail 1");
	window.filterPass = false;
}

// check email, digest, elqDigest - check 2
if(email == "") {
	window.filterPass = false;
	console.log("email param fail 2");
}

// check act - check 3
if(actSource != "unsubscribe-unauthenticated" 
&& actSource != "unsubscribe-authenticated" 
&& actSource != "unsubscribe"
&& actSource != "manage-unauthenticated"
&& actSource != "manage-authenticated"
&& actSource != "manage"
) {
	window.filterPass = false;
	console.log("act param fail 3");
}

// if act eq unsubscribe send them to form post script - check 4
if(actSource == "unsubscribe-unauthenticated" 
|| actSource == "unsubscribe-authenticated" 
|| actSource == "unsubscribe") {
	window.location.replace("https://s1849907385.t.eloqua.com/e/f2?elqSiteId=1849907385&elqFormName=EnterprisePreferenceForm&unsubAll=Y&emailAddress=" + email);
}

$(document).ready(function() {	
	// error codes 1 - parameter missing, 2 - wrong key, 3 - contact not found
	// some rules are inside indiv. functions for timing reasons
	// redirect to error page if any url conditions not met
	if(window.filterPass == false) {
		window.location.replace(errURL + "?err=1");
		console.log('redirect param');
	}
	
	// prepop and run elqdigest check
	contact_table_lookup();
	cdo_contact_lookup();
	
	
	// display email address on page
	// add email to hidden field
	$('#emHeader').html(window.email);
	$('#emailAddress').val(window.email);
	
	// assign qs values to hidden fields
	if(window.systemSource != "") { $("input[name=source-system-name]").val(window.systemSource); }
	if(cname != "") { $("input[name=cname]").val(cname); }
	if(sid != "") { $("input[name=sid]").val(sid); }
	if(eid != "") { $("input[name=eid]").val(eid); }

}); // doc ready

/*********************************/
/* CDO Lookup for Source System */
/*******************************/
function cdo_ss_lookup() {
	
	var elqSiteID = 1849907385;
	
	var getElqScriptUrl = function( argElqDLKey, argElqDLLookup )
	{
	var elqDt = new Date();
	var elqMs = elqDt.getMilliseconds();
	// var elqCurE = ("https:" == document.location.protocol ? "https://s1849907385.t" : "http://s1849907385.t") + ".eloqua.com/visitor/v200/svrGP";
    var elqCurE = "https://elqact.gartner.com/visitor/v200/svrGP";
	var elqPPS = 50;            
	return elqCurE + '?pps=' + elqPPS + '&siteid=' + elqSiteID + '&DLKey=' + argElqDLKey + '&DLLookup=' + argElqDLLookup + '&ms=' + elqMs;
	}

	//CDO Lookup vars
	var dlSS = window.systemSource;
	var dlCDO = "<source_value1>" + dlSS + "</source_value1>"; 
	
	var cdo_script_url = getElqScriptUrl('8e22acae0dae48129cfa7efc5ae244ef', dlCDO );
	GetElqContentPersonalizationValue = null;
	
	// CDO lookup Script
	$.getScript( cdo_script_url, function(){ 
		// If match found, pre-populate fields
		if( typeof ( GetElqContentPersonalizationValue ) && GetElqContentPersonalizationValue != null)
		{
			if (typeof console !== "undefined" && typeof console.log !== "undefined") {
				//console.log(GetElqContentPersonalizationValue);
				console.log("Lookup - SS Found");
				console.log(GetElqContentPersonalizationValue("source_value1"));
			}
			// update filterPass flag
			window.filterPass = true;
		   
		 } else {

			// no record found
			if (typeof console !== "undefined" && typeof console.log !== "undefined") {
				//console.log(GetElqContentPersonalizationValue);
				console.log("Lookup - SS Not Found");
			}
			// update filterPass flag
			window.filterPass = false;
			window.location.replace(errURL + "?err=5");
		}

	}); // get cdo script

} // end source system lookup

/*********************************/
/* Contact Table Lookup         */
/*******************************/
function contact_table_lookup() {
	
	var elqSiteID = 1849907385;
	
	var getElqScriptUrl = function( argElqDLKey, argElqDLLookup )
	{
	var elqDt = new Date();
	var elqMs = elqDt.getMilliseconds();
	// var elqCurE = ("https:" == document.location.protocol ? "https://s1849907385.t" : "http://s1849907385.t") + ".eloqua.com/visitor/v200/svrGP";
    var elqCurE = "https://elqact.gartner.com/visitor/v200/svrGP";
	var elqPPS = 50;            
	return elqCurE + '?pps=' + elqPPS + '&siteid=' + elqSiteID + '&DLKey=' + argElqDLKey + '&DLLookup=' + argElqDLLookup + '&ms=' + elqMs;
	}
	
	var setFormField = function( field_name, field_value, field_type)
    {
        if( $('[name='+field_name+']').length == 0) {
            $('form').append($('<input>').attr("name",field_name).attr("type","hidden").val( field_value ));
		} else if(field_type == "checkbox" && field_value != "Y") { // uncheck from prepop value
			$('[name='+field_name+']').prop('checked', false);
		} else if(field_type == "checkbox" && field_value == "Y") { // check from prepop value
			$('[name='+field_name+']').prop('checked', true);
		} else {
			if( field_type != "checkbox") {
           	 $('[name='+field_name+']').val( field_value );
			}
		}
    }

	//Contact Lookup vars
	var dlEmail = window.email;
	var dlCDO = "<C_EmailAddress>" + dlEmail + "</C_EmailAddress>"; 
	
	var contact_script_url = getElqScriptUrl('e5d3763e42d14e01a38264ff44b5db6f', dlCDO );
	GetElqContentPersonalizationValue = null;
	
	// Contact lookup Script
	$.getScript( contact_script_url, function(){ 
		// If match found, pre-populate fields
		if( typeof ( GetElqContentPersonalizationValue ) && GetElqContentPersonalizationValue != null)
		{
			if (typeof console !== "undefined" && typeof console.log !== "undefined") {
				console.log(GetElqContentPersonalizationValue);
				console.log("Lookup - Contact Found");
				console.log("Contact Email is: " + GetElqContentPersonalizationValue("C_EmailAddress"));
				console.log("Contact Hash Key is: " + GetElqContentPersonalizationValue("C_Hash_Key1"));
				console.log("Contact Date Created is: " + GetElqContentPersonalizationValue("C_DateCreated"));
			 	console.log("Contact Job Role is: " + GetElqContentPersonalizationValue("C_Job_Role1"));
				console.log("Contact Job Level is: " + GetElqContentPersonalizationValue("C_Job_Level1"));
				console.log("Contact Job Function is: " + GetElqContentPersonalizationValue("C_Job_Function1"));
			}
			
			// assign field values
			setFormField('dateCreated', GetElqContentPersonalizationValue("C_DateCreated"));
	  
	  		// custom pre-pop for Job Function (radio vs select) and Job Level
			var jf1val =  GetElqContentPersonalizationValue("C_Job_Function1");
			var jl1val =  GetElqContentPersonalizationValue("C_Job_Level1");
			
			if(jf1val != "" && $('#jobFunction1Sel').is(':visible')) {
				$('#jobFunction1Sel').val(jf1val ); // for select menu value
				$("select[name=jobFunction1]").trigger('change'); // replicate on change event
				setFormField('jobRole1', GetElqContentPersonalizationValue("C_Job_Role1"));
			} 
			/*
			if(jf1val != "" && $("input[name=jobFunction1]").is(':visible') ) {
				$("input[value='"+jf1val+"'][name=jobFunction1]").prop("checked", true); // for radio btn value
				$("input[name=jobFunction1]:checked", "form").trigger('change'); // replicate on change event
				setFormField('jobRole1', GetElqContentPersonalizationValue("C_Job_Role1"));
			}
			*/
			if(jl1val != "" && $('#jobLevel1Sel').is(':visible') ) {
				$('#jobLevel1Sel').val(jl1val ); // for select menu
			}
			
			/*
			if(jl1val != "" && $("input[name=jobLevel1]").is(':visible') ) {
				$("input[value='"+jl1val+"'][name=jobLevel1]").prop("checked", true); // for radio btn
			}
			*/
			// set hidden field on pre-pop
			setFormField('hidjobFunction1', jf1val );
			setFormField('hidjobLevel1', jl1val);
			
			/*
			if( $("[name=jobFunction1]").is("select") && $("[name=jobFunction1]").is(":visible")) {
				console.log("match select");
				$("[name=jobFunction1]").val(jf1val); //get option value from parent 
			} else {
				console.log("match radio");
				$("input[value="+jf1val+"][name=jobFunction1]").prop("checked", true);
			}
			*/
			
			window.contactExists = true;
			
			var hkey = GetElqContentPersonalizationValue("C_Hash_Key1");
			if(window.systemSource != "GCOM") { // GCOM no hash needed
				if (hkey != window.elqDigest) {
					window.filterPass == false;
					console.log('redirect hkey');
					window.location.replace(errURL + "?err=2");
				}
			}
		   
		 } else {

			// no record found
			if (typeof console !== "undefined" && typeof console.log !== "undefined") {
				//console.log(GetElqContentPersonalizationValue);
				console.log("Lookup - Contact Not Found");
			}
			window.contactExists = false;
		}
		
		// redirect to error page if contant doesn't exist and is not GCOM/ELQ source
		if(window.contactExists == false && 
		(window.systemSource != "GCOM" && 
		window.systemSource != "MDM" && 
		window.systemSource != "ELOQUA" && 
		window.systemSource != "ELQPRO" && 
		window.systemSource != "ELQENG" &&
		window.systemSource != "ELQSCM" ) ) {
			window.filterPass == false
			console.log('redirect Not GCOM/ELQ');
			window.location.replace(errURL + "?err=4");
		}
		
		// redirect to error page if elqDigest is blank and not GCOM/ELQ source
		if(window.elqDigest == "" && 
		(window.systemSource != "GCOM" &&
		window.systemSource != "MDM" &&  
		window.systemSource != "ELOQUA" && 
		window.systemSource != "ELQPRO" && 
		window.systemSource != "ELQENG" &&
		window.systemSource != "ELQSCM" ) ) {
			window.filterPass == false
			console.log('redirect Not GCOM/ELQ');
			window.location.replace(errURL + "?err=6");
		}

	}); // get contact script

} // end contact table lookup

/*********************************/
/* CDO Lookup for Contact Info  */
/*******************************/
function cdo_contact_lookup() {
	
	var elqSiteID = 1849907385;
	
	var getElqScriptUrl = function( argElqDLKey, argElqDLLookup )
	{
	var elqDt = new Date();
	var elqMs = elqDt.getMilliseconds();
	// var elqCurE = ("https:" == document.location.protocol ? "https://s1849907385.t" : "http://s1849907385.t") + ".eloqua.com/visitor/v200/svrGP";
    var elqCurE = "https://elqact.gartner.com/visitor/v200/svrGP";
	var elqPPS = 50;            
	return elqCurE + '?pps=' + elqPPS + '&siteid=' + elqSiteID + '&DLKey=' + argElqDLKey + '&DLLookup=' + argElqDLLookup + '&ms=' + elqMs;
	}
	
	var setFormField = function( field_name, field_value, field_type )
    {
        if( $('[name='+field_name+']').length == 0) {
            $('form').append($('<input>').attr("name",field_name).attr("type","hidden").val( field_value ));
		} else if(field_type == "checkbox" && field_value != "Y") { // uncheck from prepop value
			$('[name='+field_name+']').prop('checked', false);
		} else if(field_type == "checkbox" && field_value == "Y") { // check from prepop value
			$('[name='+field_name+']').prop('checked', true);
		} else if(field_type == "radio" && (field_value == "N") ) { // uncheck from prepop value
			$('input[value='+field_value+'][name='+field_name+']').prop('checked', true);
		} else if(field_type == "radio" && (field_value == "Y") ) { // check from prepop value
			$('input[value='+field_value+'][name='+field_name+']').prop('checked', true);
		} else {
			if(field_type != "radio" && field_type != "checkbox") {
           	 $('[name='+field_name+']').val( field_value );
			}
		}
    }

	//CDO Lookup vars
	var dlEmail = window.email;
	var dlCDO = "<Email_Address1>" + dlEmail + "</Email_Address1>"; 
	
	var cdo_script_url = getElqScriptUrl('73af21f8c34f4b9cbbe62616bbff03ea', dlCDO );
	GetElqContentPersonalizationValue = null;
	
	// CDO lookup Script
	$.getScript( cdo_script_url, function(){ 
		// If match found, pre-populate fields
		if( typeof ( GetElqContentPersonalizationValue ) && GetElqContentPersonalizationValue != null)
		{
			if (typeof console !== "undefined" && typeof console.log !== "undefined") {
				//console.log(GetElqContentPersonalizationValue);
				console.log("Lookup - CDO Contact Found");
				console.log("CDO Email is: " + GetElqContentPersonalizationValue("Email_Address1"));
				console.log("CDO DM is: " + GetElqContentPersonalizationValue("Direct_Mail_Opt_In1"));
				console.log("CDO Phone is: " + GetElqContentPersonalizationValue("Phone_Opt_In1"));
				console.log("CDO Industry Sub is: " + GetElqContentPersonalizationValue("Industry_Sub_Sector1"));
			}
			  // prepop the checkboxes
			  setFormField('egEventsCalendar', GetElqContentPersonalizationValue('Events_Calendar___monthly1'), 'checkbox');
			  setFormField('egGartnerInsight', GetElqContentPersonalizationValue('Gartner_Insight___monthly1'), 'checkbox');
			  setFormField('egGartnerWebinar', GetElqContentPersonalizationValue('Gartner_Webinar_Invitations___monthly1'), 'checkbox');
			  setFormField('egSmarterGartner', GetElqContentPersonalizationValue('Smarter_with_Gartner___weekly1'), 'checkbox');
			  setFormField('egThinkCast', GetElqContentPersonalizationValue('Thinkcast__The_Gartner_Podcast1'), 'checkbox');
			  setFormField('unsubAll', GetElqContentPersonalizationValue('Unsubscribe_from_All1'), 'checkbox');
			  // start topics interests
			  setFormField('auditRisk-Audit', GetElqContentPersonalizationValue('Audit_and_Risk___Audit1'), 'checkbox');
			  setFormField('auditRisk-Enterprise', GetElqContentPersonalizationValue('Audit_and_Risk___Enterprise_Risk_Management1'), 'checkbox');
			  setFormField('comm-CorpComm', GetElqContentPersonalizationValue('Communications___Corporate_Communications1'), 'checkbox');
			  setFormField('comm-EmployeeComm', GetElqContentPersonalizationValue('Communications___Employee_Communications1'), 'checkbox');
			  setFormField('comm-HeadCommunications', GetElqContentPersonalizationValue('Communications___Head_of_Communications1'), 'checkbox');
			  setFormField('comm-SocialMedia', GetElqContentPersonalizationValue('Communications___Social_Media__Public_Relatio1'), 'checkbox');
			  setFormField('comm-Other', GetElqContentPersonalizationValue('Communications___Other1'), 'checkbox');
			  setFormField('css-CustomerContact', GetElqContentPersonalizationValue('Customer_Service_and_Support___Customer_Conta1'), 'checkbox');
			  setFormField('css-HeadCS', GetElqContentPersonalizationValue('Customer_Service_and_Support___Head_of_Custom1'), 'checkbox');
			  setFormField('css-CSS', GetElqContentPersonalizationValue('Customer_Service_and_Support___Customer_Servi1'), 'checkbox');
			  setFormField('css-Other', GetElqContentPersonalizationValue('Customer_Service_and_Support___Other_Role1'), 'checkbox');
			  setFormField('execMgmt-CEO', GetElqContentPersonalizationValue('Executive_Management___Chief_Executive_Office1'), 'checkbox');
			  setFormField('execMgmt-COO', GetElqContentPersonalizationValue('Executive_Management___Chief_Operating_Office1'), 'checkbox');
			  setFormField('execMgmt-CxO', GetElqContentPersonalizationValue('Executive_Management___CxO1'), 'checkbox');
			  setFormField('finance-Accounting', GetElqContentPersonalizationValue('Finance___Accounting1'), 'checkbox');
			  setFormField('finance-CFO', GetElqContentPersonalizationValue('Finance___Chief_Financial_Officer1'), 'checkbox');
			  setFormField('finance-CorpController', GetElqContentPersonalizationValue('Finance___Corporate_Controller1'), 'checkbox');
			  setFormField('finance-FinTrans', GetElqContentPersonalizationValue('Finance___Finance_Transformation1'), 'checkbox');
			  setFormField('finance-FinPlanAnalysis', GetElqContentPersonalizationValue('Finance___Financial_Planning_and_Analysis1'), 'checkbox');
			  setFormField('finance-InvestorRelations', GetElqContentPersonalizationValue('Finance___Investor_Relations1'), 'checkbox');
			  setFormField('finance-RealEstate', GetElqContentPersonalizationValue('Finance___Real_Estate1'), 'checkbox');
			  setFormField('finance-SS', GetElqContentPersonalizationValue('Finance___Shared_Services1'), 'checkbox');
			  setFormField('finance-Tax', GetElqContentPersonalizationValue('Finance___Tax1'), 'checkbox');
			  setFormField('finance-Treasury', GetElqContentPersonalizationValue('Finance___Treasury1'), 'checkbox');
			  setFormField('finance-Other', GetElqContentPersonalizationValue('Finance___Other1'), 'checkbox');
			  setFormField('fs-CommBankingProduct', GetElqContentPersonalizationValue('Financial_Services___Commercial_Banking___Pro1'), 'checkbox');
			  setFormField('fs-CommBankingOther', GetElqContentPersonalizationValue('Financial_Services___Commercial_Banking___Oth1'), 'checkbox');
			  setFormField('fs-CommBankingSandM', GetElqContentPersonalizationValue('Financial_Services___Commercial_Banking___Sal1'), 'checkbox');
			  setFormField('fs-HeadCommBanking', GetElqContentPersonalizationValue('Financial_Services___Head_of_Commercial_Banki1'), 'checkbox');
			  setFormField('fs-HeadPrivateBanking', GetElqContentPersonalizationValue('Financial_Services___Head_of_Private_Banking_1'), 'checkbox');
			  setFormField('fs-HeadRetBanking', GetElqContentPersonalizationValue('Financial_Services___Head_of_Retail_Banking1'), 'checkbox');
			  setFormField('fs-Operations', GetElqContentPersonalizationValue('Financial_Services___Operations1'), 'checkbox');
			  setFormField('fs-PrivateBankingProduct', GetElqContentPersonalizationValue('Financial_Services___Private_Banking___Produc1'), 'checkbox');
			  setFormField('fs-PrivateBankingSales', GetElqContentPersonalizationValue('Financial_Services___Private_Banking___Sales_1'), 'checkbox');
			  setFormField('fs-PrivateBankingOther', GetElqContentPersonalizationValue('Financial_Services___Private_Banking___Other1'), 'checkbox');
			  setFormField('fs-RetailBankingSales', GetElqContentPersonalizationValue('Financial_Services___Retail_Banking___Sales__1'), 'checkbox');
			  setFormField('fs-RetailBankingProduct', GetElqContentPersonalizationValue('Financial_Services___Retail_Banking___Product1'), 'checkbox');
			  setFormField('fs-RetailBankingOther', GetElqContentPersonalizationValue('Financial_Services___Retail_Banking___Other1'), 'checkbox');
			  setFormField('fs-Other', GetElqContentPersonalizationValue('Financial_Services____Other1'), 'checkbox');
			  setFormField('htt-AR', GetElqContentPersonalizationValue('High_Tech_and_Telecom____Analyst_Relations1'), 'checkbox');
			  setFormField('htt-CEO', GetElqContentPersonalizationValue('High_Tech_and_Telecom____Chief_Executive_Offi1'), 'checkbox');
			  setFormField('htt-CPO', GetElqContentPersonalizationValue('High_Tech_and_Telecom____Chief_Product_Office1'), 'checkbox');
			  setFormField('htt-CTO', GetElqContentPersonalizationValue('High_Tech_and_Telecom____Chief_Technology_Off1'), 'checkbox');
			  setFormField('htt-CMO', GetElqContentPersonalizationValue('High_Tech_and_Telecom____Chief_Marketing_Offi1'), 'checkbox');
			  setFormField('htt-GM', GetElqContentPersonalizationValue('High_Tech_and_Telecom____General_Manager__Tec1'), 'checkbox');
			  setFormField('htt-MI', GetElqContentPersonalizationValue('High_Tech_and_Telecom____Market_Intelligence_1'), 'checkbox');
			  setFormField('htt-PM', GetElqContentPersonalizationValue('High_Tech_and_Telecom____Product_Marketing__T1'), 'checkbox');
			  setFormField('htt-PD', GetElqContentPersonalizationValue('High_Tech_and_Telecom____PD_PM_High_Tech_and_1'), 'checkbox');
			  setFormField('htt-RandD', GetElqContentPersonalizationValue('High_Tech_and_Telecom____Research_and_Develop1'), 'checkbox');
			  setFormField('htt-SP', GetElqContentPersonalizationValue('High_Tech_and_Telecom____Strategic_Planning__1'), 'checkbox');
			  setFormField('htt-OtherMarketing', GetElqContentPersonalizationValue('High_Tech_and_Telecom____Technology_Service_P1'), 'checkbox');
			  setFormField('htt-Other', GetElqContentPersonalizationValue('High_Tech_and_Telecom____Techn_Service_Provid1'), 'checkbox');
			  setFormField('hr-Benefits', GetElqContentPersonalizationValue('Human_Resources___Benefits1'), 'checkbox');
			  setFormField('hr-CHRO', GetElqContentPersonalizationValue('Human_Resources___Chief_Human_Resources_Offic1'), 'checkbox');
			  setFormField('hr-DiversityInclusion', GetElqContentPersonalizationValue('Human_Resources___Diversity_and_Inclusion1'), 'checkbox');
			  setFormField('hr-BusinessPartner ', GetElqContentPersonalizationValue('Human_Resources___HR_Business_Partner1'), 'checkbox');
			  setFormField('hr-Compensation', GetElqContentPersonalizationValue('Human_Resources___Compensation1'), 'checkbox');
			  setFormField('hr-Analytics', GetElqContentPersonalizationValue('Human_Resources___HR_Analytics1'), 'checkbox');
			  setFormField('hr-LearningDevelopment', GetElqContentPersonalizationValue('Human_Resources___Learning_and_Development1'), 'checkbox');
			  setFormField('hr-Recruitment', GetElqContentPersonalizationValue('Human_Resources___Recruitment1'), 'checkbox');
			  setFormField('hr-TalentManagement', GetElqContentPersonalizationValue('Human_Resources___Talent_Management1'), 'checkbox');
			  setFormField('hr-TotalRewards', GetElqContentPersonalizationValue('Human_Resources___Total_Rewards1'), 'checkbox');
			  setFormField('hr-Other', GetElqContentPersonalizationValue('Human_Resources___HR___Other1'), 'checkbox');
			  setFormField('investors-BankingAnalystSell', GetElqContentPersonalizationValue('Investors___Investment_Banking_Analyst___Asso1'), 'checkbox');
			  setFormField('investors-AnalystAssoc', GetElqContentPersonalizationValue('Investors___Investment_Analyst___Associate__B1'), 'checkbox');
			  setFormField('investors-ManagingDirector', GetElqContentPersonalizationValue('Investors___Investment_Banking_Managing_Direc1'), 'checkbox');
			  setFormField('investors-BankingMgmtDirectorSell', GetElqContentPersonalizationValue('Investors___Investment_Managing_Director___Pa1'), 'checkbox');
			  setFormField('investors-PortfolioMgmt', GetElqContentPersonalizationValue('Investors___Investment_Portfolio_Management__1'), 'checkbox');
			  setFormField('investors-EquityResearch', GetElqContentPersonalizationValue('Investors___Equity_Research_Analyst___VP___Pa1'), 'checkbox');
			  setFormField('investors-KnowledgeSpec', GetElqContentPersonalizationValue('Investors___Investment_Knowledge_Specialist__1'), 'checkbox');
			  setFormField('investors-DebtCreditPartner', GetElqContentPersonalizationValue('Investors___Debt___Credit_Analyst___VP___Part1'), 'checkbox');
			  setFormField('investors-Other', GetElqContentPersonalizationValue('Investors___Other1'), 'checkbox');
			  setFormField('it-Apps', GetElqContentPersonalizationValue('IT___Applications1'), 'checkbox');
			  setFormField('it-CIO', GetElqContentPersonalizationValue('IT___Chief_Information_Officer_or_Head_of_IT1'), 'checkbox');
			  setFormField('it-Infrastructure', GetElqContentPersonalizationValue('IT___IT_Infrastructure_and_Operations1'), 'checkbox');
			  setFormField('it-ProgramPortfolioMgmt', GetElqContentPersonalizationValue('IT___IT_Program_and_Portfolio_Management1'), 'checkbox');
			  setFormField('it-EnterpriseArch', GetElqContentPersonalizationValue('IT___Enterprise_Architecture_and_Technology_I1'), 'checkbox');
			  setFormField('it-DataAnalytics', GetElqContentPersonalizationValue('IT___Data_and_Analytics1'), 'checkbox');
			  setFormField('it-SecurityRiskMgmt', GetElqContentPersonalizationValue('IT___IT_Security_and_Risk_Management1'), 'checkbox');
			  setFormField('it-Sourcing', GetElqContentPersonalizationValue('IT___Sourcing__Procurement_and_Vendor_Managem1'), 'checkbox');
			  setFormField('it-TechPros', GetElqContentPersonalizationValue('IT___Technical_Professionals1'), 'checkbox');
			  setFormField('it-Other', GetElqContentPersonalizationValue('IT___Other1'), 'checkbox');
			  setFormField('legal-CLO', GetElqContentPersonalizationValue('Legal_and_Compliance___Chief_Legal_Officer1'), 'checkbox');
			  setFormField('legal-Compliance', GetElqContentPersonalizationValue('Legal_and_Compliance___Compliance1'), 'checkbox');
			  setFormField('legal-DataPrivacy', GetElqContentPersonalizationValue('Legal_and_Compliance___Data_Privacy1'), 'checkbox');
			  setFormField('legal-Legal', GetElqContentPersonalizationValue('Legal_and_Compliance___Legal1'), 'checkbox');
			  setFormField('legal-Other', GetElqContentPersonalizationValue('Legal_and_Compliance___Other1'), 'checkbox');
			  setFormField('marketing-CMO', GetElqContentPersonalizationValue('Marketing___Chief_Marketing_Officer1'), 'checkbox');
			  setFormField('marketing-CustomerExp', GetElqContentPersonalizationValue('Marketing___Customer_Experience1'), 'checkbox');
			  setFormField('marketing-Digital', GetElqContentPersonalizationValue('Marketing___Digital_Marketing1'), 'checkbox');
			  setFormField('marketing-Analytics', GetElqContentPersonalizationValue('Marketing___Marketing_Analytics1'), 'checkbox');
			  setFormField('marketing-Insights', GetElqContentPersonalizationValue('Marketing___Market_Insights1'), 'checkbox');
			  setFormField('marketing-Technology', GetElqContentPersonalizationValue('Marketing___Marketing_Technology1'), 'checkbox');
			  setFormField('marketing-MultiChannel', GetElqContentPersonalizationValue('Marketing___Multichannel_Marketing1'), 'checkbox');
			  setFormField('marketing-Other', GetElqContentPersonalizationValue('Marketing___Marketing___Other1'), 'checkbox');
			  setFormField('procurement-CPO', GetElqContentPersonalizationValue('Procurement___Chief_Procurement_Officer1'), 'checkbox');
			  setFormField('procurement-Procurement', GetElqContentPersonalizationValue('Procurement___Procurement1'), 'checkbox');
			  setFormField('ps-Consultant', GetElqContentPersonalizationValue('Professional_Services___Consultant1'), 'checkbox');
			  setFormField('ps-KnowledgeSpecialist', GetElqContentPersonalizationValue('Professional_Services___Knowledge_Specialist1'), 'checkbox');
			  setFormField('ps-PortfolioManager', GetElqContentPersonalizationValue('Professional_Services___Portfolio_Manager1'), 'checkbox');
			  setFormField('ps-SystemIntegrator', GetElqContentPersonalizationValue('Professional_Services___System_Integrator1'), 'checkbox');
			  setFormField('ps-Other', GetElqContentPersonalizationValue('Professional_Services___Other1'), 'checkbox');
			  setFormField('rd-CTO', GetElqContentPersonalizationValue('Research_and_Development___Chief_Technology_O1'), 'checkbox');
			  setFormField('rd-Product', GetElqContentPersonalizationValue('Research_and_Development___Product_Developmen1'), 'checkbox');
			  setFormField('rd-RandD', GetElqContentPersonalizationValue('Research_and_Development___Research_and_Devel1'), 'checkbox');
			  setFormField('rd-Technology', GetElqContentPersonalizationValue('Research_and_Development___Technology_Develop1'), 'checkbox');
			  setFormField('sales-CSO', GetElqContentPersonalizationValue('Sales___Chief_Sales_Officer1'), 'checkbox');
			  setFormField('sales-FieldSales', GetElqContentPersonalizationValue('Sales___Field_Sales1'), 'checkbox');
			  setFormField('sales-Insides', GetElqContentPersonalizationValue('Sales___Insides_Sales1'), 'checkbox');
			  setFormField('sales-Communications', GetElqContentPersonalizationValue('Sales___Sales_Communications1'), 'checkbox');
			  setFormField('sales-SalesEnablement', GetElqContentPersonalizationValue('Sales___Sales_Enablement1'), 'checkbox');
			  setFormField('sales-SalesOps', GetElqContentPersonalizationValue('Sales___Sales_Operations1'), 'checkbox');
			  setFormField('sales-Other', GetElqContentPersonalizationValue('Sales___Other1'), 'checkbox');
			  setFormField('strategy-Strategy', GetElqContentPersonalizationValue('Strategy___Strategy1'), 'checkbox');
			  setFormField('sc-CSCO', GetElqContentPersonalizationValue('Supply_Chain___Chief_Supply_Chain_Officer_or_1'), 'checkbox');
			  setFormField('sc-CustomerService', GetElqContentPersonalizationValue('Supply_Chain___Customer_Service_and_Fulfillme1'), 'checkbox');
			  setFormField('sc-Logistics', GetElqContentPersonalizationValue('Supply_Chain___Logistics___Transportation__Wa1'), 'checkbox');
			  setFormField('sc-ManufacturingOps', GetElqContentPersonalizationValue('Supply_Chain___Manufacturing_Strategy_and_Ope1'), 'checkbox');
			  setFormField('sc-QualityMgmt', GetElqContentPersonalizationValue('Supply_Chain___Quality_Management1'), 'checkbox');
			  setFormField('sc-IT', GetElqContentPersonalizationValue('Supply_Chain___Supply_Chain_IT1'), 'checkbox');
			  setFormField('sc-Planning', GetElqContentPersonalizationValue('Supply_Chain___Supply_Chain_Planning1'), 'checkbox');
			  setFormField('sc-SourcingProcurement', GetElqContentPersonalizationValue('Supply_Chain___Supply_Chain_Sourcing_and_Proc1'), 'checkbox');
			  setFormField('sc-Strategy', GetElqContentPersonalizationValue('Supply_Chain___Supply_Chain_Strategy__Center_1'), 'checkbox');
			  setFormField('sc-Other', GetElqContentPersonalizationValue('Supply_Chain___Other1'), 'checkbox');
			  setFormField('directMailOptIn1', GetElqContentPersonalizationValue('Direct_Mail_Opt_In1'), 'radio');
			  setFormField('phoneOptIn1', GetElqContentPersonalizationValue('Phone_Opt_In1'), 'radio');
			  setFormField('industry1', GetElqContentPersonalizationValue('Industry1'), 'select');
			  
			  var indVal = GetElqContentPersonalizationValue('Industry1');
			  if(indVal != "") {
			  	$("select[name=industryl]").trigger('change'); // replicate on change event	
				setFormField('subIndustry1', GetElqContentPersonalizationValue('Industry_Sub_Sector1'), 'select');	
			  }
							
			window.contactCDOExists = true;
			setFormField('newCDORecord', 'false');
		   
		 } else {

			// no record found
			if (typeof console !== "undefined" && typeof console.log !== "undefined") {
				//console.log(GetElqContentPersonalizationValue);
				console.log("Lookup - Contact CDO Not Found");
			}
			window.contactCDOExists = false;
			setFormField('newCDORecord', 'true');
		}

	}); // get cdo script

} // end cdo contact lookup