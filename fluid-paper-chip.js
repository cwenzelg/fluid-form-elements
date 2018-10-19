import { PolymerElement, html } from '@polymer/polymer';
/**
 * @polymer
 * @extends HTMLElement
 */
class FluidPaperChipElement extends PolymerElement
{
  static get template() {
    return html`
        <style>
            .container {
                border-radius: 16px;
                @apply --layout-horizontal;
                @apply --layout-center;
                height: 32px;
                margin: 4px;
                background-color: var(--vowo-chip-background, #cccbcb);
            }
            .label{
                padding: 0 12px;
                @apply --layout-flex-auto;
                @apply --layout-self-center;
            }
        </style>
        <div class\$="container [[css]]">
            <div class="label">
                <slot id="myContent"></slot>
            </div>
            <!--input type="hidden" name="[[name]]" value\$="[[value]]"-->
        </div>
`;
  }

  static get is()
  {
      return 'fluid-paper-chip';
  }
  static get properties()
  {
      return {
          css: {
              type: String,
              value: ''
          },
          name: {
              type: String
          },
          value: {
              type: Array,
              notify: true,
          },
          required: {
              type: Boolean,
              value: false
          },
          index:{
              type: Number,
              value: 0
          },
          /**
           * The form that the element is registered to.
           */
          _parentForm: {
              type: Object
          }
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
  validate() {
      return true;
  }
}
window.customElements.define(FluidPaperChipElement.is, FluidPaperChipElement);
