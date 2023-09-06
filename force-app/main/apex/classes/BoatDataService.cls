public with sharing class BoatDataService {

    public static final String LENGTH_TYPE = 'Length';
    public static final String PRICE_TYPE = 'Price';
    public static final String TYPE_TYPE = 'Type';
    
    @AuraEnabled(cacheable=true)
    public static List<Boat__c> getBoats(String boatTypeId) {
        String databaseQuery = 'SELECT'
        + 'Name, Description__c, Geolocation__Latitude__s,'
        + 'Geolocation_Longitude__s, Picture__c, Contact_r.Name,'
        + 'BoatType_c, BoatType_r.Name, Length__c, Price__c '
        + 'FROM Boat__c';
        
        if (String.isNotBlank(boatTypeId)) {
            databaseQuery += 'WHERE BoatType__c = :boatTypeId';
        }
        
        return Database.query(databaseQuery)
    }
}