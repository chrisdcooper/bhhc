<template>
  <div>
    <b-row id="footerrow">
      <b-col>&copy; {{copyrightdate}} Acme Inc.</b-col>
      <b-col class="iconcol">
        <div id="imgclear" title="Clear Filters" @click="showClearFilterModal()"></div>
      </b-col>
    </b-row>
    <b-modal id="bv-modal-clear" title="Clear Filters" size="sm" @ok="clearFilters">
      <img id="imginfo" src="../assets/info32.png" />
      <label>Clearing current filters</label>
    </b-modal>
  </div>
</template>
<script>
export default {
  name: "FooterRow",
  props: {
    gridApi: Object,
    makeToast: Function
  },
  data() {
    return {
      copyrightdate: ""
    };
  },
  mounted: function() {
    //Setting the copyright date to current
    this.copyrightdate = new Date().getFullYear();
  },
  methods: {
    showClearFilterModal: function() {
      //Modal Confirmation - Clear Filters
      this.$bvModal.show("bv-modal-clear");
    },
    clearFilters: function() {
      //Modal Confirmation - Clear Filters - Ok
      this.gridApi.setFilterModel(null);
      this.gridApi.onFilterChanged();
      this.makeToast(
        "Clearing Filters",
        "Your filters are clearing...",
        "info"
      );
    }
  }
};
</script>
<style scope>
.modal-content {
  min-height: 760px;
}
#bv-modal-refresh .modal-content,
#bv-modal-refresh-page .modal-content,
#bv-modal-clear .modal-content {
  min-height: 160px;
  font-weight: bold;
}
#footerrow {
  background-color: rgb(51, 51, 51);
  color: #fff;
  margin-left: 1px;
  margin-right: 1px;
  font-weight: bold;
  padding: 3px;
  opacity: 0.6;
  border-radius: 5px;
  font-size: 12px;
}
#imgrefresh,
#imginfo {
  margin-right: 10px;
  cursor: pointer;
}
#imgclear {
  height: 16px;
  width: 16px;
  background: url("../assets/cleariw.png") left top no-repeat;
  float: right;
  cursor: pointer;
  margin-right: 5px;
}
#imgclear:hover {
  height: 16px;
  width: 16px;
  background: url("../assets/cleariw_hov.png") left top no-repeat;
  float: right;
  cursor: pointer;
  margin-right: 5px;
}
</style>

