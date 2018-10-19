import { PolymerElement, html } from '@polymer/polymer';
import '@polymer/paper-dropdown-menu/paper-dropdown-menu.js';
import '@polymer/paper-listbox/paper-listbox.js';
/**
 * @polymer
 * @extends HTMLElement
 */
class FluidPaperDropdownMenuElement extends PolymerElement
{
  static get template() {
    return html`
        <paper-dropdown-menu id="dropdown" label="[[label]]" error-message\$="[[errorMessage]]" required="[[required]]" invalid="{{invalid}}" horizontal-align="left" style="width:100%;">
            <paper-listbox id="listbox" slot="dropdown-content" class="dropdown-content" attr-for-selected="value" selected="{{value}}">
                <slot></slot>
            </paper-listbox>
        </paper-dropdown-menu>
`;
  }

  static get is()
  {
      return 'fluid-paper-dropdown-menu';
  }
  static get properties()
  {
      return {
          name: {
              type: String
          },
          label: {
              type: String
          },
          errorMessage: {
              type: String
          },
          required: {
              type: Boolean
          },
          invalid: {
              type: String
          },
          /**
           * The value for this element.
           */
          value: {
              notify: true,
              type: String
          },
          preselect: {
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
  ready(){
      super.ready();
      this.$.listbox.select(this.preselect);
  }

  _itemSelected(e) {
      const value = e.target.selectedItem;
  }
  connectedCallback() {
      super.connectedCallback();
      this.dispatchEvent(new CustomEvent('iron-form-element-register'), {bubbles: true});
  }

  disconnectedCallback() {
      super.disconnectedCallback();
      if (this._parentForm) {
          var ev = new CustomEvent('iron-form-element-unregister');
          ev.detail = {target: this};
          this.dispatchEvent(ev, {bubbles: true});
      }
  }
}
window.customElements.define(FluidPaperDropdownMenuElement.is, FluidPaperDropdownMenuElement);
