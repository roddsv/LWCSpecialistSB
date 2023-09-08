import { api, LightningElement } from 'lwc';
import getAllReviews from '@salesforce/apex/BoatDataService.getAllReviews';
import { NavigationMixin } from 'lightning/navigation';

export default class BoatReviews extends NavigationMixin(LightningElement) {
    boatId;
    error;
    boatReviews;
    isLoading;
    
    get recordId() {
        return this.boatId;
    }
    
    @api
    set recordId(value) {
        this.setAttribute('boatId', value);        
        this.boatId = value;      
        this.getReviews();
    }
}