import { PolymerElement, html } from '@polymer/polymer';
import '@polymer/paper-checkbox/paper-checkbox.js';
/**
 * @polymer
 * @extends HTMLElement
 */
class FluidPaperCheckboxElement extends PolymerElement
{
  static get template() {
    return html`
        <paper-checkbox id="checkbox" required="[[required]]" checked="{{checked}}" on-change="_change">
            <slot></slot>
        </paper-checkbox>
        <!--input name="[[name]]" type="hidden" value\$="[[calculatedValue]]"-->
`;
  }

  static get is()
  {
      return 'fluid-paper-checkbox';
  }
  static get properties()
  {
      return {
          name: {
              type: String
          },
          required: {
              type: Boolean
          },
          checked:{
              type: Boolean,
              value: false
          },
          value:{
              type: String
          },
          sendValue:{
              type: String
          },
          /**
           * The form that the element is registered to.
           */
          _parentForm: {
              type: Object
          }
      }
  }

  ready() {
      super.ready();
      if(this.checked){
          this.value = this.sendValue;
      }else{
          this.value = '';
      }
  }
  _change() {
      if(this.checked){
          this.value = this.sendValue;
      }else{
          this.value = '';
      }
  }
  connectedCallback() {
      super.connectedCallback();
      //this.name = this.name + "[]";
      //console.log("connectedCallback " + this.name);
      this.dispatchEvent(new CustomEvent('iron-form-element-register'), {bubbles: true, composed: true});
  }

  disconnectedCallback() {
      super.disconnectedCallback();
      if (this._parentForm) {
          var ev = new CustomEvent('iron-form-element-unregister');
          ev.detail = {target: this};
          this.dispatchEvent(ev, {bubbles: true, composed: true});
      }
  }
}
window.customElements.define(FluidPaperCheckboxElement.is, FluidPaperCheckboxElement);
