<style lang="scss">
$ag-icons-path: "../node_modules/ag-grid-community/src/styles/ag-theme-balham/icons/";
$odd-row-background-color: #94c7ff;
$selected-color: #02aed0;
$header-background-color: #007289;
$header-foreground-color: #ffffff;
$ag-row-hover: #e9f6ff;
@import "../node_modules/ag-grid-community/src/styles/ag-grid.scss";
@import "../node_modules/ag-grid-community/src/styles/ag-theme-balham/sass/ag-theme-balham.scss";
</style>

<template>
  <div id="appinner" class="container" style="min-width:90%;">
    <headerrow
      :username="username"
      :horizontalheaderverbiagetop="horizontalheaderverbiagetop"
      :horizontalheaderverbiageleft="horizontalheaderverbiageleft"
      :horizontalheaderverbiageheight="horizontalheaderverbiageheight"
      :horizontalheaderverbiagewidth="horizontalheaderverbiagewidth"
      :horizontalheadericontop="horizontalheadericontop"
      :horizontalheadericonleft="horizontalheadericonleft"
      :horizontalheadericonheight="horizontalheadericonheight"
      :horizontalheadericonwidth="horizontalheadericonwidth"
    ></headerrow>

    <b-row>
      <b-col class="apps">
        <b-row>>
          <b-form-input
            id="inpsearch"
            v-model="searchinputmodel"
            :state="entryState"
            :disabled="inputdisabled"
            aria-describedby="input-live-feedback"
            v-on:input="externalFilterChanged"
            ref="inpsearch"
            placeholder="Search by: Id | Category | Keyword | Reason"
            trim
          ></b-form-input>
          <b-form-invalid-feedback id="input-live-feedback">Enter at least 2 letters</b-form-invalid-feedback>
        </b-row>>
      </b-col>
    </b-row>

    <b-row>
      <b-col>
        <ag-grid-vue
          style="height: 700px;"
          class="ag-theme-balham"
          :columnDefs="columnDefs"
          :rowData="coredata"
          rowSelection="single"
          :overlayNoRowsTemplate="overlayNoRowsTemplate"
          :overlayLoadingTemplate="overlayLoadingTemplate"
          :gridOptions="gridOptions"
        ></ag-grid-vue>
      </b-col>
    </b-row>>

    <footerrow :gridApi="gridApi" :makeToast="makeToast"></footerrow>

    <detailmodal
      modaltitle="Selected Row Detail"
      :idval="selectedid"
      :category="selectedcat"
      :keyword="selectedkeyword"
      :description="selecteddescription"
    ></detailmodal>
    <loadingmodal :showmodal="showmodal" opacityval="opacityval"></loadingmodal>
  </div>
</template>

<script>
import loadingmodal from "./components/LoadingModal.vue";
import footerrow from "./components/FooterRow.vue";
import headerrow from "./components/HeaderRow.vue";
import detailmodal from "./components/DetailModal.vue";

import { AgGridVue } from "ag-grid-vue";
const bunyan = require("bunyan"); 
const log = bunyan.createLogger({ name: "BHHC_App" });
//import { bus } from "./main";  //Uncomment to add global event bus

