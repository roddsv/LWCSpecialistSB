import { LightningElement, api, wire } from 'lwc';

import getBoatsByLocation from '@salesforce/apex/BoatDataService.getBoatsByLocation';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

const LABEL_YOU_ARE_HERE = 'You are here!';
const ICON_STANDARD_USER = 'standard:user';
const ERROR_TITLE = 'Error loading Boats Near Me';
const ERROR_VARIANT = 'error';

export default class BoatsNearMe extends LightningElement {

    @api
    boatTypeId;
    mapMarkers = [];
    isLoading = true;
    isRendered;
    latitude;
    longitude;

    @wire(getBoatsByLocation, {latitude: '$latitude', longitude: '$longitude', boatTypeId: '$boatTypeId'})
    wiredBoatsJSON({error, data}) {
        if (data) {
            this.createMapMarkers(data);
        } else if (error) {
            const toast = new ShowToastEvent({title: ERROR_TITLE, message: error.message, variant: ERROR_VARIANT});
            this.dispatchEvent(toast);
        }
        
        this.isLoading = false;
    }
}