# FocusDevFlow - Especificación Técnica de Producto

**Versión:** 1.0  
**Fecha de Última Actualización:** Abril 2026  
**Estado:** Producción

---

## Índice

1. [Resumen Ejecutivo](#resumen-ejecutivo)
2. [Visión y Objetivos del Proyecto](#visión-y-objetivos-del-proyecto)
3. [Descripción del Producto](#descripción-del-producto)
4. [Funcionalidades Principales](#funcionalidades-principales)
5. [Planteamiento UX-UI](#planteamiento-ux-ui)
6. [Arquitectura Técnica](#arquitectura-técnica)
7. [Stack Tecnológico](#stack-tecnológico)
8. [Especificaciones de Componentes](#especificaciones-de-componentes)
9. [Flujos de Usuario](#flujos-de-usuario)
10. [Estándares de Código y Mejores Prácticas](#estándares-de-código-y-mejores-prácticas)
11. [Testing y Control de Calidad](#testing-y-control-de-calidad)
12. [Rendimiento y Optimizaciones](#rendimiento-y-optimizaciones)
13. [Consideraciones de Seguridad](#consideraciones-de-seguridad)
14. [Deployment y Hosting](#deployment-y-hosting)
15. [Roadmap Futuro](#roadmap-futuro)

---

## Resumen Ejecutivo

**FocusDevFlow** es una plataforma integral de gestión de la atención y productividad diseñada específicamente para ingenieros de software y profesionales del desarrollo. La aplicación implementa la metodología **Flowtime**, un enfoque de gestión del tiempo que prioriza el trabajo cognitivo profundo, eliminando las interrupciones rígidas y proporcionando trazabilidad precisa del tiempo invertido por proyecto y tarea.

**Objetivo Principal:** Maximizar la productividad y la calidad del trabajo mediante sesiones de flujo profundo, análisis granular del tiempo dedicado y métricas visuales de desempeño.

**Público Objetivo:** Desarrolladores, ingenieros de software, arquitectos técnicos y profesionales que requieren medición precisa de su tiempo productivo.

---

## Visión y Objetivos del Proyecto

### Visión Estratégica

Transformar la forma en que los profesionales del desarrollo trabajan, proporcionando una herramienta que reconozca que el trabajo cognitivo profundo requiere períodos ininterrumpidos y que la verdadera productividad se mide en términos de flujo sostenido, no en sesiones rígidas predeterminadas.

### Objetivos Medibles

1. **Precisión Temporal:** Registrar exactamente cuánto tiempo se dedica a cada proyecto y tarea sin restricciones artificiales de duración.

2. **Análisis Profundo:** Proporcionar métricas significativas que permitan identificar patrones de productividad, tareas críticas y distribución de esfuerzo.

3. **Experiencia Intuitiva:** Diseñar una interfaz que minimice la fricción en el registro de sesiones y maximize la focalización del usuario.

4. **Persistencia de Datos:** Garantizar que todos los registros de trabajo persistan entre sesiones de navegador sin dependencias de backend.

5. **Accesibilidad Multi-dispositivo:** Ofrecer una experiencia consistente y optimizada para dispositivos móviles y de escritorio.

---

## Descripción del Producto

### Concepto Fundamental

FocusDevFlow implementa la metodología Flowtime, que se diferencia del Pomodoro tradicional en que:

- Permite sesiones de duración variable determinadas por el usuario, no por temporizadores fijos.
- Calcula automáticamente tiempos de descanso proporcionales (duración_sesión ÷ 5).
- Acumula el tiempo trabajado con precisión de segundos.
- Proporciona analítica detallada por proyecto, tarea y período temporal.

### Propuesta de Valor Única

1. **Flexibilidad Cognitiva:** Sesiones sin duración predeterminada respetan los ritmos naturales del flujo profundo.
2. **Trazabilidad Empresarial:** Registro precisado por proyecto permite análisis de productividad y asignación de recursos.
3. **Análisis de Comportamiento:** Métricas diarias identifican patrones de producción máxima.
4. **Cero Dependencias Externas:** Funciona completamente offline, con persistencia local mediante localStorage.

---

## Funcionalidades Principales

### 1. Dashboard Principal (Home)

La interfaz central de la aplicación donde ocurre el trabajo operativo diario.

#### Componentes Integrados

**Header Dinámico**

- Logo de aplicación con identidad visual consistente.
- Enlaces de navegación mediante NavLink de React Router.
- Botón de "Zen Mode" que alterna un estado global que oculta elementos visuales secundarios.
- Responsive: Navegación de escritorio en desktop, navbar inferior en móvil.

**Selector de Proyecto y Tarea**

- Inputs controlados que permiten seleccionar o crear proyectos/tareas on-the-fly.
- Validación que previene proyectos duplicados.
- Integración con estado global mediante Context para sincronización inmediata.
- Crear nuevo proyecto si el selector está vacío (autoguardado en estado).

**FlowTimer - Cronómetro Personalizado**

- Funcionalidad principal: cronómetro ascendente (no descendente como Pomodoro).
- Precisión: medición en milisegundos convertida a segundos para display.
- Gestión de intervalo: uso de setInterval/clearInterval con limpieza en useEffect.
- Cálculo automático de descanso: al finalizar, calcula (duración_sesión ÷ 5) para el período de descanso sugerido.
- Inserción en historial: los datos de sesión se añaden al contexto de forma inmutable (spread operator).
- Estados: Running, Paused, Completed.

**Daily Log**

- Renderización dinámica de todas las sesiones de la fecha actual.
- Cada sesión muestra: hora, proyecto, tarea, duración, tiempo de descanso sugerido.
- Uso de crypto.randomUUID() para claves únicas garantizando reconciliación eficiente del DOM.
- Opciones de edición/eliminación de sesiones individuales.

**Weather Widget**

- Integración con API de terceros (consumo asincrónico).
- Contextualización ambiental del entorno de trabajo.
- Gestión de credenciales mediante variables de entorno (.env).
- Fallback graceful si la API no está disponible.

### 2. Daily Wrap-Up

Vista analítica de cierre de jornada diseñada para revisión y reflexión.

#### Componentes Integrados

**KPI Metrics Card**

- Tiempo total de flujo acumulado en la jornada (suma de duraciones de sesiones).
- Número de tareas únicas trabajadas (identificadas por nombre único).
- Total de sesiones completadas.
- Mostrados como tarjetas visuales con valores destacados.

**Tasks Breakdown**

- Desglose porcentual del tiempo dedicado a cada tarea mediante barras de progreso.
- Cálculo: (tiempo_tarea ÷ tiempo_total) × 100.
- Implementación con método reduce para agregación de datos.
- Color codificación o gradientes visuales para distinción.

**Timeline de Actividad**

- Visualización cronológica de las sesiones del día.
- Marcadores de descanso vs. trabajo.
- Indicadores de duración relativa.

### 3. Project Archive

Gestión histórica y análisis profundo de productividad por proyecto.

#### Archivos - Listado General

- **Project Cards:** Tarjetas que muestran resumen de cada proyecto (nombre, total de sesiones, tiempo acumulado, estado).
- **Propiedades Mostradas:** Uso de Property Shorthand en JSX para código limpio.
- **Filtrado:** Opción de mostrar todos los proyectos o solo los activos.
- **Sorting:** Ordenamiento por nombre, tiempo total o última actividad.

#### Project Detail - Análisis Específico

- **Acceso:** Rutas dinámicas (/projects/:id) gestionadas con useParams.
- **Visualización de Datos:**
  - Total de sesiones en el proyecto.
  - Tiempo acumulado (conversión a formato legible: Xh Ym).
  - Desglose de tareas dentro del proyecto.
  - Timeline de actividad histórica (últimas sesiones).
  - Gráfico de distribución de tiempo por tarea (si aplicable).

- **Acciones Disponibles:**
  - "Finish Project": cambia estado a completado (flag en contexto).
  - Protección de integridad: proyectos completados no permiten nuevas sesiones.
  - Archivado: retira del flujo activo pero mantiene histórico.

### 4. Integraciones de Contexto Global

**FocusContext** - Estado Global Principal

- Estado de proyecto y tarea seleccionados.
- Historial de sesiones del día actual.
- Estado de Zen Mode.
- Métodos: guardar sesión, actualizar proyecto, limpiar datos.

**WeatherContext** - Estado de Clima

- Datos de clima actual obtenidos de API externa.
- Estado de carga y error handling.
- Refresh automático a intervalo definido (si aplica).

---

## Planteamiento UX-UI

### Principios de Diseño

El diseño de FocusDevFlow se fundamenta en los siguientes principios:

1. **Minimalismo Funcional:** Interfaz desprovista de elementos superfluos; cada componente visual tiene un propósito específico.
2. **Accesibilidad Cognitiva:** Jerarquía visual clara que guía la atención del usuario hacia la acción principal (iniciar/pausar cronómetro).
3. **Consistencia Visual:** Paleta de colores coherente, tipografía uniforme y espaciado predecible.
4. **Responsive Design:** Experiencia adaptada para pantallas desde 320px (móvil) hasta 2560px (ultra-wide).
5. **Feedback Inmediato:** Respuestas visuales a cada interacción del usuario (cambios de estado, animaciones suaves).

### Arquitectura de Información

```
Nivel 1: Navegación Global
├─ Home (Dashboard Principal)
├─ Wrap-Up (Análisis Diario)
├─ Projects (Archivo y Análisis)
└─ Zen Mode Toggle

Nivel 2: Dashboard
├─ Selector de Proyecto/Tarea
├─ Cronómetro (Elemento Central)
├─ Controles (Play/Pause/Reset)
└─ Daily Log (Sesiones del día)

Nivel 3: Detalles
├─ Sesión Individual (Editar/Eliminar)
└─ Proyecto Específico (Análisis Detallado)
```

### Paleta de Colores

**Colores Primarios:**

- Principal (Azul): #0066CC - Acciones principales, botones, enlaces
- Secundario (Verde): #00AA44 - Estados positivos, sesiones activas
- Acento (Naranja): #FF8800 - Alertas suaves, descansos sugeridos

**Colores de Estado:**

- Activo/En Progreso: Verde vibrante (#00CC66)
- Pausado: Amarillo (#FFAA00)
- Completado: Gris (#666666)
- Error: Rojo (#CC0000)

**Escala Neutral:**

- Fondo Principal: #FFFFFF (blanco puro)
- Fondo Secundario: #F5F5F5 (gris muy claro)
- Texto Primario: #1A1A1A (gris oscuro)
- Texto Secundario: #666666 (gris medio)
- Bordes: #DDDDDD (gris claro)

**Zen Mode:**

- Fondos oscuros: #1A1A1A
- Texto invertido: #F5F5F5
- Reducción de contraste para minimizar distracciones

### Tipografía

**Familia Principal:** Sistema de fuentes del sistema operativo

- Font Stack: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif
- Garantiza rendering nativo en cada plataforma

**Tamaños:**

- Heading 1 (H1): 32px, peso 700, line-height 1.2
- Heading 2 (H2): 24px, peso 600, line-height 1.3
- Body: 14px-16px, peso 400, line-height 1.6
- Small: 12px, peso 400, line-height 1.5
- Caption: 11px, peso 400, line-height 1.4

### Espaciado y Grid

**Sistema de Espaciado (Base: 8px):**

- xs: 4px
- sm: 8px
- md: 16px
- lg: 24px
- xl: 32px
- xxl: 48px

**Grid Responsivo:**

- Mobile (320px - 768px): 1 columna
- Tablet (769px - 1024px): 2 columnas
- Desktop (1025px+): 3-4 columnas

**Máximo Ancho de Contenido:** 1200px, centrado con márgenes laterales automáticos

### Componentes UI Principales

#### Botones

**Primario (Primary CTA)**

- Fondo: #0066CC, Texto: #FFFFFF
- Padding: 10px 16px
- Border-radius: 4px
- Transición suave de 200ms en hover (opacity: 0.9)
- Cursor pointer

**Secundario (Secondary Action)**

- Fondo: #F5F5F5, Texto: #1A1A1A, Borde: 1px #DDDDDD
- Padding: 10px 16px
- Transición en hover: background #EEEEEE

**Peligroso (Destructive - Delete/Finish)**

- Fondo: #CC0000, Texto: #FFFFFF
- Confirmación adicional requerida
- Padding: 10px 16px

#### Inputs y Selects

- Borde: 1px #DDDDDD, focus: 2px #0066CC
- Padding: 8px 12px
- Altura mínima: 40px (touch target)
- Placeholder: color #999999, itálica
- Validación visual: borde rojo para errores

#### Tarjetas (Cards)

- Fondo: #FFFFFF
- Borde: 1px #DDDDDD o sin borde con shadow suave
- Border-radius: 8px
- Padding: 16px
- Box-shadow: 0 1px 3px rgba(0,0,0,0.1)

#### Barras de Progreso

- Altura: 8px
- Border-radius: 4px
- Fondo base: #EEEEEE
- Barra de progreso: gradiente desde #0066CC a #00AA44
- Porcentaje mostrado como valor numérico: "45%"

#### Indicadores de Estado

- Punto de color 6px de diámetro junto al elemento
- Verde para activo, naranja para pausa, gris para completado

### Flujos de Interacción Principales

#### Iniciar una Sesión de Trabajo

1. Usuario selecciona o crea proyecto en dropdown
2. Usuario selecciona o crea tarea en dropdown
3. Usuario visualiza el cronómetro en estado "Listo"
4. Usuario hace clic en botón "Iniciar" / "Start"
5. Cronómetro comienza a contar ascendentemente
6. Botón cambia a "Pausar" / "Pause"
7. Indicador visual de estado pasa a verde (activo)

#### Pausar y Reanudar

1. Usuario hace clic en "Pausar"
2. Cronómetro se detiene (el valor se mantiene)
3. Botón cambia a "Reanudar" / "Resume"
4. Indicador visual cambia a naranja (pausado)
5. Usuario puede hacer clic en "Reanudar" para continuar

#### Finalizar Sesión

1. Usuario hace clic en "Detener" / "Stop"
2. Modal de confirmación muestra: proyecto, tarea, duración
3. Sistema calcula automáticamente: descanso_sugerido = duracion / 5
4. Usuario confirma para guardar
5. Sesión aparece inmediatamente en Daily Log
6. Cronómetro se reinicia a 00:00
7. Toast/notificación: "Sesión guardada. Descanso sugerido: 10 minutos"

#### Revisar Daily Wrap-Up

1. Usuario navega a "Wrap-Up"
2. Sistema agrega todas las sesiones del día
3. Visualización de KPIs: tiempo total, número de tareas, sesiones
4. Breakdown de tiempo por tarea con porcentajes
5. Timeline visual de actividad
6. Usuario puede comparar con días anteriores si aplica

#### Analizar Proyecto Específico

1. Usuario navega a "Projects"
2. Usuario selecciona un proyecto de la lista
3. Sistema carga vista de detalle con:
   - Información general del proyecto
   - Listado de tareas dentro del proyecto
   - Total de horas invertidas
   - Gráfico de distribución de tiempo
   - Últimas sesiones
4. Usuario puede:
   - Marcar proyecto como completado
   - Reactivar proyecto si necesario
   - Ver tendencias de productividad

#### Zen Mode

1. Usuario hace clic en botón "Zen" en header
2. Estado global isZen cambia a true
3. Efectos visuales aplicados:
   - Fondo oscuro activado
   - Navbar y navegación oculta
   - Colores invertidos
   - Solo cronómetro y controles visibles
   - Reducción de animaciones
4. Usuario hace clic de nuevo para desactivar

### Responsive Design Breakpoints

**Mobile First Approach**

```css
/* Base: Mobile (320px+) */
- Navegación vertical (Navbar inferior)
- Single column layout
- Fuentes base: 14px
- Espaciado reducido

/* Tablet (769px+) */
@media (min-width: 769px)
- Navegación horizontal (Header)
- Dos columnas en listados
- Fuentes aumentadas: 16px

/* Desktop (1025px+) */
@media (min-width: 1025px)
- Navegación expandida
- Tres columnas en listados
- Widgets laterales visibles
- Máximo ancho de contenido: 1200px
```

### Indicadores de Carga y Estados

**Skeletons:** Durante carga de datos externos (clima), mostrar placeholders animados

**Spinners:** Para operaciones de corta duración (< 1 segundo)

**Progress Bars:** Para operaciones de larga duración o análisis de datos

**Empty States:** Mensajes claros cuando no hay datos disponibles:

- "No hay sesiones registradas hoy. ¿Comenzamos a trabajar?"
- "No hay proyectos completados aún."

### Animaciones y Transiciones

**Duración Estándar:**

- Rápidas: 150ms (hover, focus)
- Normales: 250ms (cambios de estado, transiciones)
- Lentas: 500ms (entrada/salida de modales, grandes cambios)

**Easing:**

- Transiciones suaves: ease-in-out
- Entrada: ease-out
- Salida: ease-in

**Ejemplos Específicos:**

- Cambio de botón (hover): opacity 0.9 en 150ms
- Aparición de sesión en Daily Log: slide-in desde abajo en 300ms
- Cambio de página: fade in/out en 250ms
- Zen Mode toggle: transición oscura en 400ms

### Accesibilidad

**Estándares WCAG 2.1 AA**

1. **Contraste:** Relación mínima 4.5:1 para texto normal, 3:1 para texto grande
2. **Tamaño de Toque:** Elementos interactivos mínimo 44x44px
3. **Navegación por Teclado:** Tab order lógico, Enter para activar, Esc para cerrar
4. **Etiquetas ARIA:** aria-label, aria-describedby, aria-live para regiones dinámicas
5. **Estructura Semántica:** Uso de header, nav, main, section, footer
6. **Texto Alternativo:** Descripciones en iconos mediante title o aria-label
7. **Focus Visible:** Indicador de foco claro en todos los elementos interactivos
8. **Modo Oscuro:** Soporte nativo de prefers-color-scheme

---

## Arquitectura Técnica

### Paradigma y Principios

**Programación Funcional con React 19**

- Componentes basados en funciones (sin clases).
- Uso extensivo de hooks para manejo de estado y efectos.
- Inmutabilidad estricta: spread operator, métodos funcionales (map, filter, reduce).
- Evitar mutación directa de estado.

**Context API para Estado Global**

- Eliminación de prop-drilling.
- Centralización de lógica de negocio.
- Separación de concerns: FocusContext para datos operativos, WeatherContext para datos externos.

### Diagrama de Arquitectura

```
┌─────────────────────────────────────┐
│      React Application (App.jsx)    │
│         - Router Setup              │
│         - Provider Wrapping         │
└────────────┬────────────────────────┘
             │
     ┌───────┴───────────────────────────┐
     │                                   │
┌────▼──────────────────┐    ┌──────────▼────────────────┐
│  WeatherProvider      │    │  Layout Components        │
│  - WeatherContext     │    │  - Header                 │
│  - API Integration    │    │  - Navbar (Mobile)        │
│  - Error Handling     │    │  - Main Content           │
└────┬──────────────────┘    └──────────┬────────────────┘
     │                                  │
     │          ┌──────────────────────┬┴─────────────────┐
     │          │                      │                  │
     │          │                      │                  │
┌────▼──────────▼────┐    ┌────────────▼──────────┐    ┌──▼────────────────────┐
│ Weather Widget     │    │ Router Routes         │    │ FocusContext Provider │
│ - API Consumption  │    │ - / (HomePage)       │    │ - Global State Mgmt   │
│ - Fallback UI      │    │ - /wrap-up           │    │ - Persistence         │
│ - Caching          │    │ - /projects          │    │ - Business Logic      │
└────────────────────┘    └────────────┬──────────┘    └──┬────────────────────┘
                                       │                  │
                          ┌────────────┴──────┬───────────┘
                          │                   │
            ┌─────────────▼─────────────┐    │
            │ Dashboard Components      │    │
            │ - Timer                   │    │
            │ - ProjectTaskManager      │    │
            │ - DailyLog                │    │
            │ - TimerControls           │    │
            └─────────────┬─────────────┘    │
                          │                  │
            ┌─────────────▼──────────────────┼──────────┐
            │                                │          │
     ┌──────▼────────┐             ┌────────▼────┐    │
     │ useFlowTimer  │             │ Custom Hook │    │
     │ - Timer Logic │             │ Composition │    │
     │ - Calculations│             │ Pattern     │    │
     └───────────────┘             └─────────────┘    │
                                                       │
                                    ┌──────────────────▼─────┐
                                    │ localStorage API       │
                                    │ - Persistence Layer    │
                                    │ - Session Recovery     │
                                    └────────────────────────┘
```

### Ciclo de Vida de Datos

**Flujo de una Sesión de Trabajo:**

1. **Inicialización:** Usuario selecciona proyecto/tarea en selectores controlados
2. **Estado Local:** Valores se almacenan en estado local del componente
3. **Inicio de Sesión:** Usuario inicia cronómetro, hook useFlowTimer comienza intervalo
4. **Ejecución:** Contador se incrementa cada 100ms, se actualiza render
5. **Pausa/Reanudación:** Hook gestiona clearInterval/setInterval
6. **Finalización:** User detiene sesión, sistema calcula:
   - Duración total en segundos
   - Tiempo de descanso (duracion / 5)
   - Timestamp de inicio/fin
   - UUID único para la sesión
7. **Persistencia:** Objeto sesión se añade al array de FocusContext de forma inmutable
8. **localStorage:** Al cambiar contexto, useEffect dispara JSON.stringify y guarda en localStorage
9. **Recuperación:** Al cargar la app, useEffect lee localStorage y reconstruye estado

### Manejo de Estado

**Estrategia de Inmutabilidad:**

```javascript
// CORRECTO: Crear nuevo objeto
const addSession = (newSession) => {
  setFocusData((prev) => ({
    ...prev,
    sessions: [...prev.sessions, newSession],
  }));
};

// INCORRECTO: Mutar estado directamente
focusData.sessions.push(newSession); // NO HACER ESTO
```

**Optimizaciones de Performance:**

```javascript
// useMemo para cálculos costosos
const totalTime = useMemo(() => {
  return sessions.reduce((acc, s) => acc + s.duration, 0);
}, [sessions]);

// useCallback para funciones estables
const handleStartTimer = useCallback(() => {
  // lógica del timer
}, []);
```

---

## Stack Tecnológico

### Frontend Framework

| Tecnología       | Versión | Propósito                                |
| ---------------- | ------- | ---------------------------------------- |
| React            | 19.2.5  | Framework principal, componentes y hooks |
| React DOM        | 19.2.5  | Renderización en navegador               |
| React Router DOM | 7.14.1  | Enrutamiento de aplicación               |
| Vite             | 8.0.9   | Build tool y dev server                  |

### Iconografía y UI

| Tecnología   | Versión | Propósito                    |
| ------------ | ------- | ---------------------------- |
| Lucide React | 1.8.0   | Iconos SVG escalables        |
| React Icons  | 5.6.0   | Conjunto adicional de iconos |

### Testing

| Tecnología            | Versión | Propósito                              |
| --------------------- | ------- | -------------------------------------- |
| Vitest                | 4.1.5   | Framework de testing unitario          |
| Vitest UI             | 4.1.5   | Dashboard visual para resultados       |
| Testing Library React | 16.3.2  | Utilidades para testing de componentes |
| Testing Library DOM   | 10.4.1  | Queries y utilidades del DOM           |
| Jest DOM              | 6.9.1   | Matchers personalizados                |
| Happy DOM             | 20.9.0  | Implementación ligera del DOM          |
| JSDOM                 | 29.0.2  | Simulación completa del navegador      |

### Linting y Análisis de Código

| Tecnología           | Versión | Propósito                   |
| -------------------- | ------- | --------------------------- |
| ESLint               | 9.39.4  | Análisis estático de código |
| ESLint JS            | 9.39.4  | Plugin base de ESLint       |
| React Hooks Plugin   | 7.1.1   | Reglas para hooks de React  |
| React Refresh Plugin | 0.5.2   | Validación de Fast Refresh  |

### Type Checking (Opcional)

| Tecnología       | Versión  | Propósito                    |
| ---------------- | -------- | ---------------------------- |
| TypeScript Types | 19.2.14+ | Tipos para React y React DOM |

### Versión de Node

- **Mínima:** 14.0.0
- **Recomendada:** 18.0.0 o superior
- **Package Manager:** npm 8.0.0+ o pnpm 7.0.0+

---

## Especificaciones de Componentes

### Estructura de Directorio y Responsabilidades

```
src/
├── components/
│   ├── layout/
│   │   ├── Header.jsx           # Navegación principal, logo, Zen Mode toggle
│   │   ├── Header.css
│   │   ├── Navbar.jsx           # Navegación móvil (inferior)
│   │   └── Navbar.css
│   │
│   ├── dashboard/
│   │   ├── Timer.jsx            # Componente visual del cronómetro
│   │   ├── Timer.css
│   │   ├── TimerControls.jsx    # Botones Play/Pause/Stop
│   │   ├── TimerControls.css
│   │   ├── ProjectTaskManager.jsx # Selectores de proyecto/tarea
│   │   ├── ProjectTaskManager.css
│   │   ├── DailyLog.jsx         # Listado de sesiones del día
│   │   └── DailyLog.css
│   │
│   └── weather/
│       ├── WeatherWidget.jsx    # Display de clima actual
│       └── WeatherWidget.css
│
├── context/
│   ├── FocusContext.jsx         # Estado global de aplicación
│   └── WeatherContext.jsx       # Estado de integración de clima
│
├── hooks/
│   ├── useFlowTimer.js          # Lógica de cronómetro reutilizable
│   └── useMediaQuery.js         # Detección de breakpoints media query
│
├── pages/
│   ├── HomePage.jsx             # Página principal (Dashboard)
│   ├── HomePage.module.css
│   ├── WrapUpPage.jsx           # Página de análisis diario
│   ├── WrapUpPage.module.css
│   ├── ProjectPage.jsx          # Página de archivo de proyectos
│   └── ProjectPage.module.css
│
├── App.jsx                      # Componente raíz
├── App.css                      # Estilos globales
├── main.jsx                     # Punto de entrada
├── index.css                    # Resets y variables CSS
│
└── db.json                      # Base de datos mock/inicial (si aplica)
```

### Componentes Críticos - Especificación Detallada

#### Component: Timer.jsx

**Props:**

```javascript
{
  duration: number,           // Duración en segundos
  isRunning: boolean,        // Estado del cronómetro
  isZen: boolean            // Activación de Zen Mode
}
```

**Comportamiento:**

- Mostrar duración en formato MM:SS
- Actualización en tiempo real
- Aplicar estilos diferenciados en Zen Mode (mayor tipografía, menos decoración)

**Dependencias:**

- FocusContext (para isZen)

---

#### Component: TimerControls.jsx

**Props:**

```javascript
{
  isRunning: boolean,
  onStart: function,
  onPause: function,
  onStop: function,
  onReset: function
}
```

**Estados de Botón:**

- Inicial: Mostrar botón "Iniciar"
- En ejecución: Mostrar botón "Pausar"
- En pausa: Mostrar botón "Reanudar"
- Previo al stop: Confirmación de guardado

---

#### Component: ProjectTaskManager.jsx

**Props:**

```javascript
{
  onProjectChange: function,
  onTaskChange: function,
  selectedProject: string,
  selectedTask: string,
  projects: array
}
```

**Funcionalidad:**

- Primer select: Dropdown de proyectos o input para crear nuevo
- Segundo select: Dropdown de tareas del proyecto seleccionado
- Validación: No permitir iniciar sesión sin ambos seleccionados
- Crear proyectos dinámicamente si se ingresa texto en proyecto

---

#### Component: DailyLog.jsx

**Props:**

```javascript
{
  sessions: array,          // Array de sesiones del día
  onDeleteSession: function
}
```

**Renderización:**

```javascript
sessions.map((session) => (
  <SessionCard key={crypto.randomUUID()} session={session} />
));
```

**Características:**

- UUID dinámico para cada render (reconciliación eficiente del DOM)
- Mostrar: hora inicio, proyecto, tarea, duración, descanso sugerido
- Botón de eliminar con confirmación

---

#### Custom Hook: useFlowTimer.js

**Signatura:**

```javascript
const useFlowTimer = () => {
  return {
    duration: number,
    isRunning: boolean,
    isPaused: boolean,
    start: function,
    pause: function,
    resume: function,
    stop: function,
    reset: function,
    getFormattedTime: function
  };
};
```

**Lógica Interna:**

- Estado: duration, isRunning, isPaused
- useEffect para gestionar setInterval
- Limpieza automática en desmontaje
- Cálculos de duración en milisegundos, conversión a segundos para display

---

#### Hook: useMediaQuery.js

**Signatura:**

```javascript
const useMediaQuery = (query: string): boolean => {
  // Retorna true si la media query es verdadera
};
```

**Ejemplo de Uso:**

```javascript
const isMobile = !useMediaQuery("(min-width: 769px)");
```

---

#### Context: FocusContext.jsx

**Estado:**

```javascript
{
  projects: [
    { id, name, status: 'active' | 'finished', createdAt },
    ...
  ],
  sessions: [
    {
      id,
      projectId,
      projectName,
      taskName,
      duration,        // en segundos
      breakTime,       // sugerido (duration / 5)
      startTime,
      endTime,
      createdAt        // ISO timestamp
    },
    ...
  ],
  selectedProject: string,
  selectedTask: string,
  isZen: boolean
}
```

**Métodos:**

- `addSession(session)` - Inserta nueva sesión inmutablemente
- `addProject(projectName)` - Crea nuevo proyecto
- `deleteSession(sessionId)` - Elimina sesión por ID
- `setSelectedProject(projectId)`
- `setSelectedTask(taskName)`
- `toggleZenMode()`
- `finishProject(projectId)` - Marca proyecto como finalizado
- `loadFromStorage()` - Recupera estado de localStorage

**Persistencia:**

- useEffect en cada cambio de estado que ejecute: `localStorage.setItem('focusData', JSON.stringify(state))`
- useEffect en montaje que intente recuperar del localStorage

---

#### Context: WeatherContext.jsx

**Estado:**

```javascript
{
  weather: {
    temperature: number,
    description: string,
    icon: string,
    location: string
  },
  loading: boolean,
  error: string | null,
  lastUpdate: ISO8601
}
```

**Métodos:**

- `fetchWeather(latitude, longitude)` - Obtiene clima de API
- `setError(error)` - Maneja errores
- `clearError()` - Limpia estado de error

**API Integration:**

- Usar geolocalización del navegador para obtener coordenadas
- Consumir OpenWeatherMap API u equivalente
- Credenciales via `.env` (VITE_WEATHER_API_KEY)
- Retry logic en caso de fallo
- Cache local con timestamp para evitar solicitudes frecuentes

---

## Flujos de Usuario

### Flujo 1: Inicio de Sesión de Trabajo

```
Usuario abre la aplicación
    ↓
Carga la homepage con Dashboard
    ↓
Selecciona o crea proyecto en dropdown
    ↓
Selecciona o crea tarea en segundo dropdown
    ↓
Hace clic en "Iniciar Sesión"
    ↓
Cronómetro comienza a contar
    ↓
Usuario trabaja (hace clic en "Pausar" si es necesario)
    ↓
Hace clic en "Finalizar Sesión" cuando termina
    ↓
Sistema muestra resumen: proyecto, tarea, duración, descanso sugerido
    ↓
Usuario confirma guardado
    ↓
Sesión aparece en Daily Log
    ↓
Cronómetro se reinicia
    ↓
Toast: "Sesión guardada. Descansa [X] minutos"
```

### Flujo 2: Revisión Diaria (Wrap-Up)

```
Usuario hace clic en "Wrap-Up" en navegación
    ↓
Sistema agrega todas las sesiones del día
    ↓
Muestra KPIs:
- Tiempo total de trabajo
- Número de tareas únicas
- Total de sesiones
    ↓
Muestra breakdown visual por tarea
    ↓
Usuario revisa distribución de tiempo
    ↓
Opcionalmente, usuario puede:
  - Hacer clic en tarea para ver detalle
  - Exportar/compartir métricas (futuro)
  - Ver comparativa con días anteriores (futuro)
```

### Flujo 3: Análisis de Proyecto

```
Usuario hace clic en "Proyectos"
    ↓
Ve listado de tarjetas de proyecto
    ↓
Filtrado opcional: Ver todos vs. solo activos
    ↓
Usuario selecciona un proyecto
    ↓
Carga página de detalle del proyecto
    ↓
Muestra:
- Información general del proyecto
- Total de sesiones
- Tiempo acumulado
- Desglose de tareas dentro del proyecto
- Timeline de últimas sesiones
    ↓
Usuario puede hacer clic en "Finalizar Proyecto"
    ↓
Modal de confirmación
    ↓
Proyecto pasa a estado "completado"
    ↓
Retorna al listado
```

### Flujo 4: Zen Mode

```
Usuario en dashboard
    ↓
Hace clic en botón "Zen" en header
    ↓
Interfaz se transforma:
- Fondo oscuro
- Navbar desaparece
- Solo cronómetro y controles visibles
- Colores invertidos
    ↓
Usuario puede trabajar sin distracciones
    ↓
Hace clic en "Zen" nuevamente para salir
    ↓
Interfaz vuelve a normal
```

---

## Estándares de Código y Mejores Prácticas

### Estructura de Ficheros y Nomenclatura

**Convención de Nombres:**

- Componentes: PascalCase (`Timer.jsx`, `ProjectTaskManager.jsx`)
- Hooks personalizados: camelCase con prefijo `use` (`useFlowTimer.js`)
- Archivos CSS: Mismo nombre que componente (`.css` o `.module.css`)
- Variables y funciones: camelCase (`handleStartTimer`, `focusData`)
- Constantes: UPPER_SNAKE_CASE (`MAX_DURATION`, `DEFAULT_BREAK_TIME`)

**Estructura de Componente:**

```javascript
// 1. Imports
import React, { useState, useEffect } from "react";
import "./Component.css";

// 2. Constantes
const DEFAULT_VALUE = 10;

// 3. Componente
function MyComponent({ prop1, prop2 }) {
  // 3a. Estado
  const [state, setState] = useState(null);

  // 3b. Contexto
  const { focusData } = useFocusContext();

  // 3c. Effects
  useEffect(() => {
    // lógica
  }, []);

  // 3d. Handlers
  const handleClick = () => {};

  // 3e. Cálculos / Memoización
  const computed = useMemo(() => {}, []);

  // 3f. Render
  return <div className="my-component">{/* JSX */}</div>;
}

export default MyComponent;
```

### Estándares de JavaScript

**Inmutabilidad:**

```javascript
// Arrays
const newArray = [...oldArray, newItem];
const filtered = array.filter((item) => item.id !== id);
const mapped = array.map((item) => ({ ...item, updated: true }));

// Objetos
const updated = { ...oldObject, newProp: value };
```

**Naming de Funciones:**

```javascript
// Handlers
const handleClick = () => {};
const handleChange = () => {};
const handleSubmit = () => {};

// Getters
const getFormattedTime = () => {};
const calculateTotal = () => {};
const getProject = (id) => {};

// Validadores
const isValid = () => {};
const hasError = () => {};
const canStart = () => {};
```

**Condicionales:**

```javascript
// Preferir operador ternario para JSX
{
  isRunning ? <PauseButton /> : <StartButton />;
}

// Preferir optional chaining
const value = obj?.property?.nested ?? defaultValue;

// Preferir nullish coalescing
const count = data?.count ?? 0;
```

### Estándares de CSS

**Arquitectura BEM (Block Element Modifier):**

```css
/* Block */
.timer {
}

/* Element */
.timer__display {
}
.timer__button {
}

/* Modifier */
.timer--running {
}
.timer--zen-mode {
}
.timer__button--primary {
}
.timer__button--danger {
}
```

**Variables CSS:**

```css
:root {
  --color-primary: #0066cc;
  --color-secondary: #00aa44;
  --color-accent: #ff8800;

  --spacing-xs: 4px;
  --spacing-sm: 8px;
  --spacing-md: 16px;
  --spacing-lg: 24px;

  --font-size-body: 16px;
  --font-size-small: 14px;

  --transition-normal: 250ms ease-in-out;
  --transition-fast: 150ms ease-in-out;
}
```

**Mobile-First Responsive:**

```css
/* Base: Mobile */
.component {
  display: block;
  width: 100%;
  font-size: 14px;
}

/* Tablet and up */
@media (min-width: 769px) {
  .component {
    display: grid;
    font-size: 16px;
  }
}

/* Desktop */
@media (min-width: 1025px) {
  .component {
    max-width: 1200px;
  }
}
```

### Manejo de Errores

**Try-Catch para Operaciones Críticas:**

```javascript
useEffect(() => {
  try {
    const data = JSON.parse(localStorage.getItem("focusData"));
    setFocusData(data);
  } catch (error) {
    console.error("Failed to load from localStorage:", error);
    setFocusData(defaultState);
  }
}, []);
```

**API Error Handling:**

```javascript
const fetchWeather = async (lat, lon) => {
  try {
    const response = await fetch(apiUrl);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    return await response.json();
  } catch (error) {
    setError(error.message);
    return null;
  }
};
```

### Comentarios y Documentación

**Comentarios de Bloques:**

```javascript
/**
 * Calcula el tiempo de descanso recomendado basado en la duración de la sesión.
 * Formula: breakTime = sessionDuration / 5
 *
 * @param {number} duration - Duración de la sesión en segundos
 * @returns {number} Tiempo de descanso recomendado en segundos
 */
const calculateBreakTime = (duration) => {
  return Math.round(duration / 5);
};
```

**Comentarios Inline:**

```javascript
// Generar UUID único para cada sesión
const sessionId = crypto.randomUUID();

// Usar spread operator para garantizar immutabilidad
const updatedSessions = [...sessions, newSession];
```

---

## Testing y Control de Calidad

### Estrategia de Testing

**Enfoque Pirámide:**

- 70% Unit Tests
- 20% Integration Tests
- 10% E2E Tests (manual por ahora)

### Unit Tests

**Cobertura Objetivo:** >= 80% de líneas de código

**Archivos de Test:**

```
tests/
├── Timer.test.jsx           # Componente Timer
├── ProjectTaskManager.test.jsx
├── FocusContext.test.jsx    # Contexto global
├── useFlowTimer.test.js     # Custom hook
└── setup.js                 # Configuración de vitest
```

**Ejemplo: useFlowTimer.test.js**

```javascript
import { renderHook, act } from "@testing-library/react";
import { useFlowTimer } from "../src/hooks/useFlowTimer";

describe("useFlowTimer", () => {
  test("inicia el cronómetro correctamente", () => {
    const { result } = renderHook(() => useFlowTimer());

    act(() => {
      result.current.start();
    });

    expect(result.current.isRunning).toBe(true);
  });

  test("calcula el tiempo de descanso correctamente", () => {
    const { result } = renderHook(() => useFlowTimer());

    // Set duration a 300 segundos (5 minutos)
    act(() => {
      result.current.setDuration(300);
    });

    const breakTime = result.current.getBreakTime();
    expect(breakTime).toBe(60); // 300 / 5 = 60 segundos
  });
});
```

**Ejemplo: Timer.test.jsx**

```javascript
import { render, screen } from "@testing-library/react";
import Timer from "../src/components/dashboard/Timer";

describe("Timer Component", () => {
  test("renderiza el tiempo en formato MM:SS", () => {
    render(<Timer duration={125} isRunning={false} />);
    expect(screen.getByText("02:05")).toBeInTheDocument();
  });
});
```

### Ejecutar Tests

```bash
# Ejecutar todos los tests
npm test

# Modo watch (rerun on file change)
npm test -- --watch

# Interface UI
npm run test:ui
```

### Integration Tests

**Criterios:**

- Flujo completo de inicio a cierre de sesión
- Interacción entre múltiples componentes
- Sincronización del contexto global

**Ejemplo:**

```javascript
test("flujo completo: crear sesión y guardar en contexto", () => {
  // 1. Renderizar App
  // 2. Seleccionar proyecto y tarea
  // 3. Iniciar cronómetro
  // 4. Esperar 5 segundos
  // 5. Finalizar sesión
  // 6. Validar que aparezca en Daily Log
  // 7. Validar que esté en FocusContext
});
```

### Checklist de QA

Antes de cada merge/release:

- [ ] Todos los tests pasen (npm test)
- [ ] ESLint sin errores (npm run lint)
- [ ] Build sin warnings (npm run build)
- [ ] Navegar por todas las rutas sin errores en consola
- [ ] Verificar funcionalidad en Chrome, Firefox, Safari
- [ ] Verificar responsividad en devices 320px, 768px, 1024px+
- [ ] Verificar accesibilidad: navegación por teclado, screen reader
- [ ] Verificar persistencia: recargar página, datos persisten
- [ ] Verificar limpieza de estado: localStorage no acumula basura

---

## Rendimiento y Optimizaciones

### Web Vitals

**Métricas Objetivo:**

- **LCP (Largest Contentful Paint):** < 2.5 segundos
- **FID (First Input Delay):** < 100 milisegundos
- **CLS (Cumulative Layout Shift):** < 0.1

### Optimizaciones Implementadas

**1. Code Splitting**

```javascript
// React Router lazy loading (si fuera necesario)
const HomePage = React.lazy(() => import("./pages/HomePage"));
const WrapUpPage = React.lazy(() => import("./pages/WrapUpPage"));
```

**2. Memoización de Componentes**

```javascript
// Prevenir re-renders innecesarios
export default React.memo(Timer);

// useCallback para funciones estables
const handleTimer = useCallback(() => {
  // lógica
}, []);

// useMemo para cálculos costosos
const totalTime = useMemo(() => {
  return sessions.reduce((acc, s) => acc + s.duration, 0);
}, [sessions]);
```

**3. CSS Optimization**

- Minificación automática por Vite
- Eliminación de CSS sin usar
- Variables CSS para evitar duplicación

**4. Image Optimization**

- Iconos SVG (Lucide React) en lugar de PNGs
- Compresión de cualquier imagen estática

**5. LocalStorage Efficiency**

- Serializar solo datos necesarios
- Limitar tamaño de sesiones históricas
- Implementar archivado de datos antiguos (futuro)

### Monitoreo de Performance

```javascript
// Medir tiempo de una sesión
performance.mark("session-save-start");
saveSession(sessionData);
performance.mark("session-save-end");
performance.measure("session-save", "session-save-start", "session-save-end");

const measure = performance.getEntriesByName("session-save")[0];
console.log(`Session save took ${measure.duration}ms`);
```

---

## Consideraciones de Seguridad

### Data Protection

1. **LocalStorage Encryption (Futuro):**
   - Considerar librerías como crypto-js para sensibilidad
   - Actualmente: localStorage es suficiente (dato no sensible)

2. **API Credentials:**
   - Nunca commitear .env files
   - Usar variables de entorno (VITE_WEATHER_API_KEY)
   - Archivo .gitignore incluye .env

3. **XSS Prevention:**
   - React automáticamente escapa JSX
   - Usar dangerouslySetInnerHTML solo si es absolutamente necesario
   - Validar y sanitizar datos de usuario

4. **CSRF Protection:**
   - No aplica (no hay backend tradicional)
   - Si se agrega backend: implementar tokens CSRF

### Code Security

- ESLint rules para detectar patrones inseguros
- Dependencias auditadas regularmente (npm audit)
- Actualización periódica de dependencias
- No usar eval() o similar

---

## Deployment y Hosting

### Build Process

```bash
npm run build
```

Output: Carpeta `dist/` lista para servir

**Archivos generados:**

- `dist/index.html` - Punto de entrada
- `dist/assets/` - JS, CSS, imágenes compiladas
- Source maps (debug en producción si es necesario)

### Hosting: Netlify

**Configuración (netlify.toml):**

```toml
[build]
command = "npm run build"
publish = "dist"

[[redirects]]
from = "/*"
to = "/index.html"
status = 200
```

**Ventajas:**

- Deploy automático desde git
- HTTPS gratuito
- CDN global
- Funciones serverless (si fuera necesario)
- Monitoreo de performance

### Variables de Entorno

**Archivo: .env** (NO committear)

```
VITE_WEATHER_API_KEY=tu_api_key_aqui
```

**Acceso en código:**

```javascript
const apiKey = import.meta.env.VITE_WEATHER_API_KEY;
```

**Configurar en Netlify:**

1. Ir a Site Settings > Build & Deploy > Environment
2. Agregar variables de entorno

### Checklist de Producción

- [ ] Build ejecutado sin errores
- [ ] No hay console errors o warnings
- [ ] LocalStorage funciona correctamente
- [ ] API Externa (clima) funciona con credenciales de producción
- [ ] HTTPS habilitado
- [ ] Redirects configurados (SPA routing)
- [ ] Caching headers adecuados
- [ ] Performance > 90 (PageSpeed Insights)

---

## Roadmap Futuro

### V1.1 - Enhancements

**Funcionalidades:**

- Exportar datos diarios a CSV
- Calendario visual de productividad
- Objetivos semanales/mensuales
- Sincronización multi-dispositivo (backend simple)
- Integración con Slack/Discord para notificaciones
- Tema oscuro nativo (prefers-color-scheme)

**Mejoras UX:**

- Drag & drop para reordenar sesiones
- Edición inline de duración/proyecto de sesión
- Atajos de teclado (Ctrl+T para iniciar, Ctrl+P para pausar)
- Gesturas en móvil (swipe para navegación)

### V1.2 - Backend Integration

**Arquitectura:**

- Migrate a backend simple (Node.js + Express + MongoDB)
- Sincronización de datos entre dispositivos
- Autenticación con OAuth (Google, GitHub)
- Backup automático de datos

**Nuevas Funcionalidades:**

- Historial completo de todos los tiempos (no solo sesión actual)
- Reportes generados (PDF, Excel)
- Análisis predictivo de productividad
- Badges/Achievements por hitos

### V2.0 - Plataforma Colaborativa

- Equipo de desarrollo (visible/privado)
- Benchmarking anónimo de productividad
- Sesiones compartidas en equipo
- Integración con Jira/GitHub Issues
- API pública para integraciones de terceros

---

## Referencias y Metodologías

**Metodología Flowtime:**

- Investigación y artículos sobre flujo profundo (Deep Work - Cal Newport)
- Mejoras sobre Pomodoro para trabajo cognitivo

**Estándares Web:**

- WCAG 2.1 AA para accesibilidad
- MDN Web Docs para referencias técnicas
- Can I Use para compatibilidad de navegadores

**Frameworks y Librerías:**

- React 19 Documentation
- React Router v7 API Reference
- Vite Build Tool Documentation

---

## Historial de Versiones

| Versión | Fecha      | Cambios                        |
| ------- | ---------- | ------------------------------ |
| 1.0     | Abril 2026 | Release inicial - MVP completo |

---

## Contacto y Soporte

**Autor del Proyecto:** [Nombre del Desarrollador]
**Email:** [email@example.com]
**Repositorio:** [Link a GitHub/GitLab]
**Issues/Bugs:** [Sistema de tracking]

---

**Documento Generado:** Abril 2026  
**Última Revisión:** Abril 2026  
**Estado del Documento:** Vigente
