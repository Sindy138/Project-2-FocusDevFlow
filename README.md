# FocusDevFlow

FocusDevFlow es una plataforma de gestión de la atención diseñada específicamente para flujos de trabajo de ingeniería de software. Basada en la metodología **Flowtime**, la aplicación prioriza el trabajo cognitivo profundo eliminando las interrupciones rígidas y permitiendo una trazabilidad precisa del tiempo invertido por proyecto y tarea.

## Especificaciones Técnicas y Arquitectura

El proyecto ha sido desarrollado bajo una arquitectura de componentes modulares y principios de programación funcional en React:

- **Estado Global:** Gestión centralizada mediante Context API para garantizar la integridad de los datos entre las diferentes vistas (Dashboard, Archive, Wrap-up).
- **Persistencia:** Implementación de `localStorage` para asegurar que el progreso y el historial de proyectos persistan tras recargas del navegador.
- **Inmutabilidad:** Uso estricto del operador spread y métodos funcionales (`map`, `filter`, `reduce`) para la actualización del estado, evitando efectos secundarios.
- **Rendimiento:** Uso de `useMemo` para el procesamiento de métricas complejas y `useCallback` para la optimización de funciones de control del temporizador.

---

## Funcionalidades del Sistema

### 1. Home - Dashboard Main

El núcleo operativo de la aplicación donde se gestiona el flujo de trabajo en tiempo real.

- **Header y Navegación:** Contiene el logo, enlaces dinámicos mediante `NavLink` y un botón de **Zen Mode**. Este último consume el estado global `isZen`; cuando es activo, aplica clases CSS para ocultar la interfaz de navegación.
- **FlowTimer (Custom Hook):** Cronómetro ascendente que gestiona el ciclo de vida del intervalo. Al finalizar la sesión, calcula automáticamente un tiempo de descanso proporcional (duración / 5) e inserta la sesión de forma inmutable en el historial.
- **Control de Contexto:** Selección dinámica de proyectos y tareas mediante inputs controlados. El sistema permite la creación de proyectos on-the-fly si el selector se encuentra vacío.
- **Daily Log:** Renderizado dinámico de las sesiones de la fecha actual. Utiliza `crypto.randomUUID()` para garantizar claves únicas y una reconciliación de DOM eficiente.

### 2. Daily Wrap-up

Vista analítica diseñada para el cierre de jornada y revisión de objetivos.

- **KPI Metrics:** Visualización de tiempo total de flujo, número de tareas únicas trabajadas y total de sesiones realizadas.
- **Tasks Breakdown:** Desglose porcentual por tarea mediante barras de progreso, determinando el peso relativo de cada actividad sobre el tiempo total de trabajo diario mediante el método `reduce`.

### 3. Project Archive y Detalle

Gestión histórica y profunda de la productividad por entidad de proyecto.

- **Archive View:** Listado de tarjetas de proyecto (`ProjectCard`) que consumen datos mediante _Property Shorthand_. Utiliza rutas dinámicas (`/projects/:id`) para la navegación detallada.
- **Project Detail:** Vista de análisis específico mediante el hook `useParams`. Incluye la funcionalidad **Finish Project** que cambia el estado a completado, inhabilitando el inicio de nuevas sesiones para proteger la integridad de los datos históricos.

---

## Estructura de Directorios

```text
src/
├── components/
│   ├── layout/          # Header, ZenWrapper
│   ├── dashboard/       # Timer, ProjectSelector, DailyLog
│   ├── analytics/       # KpiCards, ProgressBar
│   └── shared/          # UI Components
├── hooks/
│   └── useFlowTimer.js  # Lógica de cronómetro
├── context/
│   └── AppContext.jsx   # Estado global y persistencia
├── pages/
│   ├── Dashboard.jsx
│   ├── DailyWrapUp.jsx
│   ├── ProjectArchive.jsx
│   └── ProjectDetail.jsx
└── utils/
    └── helpers.js       # Cálculos de tiempo
```
