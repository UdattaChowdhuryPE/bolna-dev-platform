export const SALESFORCE_CONFIG = {
  instance_url: 'your-instance.salesforce.com',
  oauth_token: 'mock_token_****',
  object_type: 'Lead',
  field_mappings: [
    { bolna_field: 'caller_phone', crm_field: 'Phone' },
    { bolna_field: 'caller_name', crm_field: 'FirstName' },
    { bolna_field: 'interest_level', crm_field: 'LeadSource' },
    { bolna_field: 'call_duration', crm_field: 'Duration__c' }
  ]
};

export const HUBSPOT_CONFIG = {
  api_key: 'mock_key_****',
  object_type: 'Contact',
  field_mappings: [
    { bolna_field: 'caller_phone', crm_field: 'phone' },
    { bolna_field: 'caller_email', crm_field: 'email' },
    { bolna_field: 'call_outcome', crm_field: 'lifecyclestage' }
  ]
};
