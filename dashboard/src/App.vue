<script setup>
import { ref, onMounted, watch } from 'vue'

const menuItems = ref([
  { name: 'Inicio', path: '/' },
  { name: 'Administración', path: '/admin' }
])

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

// Aquí podríamos cargar dinámicamente los items del menú desde el módulo de administración
onMounted(async () => {
  try {
    const adminModule = await import('admin-module/menu')
    if (adminModule.default) {
      menuItems.value = [...menuItems.value, ...adminModule.default]
    }
  } catch (error) {
    console.error('Error al cargar el menú del módulo de administración:', error)
  }
})
</script>

<template>
  <div class="min-h-screen" :data-theme="currentTheme">
    <!-- Navbar superior con selector de tema -->
    <div class="navbar bg-base-300 fixed top-0 w-full z-10">
      <div class="flex-1">
        <a class="btn btn-ghost normal-case text-xl">Dashboard</a>
      </div>
      <div class="flex-none">
        <button class="btn btn-sm btn-primary" @click="toggleTheme">
          <span class="mr-2">Tema: {{ currentTheme === 'cmyk' ? 'Claro' : 'Oscuro' }}</span>
          <svg v-if="currentTheme === 'cmyk'" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="inline-block w-5 h-5 stroke-current"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>
          <svg v-else xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="inline-block w-5 h-5 stroke-current"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"></path></svg>
        </button>
      </div>
    </div>

    <div class="pt-16"> <!-- Espacio para la navbar -->
      <!-- Sidebar -->
      <aside class="fixed inset-y-0 left-0 w-64 bg-base-200 shadow-lg pt-16">
        <nav class="p-4">
          <ul class="menu bg-base-200 w-full">
            <li v-for="item in menuItems" :key="item.path">
              <router-link 
                :to="item.path"
                :class="{ 'active': $route.path === item.path }"
              >
                <span>{{ item.name }}</span>
              </router-link>
            </li>
          </ul>
        </nav>
      </aside>

      <!-- Main Content -->
      <main class="ml-64 p-8">
        <router-view v-slot="{ Component }">
          <component :is="Component" />
        </router-view>
      </main>
    </div>
  </div>
</template>

<style>
/* Aplicamos estilos globales para asegurar que Tailwind y DaisyUI funcionen correctamente */
#app {
  width: 100%;
  height: 100vh;
  margin: 0;
  padding: 0;
}

body {
  margin: 0;
  padding: 0;
  overflow-x: hidden;
}
</style>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
