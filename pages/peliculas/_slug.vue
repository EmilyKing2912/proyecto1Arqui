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

    <section class="content-center" v-if="pelicula.title">
      <!-- Foto de la película -->
      <img
        :src="getPeliculaImage(pelicula.slug || pelicula.title)"
        :alt="pelicula.title"
        class="pelicula-photo"
      />

      <h2>{{ pelicula.title }}</h2>
      <p><strong>Género:</strong> {{ pelicula.genre }}</p>
      <p><strong>Fecha de estreno:</strong> {{ pelicula.releaseDate }}</p>
      <p><strong>Duración:</strong> {{ pelicula.duration }} min</p>
      <p><strong>Calificación:</strong> {{ pelicula.rating }}</p>
      <p><strong>Dónde ver:</strong> {{ pelicula.whereToWatch }}</p>
      <p><strong>Sinopsis:</strong> {{ pelicula.synopsis }}</p>

      <h3>Director:</h3>
      <NuxtLink :to="`/directores/${directorSlug}`">{{ directorName }}</NuxtLink>

      <h3>Estudio:</h3>
      <NuxtLink :to="`/estudios/${studioSlug}`">{{ studioName }}</NuxtLink>
    </section>

    <section v-else>
      <p>No se encontró la película.</p>
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
  async asyncData({ $content, params }) {
    const peliculas = await $content('peliculas')
      .where({ title: decodeURIComponent(params.slug) })
      .fetch()

    const pelicula = peliculas[0] || {}

    let directorName = ''
    let directorSlug = ''
    if (pelicula.directorRef) {
      const directorFile = pelicula.directorRef.replace('.json','')
      const director = await $content('directores', directorFile).fetch().catch(() => null)
      if (director) {
        directorName = director.name
        directorSlug = director.slug || directorFile
      }
    }

    let studioName = ''
    let studioSlug = ''
    if (pelicula.studioRef) {
      const studioFile = pelicula.studioRef.replace('.json','')
      const studio = await $content('estudios', studioFile).fetch().catch(() => null)
      if (studio) {
        studioName = studio.name
        studioSlug = studio.slug || studioFile
      }
    }

    return { pelicula, directorName, directorSlug, studioName, studioSlug }
  },
  methods: {
    getPeliculaImage(name) {
      const encodedName = encodeURIComponent(name)
      const path = `/images/${encodedName}.jpg`
      // fallback
      return path
    }
  }
}
</script>

<style scoped>
.content-center {
  text-align: center;
  margin: 40px auto;
}

.pelicula-photo {
  max-width: 300px;
  border-radius: 12px;
  margin-bottom: 20px;
  box-shadow: 0 4px 8px rgba(0,0,0,0.2);
}

.content-center h2 {
  margin-bottom: 10px;
  color: #2c3e50;
}

.content-center p {
  margin: 5px 0;
  font-size: 16px;
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
  transform: scale(1.05);
}
</style>
