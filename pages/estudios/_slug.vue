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
      <NuxtLink to="#">
  <button class="btn" onclick="window.Snipcart.api.theme.cart.open()">
    🛒 Carrito
  </button>
</NuxtLink>
    </div>

    <section class="content-center" v-if="estudio.name">
      <h2>{{ estudio.name }}</h2>
      <p><strong>País:</strong> {{ estudio.country }}</p>
      <p><strong>Descripción:</strong> {{ estudio.description }}</p>
      <p><strong>Año de fundación:</strong> {{ estudio.foundedYear }}</p>
      <p><strong>Price:</strong> {{ estudio.price }}</p>

      <h3>Películas:</h3>
      <ul class="movies-list">
        <li v-for="movieFile in estudio.movies" :key="movieFile" v-if="movieData[movieFile]">
          <NuxtLink :to="`/peliculas/${encodeURIComponent(movieData[movieFile].title)}`">
            {{ movieData[movieFile].title }}
          </NuxtLink>
        </li>
      </ul>
    </section>

    <section v-else>
      <p>No se encontró el estudio.</p>
    </section>

    <div style="display: flex; justify-content: center; margin-top: 20px;">
  <button 
    class="snipcart-add-item btn"
    :data-item-id="estudio.name"
    :data-item-name="estudio.name"
    :data-item-price="estudio.price"
    :data-item-url="$route.fullPath"
    :data-item-description="estudio.description"
  >
    🛒 Agregar al carrito
  </button>
</div>

    <div class="footer-button">
      <NuxtLink to="/">
        <button class="btn">Menú Principal</button>
      </NuxtLink>
    </div>


    <section id="comments" class="mt-10" style="margin-top: 40px;">
      <script src="https://utteranc.es/client.js"
              repo="EmilyKing2912/proyecto1Arqui"
              issue-term="pathname"
              theme="github-dark"
              crossorigin="anonymous"
              async>
      </script>
    </section>
  </div>
</template>


<script>
export default {
  async asyncData({ $content, params }) {
    const estudio = await $content('estudios', params.slug)
      .fetch()
      .catch(() => null) || {}

    const movieData = {}
    if (estudio.movies) {
      for (const movieFile of estudio.movies) {
        const fileName = movieFile.replace('.json','')
        const movie = await $content('peliculas', fileName).fetch().catch(() => null)
        if (movie) movieData[movieFile] = movie
      }
    }

    return { estudio, movieData }
  }
}
</script>

<style scoped>
.content-center {
  text-align: center;
  margin: 40px auto;
}

.content-center h2 {
  margin-bottom: 10px;
  color: #2c3e50;
}

.content-center p {
  margin: 5px 0;
  font-size: 16px;
}

.movies-list {
  list-style: none;
  padding: 0;
  margin-top: 10px;
}

.movies-list li {
  margin: 5px 0;
}

.movies-list a {
  text-decoration: none;
  font-size: 16px;
  font-weight: bold;
  color: #2c3e50;
  transition: color 0.3s;
}

.movies-list a:hover {
  color: #1b035e;
}

/* Botones menu */
.menu-bar {
  display: flex;
  justify-content: center;
  gap: 20px;
  padding: 15px 0;
  margin-top: 20px;
}

.menu-bar .btn {
  padding: 12px 25px;
  background: linear-gradient(135deg, #2c3e50, #2c3e50);
  color: white;
  font-weight: bold;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: transform 0.2s ease;
}

.menu-bar .btn:hover {
  transform: scale(1.05);
}

/* Botón footer */
.footer-button {
  display: flex;
  justify-content: center;
  margin: 20px 0;
}

.footer-button .btn {
  padding: 12px 30px;
  background: linear-gradient(135deg,#2c3e50, #2c3e50);
  color: white;
  font-weight: bold;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  box-shadow: 0 4px 8px rgba(0,0,0,0.2);
  transition: transform 0.2s ease;
}

.footer-button .btn:hover {
  transform: scale(1.05);
}
.snipcart-add-item {
  padding: 12px 25px;
  background-color: #2c3e50;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  margin-top: 20px;
}

.snipcart-add-item:hover {
  background-color: #1a242f;
}
</style>
