<template>    
    <div :style="cssProps">
        <div class="positionicon" @click="showRefreshPageModal()"> 
        </div>
        <div class="positionicontext"> 
        </div>
        <b-row class="logorow">
            <b-col></b-col>
            <b-col class="welcome-msg" @click="showRefreshPageModal">Welcome {{username}}!</b-col>
        </b-row>        
        <b-modal id="bv-modal-refresh-page" title="Page Refresh" size="sm" @ok="refreshPage">
             <img id="imginfo" src="../assets/alert20.png">
            <label>Refreshing the webpage to current</label>
        </b-modal>
    </div>
</template>

<script>
export default {
    name:"HeaderRow",
    props:{
        username:String,
        horizontalheadericonurl:String,
        horizontalheadericonhovurl:String,
        horizontalheadericontop:String,
        horizontalheadericonleft:String,
        horizontalheadericonwidth:String,
        horizontalheadericonheight:String,
        horizontalheaderverbiageurl:String,
        horizontalheaderverbiagetop:String,
        horizontalheaderverbiageleft:String,
        horizontalheaderverbiagewidth:String,
        horizontalheaderverbiageheight:String
    },
    computed: {
        cssProps() { return {
            '--horizontal-icon': this.horizontalheadericonurl,
            '--horizontal-hov-icon': this.horizontalheadericonhovurl,
            '--horizontal-icon-top': this.horizontalheadericontop,
            '--horizontal-icon-left': this.horizontalheadericonleft,
            '--horizontal-icon-width': this.horizontalheadericonwidth,
            '--horizontal-icon-height': this.horizontalheadericonheight,
            '--horizontal-verbiage': this.horizontalheaderverbiageurl,
            '--horizontal-verbiage-top': this.horizontalheaderverbiagetop,
            '--horizontal-verbiage-left': this.horizontalheaderverbiageleft,
            '--horizontal-verbiage-height': this.horizontalheaderverbiageheight,
            '--horizontal-verbiage-width': this.horizontalheaderverbiagewidth
        }
        }
	},
    methods: {
        showRefreshPageModal: function() { //Refresh Page - Modal Confirmation
            this.$bvModal.show("bv-modal-refresh-page");
        },
        refreshPage: function() {   //Refresh Page - Modal Confirmation - Ok
            var currentpage = window.location;
            window.location = currentpage;
        }
    }
}
</script>

<style scope>
@media only screen 
and (min-width : 1050px) {
.positionicon{position: absolute;
top:var(--horizontal-icon-top);
left:var(--horizontal-icon-left);
z-index: 2001;
height:var(--horizontal-icon-height);
width:var(--horizontal-icon-width);
background: url('../assets/panda80.png');
background-position: left top;
background-repeat: no-repeat;
cursor:pointer; }
.positionicontext{position: absolute;
top:var(--horizontal-verbiage-top);
left:var(--horizontal-verbiage-left);
z-index: 2000;
height: var(--horizontal-verbiage-height);
width: var(--horizontal-verbiage-width);
background: var(--horizontal-verbiage);
background-position:left top;
background-repeat:  no-repeat;}
}
@media only screen 
and (max-width : 1050px) {    
    .positionicon{display:none;}
    .positionicontext{display:none;}
}
</style>

