// import axios from "axios";

const state = {
  todos: [
    {
      id: 1,
      title: "yes",
      description: "eeee",
      date: "2022-01-16",
      time: "15:38",
      userID: 1,
      done: false,
      creationDate: "1/15/2022"
    },
    {
      id: 2,
      title: "No",
      description: "eeee",
      date: "2022-01-16",
      time: "15:10",
      userID: 1,
      done: false,
      creationDate: "1/15/2022"
    },
    {
      id: 3,
      title: "Noo",
      description: "eeee",
      date: "2022-01-16",
      time: "13:17",
      userID: 1,
      done: false,
      creationDate: "1/15/2022"
    }
  ],
  users: [
    {
      fname: "Morjan",
      lname: "Amer",
      phone: "+972597471327",
      email: "i.amer@student.edu",
      password: "000000",
      birthday: "2022-01-19",
      city: "Jenin",
      id: 1
    }
  ],
  currentUser: {},
  tId: 4,
  uId: 2
};

const getters = {
  allTodos: (state) => state.todos,
  allUsers: (state) => state.users,
  currentUser: (state) => state.currentUser,
  tId: (state) => state.tId,
  uId: (state) => state.uId
};

const actions = {
  addTodo({ commit }, newTodo) {
    commit("newTodo", newTodo);
  },
  addUser({ commit }, newUser) {
    commit("newUser", newUser);
  },
  addCurrentUser({ commit }, current) {
    commit("setCurrentUser", current);
  },
  deleteTodo({ commit }, id) {
    commit("removeTodo", id);
  },

  updateTodo({ commit }, updTodo) {
    commit("updateTodo", updTodo);
  },
  updateUser({ commit }, updUser) {
    commit("updateUser", updUser);
  }
};

const mutations = {
  setCurrentUser: (state, currentUser) => {
    state.currentUser = currentUser;
  },
  newTodo: (state, todo) => {
    state.todos.unshift(todo);
    state.tId += 1;
  },
  newUser: (state, user) => {
    state.users.unshift(user);
    state.uId += 1;
  },
  removeTodo: (state, id) => {
    state.todos = state.todos.filter((todo) => todo.id !== id);
    state.tId -= 1;
  },
  updateTodo: (state, updTodo) => {
    const index = state.todos.findIndex(
      (todo) => todo.id === parseInt(updTodo.id)
    );
    console.log(index);
    if (index !== -1) {
      state.todos.splice(index, 1, updTodo);
    }
  },
  updateUser: (state, updUser) => {
    const index = state.users.findIndex((user) => user.id === updUser.id);
    console.log(index);

    if (index !== -1) {
      state.users.splice(index, 1, updUser);
      state.currentUser = updUser;
    }
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
