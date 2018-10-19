import './fluid-paper-chip.js';
import { PolymerElement, html } from '@polymer/polymer';
import '@polymer/paper-icon-button/paper-icon-button.js';
import '@polymer/paper-listbox/paper-listbox.js';
/**
 * @polymer
 * @extends HTMLElement
 */
class FluidPaperMultiSelectElement extends PolymerElement
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
                <fluid-paper-chip name="[[name]]" type="hidden" value\$="[[item.value]]">
                    [[item.text]]
                    <paper-icon-button icon="delete-forever" on-tap="removeElement"></paper-icon-button>
                </fluid-paper-chip>
            </template>
        </div>
        <paper-dropdown-menu error-message\$="[[errorMessage]]" required="[[required]]" invalid="{{invalid}}" horizontal-align="left" no-label-float="">
            <paper-listbox id="myMenu" class="dropdown-content" attr-for-selected="value" on-iron-deselect="" on-iron-select="select" slot="dropdown-content">
                <slot></slot>
            </paper-listbox>
        </paper-dropdown-menu>
`;
  }

  static get is()
  {
      return 'fluid-paper-multi-select';
  }
  static get properties()
  {
      return {
          name: {
              type: String
          },
          selected: {
              type: String
          },
          selectedValues: {
              type: Array,
              value: []
          },
          selectedItems: {
              type: Array,
              value: []
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
          }
      }
  }
  removeElement(e){
      var index = e.model.index;
      if(index > -1){
          this.$.myMenu.select(this.selectedItems[index].value);
      }
  }
  deselect(e, detail){
      var index;
      for (index = 0; index < this.selectedItems.length; ++index) {
          if(this.selectedItems[index].value == detail.item.getAttribute("value")){
              this.splice('selectedItems', index, 1);
          }
      }
  }
  select(e, detail){
      var newItem = {text:detail.item.textContent, value: detail.item.getAttribute("value")};
      this.push('selectedItems', newItem);
  }
}
window.customElements.define(FluidPaperMultiSelectElement.is, FluidPaperMultiSelectElement);
