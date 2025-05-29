<script setup>
import { ref } from 'vue';

// Datos de ejemplo para la configuración del menú
const menuItems = ref([
  { id: 1, name: 'Dashboard', path: '/', icon: 'home', visible: true, order: 1 },
  { id: 2, name: 'Usuarios', path: '/admin/users', icon: 'users', visible: true, order: 2 },
  { id: 3, name: 'Configuración', path: '/admin/menu-config', icon: 'settings', visible: true, order: 3 },
  { id: 4, name: 'Reportes', path: '/reports', icon: 'chart', visible: false, order: 4 },
  { id: 5, name: 'Ayuda', path: '/help', icon: 'help', visible: true, order: 5 },
]);

// Función para cambiar la visibilidad de un elemento del menú
const toggleVisibility = (id) => {
  const item = menuItems.value.find(item => item.id === id);
  if (item) {
    item.visible = !item.visible;
  }
};

// Función para cambiar el orden de un elemento del menú
const moveItem = (id, direction) => {
  const index = menuItems.value.findIndex(item => item.id === id);
  if (index === -1) return;
  
  if (direction === 'up' && index > 0) {
    // Intercambiar con el elemento anterior
    const temp = menuItems.value[index].order;
    menuItems.value[index].order = menuItems.value[index - 1].order;
    menuItems.value[index - 1].order = temp;
    // Reordenar el array
    menuItems.value.sort((a, b) => a.order - b.order);
  } else if (direction === 'down' && index < menuItems.value.length - 1) {
    // Intercambiar con el elemento siguiente
    const temp = menuItems.value[index].order;
    menuItems.value[index].order = menuItems.value[index + 1].order;
    menuItems.value[index + 1].order = temp;
    // Reordenar el array
    menuItems.value.sort((a, b) => a.order - b.order);
  }
};
</script>

<template>
  <div>
    <div class="flex justify-between items-center mb-6">
      <h2 class="text-2xl font-bold">Configuración del Menú</h2>
      <button class="btn btn-primary">Guardar Cambios</button>
    </div>
    
    <div class="card bg-base-100 shadow-xl">
      <div class="card-body">
        <h3 class="card-title mb-4">Elementos del Menú</h3>
        
        <div class="overflow-x-auto">
          <table class="table w-full">
            <thead>
              <tr>
                <th>Orden</th>
                <th>Nombre</th>
                <th>Ruta</th>
                <th>Icono</th>
                <th>Visible</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in menuItems" :key="item.id" :class="{'opacity-50': !item.visible}">
                <td>{{ item.order }}</td>
                <td>{{ item.name }}</td>
                <td><code>{{ item.path }}</code></td>
                <td>
                  <div class="badge badge-outline">{{ item.icon }}</div>
                </td>
                <td>
                  <input type="checkbox" :checked="item.visible" @change="toggleVisibility(item.id)" class="toggle toggle-primary" />
                </td>
                <td>
                  <div class="flex space-x-2">
                    <button class="btn btn-sm btn-circle" @click="moveItem(item.id, 'up')" :disabled="item.order === 1">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
                      </svg>
                    </button>
                    <button class="btn btn-sm btn-circle" @click="moveItem(item.id, 'down')" :disabled="item.order === menuItems.length">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                      </svg>
                    </button>
                    <button class="btn btn-sm btn-circle btn-error">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        
        <div class="divider"></div>
        
        <div class="flex justify-end">
          <button class="btn btn-outline btn-primary">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 mr-2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
            Agregar Elemento
          </button>
        </div>
      </div>
    </div>
  </div>
</template>