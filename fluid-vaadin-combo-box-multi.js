import './fluid-paper-chip.js';
import { PolymerElement, html } from '@polymer/polymer';
import '@vaadin/vaadin-combo-box/vaadin-combo-box.js';
import '@polymer/paper-icon-button/paper-icon-button.js';
/**
 * @polymer
 * @extends HTMLElement
 */
class FluidVaadinComboBoxMultiElement extends PolymerElement
{
  static get template() {
    return html`
        <style>
            paper-dropdown-menu{
                width:100%;
            }
            .full-width{
                width:100%;
            }
            #chip-container{
                @apply --layout-horizontal;
                @apply --layout-center;
                @apply --layout-wrap;
            }
            #label{
                padding-top:8px;
                font-family: 'Roboto','Noto',sans-serif;
                -webkit-font-smoothing: antialiased;
                color: #737373;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
                font-size: 12px;
                font-weight: 400;
                letter-spacing: 0.011em;
                line-height: 20px;
            }
        </style>
        <div id="label">[[label]]</div>
        <div id="chip-container" class="full-width">
            <template is="dom-repeat" items="{{selectedItems}}">
                <fluid-paper-chip name="[[elementNames]]" value="[[item.value]]" index="[[index]]">
                    [[item.label]]
                    <paper-icon-button icon="delete-forever" on-tap="removeElement"></paper-icon-button>
                </fluid-paper-chip>
            </template>
        </div>
        <vaadin-combo-box id="comboBox" error-message\$="[[errorMessage]]" invalid="[[invalid]]" style="width:100%;" itemlabelpath="[[itemLabelPath]]" items="[[options]]" on-value-changed="_valueChanged">
        </vaadin-combo-box>
`;
  }

  static get is()
  {
      return 'fluid-vaadin-combo-box-multi';
  }
  static get properties()
  {
      return {
          elementNames: {
              type: String
          },
          selectedItems: {
              type: Array,
              value: []
          },
          selectedValues:{
              type: Array,
              value: []
          },
          label: {
              type: String
          },
          itemLabelPath: {
              type: String
          },
          options:{
              type: Object
          },
          errorMessage: {
              type: String
          },
          invalid: {
              type: String
          }
      }
  }
  ready(){
      super.ready();
      var index;
      for (index = 0; index < this.selectedValues.length; ++index) {
          var index2;
          for (index2 = 0; index2 < this.options.length; ++index2) {
              if(this.options[index2].value == this.selectedValues[index]){
                  this.push('selectedItems', this.options[index2]);
              }
          }
      }
  }
  removeElement(e){
      var index = e.model.index;
      if(index > -1){
          this.splice('selectedItems', index, 1);
          //this.$.myMenu.select(this.selectedItems[index].value);
      }
  }
  _valueChanged(){
      var comboBox = this.$.comboBox;
      var newItem = comboBox.selectedItem;
      if(newItem){
          var itemExisted = false;
          var index;
          for (index = 0; index < this.selectedItems.length; ++index) {
              if(this.selectedItems[index].value == newItem.value){
                  this.splice('selectedItems', index, 1);
                  itemExisted = true;
              }
          }
          if(!itemExisted){
              this.push('selectedItems', newItem);
          }
      }
  }
}
window.customElements.define(FluidVaadinComboBoxMultiElement.is, FluidVaadinComboBoxMultiElement);
