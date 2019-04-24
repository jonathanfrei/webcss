/***
Name: Dependent Picklist
Author: Vince Farina (Vince[at]DemandGen[dot]com)
Version: 0.02 09/10/2018
License: Copyright 2018. This code may not be reused without explicit permission by its owners. All rights reserved.
***/
$(document).ready(function(){

/***********************************************/
// Start of Job Function/Role Dynamic Script   /
/*********************************************/

var role_audit = [
    {display: "Please Select", value: "" },
    {display: "Chief Audit Officer", value: "Chief Audit Officer" }, 
	{display: "Audit Manager", value: "Audit Manager" }, 
    {display: "Auditor", value: "Auditor" }, 
    {display: "Chief Risk Officer", value: "Chief Risk Officer" }, 
    {display: "Enterprise Risk Management", value: "Enterprise Risk Management" }, 
    {display: "Enterprise Risk Management - Other Role", value: "Enterprise Risk Management - Other Role" }];

var role_comm = [
    {display: "Please Select", value: "" },
    {display: "Chief Communications Officer", value: "Chief Communications Officer" }, 
	{display: "Internal Communications", value: "Internal Communications" }, 
	{display: "External Communications", value: "External Communications" }, 
	{display: "Corporate Brand", value: "Corporate Brand" },
	{display: "Public Relations", value: "Public Relations" },
	{display: "Public Affairs", value: "Public Affairs" },
	{display: "Corporate Affairs", value: "Corporate Affairs" }, 
	{display: "Communications - Other Role", value: "Communications - Other Role" }];
	
var role_css = [
    {display: "Please Select", value: "" },
    {display: "Head of Customer Service or Support", value: "Head of Customer Service or Support" }, 
	{display: "Contact Center Site Leader", value: "Contact Center Site Leader" }, 
	{display: "Customer Service Digital Channels", value: "Customer Service Digital Channels" }, 
	{display: "Customer Service Operations", value: "Customer Service Operations" }, 
	{display: "Customer Service Quality Assurance", value: "Customer Service Quality Assurance" }, 
	{display: "Customer Service Reporting and Analytics", value: "Customer Service Reporting and Analytics" }, 
	{display: "Customer Service Learning and Development", value: "Customer Service Learning and Development" }, 
	{display: "Customer Service IT", value: "Customer Service IT" }, 
	{display: "Customer Service Vendor Management", value: "Customer Service Vendor Management" }, 
	{display: "Customer Service Workforce Management and Planning", value: "Customer Service Workforce Management and Planning" }, 
	{display: "Technical Support", value: "Technical Support" }, 
	{display: "Customer Service and Support - Other Role", value: "Customer Service and Support - Other Role" }];
    
var role_exec_mgmt = [
    {display: "Please Select", value: "" },
	{display: "Chief Executive Officer", value: "Chief Executive Officer" },
	{display: "Chief Operating Officer", value: "Chief Operating Officer" },  
	{display: "Divisional / Regional General Manager", value: "Divisional / Regional General Manager" },
	{display: "Other CxO", value: "Other CxO" }, 
	{display: "Chief Executive Officer, Technology/Service", value: "Chief Executive Officer, Technology/Service" },
	{display: "Chief Technology Officer, Technology/Service Provider", value: "Chief Technology Officer, Technology/Service Provider" }, 
	{display: "General Manager, Technology/Service Provider", value: "General Manager, Technology/Service Provider" },
	{display: "Emerging Tech CEO", value: "Emerging Tech CEO" }, 
	{display: "Head of Business Unit", value: "Head of Business Unit" }];
    
var role_finance = [
    {display: "Please Select", value: "" },
    {display: "Chief Financial Officer", value: "Chief Financial Officer" }, 
	{display: "BU / Regional CFO", value: "BU / Regional CFO" }, 
	{display: "Corporate Controller", value: "Corporate Controller" }, 
    {display: "Accounting", value: "Accounting" },
	{display: "Finance Transformation", value: "Finance Transformation" },
	{display: "Financial Planning and Analysis", value: "Financial Planning and Analysis" },
	{display: "Investor Relations", value: "Investor Relations" },
	{display: "Financial Planning and Analysis", value: "Financial Planning and Analysis" },
	{display: "Real Estate", value: "Real Estate" },
	{display: "Shared Services", value: "Shared Services" },
	{display: "Tax", value: "Tax" },
	{display: "Treasury", value: "Treasury" },
	{display: "Finance - Other Role", value: "Finance - Other Role" }];
     
var role_hr = [
    {display: "Please Select", value: "" },
    {display: "Chief HR Officer or Head of HR", value: "Chief HR Officer or Head of HR" }, 
	{display: "BU / Regional Head of HR", value: "BU / Regional Head of HR" }, 
	{display: "Diversity and Inclusion", value: "Diversity and Inclusion" }, 
	{display: "Talent Analytics", value: "Talent Analytics" }, 
	{display: "HR Business Partner / Generalist", value: "HR Business Partner / Generalist" }, 
	{display: "Learning and Development", value: "Learning and Development" }, 
	{display: "Recruiting", value: "Recruiting" }, 
	{display: "Talent Management", value: "Talent Management" }, 
	{display: "Total Rewards (Compensation and Benefits)", value: "Total Rewards (Compensation and Benefits)" }, 
	{display: "HRIS / HR Technology", value: "HRIS / HR Technology" }, 
    {display: "HR - Other Role", value: "HR - Other Role" }];
	
var role_investors_er = [
    {display: "Please Select", value: "" },
	{display: "Knowledge Specialist / Library (Sell-side)", value: "Knowledge Specialist / Library (Sell-side)" },
	{display: "Equity Research Analyst / VP / Partner", value: "Equity Research Analyst / VP / Partner" },
	{display: "Investors - Equity Research - Other Role", value: "Investors - Equity Research - Other Role" }];

var role_investors_ib = [
    {display: "Please Select", value: "" },
	{display: "Banking Managing Director / Partner", value: "Banking Managing Director / Partner" },
	{display: "Banking Analyst / Associate", value: "Banking Analyst / Associate" },
	{display: "Knowledge Specialist / Library (Sell-side)", value: "Knowledge Specialist / Library (Sell-side)" },
	{display: "Debt / Credit Analyst / VP / Partner", value: "Debt / Credit Analyst / VP / Partner" }, 
    {display: "Investors - Investment Bank - Other Role", value: "Investors - Investment Bank - Other Role" }];
	
var role_investors_privEq = [
    {display: "Please Select", value: "" },
	{display: "Managing Director / Partner (Buy-side)", value: "Managing Director / Partner (Buy-side)" },
	{display: "Analyst / Associate (Buy-side)", value: "Analyst / Associate (Buy-side)" },
	{display: "Portfolio Manager (Buy-side)", value: "Portfolio Manager (Buy-side)" },
    {display: "Investors - Private Equity - Other Role", value: "Investors - Private Equity - Other Role" }];

var role_investors_pubEq = [
    {display: "Please Select", value: "" },
	{display: "Managing Director / Partner (Buy-side)", value: "Managing Director / Partner (Buy-side)" },
	{display: "Analyst / Associate (Buy-side)", value: "Analyst / Associate (Buy-side)" },
    {display: "Investors - Public Equity - Other Role", value: "Investors - Public Equity - Other Role" }];

var role_investors_vc = [
    {display: "Please Select", value: "" },
	{display: "Managing Director / Partner (Buy-side)", value: "Managing Director / Partner (Buy-side)" },
	{display: "Analyst / Associate (Buy-side)", value: "Analyst / Associate (Buy-side)" },
	{display: "Portfolio Manager (Buy-side)", value: "Portfolio Manager (Buy-side)" },
    {display: "Investors - Venture Capital - Other Role", value: "Investors - Venture Capital - Other Role" }];
	
var role_it = [
    {display: "Please Select", value: "" },
    {display: "Chief Information Officer or Head of IT", value: "Chief Information Officer or Head of IT" }, 
	{display: "Technical Professionals", value: "Technical Professionals" }, 
	{display: "Applications", value: "Applications" }, 
	{display: "Data and Analytics", value: "Data and Analytics" }, 
	{display: "Enterprise Architecture and Technology Innovation", value: "Enterprise Architecture and Technology Innovation" }, 
	{display: "IT Infrastructure and Operations", value: "IT Infrastructure and Operations" }, 
	{display: "IT Program and Portfolio Management", value: "IT Program and Portfolio Management" }, 
	{display: "IT Security and Risk Management", value: "IT Security and Risk Management" }, 
	{display: "Sourcing, Procurement and Vendor", value: "Sourcing, Procurement and Vendor" }, 
    {display: "IT - Other Role", value: "IT - Other Role" }];
	
var role_it_serv = [
    {display: "Please Select", value: "" },
    {display: "Partner", value: "Partner" }, 
	{display: "Principal", value: "Principal" }, 
	{display: "Manager", value: "Manager" }, 
	{display: "Consultant", value: "Consultant" }, 
	{display: "System Integrator", value: "System Integrator" }, 
	{display: "Knowledge Specialist", value: "Sourcing, Procurement and Vendor Management" }, 
	{display: "Account Management", value: "Account Management" }, 
    {display: "Other - IT Services", value: "Other - IT Services" }];

var role_legal = [
    {display: "Please Select", value: "" },
    {display: "General Counsel or Chief Legal Officer", value: "General Counsel or Chief Legal Officer" }, 
	{display: "Compliance and Ethics", value: "Compliance and Ethics" }, 
	{display: "Data Privacy", value: "Data Privacy" }, 
	{display: "Ethics Officer", value: "Ethics Officer" }, 
	{display: "Legal Professional / Lawyer", value: "Legal Professional / Lawyer" }, 
	{display: "Legal Operations", value: "Legal Operations" }, 
	{display: "Legal and Compliance - Other Role", value: "Legal and Compliance - Other Role" }];

var role_mgmt = [
    {display: "Please Select", value: "" },
	{display: "Partner", value: "Partner" }, 
    {display: "Principal", value: "Principal" }, 
	{display: "Manager", value: "Manager" }, 
	{display: "Consultant", value: "Consultant" }, 
	{display: "Knowledge Specialist", value: "Knowledge Specialist" }, 
	{display: "Account Management", value: "Account Management" }, 
	{display: "Other - Management / Business Consulting", value: "Other - Management / Business Consulting" }];
	
var role_marketing = [
    {display: "Please Select", value: "" },
    {display: "Chief Marketing Executive or Head of Marketing", value: "Chief Marketing Executive or Head of Marketing" }, 
	{display: "Customer Experience", value: "Customer Experience" }, 
	{display: "Digital Commerce", value: "Digital Commerce" }, 
	{display: "Market Insights", value: "Market Insights" }, 
	{display: "Marketing Analytics", value: "Marketing Analytics" }, 
	{display: "Marketing Technology", value: "Marketing Technology" }, 
	{display: "Multichannel Marketing", value: "Multichannel Marketing" }, 
	{display: "Marketing - Other Role", value: "Marketing - Other Role" }, 
	{display: "Chief Marketing Officer, Technology/Service", value: "Chief Marketing Officer, Technology/Service" }, 
	{display: "Strategic Planning, Technology/Service Provider", value: "Strategic Planning, Technology/Service Provider" }, 
	{display: "Technology/Service Provider – Other Marketing", value: "Technology/Service Provider – Other Marketing" }, 
	{display: "Analyst Relations", value: "Analyst Relations" }, 
	{display: "Market Intelligence and Competitive", value: "Market Intelligence and Competitive" }, 
	{display: "Product Marketing, Technology/Service", value: "Product Marketing, Technology/Service" }, 
	{display: "Demand Generation, Technology/Service", value: "Demand Generation, Technology/Service" }, 
	{display: "Sales Enablement - Marketing", value: "Sales Enablement - Marketing" }, 
	{display: "Channel/Branch Management - Marketing", value: "Channel / Branch Management - Marketing" }];
	
var role_operations = [
    {display: "Please Select", value: "" },
    {display: "Chief Operations Officer or Head of Operations", value: "Chief Operations Officer or Head of Operations" },
	{display: "Operations Program Management", value: "Operations Program Management" },
	{display: "Transformation", value: "Transformation" },
    {display: "Operations - Other Role", value: "Operations - Other Role" }];
    
var role_procurement = [
    {display: "Please Select", value: "" },
    {display: "Chief Procurement Officer", value: "Chief Procurement Officer" }, 
	{display: "Direct Procurement", value: "Direct Procurement" }, 
	{display: "Indirect Procurement", value: "Indirect Procurement" }, 
	{display: "Vendor / Supplier Management", value: "Vendor / Supplier Management" }, 
    {display: "Procurement – Other Role", value: "Procurement – Other Role" }];

var role_pm = [
    {display: "Please Select", value: "" },
    {display: "Chief Product Officer, Technology/Service", value: "Chief Product Officer, Technology/Service" }, 
	{display: "Research and Development, Technology/Service Provider", value: "Research and Development, Technology/Service Provider" }, 
	{display: "Product Development/Product Management, Technology/Service Provider", value: "Product Development/Product Management, Technology/Service Provider" }, 
	{display: "Product Marketing, Technology/Service Provider", value: "Product Marketing, Technology/Service Provider" }, 
	{display: "Technology/Service Provider – Other Product", value: "Technology/Service Provider – Other Product" }, 
	{display: "Chief Product Officer", value: "Chief Product Officer" }, 
	{display: "Research and Development", value: "Research and Development" }, 
	{display: "Product Development/Product Management", value: "Product Development/Product Management" }, 
	{display: "Product Marketing", value: "Product Marketing" }, 
    {display: "Product Management – Other Role", value: "Product Management – Other Role" }];
    
var role_ps = [
    {display: "Please Select", value: "" },
    {display: "Partner", value: "Partner" }, 
	{display: "Principal", value: "Principal" }, 
	{display: "Manager", value: "Manager" }, 
	{display: "Consultant", value: "Consultant" }, 
	{display: "Knowledge Specialist", value: "Knowledge Specialist" }, 
	{display: "Account Management", value: "Account Management" }, 
    {display: "Other - Professional Services", value: "Other - Professional Services" }];
	
var role_RandD = [
    {display: "Please Select", value: "" },
    {display: "Chief Technology Officer or Head of R&D", value: "Chief Technology Officer or Head of R&D" }, 
	{display: "BU / Divisional Head of R&D", value: "BU / Divisional Head of R&D" }, 
	{display: "New Product Development", value: "New Product Development" }, 
	{display: "Innovation", value: "Innovation" }, 
	{display: "Engineering", value: "Engineering" }, 
	{display: "R&D or Technology Strategy", value: "R&D or Technology Strategy" }, 
	{display: "R&D Portfolio Management", value: "R&D Portfolio Management" }, 
    {display: "R&D - Other Role", value: "R&D - Other Role" }];
    
var role_sales = [
    {display: "Please Select", value: "" },
    {display: "Chief Sales Officer or Head of Sales", value: "Chief Sales Officer or Head of Sales" }, 
	{display: "Chief Commercial Officer (Sales and Marketing)", value: "Chief Commercial Officer (Sales and Marketing)" }, 
	{display: "BU or Segment Head of Sales", value: "BU or Segment Head of Sales" }, 
	{display: "Sales Learning and Development", value: "Sales Learning and Development" }, 
	{display: "Sales Operations and Planning", value: "Sales Operations and Planning" }, 
	{display: "Sales Enablement", value: "Sales Enablement" }, 
    {display: "Sales Strategy", value: "Sales Strategy" }, 
	{display: "Sales Enablement", value: "Sales Enablement" }, 
	{display: "Field / Outside Sales", value: "Field / Outside Sales" }, 
	{display: "Key Account Management", value: "Key Account Management" }, 
	{display: "Indirect Channel Management", value: "Indirect Channel Management" }, 
	{display: "Insides Sales", value: "Insides Sales" }, 	
	{display: "Sales - Other Role", value: "Sales - Other Role" }, 
	{display: "Channel / Branch Management - Sales", value: "Channel / Branch Management - Sales" }];
    
var role_strategy = [
    {display: "Chief Strategy Officer", value: "Chief Strategy Officer" },
	{display: "Strategy - Other Role", value: "Strategy - Other Role" }];
	
var role_supply_chain = [
    {display: "Please Select", value: "" },
	{display: "Chief Supply Chain Officer or Head of Supply Chain", value: "Chief Supply Chain Officer or Head of Supply Chain" },
	{display: "Supply Chain Strategy, Center of Excellence", value: "Supply Chain Strategy, Center of Excellence" },
	{display: "Customer Fulfillment and Collaboration", value: "Customer Fulfillment and Collaboration" },
	{display: "Logistics - Transportation, Warehousing and Distribution", value: "Logistics - Transportation, Warehousing and Distribution" }, 
	{display: "Manufacturing Strategy and Operations", value: "Manufacturing Strategy and Operations" }, 
	{display: "Supply Chain IT", value: "Supply Chain IT" }, 
	{display: "Supply Chain Planning", value: "Supply Chain Planning" }, 
	{display: "Supply Chain Sourcing and Procurement", value: "Supply Chain Sourcing and Procurement" }, 
	{display: "Quality Management", value: "Quality Management" }, 
    {display: "Supply Chain - Other Role", value: "Supply Chain - Other Role" }];
    
// If parent option is changed
// set hidden job function
$("[name=jobFunction1]").change(function() {
		if( $("[name=jobFunction1]").is("select") ) {
			var jfVal = $(this).val(); //get option value from parent 
			$('#hidjobFunction1').val(jfVal);
		} else {
			var jfVal = $("[name=jobFunction1]:checked", "form").val(); //get option value from parent 
			$('#hidjobFunction1').val(jfVal);
		}
		console.log("Hidden Job Function: " + $('#hidjobFunction1').val());
        console.log(jfVal);
        switch(jfVal){ //using switch compare selected option and populate child
		      case 'Audit and Risk':
                list(role_audit);
                break;
			  case 'Communications':
                list(role_comm);
                break;
			  case 'Customer Service and Support':
                list(role_css);
                break;
			  case 'Executive Management':
                list(role_exec_mgmt);
                break;           
			  case 'Finance':
                list(role_finance);
                break;
			 //  case 'Financial Services':
             //   list(role_fin_serv);
             //   break;
			 // case 'High Tech and Telecom Providers':
             //   list(role_high_tech);
             //   break;  
              case 'Human Resources':
                list(role_hr);
                break;  
			  case 'Investors - Equity Research':
                list(role_investors_er);
                break; 
			  case 'Investors - Investment Bank':
                list(role_investors_ib);
                break; 
			  case 'Investors - Private Equity':
                list(role_investors_privEq);
                break; 
			  case 'Investors - Public Equity':
                list(role_investors_pubEq);
                break; 
			  case 'Investors - Venture Capital':
                list(role_investors_vc);
                break; 
			  case 'IT':
                list(role_it);
                break;  
			  case 'IT Services':
                list(role_it_serv);
                break;  
              case 'Legal and Compliance':
                list(role_legal);
                break;   
			  case 'Management / Business Consulting':
                list(role_mgmt);
                break;            
              case 'Marketing':
                list(role_marketing);
                break;  
			  case 'Operations':
                list(role_operations);
                break;  
              case 'Procurement':
                list(role_procurement);
                break;    
			  case 'Product Management':
                list(role_pm);
                break; 
			  case 'Professional Services':
                list(role_ps);
                break; 
			  case 'Research and Development':
                list(role_RandD);
                break;   
			  case 'Sales':
                list(role_sales);
                break; 
			  case 'Strategy':
                list(role_strategy);
                break; 
			  case 'Supply Chain':
                list(role_supply_chain);
                break; 
            default: //default child option is blank
                $("[name=jobRole1]").html('');  
                break;
       }
});
	
/***************************************************/
// Start of Industry/Sub Industry Dynamic Script   /
/*************************************************/

var sub_bfi = [
    {display: "Please Select", value: "" },
    {display: "Commercial Banking", value: "Commercial Banking" }, 
	{display: "Insurance (except health)", value: "Insurance (except health)" }, 
    {display: "Miscellaneous Financial", value: "Miscellaneous Financial" }, 
    {display: "Retail Banking", value: "Retail Banking" }, 
    {display: "Securities and Invest", value: "Securities and Invest" }, 
    {display: "Wealth Management and Brokerage", value: "Wealth Management and Brokerage" }];

var sub_edu = [
    {display: "Please Select", value: "" },
    {display: "K-12", value: "K-12" }, 
	{display: "Higher Education", value: "Higher Education" }];
	
var sub_eandu = [
    {display: "Please Select", value: "" },
    {display: "Electric and Gas Utilities", value: "Electric and Gas Utilities" }, 
	{display: "Energy Mining", value: "Energy Mining" }, 
	{display: "Oil and Gas", value: "Oil and Gas" }, 
	{display: "Water and Sewer Utilities", value: "Water and Sewer Utilities" }];
    
var sub_govt = [
    {display: "Please Select", value: "" },
	{display: "Federal", value: "Federal" },
	{display: "State and Local", value: "State and Local" },  
	{display: "Federal Defense", value: "Federal Defense" }];
    
var sub_hcare = [
    {display: "Please Select", value: "" },
    {display: "Healthcare Payer", value: "Healthcare Payer" }, 
	{display: "Heatlhcare Provider", value: "Heatlhcare Provider" }, 
	{display: "Medical Equipment/Supplies", value: "Medical Equipment/Supplies" }, 
	{display: "Pharmaceutical", value: "Pharmaceutical" }];
     
var sub_manuf = [
    {display: "Please Select", value: "" },
    {display: "Automotive", value: "Automotive" }, 
	{display: "Construction", value: "Construction" }, 
	{display: "Consumer Goods", value: "Consumer Goods" }, 
	{display: "Defense Contractors", value: "Defense Contractors" }, 
	{display: "Food and Beverage", value: "Food and Beverage" }, 
	{display: "Industrial", value: "Industrial" }, 
    {display: "Miscellaneous Mining", value: "Miscellaneous Mining" }];
	
var sub_media = [
    {display: "Please Select", value: "" },
	{display: "Media and Publishing", value: "Media and Publishing" }];

var sub_misc = [
    {display: "Please Select", value: "" },
	{display: "Miscellaneous", value: "Miscellaneous" }];
	
var sub_retail = [
    {display: "Please Select", value: "" },
	{display: "Hospitality and Travel", value: "Hospitality and Travel" },
	{display: "Retailers", value: "Retailers" }];

var sub_serv = [
    {display: "Please Select", value: "" },
	{display: "Miscellaneous Services", value: "Miscellaneous Services" },
    {display: "Real Estate", value: "Real Estate" }];

var sub_tandt = [
    {display: "Please Select", value: "" },
	{display: "Carriers", value: "Carriers" },
	{display: "Communications Equipment", value: "Communications Equipment" },
	{display: "Computing HD and Peripheral", value: "Computing HD and Peripheral" },
	{display: "IT Services", value: "IT Services" },
	{display: "Professional Services", value: "Professional Services" },
	{display: "Semiconductors", value: "Semiconductors)" },
    {display: "Software", value: "Software" }];

var sub_trans = [
    {display: "Please Select", value: "" },
	{display: "Courier", value: "Courier" },
	{display: "Rail Transportation", value: "Rail Transportation" },
	{display: "Transportation", value: "Transportation" },
    {display: "Transportation Services", value: "Transportation Services" }];
    
// If parent option is changed
$("[name=industry1]").change(function() {
		var indVal = $(this).val(); //get option value from parent 
		//$('#hidjobFunction1').val(jfVal);
		console.log("Industry is : " + indVal) ;
        console.log(indVal);
        switch(indVal){ //using switch compare selected option and populate child
		      case 'Banking, Finance and Insurance':
                list_subInd(sub_bfi);
                break;
			  case 'Education':
                list_subInd(sub_edu);
                break;
			  case 'Energy and Utilities':
                list_subInd(sub_eandu);
                break;
			  case 'Government':
                list_subInd(sub_govt);
                break;           
			  case 'Healthcare':
                list_subInd(sub_hcare);
                break;
              case 'Manufacturing':
                list_subInd(sub_manuf);
                break;  
			  case 'Media':
                list_subInd(sub_media);
                break; 
			  case 'Miscellaneous':
                list_subInd(sub_misc);
                break; 
			  case 'Retail':
                list_subInd(sub_retail);
                break; 
			  case 'Services':
                list_subInd(sub_serv);
                break; 
			  case 'Technology and Telecom':
                list_subInd(sub_tandt);
                break;      
			  case 'Transportation':
                list_subInd(sub_trans);
                break;      
            default: //default child option is blank
                $("[name=subIndustry1]").html('');  
                break;
       }
});

/*******************************************************/
// Start of Sub Industry/Job Function Dynamic Script   /
/*****************************************************/
var jf_bfi = [
    {display: "Please Select", value: "" },
    {display: "Audit and Risk", value: "Audit and Risk" }, 
	{display: "Communications", value: "Communications" }, 
    {display: "Customer Service and Support", value: "Customer Service and Support" }, 
    {display: "Executive Management", value: "Executive Management" }, 
    {display: "Finance", value: "Finance" }, 
	{display: "Human Resources", value: "Human Resources" }, 
	{display: "IT", value: "IT" }, 
	{display: "IT Services", value: "IT Services" }, 
	{display: "Investors - Public Equity", value: "Investors - Public Equity" }, 
	{display: "Investors - Private Equity", value: "Investors - Private Equity" }, 
	{display: "Investors - Venture Capital", value: "Investors - Venture Capital" }, 
	{display: "Investors - Investment Bank", value: "Investors - Investment Bank" }, 
	{display: "Investors - Equity Research", value: "Investors - Equity Research" }, 
    {display: "Legal and Compliance", value: "Legal and Compliance" }, 
    {display: "Management / Business Consulting", value: "Management / Business Consulting" },
    {display: "Marketing", value: "Marketing" }, 
    {display: "Operations", value: "Operations" }, 
	{display: "Procurement", value: "Procurement" }, 
	{display: "Product Management", value: "Product Management" }, 
	{display: "Professional Services", value: "Professional Services" }, 
	{display: "Research and Development", value: "Research and Development" }, 		
    {display: "Sales", value: "Sales" }, 
	{display: "Strategy", value: "Strategy" },
    {display: "Supply Chain", value: "Supply Chain" }];

var jf_edu = [
    {display: "Please Select", value: "" },
    {display: "Audit and Risk", value: "Audit and Risk" }, 
	{display: "Communications", value: "Communications" }, 
    {display: "Customer Service and Support", value: "Customer Service and Support" }, 
    {display: "Executive Management", value: "Executive Management" }, 
    {display: "Finance", value: "Finance" }, 
	{display: "Human Resources", value: "Human Resources" }, 
	{display: "IT", value: "IT" }, 
    {display: "Legal and Compliance", value: "Legal and Compliance" }, 
    {display: "Marketing", value: "Marketing" }, 
	{display: "Procurement", value: "Procurement" }, 
	{display: "Research and Development", value: "Research and Development" }, 
    {display: "Sales", value: "Sales" }, 
    {display: "Strategy", value: "Strategy" }, 
	{display: "Supply Chain", value: "Supply Chain" }];
	
var jf_eandu = [
    {display: "Please Select", value: "" },
    {display: "Audit and Risk", value: "Audit and Risk" }, 
	{display: "Communications", value: "Communications" }, 
    {display: "Customer Service and Support", value: "Customer Service and Support" }, 
    {display: "Executive Management", value: "Executive Management" }, 
    {display: "Finance", value: "Finance" }, 
	{display: "Human Resources", value: "Human Resources" }, 
	{display: "IT", value: "IT" }, 
    {display: "Legal and Compliance", value: "Legal and Compliance" }, 
    {display: "Marketing", value: "Marketing" }, 
	{display: "Procurement", value: "Procurement" }, 
	{display: "Research and Development", value: "Research and Development" }, 
    {display: "Sales", value: "Sales" }, 
    {display: "Strategy", value: "Strategy" }, 
	{display: "Supply Chain", value: "Supply Chain" }];
    
var jf_govt = [
    {display: "Please Select", value: "" },
    {display: "Audit and Risk", value: "Audit and Risk" }, 
	{display: "Communications", value: "Communications" }, 
    {display: "Customer Service and Support", value: "Customer Service and Support" }, 
    {display: "Executive Management", value: "Executive Management" }, 
    {display: "Finance", value: "Finance" }, 
	{display: "Human Resources", value: "Human Resources" }, 
	{display: "IT", value: "IT" }, 
    {display: "Legal and Compliance", value: "Legal and Compliance" }, 
    {display: "Marketing", value: "Marketing" }, 
	{display: "Procurement", value: "Procurement" }, 
	{display: "Research and Development", value: "Research and Development" }, 
    {display: "Sales", value: "Sales" }, 
    {display: "Strategy", value: "Strategy" }, 
	{display: "Supply Chain", value: "Supply Chain" }];
    
var jf_hcare = [
    {display: "Please Select", value: "" },
    {display: "Audit and Risk", value: "Audit and Risk" }, 
	{display: "Communications", value: "Communications" }, 
    {display: "Customer Service and Support", value: "Customer Service and Support" }, 
    {display: "Executive Management", value: "Executive Management" }, 
    {display: "Finance", value: "Finance" }, 
	{display: "Human Resources", value: "Human Resources" }, 
	{display: "IT", value: "IT" }, 
    {display: "Legal and Compliance", value: "Legal and Compliance" }, 
    {display: "Marketing", value: "Marketing" }, 
	{display: "Procurement", value: "Procurement" }, 
	{display: "Research and Development", value: "Research and Development" }, 
    {display: "Sales", value: "Sales" }, 
    {display: "Strategy", value: "Strategy" }, 
	{display: "Supply Chain", value: "Supply Chain" }];
     
var jf_manuf = [
    {display: "Please Select", value: "" },
    {display: "Audit and Risk", value: "Audit and Risk" }, 
	{display: "Communications", value: "Communications" }, 
    {display: "Customer Service and Support", value: "Customer Service and Support" }, 
    {display: "Executive Management", value: "Executive Management" }, 
    {display: "Finance", value: "Finance" }, 
	{display: "Human Resources", value: "Human Resources" }, 
	{display: "IT", value: "IT" }, 
    {display: "Legal and Compliance", value: "Legal and Compliance" }, 
    {display: "Marketing", value: "Marketing" }, 
	{display: "Procurement", value: "Procurement" }, 
	{display: "Research and Development", value: "Research and Development" }, 
    {display: "Sales", value: "Sales" }, 
    {display: "Strategy", value: "Strategy" }, 
	{display: "Supply Chain", value: "Supply Chain" }];
	
var jf_media = [
    {display: "Please Select", value: "" },
	{display: "Audit and Risk", value: "Audit and Risk" }, 
	{display: "Communications", value: "Communications" }, 
    {display: "Customer Service and Support", value: "Customer Service and Support" }, 
    {display: "Executive Management", value: "Executive Management" }, 
    {display: "Finance", value: "Finance" }, 
	{display: "Human Resources", value: "Human Resources" }, 
	{display: "IT", value: "IT" }, 
    {display: "Legal and Compliance", value: "Legal and Compliance" }, 
    {display: "Marketing", value: "Marketing" }, 
	{display: "Procurement", value: "Procurement" }, 
	{display: "Research and Development", value: "Research and Development" }, 
    {display: "Sales", value: "Sales" }, 
    {display: "Strategy", value: "Strategy" }, 
	{display: "Supply Chain", value: "Supply Chain" }];

var jf_misc = [
    {display: "Audit and Risk", value: "Audit and Risk" }, 
	{display: "Communications", value: "Communications" }, 
    {display: "Customer Service and Support", value: "Customer Service and Support" }, 
    {display: "Executive Management", value: "Executive Management" }, 
    {display: "Finance", value: "Finance" }, 
	{display: "Human Resources", value: "Human Resources" }, 
	{display: "IT", value: "IT" }, 
    {display: "Legal and Compliance", value: "Legal and Compliance" }, 
    {display: "Marketing", value: "Marketing" }, 
	{display: "Procurement", value: "Procurement" }, 
	{display: "Research and Development", value: "Research and Development" }, 
    {display: "Sales", value: "Sales" }, 
    {display: "Strategy", value: "Strategy" }, 
	{display: "Supply Chain", value: "Supply Chain" }];
	
var jf_retail = [
    {display: "Please Select", value: "" },
	{display: "Audit and Risk", value: "Audit and Risk" }, 
	{display: "Communications", value: "Communications" }, 
    {display: "Customer Service and Support", value: "Customer Service and Support" }, 
    {display: "Executive Management", value: "Executive Management" }, 
    {display: "Finance", value: "Finance" }, 
	{display: "Human Resources", value: "Human Resources" }, 
	{display: "IT", value: "IT" }, 
    {display: "Legal and Compliance", value: "Legal and Compliance" }, 
    {display: "Marketing", value: "Marketing" }, 
	{display: "Procurement", value: "Procurement" }, 
	{display: "Research and Development", value: "Research and Development" }, 
    {display: "Sales", value: "Sales" }, 
    {display: "Strategy", value: "Strategy" }, 
	{display: "Supply Chain", value: "Supply Chain" }];

var jf_serv = [
    {display: "Please Select", value: "" },
    {display: "Audit and Risk", value: "Audit and Risk" }, 
	{display: "Communications", value: "Communications" }, 
    {display: "Customer Service and Support", value: "Customer Service and Support" }, 
    {display: "Executive Management", value: "Executive Management" }, 
    {display: "Finance", value: "Finance" }, 
	{display: "Human Resources", value: "Human Resources" }, 
	{display: "IT", value: "IT" }, 
    {display: "Legal and Compliance", value: "Legal and Compliance" }, 
    {display: "Marketing", value: "Marketing" }, 
	{display: "Procurement", value: "Procurement" }, 
	{display: "Research and Development", value: "Research and Development" }, 
    {display: "Sales", value: "Sales" }, 
    {display: "Strategy", value: "Strategy" }, 
	{display: "Supply Chain", value: "Supply Chain" }];

var jf_tandt = [
    {display: "Please Select", value: "" },
    {display: "Audit and Risk", value: "Audit and Risk" }, 
	{display: "Communications", value: "Communications" }, 
    {display: "Customer Service and Support", value: "Customer Service and Support" }, 
    {display: "Executive Management", value: "Executive Management" }, 
    {display: "Finance", value: "Finance" }, 
	{display: "Human Resources", value: "Human Resources" }, 
	{display: "IT", value: "IT" }, 
	{display: "IT Services", value: "IT Services" }, 
    {display: "Legal and Compliance", value: "Legal and Compliance" }, 
    {display: "Management / Business Consulting", value: "Management / Business Consulting" },
    {display: "Marketing", value: "Marketing" }, 
    {display: "Operations", value: "Operations" }, 
	{display: "Procurement", value: "Procurement" }, 
	{display: "Product Management", value: "Product Management" }, 
	{display: "Professional Services", value: "Professional Services" }, 
	{display: "Research and Development", value: "Research and Development" }, 		
    {display: "Sales", value: "Sales" }, 
	{display: "Strategy", value: "Strategy" }];

var jf_trans = [
    {display: "Please Select", value: "" },
    {display: "Audit and Risk", value: "Audit and Risk" }, 
	{display: "Communications", value: "Communications" }, 
    {display: "Customer Service and Support", value: "Customer Service and Support" }, 
    {display: "Executive Management", value: "Executive Management" }, 
    {display: "Finance", value: "Finance" }, 
	{display: "Human Resources", value: "Human Resources" }, 
	{display: "IT", value: "IT" }, 
    {display: "Legal and Compliance", value: "Legal and Compliance" }, 
    {display: "Marketing", value: "Marketing" }, 
	{display: "Procurement", value: "Procurement" }, 
	{display: "Research and Development", value: "Research and Development" }, 
    {display: "Sales", value: "Sales" }, 
    {display: "Strategy", value: "Strategy" }, 
	{display: "Supply Chain", value: "Supply Chain" }];
    
// If parent option is changed
$("[name=subIndustry1]").change(function() {
		var subIndVal = $(this).val(); //get option value from parent 
		console.log("Sub Industry is : " + subIndVal );
        console.log(subIndVal);
        switch(subIndVal){ //using switch compare selected option and populate child
		      case 'Commercial Banking':
			  case 'Insurance (except health)':
			  case 'Miscellaneous Financial':
			  case 'Retail Banking':
			  case 'Securities and Invest':
			  case 'Wealth Management and Brokerage':
                list_jf(jf_bfi);
                break;
			  case 'K-12':
			  case 'Higher Education':
                list_jf(jf_edu);
                break;
			  case 'Electric and Gas Utilities':
			  case 'Energy Mining':
			  case 'Oil and Gas':
			  case 'Water and Sewer Utilities':
                list_jf(jf_eandu);
                break;
			  case 'Federal':
			  case 'State and Local':
			  case 'Federal Defense':
                list_jf(jf_govt);
                break;           
			  case 'Healthcare Payer':
			  case 'Heatlhcare Provider':
			  case 'Medical Equipment/Supplies':
			  case 'Pharmaceutical':
                list_jf(jf_hcare);
                break;
              case 'Automotive':
			  case 'Construction':
			  case 'Consumer Goods':
			  case 'Defense Contractors':
			  case 'Food and Beverage':
			  case 'Industrial':
                list_jf(jf_manuf);
                break;  
			  case 'Miscellaneous Mining':
                list_jf(jf_media);
                break; 
			  case 'Miscellaneous':
                list_jf(jf_misc);
                break; 
			  case 'Hospitality and Travel':
			  case 'Retailers':
                list_jf(jf_retail);
                break; 
			  case 'Miscellaneous Services':
			  case 'Real Estate':
                list_jf(jf_serv);
                break; 
			  case 'IT Services':
			  case 'Carriers':
			  case 'Semiconductors':
			  case 'Computing HD and Peripheral':
			  case 'Software':
			  case 'Communications Equipment':
			  case 'Professional Services':
                list_jf(jf_tandt);
                break;      
			  case 'Courier':
			  case 'Rail Transportation':
			  case 'Transportation':
			  case 'Transportation Services':
                list_jf(jf_trans);
                break;      
            default: //default child option is blank
                $("[name=jobFunction1]").html('');  
                break;
       }
});

/*****************************************************/

// Set hidden value of Job Level
$("[name=jobLevel1]").change(function() {
		// if( $("[name=jobLevel1]").is("select") ) {
			var jlVal = $(this).val(); //get option value from parent 
			$('#hidjobLevel1').val(jlVal);
		// } 
        console.log("Hidden Job Level: " + $('#hidjobLevel1').val());
});

//function to populate sub industry
function list_subInd(array_list)
{
    $("[name=subIndustry1]").html(""); //reset child options
    $(array_list).each(function (i) { //populate child options 
        $("[name=subIndustry1]").append("<option value=\""+array_list[i].value+"\">"+array_list[i].display+"</option>");
    });
	
}

//function to populate job function
function list_jf(array_list)
{
    $("[name=jobFunction1]").html(""); //reset child options
    $(array_list).each(function (i) { //populate child options 
        $("[name=jobFunction1]").append("<option value=\""+array_list[i].value+"\">"+array_list[i].display+"</option>");
    });
}

//function to populate job role
function list(array_list)
{
    $("[name=jobRole1]").html(""); //reset child options
    $(array_list).each(function (i) { //populate child options 
        $("[name=jobRole1]").append("<option value=\""+array_list[i].value+"\">"+array_list[i].display+"</option>");
    });
}

}); // doc ready
