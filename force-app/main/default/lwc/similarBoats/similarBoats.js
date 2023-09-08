import { api, LightningElement, wire } from 'lwc';
import { NavigationMixin } from 'lightning/navigation'
import getSimilarBoats from '@salesforce/apex/BoatDataService.getSimilarBoats';

const BOAT_OBJECT = 'Boat__c';

export default class SimilarBoats extends NavigationMixin(LightningElement) {

    currentBoat;
    relatedBoats;
    boatId;
    error;

    @api
    get recordId() {
        return this.boatId;
    }
    set recordId(value) {
        this.setAttribute('boatId', value);        
        this.boatId = value;
    }
    
    @api
    similarBy;
}