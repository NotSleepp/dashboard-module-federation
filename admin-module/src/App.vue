<script setup>
// El módulo de administración puede tener su propio router y lógica
import { ref, onMounted } from 'vue';

const currentTheme = ref('cmyk');

const toggleTheme = () => {
  currentTheme.value = currentTheme.value === 'cmyk' ? 'sunset' : 'cmyk';
  document.documentElement.setAttribute('data-theme', currentTheme.value);
  localStorage.setItem('theme', currentTheme.value);
  console.log('Tema cambiado a:', currentTheme.value); // Agregar log para depuración
};

// Cargar tema desde localStorage si existe
onMounted(() => {
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme) {
    currentTheme.value = savedTheme;
    document.documentElement.setAttribute('data-theme', savedTheme);
    console.log('Tema cargado desde localStorage:', savedTheme); // Agregar log para depuración
  } else {
    console.log('No hay tema guardado, usando tema por defecto:', currentTheme.value); // Agregar log para depuración
  }
});
</script>

<template>
  <div class="min-h-screen" :data-theme="currentTheme">
    <div class="navbar bg-base-300">
      <div class="flex-1">
        <a class="btn btn-ghost normal-case text-xl">Módulo de Administración</a>
      </div>
      <div class="flex-none">
        <button class="btn btn-sm btn-primary" @click="toggleTheme">
          <span class="mr-2">Tema: {{ currentTheme === 'cmyk' ? 'Claro' : 'Oscuro' }}</span>
          <svg v-if="currentTheme === 'cmyk'" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="inline-block w-5 h-5 stroke-current"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>
          <svg v-else xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="inline-block w-5 h-5 stroke-current"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"></path></svg>
        </button>
      </div>
    </div>
    
    <div class="container mx-auto p-6">
      <!-- Contenido del módulo de administración -->
      <div class="card bg-base-100 shadow-xl">
        <div class="card-body">
          <router-view></router-view>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
/* Estilos globales para asegurar que Tailwind y DaisyUI funcionen correctamente */
body, html {
  margin: 0;
  padding: 0;
}
</style>

<style scoped>
header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>
