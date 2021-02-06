<template>
  <transition name="appear">
    <div class="task">
      <div class="content">
        <h2 class="task-title">{{ content.name }}</h2>
        <p>{{ content.description }}</p>
      </div>
      <div class="buttons">
        <TaskOptions v-bind:taskId="content._id" v-on:refresh-tasks="goUp" />
        <Button
          v-bind:type="content.key"
          v-bind:taskID="content._id"
          v-bind:action="content.action"
        />
      </div>
    </div>
  </transition>
</template>

<script>
import Button from "./Button";
import TaskOptions from "./TaskOptions";
export default {
  name: "Task",
  components: {
    Button,
    TaskOptions,
  },
  props: {
    content: Object,
  },
  methods: {
    goUp(id) {
      this.$emit("refresh-tasks", id);
    },
  },
};
</script>
<style scoped>
.task {
    background-color: white;
  height: 200px;
  padding: 0 2em;
  border-radius: 3px;
  box-shadow:3px 3px 12px rgba(0,0,0,.3), -3px -3px 14px rgba(0,0,0,.2);
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.task .content {
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.task .content h2 {
  font-family: "Inter", sans-serif;
  color: black;
  margin-bottom: 15px;
  font-weight: 500;
}
.task .content p {
  font-family: "Inter", sans-serif;
  font-size: 20px;
}
.buttons {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  margin-top: 90px;
}
.appear-enter-active,
.appear-leave-active {
  transition: all 0.5s;
}
.appear-enter,
.appear-leave-to {
  opacity: 0;
  transform: translateY(10px)
}
</style>