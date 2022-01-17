<template>
  <div>
    <div :key="todo.id" v-for="todo in todos">
      <Todo :todo="todo" :color="todo.done ? 'red' : 'green'" />
    </div>
  </div>
</template>

<script>
import Todo from "./Todo";

export default {
  name: "Todos",
  props: {
    todos: Array
  },
  components: {
    Todo
  }
};
</script>

<style></style>
