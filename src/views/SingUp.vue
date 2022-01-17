<template>
  <form @submit="checkForm">
    <h1>Registeration Form</h1>

    <hr />
    <div>
      <label for="fname"> First Name </label>
      <input
        id="fname"
        v-model="fname"
        type="text"
        name="fname"
        size="15"
        autocomplete="off"
        required
      />
      <span v-show="true">{{ fname_msg }}</span>
    </div>
    <div>
      <label for="lname"> Last Name </label>
      <input
        id="lname"
        type="text"
        v-model="lname"
        name="lname"
        size="15"
        autocomplete="off"
        required
      />
      <span v-show="true">{{ lname_msg }}</span>
    </div>
    <div>
      <label for="phone"> Phone </label>
      <input
        id="phone"
        v-model="phone"
        type="text"
        name="phone"
        size="15"
        required
      />
      <span v-show="true">{{ phone_msg }}</span>
    </div>
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
    <div>
      <label for="id_psw_repeat">Re-type Password</label>
      <input
        id="id_psw_repeat"
        type="password"
        name="psw_repeat"
        v-model="password2"
        autocomplete="on"
        required
      />
      <span v-show="true">{{ pwd2_msg }}</span>
    </div>
    <div>
      <label for="birthday">Birthday:</label>
      <input
        type="date"
        v-model="birthday"
        id="birthday"
        name="birthday"
        required
      />
      <label id="birthdayError" class="error"></label>
    </div>
    <div>
      <label>
        City :
      </label>

      <select id="country" @change="onChange($event)" name="country" required>
        <option value="Jenin">Jenin</option>
        <option value="Nablus">Nablus</option>
        <option value="Tulkrem">Tulkrem</option>
        <option value="Ramallah">Ramallah</option>
      </select>
    </div>

    <button
      type="submit"
      name="submit"
      value="submit"
      id="sFrom"
      class="registerbtn"
    >
      Register
    </button>
  </form>
</template>

<script>
/* eslint-disable */
import { mapActions, mapGetters } from "vuex";
export default {
  name: "SingUp",

  data() {
    return {
      fname: "",
      fname_msg: "",
      fnameFlag: false,

      lname: "",
      lname_msg: "",
      lnameFlag: false,
      phone: "",
      phone_msg: "",
      phoneFlag: false,
      email: "",
      email_msg: "",
      emailFlag: false,

      password1: "",
      pwd1_msg: "",
      password2: "",
      pwd2_msg: "",
      pwdMach: false,
      city: "Jenin",
      birthday: ""
    };
  },
  computed: mapGetters(["uId"]),
  methods: {
    ...mapActions(["addUser"]),
    onChange(e) {
      this.city = e.target.value;
    },
    checkForm: function(e) {
      e.preventDefault();
      if (
        this.fnameFlag &&
        this.lnameFlag &&
        this.emailFlag &&
        this.phoneFlag &&
        this.pwdMach
      ) {
        const newUser = {
          fname: this.fname,
          lname: this.lname,
          phone: this.phone,
          email: this.email,
          password: this.password1,
          birthday: this.birthday,
          city: this.city,
          id: this.uId
        };

        this.addUser(newUser);
        this.$router.push("/");
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
    },
    valid_phone(phone, msg) {
      let result = phone.match(/[-\+\0-9]{8,}/g);
      if (result) {
        this[msg] = "";

        return true;
      } else {
        this[msg] = "Keep typing...Example((+/-)1234567)";

        return false;
      }
    },
    check_passwords_match() {
      if (this.password1.length > 5 && this.password2.length > 5) {
        if (this.password2 != this.password1) {
          this.pwd2_msg = "Passwords do not match";

          return false;
        } else {
          this.pwd2_msg = "";

          return true;
        }
      }
    }
  },
  watch: {
    fname: function(value) {
      this.fnameFlag = this.check_length(value, "fname_msg", 4);
    },
    lname: function(value) {
      this.lnameFlag = this.check_length(value, "lname_msg", 4);
    },
    email: function(value) {
      this.emailFlag = this.valid_email(value, "email_msg");
    },
    phone: function(value) {
      this.phoneFlag = this.valid_phone(value, "phone_msg");
    },

    password1: function(value) {
      if (this.check_length(value, "pwd1_msg", 6)) {
        this.check_passwords_match();
      }
    },
    password2: function(value) {
      if (this.check_length(value, "pwd2_msg", 6)) {
        this.pwdMach = this.check_passwords_match();
      }
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
  /* margin: 5px 0 22px 0; */
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
</style>
