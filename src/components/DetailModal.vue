<template>
  <div>
    <b-modal id="bv-modal-detail" :title="modaltitle" size="lg" ref="detailModal">
      <b-row ref="detailModalRow">
        <b-col style="border:0px solid green" ref="detailModalCol">
          <b-row class="topdetail">
            <b-col>
              <label class="lbldetail">Id:</label>
              {{idval}}
            </b-col>
            <b-col>
              <label class="lbldetail">Category:</label>
              {{category}}
            </b-col>
            <b-col>
              <label class="lbldetail">Keyword:</label>
              {{keyword}}
            </b-col>
          </b-row>
          <b-row class="detailrow">
            <b-col>
              <label class="lbldetail">Reason:</label>
              {{description}}
            </b-col>
          </b-row>
        </b-col>
      </b-row>
    </b-modal>
  </div>
</template>

<script>
//import {bus} from '../main'; //Uncomment to allow for global event bus

export default {
  name: "DetailModal",
  components: {},
  props: { //DataGrid Row Detail properties
    modaltitle: String,
    idval: String,
    category: String,
    keyword: String,
    description: String
  }
};
</script>

<style>
div .modal-content {
  min-height: 160px;
}
.lbldetail {
  font-weight: bold;
  margin-right: 3px;
  color: teal;
}
.detailrow {
  margin-bottom: 5px;
}

.topdetail {
  padding-bottom: 5px;
  margin-bottom: 3px;
  border-bottom: 2px solid lightblue;
}
</style>