import { LightningElement, api, wire } from 'lwc';
import { getRecord } from 'lightning/uiRecordApi';
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

    error = undefined;
    mapMakers = [];

    @wire(MessageContext)
    messageContext;

    @wire(getRecord, {recordId: '$boatId', fields: BOAT_FIELDS })
    
    wiredRecord({error, data}) {
        if (data) {
            this.error = undefined;
            const longitude = data.fields.Geolocation__Longitude__s.value;
            const latitude = data.fields.Geolocation__Latitude__s.value;
            this.uptadeMap(longitude, latitude);
        } else if (error) {
            this.error = error;
            this.boatId = undefined;
            this.mapMakers = [];
        }
    }
}