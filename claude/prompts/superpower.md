---
name: superpower-carta
description: Usa este skill para revisar, mejorar, debuggear o potenciar el código de la app Carta de Alma Ibérica. Actívalo cuando el usuario pegue código de la app, mencione un bug, quiera añadir una funcionalidad, pida revisar un componente, o diga cosas como "algo no funciona", "cómo añado X", "revisa esto", "optimiza esto", "el build falla", "TypeScript me da error". También actívalo si el usuario menciona Vercel, GitHub, Vite, React, o cualquier fichero de la app (data.ts, App.tsx, ReelsView, etc).
---

# Superpower — App Carta Alma Ibérica

## Contexto del proyecto

**Repo:** github.com/almaiberica/Carta  
**Deploy:** Vercel (auto-deploy en push a main)  
**Stack:** React 18 + Vite + TypeScript  
**Gestión de código:** VS Code (source control) o terminal

### Arquitectura
- `src/data.ts` — fuente única de verdad. Todos los productos, precios y metadatos del menú están aquí. Bloques delimitados por comentarios para fácil edición.
- `src/App.tsx` — entrada principal, routing entre modos
- Dos modos de visualización:
  - **Modo Real** — Reels-style, scroll-snap vertical, loop infinito (array triplicado + salto silencioso)
  - **Modo Carta** — lista categorizada por secciones
- **Mi Comanda** — carrito visual (sin backend)
- **Mis Antojos** — favoritos via localStorage
- Overlay hamburguesa: reservas, redes sociales, horario/ubicación, botón llamada

### Orden de navegación
`bocadillos → tapeo → platos → bebidas`

### Diseño
- Fondo: `#000000`
- Acento: `#EE2737`
- Texto: `#FFFFFF`
- Tipografía: Oswald (títulos) + Nunito Sans (cuerpo)
- Animaciones: GSAP (transiciones premium, partículas en like-button)
- Share: genera imagen 9:16 en canvas

### Menú (fuente: Excel AlmaIberica_Carta_Completa_2026.xlsx)
- 57 productos visibles filtrados por `Mostrar en carta = Sí`
- 2 Bocadillos, 31 Tapeo, 15 Platos, 9 Bebidas
- Imágenes en `/public/images/` — extensiones mixtas (.jpg / .webp), sin tildes en nombres de archivo

---

## Modo revisión de código

Cuando el usuario pegue código o describa un problema:

1. **Identificar el tipo de issue:**
   - Bug / comportamiento inesperado
   - Error TypeScript
   - Build/deploy fallido en Vercel
   - Rendimiento o experiencia de usuario
   - Imagen que no carga

2. **Diagnóstico rápido:** decir exactamente qué está mal y por qué

3. **Fix concreto:** código corregido listo para pegar, no explicaciones abstractas

4. **Alertas colaterales:** si el fix puede romper otra cosa, avisarlo

### Problemas conocidos / pendientes del proyecto
- `onOpenCart` no estaba conectado en ReelsView — verificar si ya está resuelto
- FAB sin usar en App.tsx — puede eliminarse
- Dos bocadillos marcados para display, resto sin flag — revisar data.ts
- Algunos items sin precio renderizan "Consultar" — comportamiento esperado o bug según contexto
- Categorías sin foto de producto necesitan placeholder

---

## Modo mejora y nuevas funcionalidades

Cuando el usuario quiera añadir algo nuevo:

1. **Entender el objetivo** — qué quiere el usuario que pase
2. **Proponer la solución más simple** que lo resuelva (no overengineering)
3. **Dar el código completo** del componente o función, con indicación de dónde insertarlo
4. **Indicar si hay que tocar data.ts** — cualquier cambio de menú va siempre ahí primero

### Ideas de mejora habituales para este tipo de app
- Filtros por alérgenos en Modo Carta
- Animación de entrada por categoría
- Modo oscuro/claro (ya está en negro, pero podría haber variante)
- Compartir plato individual (no solo la comanda)
- Badge contador en carrito visible desde Modo Real
- Swipe horizontal para navegar entre categorías en Modo Carta

---

## Reglas de código para este proyecto

- **Nunca tocar el Excel directamente desde código** — es la fuente de verdad del menú, los cambios van de Excel → data.ts → app
- **Imágenes:** nombres de archivo sin tildes, sin espacios, extensión consistente. Ruta: `/public/images/nombre.jpg`
- **TypeScript:** tipar siempre los props de componentes nuevos. No usar `any` salvo que sea inevitable y documentado.
- **GSAP:** solo para animaciones de UI premium (transiciones, likes). No para layout.
- **localStorage:** solo para favoritos (Mis Antojos). El carrito es estado en memoria, no persiste.
- **Sin backend:** la app es 100% estática. No añadir llamadas a API externas sin discutirlo.

---

## Workflow Git + Vercel

```
editar código en VS Code
→ guardar
→ Source Control en VS Code (o git add . && git commit -m "mensaje" && git push)
→ Vercel detecta el push y despliega automáticamente
→ revisar en la URL de Vercel
```

Si el deploy falla: revisar el log de Vercel. Los errores más comunes son TypeScript estricto y rutas de imagen incorrectas.

---

## Output esperado

- Código listo para copiar y pegar, con indicación del fichero y línea aproximada donde va
- Si son cambios en múltiples ficheros, indicarlos uno a uno en orden
- Sin explicaciones largas salvo que el usuario las pida
- Si algo no está claro, preguntar UNA cosa concreta antes de escribir código