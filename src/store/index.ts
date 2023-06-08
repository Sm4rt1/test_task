import { createStore } from 'vuex'
import axios from 'axios'

export default createStore({
  state: {
    films: []
  },
  getters: {
    films(state){
      return state.films
    }
  },
  mutations: {
    returnFilmsInfo: (state, temp) => {
      state.films = temp
    }
  },
  actions: {
    getFilms({commit}) {
      return axios("http://localhost:3000/films", {
        method: "GET"
      })
      .then((temp) => {
        commit("returnFilmsInfo", temp.data);
        return temp;
      })
      .catch((problem) => {
        console.log(problem);
        return problem;
      })
    }
  },
  modules: {
  }
})