export default {
  name: "app",
  components: {
    AgGridVue,
    footerrow,
    headerrow,
    loadingmodal,
    detailmodal
  },
  data() {
    return {
      username: "Christopher Cooper",
      searchinputmodel: "",
      coredata: [
        { ID: "1", CAT: "Personal", KEYW: "Buffet", 
          REASON: "Under the leadership of Mr. Warren Buffet, a man I have always respected." },
        { ID: "2", CAT: "Personal", KEYW: "Originated", 
          REASON: "It was originally incorporated as Cornhusker Casualty Company in 1970 writing business in the state of Nebraska." },
        { ID: "3", CAT: "Personal", KEYW: "Thoroughness", 
          REASON: "One of the more thorough interview processes I have been though, in turn reflecting acquirment of adequate resources." },
        { ID: "4", CAT: "Personal", KEYW: "Opportunity", 
          REASON: "I am looking for a solid opportunity with a viable and growing organization like BHHC." },
        { ID: "5", CAT: "Environment", KEYW: "Industry", 
          REASON: "I appreciate the variance of industry that BHHC can provide." },
        { ID: "6", CAT: "Environment", KEYW: "Omaha", 
          REASON: "I enjoy working in the environment that Omaha can provide." },
        { ID: "7", CAT: "Environment", KEYW: "Tech Stack", 
          REASON: "The tech stack utilized at BHHC is something I am familiar with." },
        { ID: "8", CAT: "Environment", KEYW: "National", 
          REASON: "BHHC has expanded its footprint nationally with offices in San Francisco, Denver, and Omaha." },
        { ID: "9", CAT: "Environment", KEYW: "Staying Power", 
          REASON: "Local presence, combined with unparalleled financial strength, has resulted in knowledge, experience and staying power." },
        { ID: "10", CAT: "Metric", KEYW: "Group", 
          REASON: "BHHC is a group of six insurance carriers that are part of the Berkshire Hathaway group of insurance companies." },
        { ID: "11", CAT: "Metric", KEYW: "Financial Strength", 
          REASON: "Supported by A.M. Best's highest financial strength rating of A++ (Superior) (as of December 11, 2019)" },
        { ID: "12", CAT: "Metric", KEYW: "Ownership", 
          REASON: "Is part of the Berkshire Hathaway Inc umbrella that wholly owns GEICO, Duracell, Dairy Queen, BNSF, Lubrizol, Fruit of the Loom, Helzberg Diamonds, Long & Foster, FlightSafety International, Pampered Chef, and NetJets." }
        ],
      overlayNoRowsTemplate: null,
      overlayLoadingTemplate: null,
      inputdisabled: false,
      showmodal: "none",
      gridApi: null,
      horizontalheadericonheight: "80px",
      horizontalheadericonwidth: "80px",
      horizontalheadericontop: "2px",
      horizontalheadericonleft: "5px",
      horizontalheaderverbiagetop: "80px",
      horizontalheaderverbiageleft: "5px",
      horizontalheaderverbiageheight: "400px",
      horizontalheaderverbiagewidth: "80px",
      modal_id: "",
      modal_category: "",
      modal_keyword: "",
      modal_description: "",
      selectedid: "",
      selectedcat: "",
      selectedkeyword: "",
      selecteddescription: ""
    };
  },
  created() {},
  beforeMount() {
    var self = this;
    this.gridOptions = {
      animateRows: true,
      isExternalFilterPresent: this.isExternalFilterPresent,
      doesExternalFilterPass: this.doesExternalFilterPass
    };
    //Core Data Model Column Definitons
    this.columnDefs = [ 
      { field: "Id", hide: true },
      {
        headerName: "Id",
        field: "ID",
        pinned: true,
        sortable: true,
        filter: true,
        filterParams: { clearButton: true }
      },
      {
        headerName: "Category",
        field: "CAT",
        sortable: true,
        filter: true,
        filterParams: { clearButton: true }
      },
      {
        headerName: "Keyword",
        field: "KEYW",
        sortable: true,
        filter: true,
        filterParams: { clearButton: true }
      },
      {
        headerName: "Reason",
        field: "REASON",
        sortable: true,
        filter: true,
        filterParams: { clearButton: true },
        width:1000
      }
    ];
    this.gridOptions.onRowClicked = function(row) {
      self.showLoadingModal();
      self.clearDetails(); //Clear Modal Fields
      self.selectedid = row.data.ID; //Assign Modal Fields
      self.selectedcat = row.data.CAT;
      self.selectedkeyword = row.data.KEYW;
      self.selecteddescription = row.data.REASON;
      setTimeout(function() {
        self.hideLoadingModal();
        //Detail Loaded - Display Detail Modal
        self.$bvModal.show("bv-modal-detail");
      }, 1000);
    };

    //Set transfer of row key
    this.gridOptions.getRowNodeId = item => {
      return item.ID;
    };

    //Set Custom Grid Overlays
    this.overlayLoadingTemplate =
      '<span style="padding: 10px; border: 0px solid #444;"><img src="./assets/clockloader.gif" /></span>';
    this.overlayNoRowsTemplate =
      '<span style="padding: 10px; border: 0px solid #444;"><img src="./assets/noresults.gif" /></span>';

    log.info('Configurations completed load');
  },
  mounted() {
    //Check for coredata in localStorage
    if (localStorage.coredata) {
      this.coredata = localStorage.coredata;
    }
    //Launch Loading Modal
    this.showLoadingModal();
    //Set Grid API to locals
    this.gridApi = this.gridOptions.api;
    this.gridColumnApi = this.gridOptions.columnApi;
    //Obtain app reference
    const self = this;
    setTimeout(function() {
      //Hide Loading Modal
      self.hideLoadingModal();
      //Set Focus to the Filter Input
      self.$refs.inpsearch.focus();
      log.info('Application successfully mounted');
    }, 2000);
    //Persist coredata into localStorage
    //Persistance setup to replace local data array with JSON if needed
    localStorage.name = this.name;
  },
  computed: {
    entryState: function() {
      //Make sure the user has typed 2 or more characters to filter the grid data
      return this.searchinputmodel.length > 1 ||
        this.searchinputmodel.length == 0
        ? true
        : false;
    }
  },
  methods: {
    clearDetails: function() { 
      //Clear all modal data in case of discrepancy or nulls
      self.selectedid = "";
      self.selectedcat = "";
      self.selectedkeyword = "";
      self.selecteddescription = "";
    },
    makeToast: function(titlevariant, content, variant = null) {
      //variant: primary, secondary, danger, warning, success, info
      this.$bvToast.toast(content, {
        title: titlevariant,
        variant: variant,
        solid: true
      });
    },
    externalFilterChanged: function() { 
      //Setting up filering event
      this.gridOptions.api.onFilterChanged();
    },
    isExternalFilterPresent: function() { 
      //Configuration check for filtering content
      return this.searchinputmodel !== "";
    },
    doesExternalFilterPass: function(node) { 
      //Filtering functionality
      if (this.searchinputmodel.length > 2) {
        var searchinput = this.searchinputmodel.toLowerCase();
        return (
          node.data.ID.toLowerCase().includes(searchinput) ||
          node.data.KEYW.toLowerCase().includes(searchinput) ||
          node.data.CAT.toLowerCase().includes(searchinput) ||
          node.data.REASON.toLowerCase().includes(searchinput)
        );
      } else {
        return true;
      }
    },
    showLoadingModal: function() {
      this.showmodal = "block";
    },
    hideLoadingModal: function() {
      this.showmodal = "none";
    }
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: left;
  color: #2c3e50;
  padding: 10px;
  font-size: 12px;
}
html {
  height: 100%;
  background-color: #2a2a2a;
}
body {
  height: 100%;
  margin: 0;
  padding: 0;
  width: 100%;
  background-color: #2a2a2a !important;
  background-image: url("assets/grayb.jpeg");
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
}
.logorow {
  text-align: center;
}
#ccclogo {
  margin: 0px auto 0px auto;
}
.welcome-msg {
  color: #ffffff;
  font-weight: bold;
  text-align: right;
  background-color: #007289;
  border-radius: 5px;
  background: url("assets/bgpurp740.jpg") left top no-repeat;
  cursor: pointer;
}
.modal-content {
  min-height: 760px;
}
#footerrow {
  background-color: rgb(51, 51, 51);
  color: #fff;
  margin-left: 20px;
  margin-right: 20px;
  opacity: 0.6;
  border-radius: 5px;
}
.lbldetail {
  font-weight: bold;
  margin-right: 3px;
}
.modal-content {
  min-height: 500px;
}
.error-message {
  width: 100%;
  margin-top: 0.25rem;
  font-size: 80%;
  color: #dc3545;
}
.modal-alert-img {
  margin-bottom: 5px;
  margin-right: 5px;
}
.lblTitleRow {
  height: 15px;
  background-color: lightgrey;
  color: #fff;
  font-size: 8pt;
  font-weight: bold;
  width: 50%;
  border-radius: 1px;
  padding-left: 3px;
}
</style>
