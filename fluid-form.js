import { PolymerElement, html } from '@polymer/polymer';
import '@polymer/iron-a11y-keys/iron-a11y-keys.js';
import '@polymer/iron-form/iron-form.js';
/**
 * @polymer
 * @extends HTMLElement
 */
class FluidFormElement extends PolymerElement
{
  static get template() {
    return html`
        <iron-a11y-keys target="[[target]]" keys="enter" on-keys-pressed="submitKey"></iron-a11y-keys>
        <iron-form id="ironForm" allow-redirect="[[allowRedirect]]">
            <slot></slot>
        </iron-form>
`;
  }

  static get is()
  {
      return 'fluid-form';
  }
  static get properties()
  {
      return {
          target: {
              type: Object,
              value: function () {
                  return document.body;
              }
          },
          submitWithEnter: {
              type: Boolean,
              value: false
          },
          allowRedirect: {
              type: Boolean,
              value: false
          },

      }
  }
  submit()
  {
      this.$.ironForm.submit();
  }
  submitKey()
  {
      if (this.submitWithEnter){
          this.$.ironForm.submit();
      }
  }
}
window.customElements.define(FluidFormElement.is, FluidFormElement);
