<template>
  <div>
    <div class="card todo">
      <div class="status">
        <div class="isBlocked" :style="{ background: color, color: color }">
          .
        </div>
        <h3 :style="[todo.done ? { 'text-decoration': 'line-through' } : {}]">
          {{ todo.title }}
        </h3>
      </div>
      <div class="icons">
        <input
          type="checkbox"
          id="mainCat.merchantId"
          v-model="todo.done"
          @change="check()"
        />
        <img
          src="https://icons-for-free.com/iconfiles/png/512/cercle+close+delete+dismiss+remove+icon-1320196712448219692.png"
          alt="remove icon"
          @click="showModal = !showModal"
        />

        <router-link :to="path"
          ><img
            src="https://w7.pngwing.com/pngs/1019/105/png-transparent-paper-ballpoint-pen-pencil-icon-black-automatic-pen-angle-leave-the-material-black-hair.png"
        /></router-link>
      </div>

      <Delete
        @model-click="showModal = !showModal"
        :showModal="showModal"
        :todo="todo"
      />
    </div>
  </div>
</template>

<script>
import Delete from "./Delete";

import { mapActions } from "vuex";
export default {
  name: "Todo",
  props: {
    todo: Object,
    color: String
  },
  components: {
    Delete
  },

  data() {
    return {
      showModal: false,
      path: "/add/" + this.$props.todo.id
    };
  },
  methods: {
    ...mapActions(["updateTodo"]),
    check: function() {
      this.updateTodo(this.$props.todo);
    },
    pen: function() {}
  },
  mounted() {
    const x = new Date(
      this.$props.todo.date + " " + this.$props.todo.time
    ).toLocaleString();
    if (x > new Date().toLocaleString()) {
      const t = window.setInterval(() => {
        if (x === new Date().toLocaleString()) {
          alert("This is Alarm for Todo " + this.$props.todo.title);
          clearInterval(t);
        }
      }, 1000);
    }
  }
};
</script>

<style scoped>
.fas {
  color: red;
}
.status {
  display: flex;
  flex-direction: row;
  align-items: stretch;
  width: 100%;
}
.isBlocked {
  width: 5px;
  margin-right: 5px;
}
.todo {
  background: #f1f1f1;
  margin: 5px;
  padding: 10px 20px;
  cursor: pointer;
}

.todo h3 {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.card {
  display: flex;
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  margin: 2vh 0;
  border: 3px solid #1e91e2;
  border-radius: 30px;
}
.icons {
  display: flex;

  align-items: center;
  justify-content: space-between;
  /* height: 40px; */
}
.icons img {
  width: 30px;
  height: 30px;
}
.icons * {
  width: 20px;

  margin: 0 0.2rem;
}
</style>
