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
        
        return Database.query(databaseQuery);
    }

    @AuraEnabled(cacheable=true)
    public static List<Boat__c> getSimilarBoats(Id boatId, String similarBy) {
        List<Boat__c> similarBoats = new List<Boat__c>();
        List<Boat__c> parentBoat = [SELECT Id, Length__c, Price__c, BoatType__c, BoatType__r.Name
                                    FROM Boat__c
                                    WHERE Id = :boatId 
                                    WITH SECURITY_ENFORCED];
        if (parentBoat.isEmpty()) {
            return similarBoats;
        }
        if (similarBy == LENGTH_TYPE) {
            similarBoats = [
                SELECT Id, Contact__r.Name, Name, BoatType__c, BoatType__r.Name, Length__c, Picture__c, Price__c, Year_Built__c
                FROM Boat__c
                WHERE Id != :parentBoat.get(0).Id
                AND (Length__c >= :parentBoat.get(0).Length__c / 1.2)
                AND (Length__c <= :parentBoat.get(0).Length__c * 1.2)
                WITH SECURITY_ENFORCED
                ORDER BY Length__c, Price__c, Year_Built__c
            ];
        } else if (similarBy == PRICE_TYPE) {
            similarBoats = [
                SELECT Id, Contact__r.Name, Name, BoatType__c, BoatType__r.Name, Length__c, Picture__c, Price__c, Year_Built__c
                FROM Boat__c
                WHERE Id != :parentBoat.get(0).Id
                AND (Price__c >= :parentBoat.get(0).Price__c / 1.2)
                AND (Price__c <= :parentBoat.get(0).Price__c * 1.2)
                WITH SECURITY_ENFORCED
                ORDER BY Price__c, Length__c, Year_Built__c
            ];
        } else if (similarBy == TYPE_TYPE) {
            similarBoats = [
                SELECT Id, Contact__r.Name, Name, BoatType__c, BoatType__r.Name, Length__c, Picture__c, Price__c, Year_Built__c
                FROM Boat__c
                WHERE Id != :parentBoat.get(0).Id
                AND (BoatType__c = :parentBoat.get(0).BoatType__c)
                WITH SECURITY_ENFORCED
                ORDER BY Price__c, Length__c, Year_Built__c
            ];
        }
        return similarBoats;
    }
}