import fivestar from '@salesforce/resourceUrl/fivestar';
import { LightningElement, api } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { loadStyle, loadScript } from 'lightning/platformResourceLoader';

const ERROR_TITLE = 'Error loading five-star';
const ERROR_VARIANT = 'error';
const EDITABLE_CLASS = 'c-rating';
const READ_ONLY_CLASS = 'readonly c-rating';

export default class FiveStarRating extends LightningElement {
    @api
    readOnly;
    @api
    value;
  
    editedValue;
    isRendered;

    get starClass() {
        return this.readOnly ? READ_ONLY_CLASS : EDITABLE_CLASS;
    }

    renderedCallback() {
        if (this.isRendered) {
          return;
        }
        this.loadScript();
        this.isRendered = true;
    }

    loadScript() {
        Promise.all([
          loadScript(this, fivestar + '/rating.js'),
          loadStyle(this, fivestar + '/rating.css')      
        ]).then(() => {
          this.initializeRating();
        })
        .catch(error => {
          const toast = new ShowToastEvent({
              title: ERROR_TITLE,
              message: error.message,
              variant: ERROR_VARIANT,
          });
          this.dispatchEvent(toast);
        });
    }
}