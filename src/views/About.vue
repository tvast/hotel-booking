<template>
  <div class="about">
    <h1 v-for="(item,index) in $store.getters.flavor.data" :key="index">{{item.hotel.type}}</h1>
  </div>
</template>
