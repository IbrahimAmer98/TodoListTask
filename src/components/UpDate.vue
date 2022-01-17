<template>
  <div>
    <transition name="fade" appear>
      <div class="modal-overlay" v-if="showModal" @click="onClick()"></div>
    </transition>
    <transition name="slide" appear>
      <div class="modal1" v-if="showModal">
        <form class="add-form" @submit="onSubmit">
          <img
            v-if="edit"
            src="https://image.pngaaa.com/12/1050012-middle.png"
            alt="pen icon"
            @click="edit = !edit"
          />
          <h1>Personal Info</h1>

          <div>
            <label for="fname"> First Name </label>
            <input
              id="fname"
              v-model="fname"
              type="text"
              name="fname"
              size="15"
              autocomplete="off"
              :disabled="edit"
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
              :disabled="edit"
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
              :disabled="edit"
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
              :disabled="true"
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
              :disabled="edit"
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
              :disabled="edit"
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
              :disabled="edit"
              required
            />
            <label id="birthdayError" class="error"></label>
          </div>
          <div>
            <label>
              City :
            </label>

            <select
              id="country"
              @change="onChange($event)"
              name="country"
              :value="city"
              :disabled="edit"
              required
            >
              <option value="Jenin">Jenin</option>
              <option value="Nablus">Nablus</option>
              <option value="Tulkrem">Tulkrem</option>
              <option value="Ramallah">Ramallah</option>
            </select>
          </div>
          <div class="btnn">
            <button class="button" type="submit">Save</button>
            <button class="button" @click="onClick" type="button">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </transition>
  </div>
</template>

<script>
/* eslint-disable */
import { mapActions } from "vuex";
export default {
  name: "UpDate",
  props: {
    showModal: Boolean,
    currentUser: Object
  },
  data() {
    return {
      edit: true,
      fname: "",
      fname_msg: "",
      fnameFlag: true,

      lname: "",
      lname_msg: "",
      lnameFlag: true,
      phone: "",
      phone_msg: "",
      phoneFlag: true,
      email: "",
      email_msg: "",
      emailFlag: true,

      password1: "",
      pwd1_msg: "",
      password2: "",
      pwd2_msg: "",
      pwdMach: true,
      city: "",
      birthday: ""
    };
  },
  methods: {
    ...mapActions(["updateUser"]),
    onClick() {
      this.fname = this.$props.currentUser.fname;
      this.lname = this.$props.currentUser.lname;
      this.phone = this.$props.currentUser.phone;
      this.email = this.$props.currentUser.email;
      this.password1 = this.$props.currentUser.password;
      this.password2 = this.$props.currentUser.password;
      this.city = this.$props.currentUser.city;
      this.birthday = this.$props.currentUser.birthday;
      this.edit = true;
      this.$emit("model-click");
    },

    onChange(e) {
      this.city = e.target.value;
    },
    onSubmit: function(e) {
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
          id: this.$props.currentUser.id
        };

        this.updateUser(newUser);
        this.edit = true;
        this.$emit("model-click");
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
  },

  beforeMount() {
    this.fname = this.$props.currentUser.fname;
    this.lname = this.$props.currentUser.lname;
    this.phone = this.$props.currentUser.phone;
    this.email = this.$props.currentUser.email;
    this.password1 = this.$props.currentUser.password;
    this.password2 = this.$props.currentUser.password;
    this.city = this.$props.currentUser.city;
    this.birthday = this.$props.currentUser.birthday;
  }
};
</script>

<style scoped>
span {
  font-size: 0.8em;
  color: red;
  margin: 0px;
}
.btnn {
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin-top: 10px;
}
.add-form {
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
  max-width: 20%;
  display: inline-block;
  padding: 1vh;
  box-sizing: border-box;
  background-color: green;
  border-radius: 8px;

  color: #fff;
  font-size: 1.1em;
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
  z-index: 98;
  height: 1920px;
  background-color: rgba(0, 0, 0, 0.3);
}
h1 {
  font-family: "Times New Roman";
  text-align: center;
  color: #0ac8e0;
}

.modal1 {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 99;
  width: 70%;
  max-width: 100%;
  max-width: 700px;
  background-color: #fff;
  border-radius: 16px;

  padding: 25px;
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
img {
  width: 40px;
  height: 40px;
  margin: 0 0.5rem;
  float: right;
}
</style>
