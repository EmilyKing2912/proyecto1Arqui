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

    <section class="content-center" v-if="director.name">
      <!-- Foto del director -->
      <img
        :src="getDirectorImage(director.slug || director.name)"
        @error="onImageError"
        :alt="director.name"
        class="director-photo"
      />

      <h2>{{ director.name }}</h2>
      <p><strong>Edad:</strong> {{ director.age }}</p>
      <p><strong>Año nacimiento:</strong> {{ director.birthYear }}</p>
      <p><strong>Nacionalidad:</strong> {{ director.nationality }}</p>
      <p><strong>Esposa:</strong> {{ director.spouse }}</p>
      <p><strong>Biografía:</strong> {{ director.biography }}</p>

      <h3>Películas:</h3>
      <ul class="movies-list">
        <li v-for="pelicula in peliculas" :key="pelicula.title">
          <NuxtLink :to="`/peliculas/${encodeURIComponent(pelicula.title)}`">
            {{ pelicula.title }}
          </NuxtLink>
        </li>
      </ul>
    </section>

    <section v-else>
      <p>No se encontró el director.</p>
    </section>

    <div class="footer-button">
      <NuxtLink to="/">
        <button class="btn">Menú Principal</button>
      </NuxtLink>
    </div>

    <FooterView />
  </div>
</template>

<script>
export default {
  async asyncData({ $content, params }) {
    const director = await $content('directores')
      .where({ slug: params.slug })
      .fetch()
      .then(res => res[0] || {})
      .catch(() => ({}))

    const peliculas = []

    if (director.movies && director.movies.length) {
      for (const movieFile of director.movies) {
        const fileName = movieFile.replace('.json', '')
        const pelicula = await $content('peliculas', fileName)
          .fetch()
          .catch(() => null)
        if (pelicula) peliculas.push(pelicula)
      }
    }

    return { director, peliculas }
  },
  methods: {
    getDirectorImage(name) {
      try {
        return `/images/${encodeURIComponent(name)}.jpg`
      } catch {
        return '/images/default.jpg'
      }
    },
    onImageError(event) {
      event.target.src = '/images/default.jpg'
    }
  }
}
</script>

<style scoped>
.content-center {
  text-align: center;
  margin: 40px auto;
}

.director-photo {
  max-width: 250px;
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

.movies-list {
  list-style: none;
  padding: 0;
  margin: 0 auto;
  display: inline-block;
  text-align: left;
}

.movies-list li {
  margin: 0px 0;
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
</style>
