<template>
  <div>
    <header>
      <h1>ToDO List</h1>
    </header>
    <div class="search_bar">
      <input type="text" v-model="search" placeholder="Search title.." />
      <select name="STATUSE" v-model="filterVal" @change="filter($event)">
        <option value="All">All</option>
        <option value="Ready">Ready</option>
        <option value="Not Ready">Not Ready</option>
      </select>
      <button @click="p">Add New ToDo</button>
    </div>

    <Todos :todos="filterdTodos2" />
  </div>
</template>

<script>
/* eslint-disable */

import Todos from "../components/Todos";

import { mapGetters } from "vuex";
export default {
  name: "Home",

  components: {
    Todos
  },
  data() {
    return {
      search: "",
      filterVal: "All",
      todos: [],
      filterdTodos: [],
      filterdTodos2: [],
      showAddtodo: false
    };
  },

  methods: {
    p() {
      this.$router.push("/add/0");
    },
    filter(e) {
      this.filterVal = e.target.value;
      switch (e.target.value) {
        case "All":
          this.filterdTodos2 = [...this.filterdTodos];
          break;
        case "Ready":
          this.filterdTodos2 = this.filterdTodos.filter((todo) => todo.done);
          break;
        case "Not Ready":
          this.filterdTodos2 = this.filterdTodos.filter((todo) => !todo.done);
          break;
      }
    }
  },
  computed: {
    ...mapGetters(["allTodos", "currentUser"])
  },
  watch: {
    allTodos(newValue, oldValue) {
      this.todos = this.allTodos.filter(
        (todo) => todo.userID === this.currentUser.id
      );
      this.filterdTodos = [...this.todos];
      this.filterdTodos2 = [...this.todos];
      this.filterVal = "All";
    },
    search: function(value) {
      this.filterdTodos = this.todos.filter((post) => {
        return post.title.toLowerCase().includes(value.toLowerCase());
      });
      this.filterdTodos2 = [...this.filterdTodos];
      this.filter(this.filterVal);
    }
  },

  created() {

    this.todos = this.allTodos.filter(
      (todo) => todo.userID === this.currentUser.id
    );
    this.filterdTodos = [...this.todos];
    this.filterdTodos2 = [...this.todos];
  }
};
</script>
<style scoped>
.container {
  width: 100%;
  margin: 0 auto;
  /* border: none; */
}

h1 {
  text-align: center;
  color: #208de2;
}
.search_bar {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
}
.search_bar * {
  margin: 0 0.3vw;
}
input {
  font-size: 1em;
  width: 60%;
  height: 0.5vh;
  padding: 15px;

  display: inline-block;
  border: #208de2 solid;
  border-radius: 20px;
  background: white;
  color: black;
}
select {
  text-align: center;
  background-color: #208de2;
  border: thin solid white;
  border-radius: 10px;
  display: inline-block;
  font: inherit bold;
  color: white;

  margin: 0;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
  -webkit-appearance: none;
  -moz-appearance: none;
}
button {
  background-color: white;
  color: #208de2;
  border: 2px solid #008cba;
  border-radius: 10px;
  font-weight: bold;
  padding: 0 4px;
  text-align: center;
  display: inline-block;
  transition-duration: 0.4s;
  cursor: pointer;
}

button:hover {
  background-color: #008cba;
  color: white;
}
</style>
