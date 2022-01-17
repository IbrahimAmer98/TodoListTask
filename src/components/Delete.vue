<template>
  <div>
    <transition name="fade" appear>
      <div class="modal-overlay" v-if="showModal" @click="onClick()"></div>
    </transition>
    <transition name="slide" appear>
      <div class="modal1" v-if="showModal">
        <h1>Are you sure you want to delete this todo "{{ todo.title }}"</h1>

        <div class="btnn">
          <button class="button" @click="deletee">Yes</button>
          <button
            style="background: red"
            class="button"
            @click="onClick"
            type="button"
          >
            No
          </button>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "Deletetodo",
  props: {
    showModal: Boolean,
    todo: Object,
    bEdit: Object
  },

  methods: {
    ...mapActions(["deleteTodo"]),
    onClick() {
      this.$emit("model-click");
    },
    deletee() {
      this.deleteTodo(this.$props.todo.id);
      this.$emit("model-click");
    }
  }
};
</script>

<style scoped>
.btnn {
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin-top: 10px;
}
.delete-form {
  margin: 2vh 0;
  max-height: 80vh;
}

.form-control {
  margin: 1% 0;
  background: #2899b8;

  max-height: 0.5%;
}

.form-control label {
  display: block;
  color: white;
  margin: 0;
  font-size: 70%;
}

.form-control input {
  width: 100%;
  max-height: 10%;

  padding: 0.5% 0.6%;
  font-size: 80%;
  background: white;
  text-align: center;
}

.form-control-check {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.form-control-check label {
  flex: 1;
}

.form-control-check input {
  flex: 2;
  height: 20px;
}
.button {
  appearance: none;
  outline: none;
  border: none;
  background: none;
  cursor: pointer;

  display: inline-block;
  padding: 15px 25px;
  background-color: green;
  border-radius: 8px;

  color: #fff;
  font-size: 18px;
  font-weight: 700;

  box-shadow: 3px 3px rgba(0, 0, 0, 0.4);
  transition: 0.4s ease-out;
}
button:hover {
  box-shadow: 6px 6px rgba(0, 0, 0, 0.6);
}
.modal-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  height: 150vh;
  z-index: 98;
  height: 1920 px;
  background-color: rgba(0, 0, 0, 0.3);
}

.modal1 {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 99;
  max-height: 80vh;
  width: 60%;
  max-width: 700px;
  background-color: #fff;
  border-radius: 16px;

  padding: 25px;
}
h2 {
  color: #222;
  font-size: 1.3em;
  font-weight: 500;
  margin-bottom: 0.1%;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.slide-enter-active,
.slide-leave-active {
  transition: transform 0.5s;
}

.slide-enter,
.slide-leave-to {
  transform: translateY(-50%) translateX(100vw);
}
</style>
