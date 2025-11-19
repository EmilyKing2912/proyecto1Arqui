<template>
    
 <div class="container">
    <HeaderView />

<div class="menu-bar">
  <NuxtLink to="/peliculas_index">
    <button class="btn">🎬 Películas</button>
  </NuxtLink>

  <NuxtLink to="/directores_index">
    <button class="btn">🎥 Directores</button>
  </NuxtLink>

  <NuxtLink to="/estudios_index">
    <button class="btn">🏛️ Estudios</button>
  </NuxtLink>

     <NuxtLink to="/carrito_index">
    <button class="btn"> 🛒 Carrito</button>
  </NuxtLink>
</div>

    <h1 class="title">🛒 Carrito de Compras</h1>

    <div hidden id="snipcart" data-api-key="YOUR_API_KEY"></div>

    <snipcart-cart></snipcart-cart>

<FooterView />
  </div>
</template>

<script>
export default {
  name: "PagosPage",
};
</script>

<style scoped>
.container {
  max-width: 900px;
  margin: 40px auto;
  text-align: center;
}

.title {
  font-size: 28px;
  font-weight: bold;
  margin-bottom: 20px;
  color: #2c3e50;
}
</style>