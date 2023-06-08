<template>
  <div class="all-questions" v-if="visibleQuestions">
    <h1>Ниже представлены вопросы для определения наиболее подходящего фильма для вас.</h1>
    <div class="which-genre">
      <p>Какой жанр вас интересует?</p>
      <input id="drama" type="radio" name="genres" value="драма" @click="returnGenre">
      <label for="drama">Драма</label>

      <input id="science-fiction" type="radio" name="genres" value="фантастика" @click="returnGenre">
      <label for="science-fiction">Фантастика</label>

      <input id="horror" type="radio" name="genres" value="ужасы" @click="returnGenre">
      <label for="horror">Ужасы</label>

      <input id="historical" type="radio" name="genres" value="история" @click="returnGenre">
      <label for="historical">История</label>

      <input id="criminal" type="radio" name="genres" value="криминал" @click="returnGenre">
      <label for="criminal">Криминал</label> 
    </div>
    <div class="which-emote">
      <p>Какую эмоцию хотите испытать?</p>
      <input id="cry" type="radio" name="emotes" value="поплакать" @click="returnEmote"> 
      <label for="cry">Поплакать</label>

      <input id="ponder" type="radio" name="emotes" value="задуматься" @click="returnEmote">
      <label for="ponder">Задуматься</label>

      <input id="delight" type="radio" name="emotes" value="восхищение" @click="returnEmote">
      <label for="delight">Восхищение</label>

      <input id="scared" type="radio" name="emotes" value="попугаться" @click="returnEmote">
      <label for="scared">Попугаться</label>

      <input id="empathy" type="radio" name="emotes" value="сопереживание" @click="returnEmote">
      <label for="empathy">Сопереживание</label>
    </div>
    <div class="is-for-group">
      <p>Нужен фильм для просмотра в компании?</p>
      <input id="yep" type="radio" name="for-group" value="Да" @click="returnGroup">
      <label for="yep">Да</label>

      <input id="nope" type="radio" name="for-group" value="Нет" @click="returnGroup">
      <label for="nope">Нет</label>
    </div>
    <button class="ready" @click="toFIltFIlms">Показать фильмы</button>
  </div>
  <h2 v-if="filmInfoVisible">На основе вами выбранного <u><i>жанра: {{filmsParams.genre}}</i></u>, <u><i>эмоций: {{filmsParams.emotions}}</i></u> и <u><i>подходит ли для группы: {{filmsParams.suitable_for_group}}</i></u> были выведены следующие фильмы:</h2>
  <FilmInfo v-if="filmInfoVisible" v-for="chosenEl in chosenFilms" :key="chosenEl.id" :chosenEl="chosenEl"/>
  <h2 v-if="filmsIsVisible">По вашим требованиям не было найдено фильмов.</h2>
</template>


<script>
  import {mapActions, mapGetters} from "vuex";
  import FilmInfo from "./components/film_info.vue";

  export default({
    name: "App",
    components: {
      FilmInfo
    },
    data(){
      return{
        filmsParams: {
          genre: "",
          emotions: "",
          suitable_for_group: null
        },
        chosenFilms: [],
        visibleQuestions: true,
        filmsIsVisible: false,
        filmInfoVisible: false
      }
    },
    computed:{
      ...mapGetters([
        "films"
      ])
    },
    methods: {
      ...mapActions([
        "getFilms"
      ]),
      returnGenre(info){
        this.filmsParams.genre = info.target.value
        console.log(this.filmsParams.genre)
      },
      returnEmote(info){
        this.filmsParams.emotions = info.target.value
        console.log(this.filmsParams.emotions)
      },
      returnGroup(info){
        this.filmsParams.suitable_for_group = info.target.value
        console.log(this.filmsParams.suitable_for_group)
      },
      toFIltFIlms() {
        if (this.filmsParams.genre === "" || this.filmsParams.emotions === "" || this.filmsParams.suitable_for_group === null) {
          alert("Вы выбрали не все поля!")
        } else {
          this.chosenFilms = this.films.filter((el) => {
            return this.filmsParams.genre == el.genre && this.filmsParams.emotions == el.emotions && this.filmsParams.suitable_for_group == el.suitable_for_group
          })
          if (this.chosenFilms.length == 0) {
            this.filmsIsVisible = true
          } else {
            this.filmInfoVisible = true
          }
          console.log(this.chosenFilms)
          this.visibleQuestions = false
        }
      }

    },
    mounted(){
      this.getFilms()
    }
  })

</script>


<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
/* which-genre{
  margin-top: 50px;
  margin-bottom: 50px;
} */
</style>