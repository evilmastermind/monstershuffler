<template>
  <PageBackgroundDice />
  <div class="lg-max">
    <h1 class="sm-only">NPC Generator</h1>
    <div class="box">
      <!-- <label class="switch">
          <input
            class="slider-checkbox"
            type="checkbox"
          >
          <span class="slider round" />
        </label> -->
      <Card>
        <form>
          <fieldset>
            <!-- PRIMARY AND SECONDARY RACES -->
            <span class="form-line">
              <label class="ms-label" for="gen-prace">Primary Race: </label>
              <div class="flex-row justify-space-between">
                <select
                  id="gen-prace"
                  v-model="form.primaryRace"
                  class="ms-select ms-select-75"
                >
                  <option selected>An option.</option>
                </select>
                <select
                  id="gen-prace-perc"
                  v-model="form.primaryRacePercentage"
                  class="ms-select ms-select-20"
                >
                  <option value="0">0%</option>
                  <option value="5">5%</option>
                  <option value="10">10%</option>
                  <option value="15">15%</option>
                  <option value="20">20%</option>
                  <option value="25">25%</option>
                  <option value="30">30%</option>
                  <option value="35">35%</option>
                  <option value="40">40%</option>
                  <option value="45">45%</option>
                  <option value="50" selected>50%</option>
                  <option value="55">55%</option>
                  <option value="60">60%</option>
                  <option value="65">65%</option>
                  <option value="70">70%</option>
                  <option value="75">75%</option>
                  <option value="80">80%</option>
                  <option value="85">85%</option>
                  <option value="90">90%</option>
                  <option value="95">95%</option>
                  <option value="100">100%</option>
                </select>
              </div>
            </span>
            <span class="form-line">
              <label class="ms-label" for="gen-srace">Secondary Race: </label>
              <div class="flex-row justify-space-between">
                <select
                  id="gen-srace"
                  v-model="form.secondaryRace"
                  class="ms-select ms-select-75"
                >
                  <option selected>An option.</option>
                </select>
                <select
                  id="gen-srace-perc"
                  v-model="form.secondaryRacePercentage"
                  class="ms-select ms-select-20"
                >
                  <option value="0">0%</option>
                  <option value="5">5%</option>
                  <option value="10">10%</option>
                  <option value="15">15%</option>
                  <option value="20">20%</option>
                  <option value="25">25%</option>
                  <option value="30">30%</option>
                  <option value="35">35%</option>
                  <option value="40">40%</option>
                  <option value="45" selected>45%</option>
                  <option value="50">50%</option>
                  <option value="55">55%</option>
                  <option value="60">60%</option>
                  <option value="65">65%</option>
                  <option value="70">70%</option>
                  <option value="75">75%</option>
                  <option value="80">80%</option>
                  <option value="85">85%</option>
                  <option value="90">90%</option>
                  <option value="95">95%</option>
                  <option value="100">100%</option>
                </select>
              </div>
            </span>
            <!-- CLASS -->
            <span class="form-line">
              <label class="ms-label" for="gen-class">Class: </label>
              <select
                id="gen-class"
                v-model="form.classType"
                class="ms-select ms-select-100"
              >
                <option value="Specific Class">Specific Class</option>
                <option value="Class only" selected>Random Class</option>
                <option value="Class and Profession">Random Class and Profession</option>
                <option value="Profession mostly">Random Profession 95%, Class 5%</option>
                <option value="Profession only">Random Profession</option>
              </select>
            </span>
            <span class="form-line">
              <select
                id="gen-classes"
                v-model="form.class"
                class="ms-select ms-select-100 mt-1"
              />
            </span>
            <!-- LEVEL -->
            <span class="form-line">
              <label class="ms-label" for="gen-level">Level: </label>
              <select
                id="gen-level"
                class="ms-select ms-select-100"
                onchange="saveSettings()"
              >
                <option value="random (1-20)">random (1-20)</option>
                <option value="random (mostly low-level)" selected>
                  random (mostly low-level)
                </option>
              </select>
            </span>
          </fieldset>
          <!-- GENERATE button -->
          <div class="center pt-4">
            <Button color="primary" text="Generate NPC" @click="generateNPCs()" />
          </div>
        </form>
      </Card>
    </div>
  </div>
</template>

<script setup>
// import { $ref } from "vue/macros";
import Button from "@/components/global/MSButton.vue";
import PageBackgroundDice from "@/components/global/pages/PageBackgroundDice.vue";
import Card from "@/components/global/Card.vue";

let form = $ref({
  primaryRace: "",
  primaryRacePercentage: 100,
  secondaryRace: "",
  secondaryRacePercentage: 0,
});
</script>

<style lang="scss" scoped>
.box {
  max-width: 400px;
  // background-color: rgb(red, 0.2);
}

.form-line {
  display: block;
  margin: $s-2 0;
}
.ms-label {
  font-weight: bold;
  display: block;
  width: 100%;
}
.ms-select {
  padding-left: 5px;
  box-sizing: border-box;
  border-radius: 5px;
  height: $s-8;
  @include themed() {
    background-color: rgb(t($background), 0.3);
    border: 1px solid rgb(t($background), 0.1);
    color: t($text);
  }
}
.ms-select-75 {
  width: 74%;
}
.ms-select-20 {
  width: 25%;
}
.ms-select-100 {
  display: block;
  width: 100%;
}

//----------------------------------
/* The switch - the box around the slider */
.switch {
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;
}

/* Hide default HTML checkbox */
.switch .slider-checkbox {
  opacity: 0;
  width: 0;
  height: 0;
}

/* The3slider */
.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  -webkit-transition: 0.4s;
  transition: 0.4s;
  @include themed() {
    background-color: t($background-light);
  }
}

.slider:before {
  position: absolute;
  content: "";
  height: 26px;
  width: 26px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  -webkit-transition: 0.4s;
  transition: 0.4s;
}

.slider-checkbox:checked + .slider {
  background-color: #2196f3;
}

.slider-checkbox:focus + .slider {
  box-shadow: 0 0 1px #2196f3;
}

.slider-checkbox:checked + .slider:before {
  -webkit-transform: translateX(26px);
  -ms-transform: translateX(26px);
  transform: translateX(26px);
}

/* Rounded sliders */
.slider.round {
  border-radius: 34px;
}

.slider.round:before {
  border-radius: 50%;
}
.section-text {
  max-width: 800px;
  margin: $s-8 auto;
}
</style>
