<script setup>
import { ref, onMounted } from 'vue';

// Datos de ejemplo para las estadísticas
const stats = ref([
  { title: 'Usuarios Activos', value: '1,234', change: '+12%', icon: 'users', color: 'primary' },
  { title: 'Ingresos', value: '$12,345', change: '+8%', icon: 'money', color: 'success' },
  { title: 'Tareas Pendientes', value: '42', change: '-5%', icon: 'tasks', color: 'warning' },
  { title: 'Alertas', value: '7', change: '+2', icon: 'alert', color: 'error' },
]);

// Datos de ejemplo para el gráfico (simulado)
const chartData = ref({
  labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun'],
  values: [65, 59, 80, 81, 56, 55],
});

// Datos de ejemplo para actividades recientes
const recentActivities = ref([
  { id: 1, user: 'Juan Pérez', action: 'creó un nuevo usuario', time: '2 minutos atrás' },
  { id: 2, user: 'María López', action: 'actualizó la configuración', time: '1 hora atrás' },
  { id: 3, user: 'Carlos Gómez', action: 'eliminó un registro', time: '3 horas atrás' },
  { id: 4, user: 'Ana Martínez', action: 'inició sesión', time: '5 horas atrás' },
]);

// Datos de ejemplo para tareas pendientes
const pendingTasks = ref([
  { id: 1, title: 'Actualizar documentación', priority: 'Alta', dueDate: '2023-12-15' },
  { id: 2, title: 'Revisar solicitudes', priority: 'Media', dueDate: '2023-12-20' },
  { id: 3, title: 'Preparar informe mensual', priority: 'Alta', dueDate: '2023-12-30' },
]);
</script>

<template>
  <div>
    <h1 class="text-3xl font-bold mb-6">Panel de Control</h1>
    
    <!-- Tarjetas de estadísticas -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <div v-for="(stat, index) in stats" :key="index" class="card bg-base-100 shadow-xl">
        <div class="card-body p-6">
          <div class="flex justify-between items-start">
            <div>
              <h2 class="card-title text-base-content opacity-70">{{ stat.title }}</h2>
              <p class="text-3xl font-bold mt-2">{{ stat.value }}</p>
              <span :class="`badge badge-${stat.color} badge-sm mt-2`">{{ stat.change }}</span>
            </div>
            <div :class="`avatar placeholder bg-${stat.color} bg-opacity-20 rounded-full w-12 h-12 flex items-center justify-center`">
              <div class="text-lg text-base-content">{{ stat.icon.charAt(0).toUpperCase() }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Gráficos y Actividad Reciente -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
      <!-- Gráfico (simulado) -->
      <div class="card bg-base-100 shadow-xl lg:col-span-2">
        <div class="card-body">
          <h2 class="card-title">Rendimiento Mensual</h2>
          <div class="h-64 w-full flex items-end justify-between mt-4 space-x-2">
            <div v-for="(value, index) in chartData.values" :key="index" class="relative h-full flex flex-col justify-end items-center">
              <div :style="`height: ${value}%`" class="w-8 bg-primary rounded-t-md"></div>
              <span class="text-xs mt-2">{{ chartData.labels[index] }}</span>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Actividad Reciente -->
      <div class="card bg-base-100 shadow-xl">
        <div class="card-body">
          <h2 class="card-title">Actividad Reciente</h2>
          <ul class="mt-4 space-y-4">
            <li v-for="activity in recentActivities" :key="activity.id" class="flex items-start space-x-3">
              <div class="avatar placeholder">
                <div class="bg-neutral-focus text-neutral-content rounded-full w-8">
                  <span>{{ activity.user.charAt(0) }}</span>
                </div>
              </div>
              <div>
                <p class="font-medium">{{ activity.user }} <span class="font-normal">{{ activity.action }}</span></p>
                <p class="text-sm opacity-70">{{ activity.time }}</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
    
    <!-- Tareas Pendientes -->
    <div class="card bg-base-100 shadow-xl">
      <div class="card-body">
        <div class="flex justify-between items-center mb-4">
          <h2 class="card-title">Tareas Pendientes</h2>
          <button class="btn btn-primary btn-sm">Ver Todas</button>
        </div>
        <div class="overflow-x-auto">
          <table class="table w-full">
            <thead>
              <tr>
                <th>Tarea</th>
                <th>Prioridad</th>
                <th>Fecha Límite</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="task in pendingTasks" :key="task.id">
                <td>{{ task.title }}</td>
                <td>
                  <div class="badge" :class="{
                    'badge-error': task.priority === 'Alta',
                    'badge-warning': task.priority === 'Media',
                    'badge-info': task.priority === 'Baja'
                  }">{{ task.priority }}</div>
                </td>
                <td>{{ task.dueDate }}</td>
                <td>
                  <button class="btn btn-sm btn-ghost">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>