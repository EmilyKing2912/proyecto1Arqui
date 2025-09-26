<template>
  
  <div class="container">
    <HeaderView />
<div class="menu-bar">
  <NuxtLink to="/directores_index">
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
      <h2>{{ director.name }}</h2>
      <p><strong>Edad:</strong> {{ director.age }}</p>
      <p><strong>Año nacimiento:</strong> {{ director.birthYear }}</p>
      <p><strong>Nacionalidad:</strong> {{ director.nationality }} min</p>
      <p><strong>Esposa:</strong> {{ director.spouse }}</p>
      <p><strong>Biografia:</strong> {{ director.biography }}</p>
      <h3>Peliculas:</h3>

      <ul class="movies-list">
        <li v-for="pelicula in peliculas" :key="pelicula.title">
          <NuxtLink :to="`/peliculas/${encodeURIComponent(pelicula.title)}`">{{ pelicula.title }}
          </NuxtLink>
        </li>
      </ul>



    </section>

    <section v-else>
      <p>No se encontró el director.</p>
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
        if (pelicula) {
          peliculas.push(pelicula)
        }
      }
    }

    return { director, peliculas }
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
.movies-list {
  list-style: none; 
  padding: 0;
  margin: 0 auto; 
  display: inline-block; 
  text-align: left; 
}

.content-center {
  text-align: center; 
}

.movies-list li {
  margin: 0px 0;
}


</style>
