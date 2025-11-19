<template>
  <div class="container">
    <HeaderView />
    
    <section class="hero">
      <h3>Catálogo Animado</h3>
      <p>Explora películas, directores y estudios de animación</p>

      <div class="menu-buttons">
        <NuxtLink to="/peliculas_index" class="card">
          <img src="/images/peliculas.jpg" alt="Películas" />
          <button class="btn">🎬 Películas</button>
        </NuxtLink>

        <NuxtLink to="/directores_index" class="card">
          <img src="/images/directores.jpg" alt="Directores" />
          <button class="btn">🎥 Directores</button>
        </NuxtLink>

        <NuxtLink to="/estudios_index" class="card">
          <img src="/images/estudios.jpg" alt="Estudios" />
          <button class="btn">🏛️ Estudios</button>
        </NuxtLink>
        <NuxtLink to="#">
  <button class="btn" onclick="window.Snipcart.api.theme.cart.open()">
    🛒 Carrito
  </button>
</NuxtLink>
      </div>
    </section>


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
  head() {
    return {
      script: [
        { src: 'https://identity.netlify.com/v1/netlify-identity-widget.js' }
      ],
    };
  },
};
</script>

<style scoped>
.hero {
  text-align: center;
  margin: 40px auto;
  padding: 30px 20px;
}

.hero h3 {
  font-size: 28px;
  margin-bottom: 10px;
  color: #000911;
}

.hero p {
  font-size: 16px;
  color: #000000;
  margin-bottom: 25px;
}

.menu-buttons {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 25px;
}

.card {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-decoration: none;
}

.card img {
  width: 160px;
  height: 160px;
  object-fit: cover;
  border-radius: 12px;
  margin-bottom: 10px;
  box-shadow: 0 4px 8px rgba(0,0,0,0.15);
}

.btn {
  padding: 10px 20px;
  background: linear-gradient(135deg, #2c3e50,#2c3e50);
  color: white;
  font-size: 16px;
  font-weight: bold;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  transition: transform 0.2s ease, background 0.3s ease;
  box-shadow: 0 4px 8px rgba(0,0,0,0.15);
}

.btn:hover {
  background: linear-gradient(135deg,#2c3e50, #2c3e50);
  transform: scale(1.05);
}
</style>
