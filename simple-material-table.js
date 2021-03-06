import { html, PolymerElement } from '@polymer/polymer/polymer-element.js';
import '@polymer/paper-material/paper-material.js';
import '@polymer/paper-icon-button/paper-icon-button.js';
import '@polymer/paper-checkbox/paper-checkbox.js';
import '@polymer/paper-listbox/paper-listbox.js';
import '@polymer/paper-menu-button/paper-menu-button.js';
import '@polymer/paper-item/paper-item.js';
import '@polymer/paper-item/paper-item-body.js';
import '@polymer/iron-flex-layout/iron-flex-layout.js';
import '@polymer/iron-icon/iron-icon.js';
import '@polymer/paper-menu-button/paper-menu-button.js';
import './table-icons.js';

/**
 * `simple-material-table`
 * A Simple material styled table
 *
 * @customElement
 * @polymer
 * @demo demo/index.html
 */
class SimpleMaterialTable extends PolymerElement {
  static get template() {
    return html`
      <style>
        paper-material.simple-material-table {
          background-color: white;
        }

        .mdl-data-table {
          width: 100%;
          /*position: relative;*/
          /*border: 1px solid rgba(0, 0, 0, 0.12);*/
          border-collapse: collapse;
          white-space: nowrap;
          /*font-size: 13px;*/
          background-color: rgb(255, 255, 255);
        }

        .mdl-data-table thead {
          padding-bottom: 3px;
        }

        .mdl-data-table thead .mdl-data-table__select {
          margin-top: 0;
        }

        .mdl-data-table tbody tr {
          position: relative;
          height: 48px;
          -webkit-transition-duration: 0.28s;
          transition-duration: 0.28s;
          -webkit-transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
          transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
          -webkit-transition-property: background-color;
          transition-property: background-color;
        }

        .mdl-data-table tbody tr.is-selected {
          background-color: #e0e0e0;
        }

        .mdl-data-table tbody tr:hover {
          background-color: #eeeeee;
        }

        .mdl-data-table td,
        .mdl-data-table th {
          padding: 0 18px 0 18px;
          text-align: right;
        }

        .mdl-data-table td:first-of-type,
        .mdl-data-table th:first-of-type {
          padding-left: 24px;
        }

        .mdl-data-table td:last-of-type,
        .mdl-data-table th:last-of-type {
          padding-right: 24px;
        }

        .mdl-data-table td {
          border-top: 1px solid rgba(0, 0, 0, 0.12);
          border-bottom: 1px solid rgba(0, 0, 0, 0.12);
        }

        .mdl-data-table td .mdl-data-table__select {
          vertical-align: top;
          position: absolute;
          left: 24px;
        }

        .mdl-data-table th.mdl-data-table__sort {
          color: rgba(0, 0, 0, 0.87);
        }

        .mdl-data-table th {
          position: relative;
          vertical-align: bottom;
          text-overflow: ellipsis;
          font-size: 14px;
          font-weight: bold;
          line-height: 24px;
          letter-spacing: 0;
          color: rgba(0, 0, 0, 0.54);
          height: 48px;
          padding-bottom: 8px;
          box-sizing: border-box;
        }

        .mdl-data-table th .mdl-data-table__select {
          position: relative;
        }

        .mdl-data-table__select {
          width: 16px;
        }

        .mdl-data-table td.mdl-data-table__cell--non-numeric {
          text-align: left;
        }

        .mdl-data-table th.mdl-data-table__cell--non-numeric {
          text-align: left;
        }

        paper-card {
          /*padding: 16px;*/
          cursor: pointer;
          width: 100%;
          /*margin: 24px;*/
        }

        div.header {
          @apply (--layout-horizontal);
        }

        div.spacer {
          @apply (--layout-flex);
        }

        paper-menu-button.small,
        paper-icon-button.small {
          height: 24px;
          width: 24px;
          /*color: rgba(0, 0, 0, .87);*/
          padding: 0px;
        }

        div.button-bar {
          padding: 0px;
        }

        .paper-icon-button-0 {
          vertical-align: top;
        }

        .title {
          text-overflow: ellipsis;
          font-size: 20px;
          line-height: 24px;
          letter-spacing: 0;
          color: rgba(0, 0, 0, 0.87);
        }

        .header {
          height: 24px;
          padding-top: 16px;
          margin-bottom: 8px;
          margin-left: 16px;
          margin-right: 16px;
          margin-top: 16px;
        }

        [hidden] {
          display: none !important;
        }
      </style>
      <paper-material elevation="1">
        <div class="card-content">
          <div class="header">
            <div class="title">{{title}}</div>
            <div class="spacer"></div>
            <div class="button-bar">
              <paper-icon-button class="small" id="actionAdd" icon="table:add" on-tap="_tapActionAdd" hidden$="[[!showActionAdd]]"></paper-icon-button>
              <paper-icon-button class="small" id="actionEdit" icon="table:create" on-tap="_tapActionEdit" disabled="[[!lastSelectedElement]]" hidden$="[[!showActionEdit]]"></paper-icon-button>
              <paper-icon-button class="small" id="actionDelete" icon="table:remove" on-tap="_tapActionDelete" disabled="[[!lastSelectedElement]]" hidden$="[[!showActionDelete]]"></paper-icon-button>
              <paper-menu-button no-overlap="true" dynamic-align="true">
                <paper-icon-button slot="dropdown-trigger" class="dropdown-trigger small" id="columnSelectorButton" icon="table:filter"></paper-icon-button>
                <paper-listbox slot="dropdown-content" hidden$="[[!showColumnSelector]]" horizontal-align="right" vertical-align="top" class="small">
                  <template items="[[columns]]" is="dom-repeat" as="column" index-as="column_index">
                    <paper-item role="menuitemcheckbox" active="{{!column.hidden}}" toggles column="[[column]]" on-tap="_selectColumn" column-index="[[column_index]]">
                      <paper-item-body>[[column.title]]</paper-item-body>
                      <paper-checkbox checked="{{!column.hidden}}"></paper-checkbox>
                    </paper-item>
                  </template>
                </paper-listbox>
              </paper-menu-button>
            </div>
          </div>
          <table id="theTable" class="mdl-data-table mdl-js-data-table">
            <thead>
              <tr>
                <template id="headerTemplate" is="dom-repeat" items="[[columns]]" as="column" index-as="column_index" observe="hidden column.hidden">
                  <th index="[[column_index]]" class$="[[_columnHeaderClass(column_index)]]" on-tap="_onTapHeader" hidden$="[[column.hidden]]">
                    <iron-icon class="small" hidden icon="[[sortColumnIcon]]"></iron-icon>
                    <span>{{column.title}}</span>
                  </th>
                </template>
              </tr>
            </thead>

            <tbody id="tableBody">
              <template id="simpleDataTemplate" is="dom-repeat" items="[[tableData]]" as="itemrow" index-as="row_index" sort="_sortTable" observe="tableData.*">
                <tr on-tap="_rowTap" index="[[row_index]]" row="[[itemrow]]">
                  <template id="dataTemplateColumns" is="dom-repeat" items="[[columns]]" as="column" index-as="column_index" observe="hidden column.hidden itemrow columns.* tableData.*">
                    <td column-index="[[column_index]]" class$="[[_columnClass(column_index)]]" hidden$="[[column.hidden]]">
                      {{_cellData(itemrow, column)}}
                    </td>
                  </template>
                </tr>
              </template>
            </tbody>
          </table>
        </div>
      </paper-material>
    `;
  }

