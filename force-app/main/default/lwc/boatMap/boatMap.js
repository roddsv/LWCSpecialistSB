import { LightningElement, api } from 'lwc';
import BOATMC from '@salesforce/messageChannel/BoatMessageChannel__c';
import { subscribe, APPLICATION_SCOPE, MessageContext } from 'lightning/messageService';


const LONGITUDE_FIELD = 'Boat__c.Geolocation__Longitude__s';
const LATITUDE_FIELD = 'Boat__c.Geolocation__Latitude__s';
const BOAT_FIELDS = [LONGITUDE_FIELD, LATITUDE_FIELD];

export default class BoatMap extends LightningElement {

    subscription = null;
    boatId;

    @api
    get recordId() {
        return this.boatId;
    }

    setRecordId(value) {
        this.setAttribute('boatId', value);
        this.boatId = value;
    }
}