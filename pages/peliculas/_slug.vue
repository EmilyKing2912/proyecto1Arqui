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
    <section class="content-center" v-if="pelicula.title">
      <h2>{{ pelicula.title }}</h2>
      <p><strong>Género:</strong> {{ pelicula.genre }}</p>
      <p><strong>Fecha de estreno:</strong> {{ pelicula.releaseDate }}</p>
      <p><strong>Duración:</strong> {{ pelicula.duration }} min</p>
      <p><strong>Calificación:</strong> {{ pelicula.rating }}</p>
      <p><strong>Dónde ver:</strong> {{ pelicula.whereToWatch }}</p>
      <p><strong>Sinopsis:</strong> {{ pelicula.synopsis }}</p>
      <p><strong>Price:</strong> {{ pelicula.price }}</p>

      <h3>Director:</h3>
      <NuxtLink :to="`/directores/${directorSlug}`">{{ directorName }}</NuxtLink>

      <h3>Estudio:</h3>
      <NuxtLink :to="`/estudios/${studioSlug}`">{{ studioName }}</NuxtLink>
    </section>

    
    <section v-else>
      <p>No se encontró la película.</p>
    </section>

<div style="display: flex; justify-content: center; margin-top: 20px;">
  <button 
    class="snipcart-add-item btn"
    :data-item-id="pelicula.title"
    :data-item-name="pelicula.title"
    :data-item-price="pelicula.price"
    :data-item-url="$route.fullPath"
    :data-item-description="pelicula.description"
  >
    🛒 Agregar al carrito
  </button>
</div>



<div class="footer-button">
  <NuxtLink to="/">
    <button class="btn">Menu Principal</button>
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
    const peliculas = await $content('peliculas')
      .where({ title: decodeURIComponent(params.slug) })
      .fetch()

    const pelicula = peliculas[0] || {}

    let directorName = ''
let directorSlug = ''
if (pelicula.directorRef) {
  const directorFile = pelicula.directorRef.replace('.json','') // quitar extensión
  const director = await $content('directores', directorFile).fetch().catch(() => null)
  if (director) {
    directorName = director.name
    directorSlug = director.name.toLowerCase()
  }
}

let studioName = ''
let studioSlug = ''
if (pelicula.studioRef) {
  const studioFile = pelicula.studioRef.replace('.json','') // quitar extensión
  const studio = await $content('estudios', studioFile).fetch().catch(() => null)
  if (studio) {
    studioName = studio.name
    studioSlug = studioFile
  }
}


    return { pelicula, directorName, directorSlug, studioName, studioSlug }
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

.content-center a {
  color: #050e61;
  font-weight: bold;
  text-decoration: none;
}

.content-center a:hover {
  color: #031461;
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
