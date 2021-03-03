<template>
  <div>
    <div v-if="type == 'slider'">
      <label class="switch">
        <input
          type="checkbox"
          :id="`check${taskID}`"
          @click="runToogleAction(taskID, action)"
          checked
        />
        <span :class="type ? type : 'default'"></span>
      </label>
    </div>

    <div v-else-if="type == 'click'">
      <button @click="runClickAction(action)" class="actionBtn">Run</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "Button",
  props: {
    type: String,
    taskID: String,
    action: String,
  },
  methods: {
    runToogleAction(taskID, action) {
      var checkbox = document.getElementById(`check${taskID}`)
      console.log(checkbox)
      var run = eval(action)
      run(checkbox.checked)
    },
    runClickAction(action){
        var run = eval(action)
        run(true)
    }
  },
};
</script>

<style scoped>
.switch {
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;
}

.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  -webkit-transition: 0.4s;
  transition: 0.4s;
  border-radius: 34px;
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

input:checked + .slider {
  background-color: #4460f1;
}

input:focus + .slider {
  box-shadow: 0 0 1px #4460f1;
}

input:checked + .slider:before {
  -webkit-transform: translateX(26px);
  -ms-transform: translateX(26px);
  transform: translateX(26px);
}
.slider:before {
  border-radius: 50%;
}
.actionBtn {
  font-family: "Inter", sans-serif;
  font-weight: bold;
  color: white;
  cursor: pointer;
  border: none;
  width: 60px;
  height: 40px;
  border-bottom: 4px solid #3d50ab;
  background-color: #4460f1;
}
</style>