  static get is() {
    return 'simple-material-table';
  }

  /**
   * The `row-selected` event is fired when a row is selected
   *
   * @event row-selected
   * @detail {{row: Object}}
   */
  /**
   * The `row-unselected` event is fired when a row is unselected
   *
   * @event row-unselected
   * @detail {{row: Object}}
   */

  /**
   * The `action-delete` event is fired when the delete icon is clicked
   *
   * @event action-delete
   * @detail {{row: Object}}
   */

  /**
   * The `action-delete` event is fired when the delete icon is clicked
   *
   * @event action-delete
   * @detail {{row: Object}}
   */

  /**
   * The `action-edit` event is fired when the edit icon is clicked
   *
   * @event action-edit
   * @detail {{row: Object}}
   */

  /**
   * The `action-add` event is fired when the add icon is clicked
   *
   * @event action-add
   *
   */

  /**
   * The `action-delete` event is fired when the delete icon is clicked
   *
   * @event action-delete
   * @detail {{row: Object}}
   */

  static get properties() {
    return {
      /**
       * Title for display at the top of the card.
       */
      title: {
        type: String,
      },

      /**
       * Array of objects to display
       */
      tableData: {
        type: Array,
        // notify: true,
        value: [],
        // observe: '_tableDataChanged'
      },

      /**
       * Show add action
       */
      showActionAdd: {
        type: Boolean,
        value: false,
      },

      /**
       * Show` edit action
       */
      showActionEdit: {
        type: Boolean,
        value: false,
      },

      /**
       * Show delete action.
       */
      showActionDelete: {
        type: Boolean,
        value: false,
      },

      /**
       * Show the column selector menu
       **/
      showColumnSelector: {
        type: Boolean,
        value: false,
      },

      /**
       * Column definitions, array of objects
       * ### Each column is defined as
       *  Attribute | Type        | Description
       * -----------|-------------|------------------
       *    title| String| column title
       *   number| Boolean|  true of column is a number
       *   column| String| field name of column in data object
       *   hidden| Boolean| default to hidden (true) or not (false)
       *  formatter| function | if set, is a function taking value returning formatted value.
       *
       */
      columns: {
        type: Array,
        // notify: true,
        value: function() {
          return [];
        },
      },

      /**
       * Sort column index within `columns`.
       */
      sortColumnIndex: {
        type: Number,
        notify: true,
        value: 0,
      },

      /**
       * Sort is ascending (true) or descending (false).
       */
      sortColumnAsc: {
        type: Boolean,
        // notify: true,
        value: false,
      },
    };
  }

