import { PolymerElement, html } from '@polymer/polymer';
import '@vaadin/vaadin-combo-box/vaadin-combo-box.js';
/**
 * @polymer
 * @extends HTMLElement
 */
class FluidVaadinComboBoxElement extends PolymerElement
{
  static get template() {
    return html`
        <vaadin-combo-box label="[[label]]" name="[[name]]" error-message\$="[[errorMessage]]" required\$="[[required]]" invalid="[[invalid]]" style="width:100%;" itemlabelpath="[[itemLabelPath]]" items="[[options]]" value\$="{{value}}">
        </vaadin-combo-box>
`;
  }

  static get is()
  {
      return 'fluid-vaadin-combo-box';
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
              type: Boolean,
              boolean: false
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
          /**
           * The form that the element is registered to.
           */
          _parentForm: {
              type: Object
          },
          itemLabelPath: {
              type: String
          },
          options:{
              type: Object
          }
      }
  }
  _itemSelected(e) {
      const value = e.target.selectedItem;
  }
}
window.customElements.define(FluidVaadinComboBoxElement.is, FluidVaadinComboBoxElement);
