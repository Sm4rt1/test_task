<template>
    <div class="filmBox">
       <p>{{ chosenEl.film_name }} {{ chosenEl.year }}</p>
       <img :src="require('../assets/films_images/' + chosenEl.image)" alt="img">
    </div>
</template>


<script>
    export default ({
        name: "FilmInfo",
        props: {
            chosenEl: {
                type: Object,
                default() {
                    return{}
                }
            }
        }
    })
</script>


<style>

</style>