  static get observers() {
    return ['_sortColumnAscChanged(sortColumnAsc)', '_tableDataChanged(tableData.*)'];
  }

  constructor() {
    super();
    this.isReady = true;
    this.selectedTableRow = -1;
    this.lastSelectedElement = null;
    this.currentSortHeaderElement = null;
  }

  _tableDataChanged() {
    if (this.isReady && this.$.simpleDataTemplate && this.$.simpleDataTemplate.render) {
      if (this.lastSelectedElement) {
        this.lastSelectedElement.classList.remove('is-selected');
      }
      this.selectedTableRow = -1;
      this.lastSelectedElement = null;
      this.$.simpleDataTemplate.render();

      // var elements = Polymer.dom(this.$.tableBody).querySelectorAll('template');
      // for (var i = 0; i < elements.length; i++) {
      //   elements[i].render();
      // }
    }
  }

  _cellData(itemrow, column) {
    //console.log("celldata",itemrow,column);
    return column.formatter ? column.formatter(itemrow[column.column]) : itemrow[column.column];
  }

  _columnClass(index) {
    if (this.columns && index < this.columns.length) {
      return this.columns[index].number ? '' : 'mdl-data-table__cell--non-numeric';
    }
    return 'mdl-data-table__cell--non-numeric';
  }

  _columnHeaderClass(index) {
    if (this.columns && index < this.columns.length) {
      return this.columns[index].number ? '' : 'mdl-data-table__cell--non-numeric ';
    }
    return 'mdl-data-table__cell--non-numeric';
  }

