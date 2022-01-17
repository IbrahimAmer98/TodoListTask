<template>
  <form @submit="onSubmit" class="add-form">
    <header>
      <h1>Add ToDO</h1>
    </header>
    <div class="form-control">
      <label>ToDO Title</label>
      <input
        type="text"
        v-model="title"
        name="title"
        placeholder="ToDO Title"
        required
      />
    </div>

    <div class="form-control">
      <label>Description</label>
      <input
        type="text"
        v-model="description"
        name="description"
        placeholder="Description"
        required
      />
    </div>
    <div class="form-control">
      <label>Alarm</label>
      <input type="date" v-model="date" name="Date" required />
      <input type="time" v-model="time" name="time" required />
    </div>
    <div class="user form-control" @click="edit">
      {{
        currentUser.fname.toUpperCase() + "  " + currentUser.lname.toUpperCase()
      }}
    </div>
    <div class="form-control">
      <fieldset disabled="disabled">
        <label>Creation Date</label>
        <input
          type="text"
          :value="this.creationDate.substr(0, 10).toString()"
          name="Date"
        />
      </fieldset>
    </div>
    <div class="btnn">
      <input class="btn" type="submit" value="Save " />
      <button class="btn" type="button" @click="p">Close</button>
    </div>
    <UpDate
      @model-click="showModal = !showModal"
      :showModal="showModal"
      :currentUser="currentUser"
    />
  </form>
</template>

<script>
/* eslint-disable */
import { mapGetters, mapActions } from "vuex";
import UpDate from "../components/UpDate.vue";
export default {
  name: "Add",
  components: {
    UpDate
  },

  data() {
    return {
      showModal: false,
      title: "",
      description: "",
      date: "",
      time: "",
      userID: "",
      done: false,
      creationDate: new Date().toLocaleDateString()
    };
  },
  computed: mapGetters(["currentUser", "tId", "allTodos"]),
  methods: {
    ...mapActions(["addTodo", "updateTodo"]),
    p() {
      this.$router.push("/home");
    },
    edit() {
      this.showModal = !this.showModal;
    },
    onSubmit(e) {
      e.preventDefault();

      const newTodo = {
        title: this.title,
        description: this.description,
        date: this.date,
        time: this.time,
        userID: this.currentUser.id,
        done: this.done,
        creationDate: this.creationDate,
        id: this.tId
      };

      if (this.$route.params.id > 0) {
       
        newTodo.id=this.$route.params.id;
        this.updateTodo(newTodo);
        this.$router.push("/home");
      } else {
        this.addTodo(newTodo);
        this.title = "";
        this.description = "";
        this.date = "";
        this.time = "";
        this.creationDate = new Date().toLocaleDateString();
      }
    }
  },
  created() {
    const upDate = this.allTodos.find(
      (todo) => todo.id == this.$route.params.id
    );

    if (this.$route.params.id > 0) {
      this.title = upDate.title;
      this.description = upDate.description;
      this.date = upDate.date;
      this.time = upDate.time;
      this.creationDate = upDate.creationDate;
    }
  }
};
</script>

<style scoped>
h1 {
  text-align: center;
  color: #208de2;
}

.form-control {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 15px 0;
  background: #2899b8;
  width: 100%;
}
.user {
  text-align: center;
  color: white;
  font-size: 1.3em;
  font-weight: bold;
}
fieldset {
  border: none;
}
.form-control label {
  display: block;
  color: white;
  font-size: 17px;
  text-align: center;
}

.form-control input {
  box-sizing: border-box;
  width: 90%;
  height: 40px;
  margin: 5px;
  padding: 3px 7px;
  background: white;
  border-radius: 50px;
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
.btn {
  max-width: 15vw;
  height: 5vh;
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
  font-size: 1em;
}
input[type="submit"]:hover {
  background-color: #008cba;
  color: white;
}
.btnn {
  display: flex;
  justify-content: space-around;
}
button.btn {
  color: red;
  border: 2px solid red;
}

button:hover {
  background-color: red;
  color: white;
}
</style>
