if (current.getTableName() == "x_fru_inc_incident") {

	var ebody = email.body_text;
	var debug=true;
	
	
	// Extract the XML file only. Remove the email signatures etc.
	var len = ebody.indexOf("</ns0:XmlBody>")+15;
	var res = ebody.substring(0,len);
	
		
	try {
		var xmlDoc = new XMLDocument2();
                xmlDoc.parseXML(res ); 
		} catch (e) {
	gs.info("Error parsing XML response from: " + e.toString());
      }

	var CallerEmail = xmlDoc.getNodeText("//CallerEmail");
	var ConfigurationItem = xmlDoc.getNodeText("//ConfigurationItem");
	var Description = xmlDoc.getNodeText("//Description");
	var Information = xmlDoc.getNodeText("//Information");
	var Impact = xmlDoc.getNodeText("//Impact");
	var AssignedToWorkgroup = xmlDoc.getNodeText("//AssignedToWorkgroup");
	var Category = xmlDoc.getNodeText("//Category");
	var SubCategory = xmlDoc.getNodeText("//SubCategory");
        var Service= xmlDoc.getNodeText("//Service");

        var cmdb_ci_id = GetIDValue('cmdb_ci','name',ConfigurationItem);
        var x_fru_foundation_req_for_id = GetIDValue('sys_user','user_name',CallerEmail);
        var business_service_id = GetIDValue('cmdb_ci_service','name',Service);

        if(debug)
	{
		gs.info("Email body "+email.body_text);
		gs.info("length",len);
		gs.info("ebody"+ebody);
		gs.info("Description" + Description);
		gs.info("caller email" + CallerEmail);
		gs.info("ConfigurationItem" + ConfigurationItem);
		gs.info("Information" + Information);
		gs.info("Impact" + Impact);
		gs.info("AssignedToWorkgroup" + AssignedToWorkgroup);
		gs.info("SubCategory" + SubCategory);
		gs.info("Category" + Category);
		gs.info("Service" + Service);
		gs.info("Category" + cmdb_ci_id );
		gs.info("Category" + x_fru_foundation_req_for_id);
		gs.info("ServiceID" + business_service_id );
	}

  current.cmdb_ci = cmdb_ci_id ;
  current.x_fru_foundation_req_for = x_fru_foundation_req_for_id ;
  current.business_service  = business_service_id ;
  current.contact_type = 'email';
  current.short_description=Description;
  current.description=Information;
  current.impact=Impact;
  current.insert();

}

function GetIDValue(table,columnName, displayValue) { 
 var rec = new GlideRecord(table);
 rec.addQuery(columnName,displayValue);
 rec.query();
 
 if (rec.next())
 {
     return rec.sys_id;
 }
 else
      return null;
}
	