  _rowTap(e) {
    //console.log('_rowTap', e);
    var element = null;
    for (var i = 0; i < e.path.length; i++) {
      if (e.path[i].tagName === 'TR') {
        element = e.path[i];
        break;
      }
    }
    this._selectRowIndex(e.model.row_index, element);
  }

  _selectRowIndex(toSelect, element) {
    var lastSelected = this.selectedTableRow;

    if (element) {
      if (lastSelected > -1) {
        if (this.lastSelectedElement) {
          this.lastSelectedElement.classList.remove('is-selected');
        }
        this.selectedTableRow = -1;
        this.lastSelectedElement = null;
      }

      if (toSelect !== lastSelected) {
        this.selectedTableRow = toSelect;
        element.classList.add('is-selected');

        if (lastSelected > -1) {
          this.fire('row-unselected', lastSelected);
        }

        this.fire('row-selected', element.row);
        this.lastSelectedElement = element;
      }
    }
  }

  _onTapHeader(e) {
    //console.log('_onTapHeader',e);

    var element = null;
    for (var i = 0; i < e.path.length; i++) {
      if (e.path[i].tagName === 'TH') {
        element = e.path[i];
        break;
      }
    }

    if (this.currentSortHeaderElement) {
      this.currentSortHeaderElement.classList.remove('mdl-data-table__sort');
      this.currentSortHeaderElement.children[0].hidden = true;
    }

    if (this.sortColumnIndex === e.model.column_index) {
      this.sortColumnAsc = !this.sortColumnAsc;
    }
    this.sortColumnIndex = e.model.column_index;

    this.currentSortHeaderElement = element;
    this.currentSortHeaderElement.classList.add('mdl-data-table__sort');
    var iconElement = element.children[0];
    iconElement.hidden = false;

    // this.$.headerTemplate.render();
    this.$.simpleDataTemplate.render();
  }

  _sortTable(a, b) {
    var r = 0;
    var column = this.columns[this.sortColumnIndex].column;

    var av = this.columns[this.sortColumnIndex].number ? parseFloat(a[column]) : a[column];
    var bv = this.columns[this.sortColumnIndex].number ? parseFloat(b[column]) : b[column];

    if (av < bv) {
      r = -1;
    }
    if (av > bv) {
      r = 1;
    }
    return this.sortColumnAsc ? -r : r;
  }

  _filterTable() {
    return true;
  }

  _sortIconHidden(column_index) {
    return column_index === this.sortColumnIndex;
  }

  _tapActionAdd() {
    this.fire('action-add');
  }

  _tapActionEdit() {
    this.fire('action-edit', this.tableData[this.selectedTableRow]);
  }

  _tapActionDelete() {
    this.fire('action-delete', this.tableData[this.selectedTableRow]);
  }

  // Element Lifecycle
  _sortColumnAscChanged(value) {
    this.sortColumnIcon = value ? 'table:arrow-up' : 'table:arrow-down';
  }

  _toggleColumnMenu() {
    this.$.columnSelectorMenu.toggle(this.$.columnSelectorButton);
  }

  _selectColumn(e) {
    // console.log('_selectColumn',e.model.column_index);
    this.set('columns.' + e.model.column_index + '.hidden', !this.columns[e.model.column_index].hidden);
  }

  selectRow(column, value) {
    var elements = Polymer.dom(this.$.tableBody).querySelectorAll('tr');
    for (var i = 0; i < elements.length; i++) {
      if (elements[i].row[column] === value) {
        //console.log('selectRow', i, elements[i]);
        this._selectRowIndex(i, elements[i]);
        return;
      }
    }
    this._selectRowIndex(this.selectedTableRow);
  }

  fire(ev, data) {
    this.dispatchEvent(
      new CustomEvent(ev, {
        detail: data,
      }),
      {
        bubbles: true,
      },
    );
  }
}

window.customElements.define(SimpleMaterialTable.is, SimpleMaterialTable);
