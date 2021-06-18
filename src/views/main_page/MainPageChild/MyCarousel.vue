<template>
  <div class="body">
    <Carousel autoplay :autoplay-speed=5000 v-model="carousel_index" loop class="carousel">
      <CarouselItem class="demo">
        <div class="demo-carousel"><img class="carousel_img" src="@/assets/js_img/bar3d-global-population.png" alt=""></div>
      </CarouselItem>
      <CarouselItem class="demo">
        <div class="demo-carousel"><img class="carousel_img" src="@/assets/js_img/airline-globe.jpg" alt=""></div>
      </CarouselItem>
      <CarouselItem class="demo">
        <div class="demo-carousel"><img class="carousel_img" src="@/assets/js_img/earth-hotmap.png" alt=""></div>
      </CarouselItem>
    </Carousel>
  </div>
</template>

<script>
export default {
  name: "MyCarousel",
  data(){
    return{
      carousel_index:0,
    }
  }
}
</script>

<style scoped>

.carousel{
  width: 86vw;
  margin-left: 7vw;
  min-width: 1200px;
}

.demo-carousel {
  display:flex;
  justify-content: center;
  /*width: 90vw;*/
  height: 93vh;
  overflow: hidden;
}

.carousel_img {
  /*flex: 1;*/
  height: 100%;
}
</style>