<script setup>
import { ref } from 'vue';

// Datos de ejemplo para la tabla de usuarios
const users = ref([
  { id: 1, name: 'Juan Pérez', email: 'juan@example.com', role: 'Admin', status: 'Activo' },
  { id: 2, name: 'María López', email: 'maria@example.com', role: 'Editor', status: 'Activo' },
  { id: 3, name: 'Carlos Gómez', email: 'carlos@example.com', role: 'Usuario', status: 'Inactivo' },
  { id: 4, name: 'Ana Martínez', email: 'ana@example.com', role: 'Editor', status: 'Activo' },
  { id: 5, name: 'Roberto Sánchez', email: 'roberto@example.com', role: 'Usuario', status: 'Activo' },
]);

// Estado para el modal de nuevo usuario
const showModal = ref(false);
const newUser = ref({
  name: '',
  email: '',
  role: 'Usuario',
  status: 'Activo'
});

// Función para agregar un nuevo usuario
const addUser = () => {
  users.value.push({
    id: users.value.length + 1,
    ...newUser.value
  });
  showModal.value = false;
  // Resetear el formulario
  newUser.value = {
    name: '',
    email: '',
    role: 'Usuario',
    status: 'Activo'
  };
};
</script>

<template>
  <div>
    <div class="flex justify-between items-center mb-6">
      <h2 class="text-2xl font-bold">Gestión de Usuarios</h2>
      <button class="btn btn-primary" @click="showModal = true">Nuevo Usuario</button>
    </div>
    
    <!-- Tabla de usuarios con DaisyUI -->
    <div class="overflow-x-auto">
      <table class="table table-zebra w-full">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Email</th>
            <th>Rol</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in users" :key="user.id">
            <td>{{ user.id }}</td>
            <td>{{ user.name }}</td>
            <td>{{ user.email }}</td>
            <td>
              <div class="badge" :class="{
                'badge-primary': user.role === 'Admin',
                'badge-secondary': user.role === 'Editor',
                'badge-accent': user.role === 'Usuario'
              }">{{ user.role }}</div>
            </td>
            <td>
              <div class="badge" :class="{
                'badge-success': user.status === 'Activo',
                'badge-error': user.status === 'Inactivo'
              }">{{ user.status }}</div>
            </td>
            <td>
              <div class="flex space-x-2">
                <button class="btn btn-sm btn-ghost">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                  </svg>
                </button>
                <button class="btn btn-sm btn-ghost text-error">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                  </svg>
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Modal para nuevo usuario -->
    <dialog :class="{'modal modal-open': showModal, 'modal': !showModal}">
      <div class="modal-box">
        <h3 class="font-bold text-lg mb-4">Agregar Nuevo Usuario</h3>
        <form @submit.prevent="addUser">
          <div class="form-control w-full mb-3">
            <label class="label">
              <span class="label-text">Nombre</span>
            </label>
            <input type="text" v-model="newUser.name" placeholder="Nombre completo" class="input input-bordered w-full" required />
          </div>
          
          <div class="form-control w-full mb-3">
            <label class="label">
              <span class="label-text">Email</span>
            </label>
            <input type="email" v-model="newUser.email" placeholder="correo@ejemplo.com" class="input input-bordered w-full" required />
          </div>
          
          <div class="form-control w-full mb-3">
            <label class="label">
              <span class="label-text">Rol</span>
            </label>
            <select v-model="newUser.role" class="select select-bordered w-full">
              <option>Admin</option>
              <option>Editor</option>
              <option>Usuario</option>
            </select>
          </div>
          
          <div class="form-control w-full mb-6">
            <label class="label">
              <span class="label-text">Estado</span>
            </label>
            <select v-model="newUser.status" class="select select-bordered w-full">
              <option>Activo</option>
              <option>Inactivo</option>
            </select>
          </div>
          
          <div class="modal-action">
            <button type="button" class="btn" @click="showModal = false">Cancelar</button>
            <button type="submit" class="btn btn-primary">Guardar</button>
          </div>
        </form>
      </div>
      <form method="dialog" class="modal-backdrop">
        <button @click="showModal = false">cerrar</button>
      </form>
    </dialog>
  </div>
</template>