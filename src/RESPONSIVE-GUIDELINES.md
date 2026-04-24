# 📱 Guía de Diseño Responsive - SAP Dashboard

## Breakpoints Tailwind (Usados en el proyecto)

```
sm: 640px   - Tablets pequeñas
md: 768px   - Tablets
lg: 1024px  - Laptops
xl: 1280px  - Desktops grandes
```

## Tipografía Responsive

### Implementado con `clamp()`
```css
- Base: clamp(14px, 2vw, 16px)
- Small: clamp(12px, 1.5vw, 14px)
- Large: clamp(18px, 3vw, 24px)
- Extra Large: clamp(20px, 4vw, 28px)
```

**Ventaja:** Escala fluida sin media queries adicionales.

---

## Estructura Mobile-First

### 1. **Header**
```
Móvil:
- Título comprimido
- Botones apilados
- Iconos solo (sin texto)
- Usuario abajo

Tablet/Desktop:
- Título normal
- Botones lado a lado
- Texto visible
- Usuario en header
```

### 2. **Navegación de Módulos**
```
Móvil:
- Solo iconos (hamburger menu en botón flotante)
- Ocupan menos espacio

Tablet/Desktop:
- Iconos + texto
- Todos visibles en fila
- Descripción en tooltip
```

### 3. **Filtros**
```
Móvil:
- Apilados verticalmente
- Ancho completo
- Fuente legible

Tablet/Desktop:
- Lado a lado
- Ancho restringido
- Compactos
```

### 4. **KPI Cards**
```
Móvil:    grid-cols-1 (1 columna)
Tablet:   grid-cols-2 (2 columnas)
Desktop:  grid-cols-5 (5 columnas)
```

---

## Mejoras Implementadas

### ✅ Tipografía Adaptativa
- Font-size dinámico con `clamp()`
- Line-height legible
- Spacing proporcional

### ✅ Touch-friendly
- Botones mínimo 44px altura (área de toque iOS)
- Font-size 16px en inputs (previene zoom iOS)
- Gap suficiente entre elementos

### ✅ Rendimiento
- Overflow oculto en móvil (no horizontal scroll)
- Imágenes lazy-loaded
- CSS minificado

### ✅ Accesibilidad
- Contraste suficiente
- Focus visible en inputs
- Soporte para prefers-reduced-motion

### ✅ Notches & Safe Area
- Soporte para iPhone X+ notches
- Safe area insets aplicados

---

## Patrones Responsive en Componentes

### 1. **Grid Responsivo**
```jsx
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
  {/* Responsive: 1 col → 2 cols → 3 cols */}
</div>
```

### 2. **Ocultar en Móvil**
```jsx
<div className="hidden sm:block">
  {/* Solo visible en tablet+ */}
</div>

<div className="sm:hidden">
  {/* Solo en móvil */}
</div>
```

### 3. **Botones Responsivos**
```jsx
<button className="w-full sm:w-auto px-2 sm:px-4">
  {/* Ancho completo en móvil, auto en desktop */}
</button>
```

### 4. **Texto Comprimido**
```jsx
<span className="hidden md:inline">Texto largo</span>
<span className="inline md:hidden">Abr</span>
```

---

## Testing Responsive

### Mobile (375px - 479px)
- iPhone SE, iPhone 12 mini
- Verificar: Botones, Inputs, Navegación

### Tablet (768px - 1023px)
- iPad, Samsung Tab
- Verificar: Grid, Gráficos, Tablas

### Desktop (1024px+)
- Laptops, Monitores
- Verificar: Layouts, Espaciado

---

## Herramientas DevTools

### Chrome/Edge DevTools
1. **F12** → Device Toolbar
2. Seleccionar dispositivo (iPhone, iPad, etc)
3. Rotar pantalla (landscape/portrait)
4. Escalar viewport

### Firefox DevTools
1. **F12** → Responsive Design Mode
2. Mismo proceso que Chrome

---

## Performance Optimization

### ✅ Implementado
- CSS Variables para temas
- Tailwind PurgeCSS (producción)
- Lazy loading de gráficos
- Minificación automática (Vite)

### 📊 Recomendaciones Futuras
- Image optimization (next/image)
- Code splitting por módulos
- Service workers para offline
- Cache API responses

---

## Checklist para Nueva Página/Componente

- [ ] Funciona en 375px (móvil pequeño)
- [ ] Funciona en 768px (tablet)
- [ ] Funciona en 1920px (desktop grande)
- [ ] Buttons ≥ 44px altura
- [ ] Inputs con font-size 16px
- [ ] Focus visible en elementos interactivos
- [ ] Sin horizontal scroll
- [ ] Textos legibles
- [ ] Contraste WCAG AA
- [ ] Imagen responsive

---

## Clases Útiles Personalizadas

```css
.hide-mobile        /* display: none en mobile */
.show-mobile        /* display: block en mobile */
.hide-tablet        /* display: none en tablet */
.show-tablet        /* display: block en tablet */
.hide-desktop       /* display: none en desktop */
.show-desktop       /* display: block en desktop */
.safe-area          /* Padding con safe-area-inset */
.flex-center        /* flex + center */
.flex-between       /* flex + space-between */
.no-print           /* display: none en print */
```

---

## Ejemplos de Uso

### Layout Responsivo Completo
```jsx
<div className="flex flex-col sm:flex-row gap-4">
  <aside className="w-full sm:w-64">Sidebar</aside>
  <main className="flex-1">Content</main>
</div>
```

### Tarjeta Responsiva
```jsx
<div className="bg-white rounded-lg p-3 sm:p-4 md:p-6">
  <h2 className="text-lg sm:text-xl md:text-2xl">Título</h2>
  <p className="text-xs sm:text-sm md:text-base">Contenido</p>
</div>
```

### Tabla Responsiva
```jsx
<div className="overflow-x-auto">
  <table className="w-full text-xs sm:text-sm">
    {/* Contenido */}
  </table>
</div>
```

---

## Notas Finales

- **Mobile-first**: Diseña para móvil primero, luego expande
- **Testing**: Prueba en dispositivos reales, no solo DevTools
- **Performance**: Menos es más en móvil
- **A11y**: Accesibilidad = mejor UX para todos

---

**Última actualización:** Abril 2026
**Versión:** 1.0
