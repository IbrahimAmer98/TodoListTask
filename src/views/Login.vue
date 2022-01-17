<template>
  <form @submit="checkForm">
    <h1>TODO_LIST</h1>

    <hr />
    <!-- <div>{{ allUsers }}</div> -->
    <div>
      <label for="email">Email</label>
      <input
        v-model="email"
        id="email"
        type="text"
        name="email"
        autocomplete="off"
        required
      />
      <span v-show="true">{{ email_msg }}</span>
    </div>
    <div>
      <label for="id_psw">Password</label>
      <input
        id="id_psw"
        type="password"
        name="psw"
        v-model="password1"
        autocomplete="on"
        required
      />
      <span v-show="true">{{ pwd1_msg }}</span>
    </div>

    <button
      type="submit"
      name="submit"
      value="submit"
      id="sFrom"
      class="registerbtn"
    >
      Login
    </button>
    <div class="signup-Link">
      Not a member?
      <a href="#"><router-link to="/singUp">Sing Up</router-link></a>
    </div>
  </form>
</template>

<script>
/* eslint-disable */
import { mapGetters, mapActions } from "vuex";
export default {
  name: "Login",

  data() {
    return {
      email: "",
      email_msg: "",
      emailFlag: false,

      password1: "",
      pwd1_msg: "",

      pwdFlag: false
    };
  },
  computed: mapGetters(["allUsers"]),
  methods: {
    ...mapActions(["addCurrentUser"]),

    checkForm: function(e) {
      e.preventDefault();
      if (this.emailFlag && this.pwdFlag) {
        let currentUser;
        currentUser = this.allUsers.find((user) => user.email == this.email);
        if (currentUser && currentUser.password === this.password1) {
          this.addCurrentUser(currentUser);
          this.$router.push("/home");
        } else {
          console.log("fales");
        }
      }
    },
    check_length(value, msg, total) {
      var length = value.length;
      var sum = 0;
      var display;

      sum = total - length;

      switch (sum) {
        case 0:
          display = "";
          break;
        default:
          display = "Keep going - just need " + sum + " more characters";
      }

      if (length >= total) {
        this[msg] = "";
        return true;
      } else {
        this[msg] = display;
        return false;
      }
    },
    valid_email(email, msg) {
      if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
        this[msg] = "";
        return true;
      } else {
        this[msg] = "Keep typing...Example(a@e.ed)";
        return false;
      }
    }
  },

  watch: {
    password1: function(value) {
      this.pwdFlag = this.check_length(value, "pwd1_msg", 6);
    },
    email: function(value) {
      this.emailFlag = this.valid_email(value, "email_msg");
    }
  }
};
</script>

<style scoped>
html {
  margin: 0;
  height: 100%;
  overflow: scroll;
}

body {
  width: 100%;
  height: 100%;
  font-family: Calibri, Helvetica, sans-serif;
  background-image: url("../assets/background.jpg");

  background-repeat: no-repeat;
  background-attachment: fixed;
  background-size: cover;
  margin: 0px;
}

form {
  height: 100%;
}

input[type="text"],
input[type="password"],
input[type="number"] {
  font-size: 0.8rem;
  width: 100%;
  height: 0.5vh;
  padding: 15px;

  display: inline-block;
  border: none;
  border-radius: 20px;
  background: #208de2;
  color: white;
}

input[type="text"]:focus,
input[type="password"]:focus {
  background-color: orange;
  outline: none;
}

div {
  padding: 0.5vh 0;
}

hr {
  width: 100%;
  border: 1px solid #f1f1f1;
  margin-bottom: 0.5vh;
}
span {
  font-size: 0.8em;
  color: red;
  margin: 0px;
}

input[type="radio"],
label {
  font-family: "Times New Roman";
  color: #0ac8e0;
  font-size: 0.8rem;
}
h1 {
  font-family: "Times New Roman";
  text-align: center;
  color: #0ac8e0;
}
.registerbtn {
  background-color: #4caf50;
  color: white;
  padding: 16px 20px;
  margin: 8px 10px;
  border: none;
  border-radius: 20px;
  cursor: pointer;
  width: 80%;
  margin: 1vh 10%;
  opacity: 0.8;
}

.registerbtn:hover {
  opacity: 1;
}

.error {
  color: red;
  font-size: 18px;
}
.signup-Link {
  text-align: center;
  margin-top: 20px;
  font-size: 17px;
}
.signup-Link a {
  color: #16a085;
  text-decoration: none;
}
.signup-Link a:hover {
  text-decoration: underline;
}
</style>
