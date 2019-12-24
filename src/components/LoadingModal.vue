<template>
  <div id="loadingmodalsurround" :style="'display:' + showmodal + ';opacity:' + opacityval + ';'">
    <div
      id="loadingmodaliconsurround"
      :style="'display:' + showmodal + ';opacity:' + opacityval + ';'"
    ></div>
    <div
      id="loadingmodaltitlesurround"
      :style="'display:' + showmodal + ';opacity:' + opacityval + ';'"
    ></div>
  </div>
</template>

<script>
export default {
  name: "LoadingModal",
  props: { //Allowing to hide|show the loading modal
    showmodal: String,
    opacityval: String
  }
};
</script>
<style >
#loadingmodalsurround {
  position: absolute;
  z-index: 20000;
  min-width: 100%;
  min-height: 100%;
  top: 0px;
  left: 0px;
  background-image: url("../assets/clockloader.gif");
  background-color: #ffffff;
  background-position: center;
  background-repeat: no-repeat;
}
#loadingmodaltitlesurround {
  position: absolute;
  z-index: 20010;
  min-width: 100%;
  min-height: 200px;
  top: 100px;
  margin-left: auto;
  margin-right: auto;
  background-image: url("../assets/panda80.png");
  background-position: center;
  background-repeat: no-repeat;
}
#loadingmodaliconsurround {
  position: absolute;
  z-index: 20010;
  min-width: 100%;
  min-height: 200px;
  top: 50px;
  margin-left: auto;
  margin-right: auto;
  background-image: url("../assets/bhhc-proj.png");
  background-position: center;
  background-repeat: no-repeat;
}
</style>