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
</div>
    <section class="content-center">
      <h3>Películas</h3>
      <p>Explora información sobre tus películas animadas</p>

      <ul class="list-peliculas">
        <li v-for="pelicula in peliculas" :key="pelicula.title">
          <NuxtLink :to="`/peliculas/${encodeURIComponent(pelicula.title)}`">
            {{ pelicula.title }}
          </NuxtLink>
        </li>
      </ul>
    </section>
<div class="footer-button">
  <NuxtLink to="/">
    <button class="btn">Menu Principal</button>
  </NuxtLink>
</div>
    <FooterView />
  </div>
</template>

<script>
export default {
  async asyncData({ $content }) {
    const peliculas = await $content('peliculas').fetch() || []

    return { peliculas }
  }
}
</script>

<style scoped>
.content-center {
  text-align: center;
  margin: 40px auto;
}

.list-peliculas {
  list-style: none;
  padding: 0;
  margin-top: 20px;
}

.list-peliculas li {
  margin: 10px 0;
}

.list-peliculas a {
  text-decoration: none;
  font-size: 18px;
  color: #200779;
  font-weight: bold;
  transition: color 0.3s;
}

.list-peliculas a:hover {
  color: #1b035e;
}

.menu-bar {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px; 
  padding: 15px 0;
  border-radius: 10px;
  margin-top: 20px;
}

.menu-bar .btn {
  padding: 12px 25px;
  background: linear-gradient(135deg, #2c3e50, #2c3e50);
  color: white;
  font-size: 16px;
  font-weight: bold;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: transform 0.2s ease, background 0.3s ease;
}

.menu-bar .btn:hover {
  background: linear-gradient(135deg, #2c3e50, #2c3e50);
  transform: scale(1.05);
}
.footer-button {
  display: flex;
  justify-content: center; 
  margin: 20px 0; 
}

.footer-button .btn {
  padding: 12px 30px;
  background: linear-gradient(135deg,#2c3e50, #2c3e50);
  color: white;
  font-size: 16px;
  font-weight: bold;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  box-shadow: 0 4px 8px rgba(0,0,0,0.2);
  transition: transform 0.2s ease, background 0.3s ease;
}

.footer-button .btn:hover {
  background: linear-gradient(135deg,#2c3e50, #2c3e50);
  transform: scale(1.05);
}
</style>
