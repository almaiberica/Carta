# CLAUDE.md — Alma Ibérica · Carta Digital

Este archivo da instrucciones a Claude Code cuando trabaja en este repo.
Léelo entero antes de tocar cualquier fichero.

---

## Permisos y modo de trabajo

- **Actúa sin pedir confirmación.** Edita, crea y elimina ficheros directamente.
- **No preguntes** antes de hacer cambios obvios o menores.
- Si hay varias formas de resolver algo, elige la más simple y hazlo. Menciona las alternativas al final si es relevante.
- Solo interrumpe si hay una decisión que cambia arquitectura o borra datos irreversiblemente.
- Al terminar, resume qué has hecho y qué ficheros has tocado. Nada más.

---

## Proyecto

Web app de carta digital para **Alma Ibérica — Tapeo Selecto** (Sant Boi de Llobregat, Barcelona).
La spec completa está en `Descargas/superprompt_alma_iberica_v4.md`.

---

## Stack

- React 19 + Vite 6 + TypeScript
- Tailwind CSS v4 (`@tailwindcss/vite`)
- GSAP 3 + ScrollTrigger
- lucide-react (iconos)
- Deploy: Vercel ← GitHub (`github.com/almaiberica/Carta`)
- Sin backend: estado en `localStorage`, sin API, sin base de datos

> **Nota Linux:** si `npm run build` falla con "Cannot find native binding", ejecutar:
> `npm install @tailwindcss/oxide-linux-x64-gnu`

---

## Estructura del repositorio

```
alma iberica /
├── web/
│   ├── src/
│   │   ├── data.ts             ← ÚNICO archivo de datos del menú
│   │   ├── App.tsx
│   │   ├── components/
│   │   ├── hooks/
│   │   └── lib/shareImage.ts
│   └── public/images/          ← fotos en .webp (subidas manualmente)
├── Contenido/
├── guiones/
├── marketing/
└── claude/prompts/
```

```bash
cd "alma iberica /web"
npm install
npm run dev
npm run build
npm run preview
```

---

## Regla de oro: datos del menú

**El Excel `AlmaIberica_Carta_Completa_2026.xlsx` es la única fuente de verdad.**

- Solo mostrar platos con `Mostrar en carta = Sí` (~57 de 139)
- Los datos van **únicamente** en `src/data.ts`, dentro del bloque delimitado:

```ts
/* INICIO DATOS */
export const MENU_DATA: Record<string, Dish[]> = { ... };
/* FIN DATOS */
```

- Al actualizar el menú, regenerar **solo** ese bloque. No tocar el resto del código.
- Columna `Bloque menu` define la categoría:
  - `Bocadillos` → `bocadillos`
  - `Tapeo y Vermut` → `tapeo`
  - `Platos Principales` → `platos`
  - `Bodega y Bebidas` → `bebidas`
- `img` = `/images/` + valor columna `Archivo imagen` + `.webp`. Si vacío → `img: ""` (usa `foto_proximamente.webp`)

---

## Identidad visual

| Variable CSS | Valor | Uso |
|---|---|---|
| `--bg` | `#000000` | Fondo de toda la app |
| `--red` | `#EE2737` | Nombres de plato, acentos, CTA, like activo |
| `--white` | `#FFFFFF` | Texto general, precios |
| `--gray` | `rgba(255,255,255,0.6)` | Alérgenos, texto secundario |

- **Fuentes:** Oswald (títulos, precios, nav) + Nunito Sans (descripciones, alérgenos) — solo Google Fonts
- `max-width: 430px` centrado, mobile-first, iOS Safari + Android Chrome
- GSAP solo para animaciones premium (transiciones, likes, stagger). Nunca para layout.

---

## Arquitectura

**Modo Real (Reels):**
- `scroll-snap-type: y mandatory`, cada plato ocupa `100dvh`
- Bucle infinito: array triplicado + salto silencioso
- Acciones por reel en columna derecha: carrito, like, compartir

**Modo Carta:**
- Lista vertical agrupada por categoría
- Thumbnail 72×72px
- Stagger GSAP al hacer scroll

**localStorage:**
- `alma_comanda` → carrito (visual, no envía pedido)
- `alma_antojos` → favoritos/likes

---

## Imágenes

- Todas en `public/images/*.webp`, máx 800×1200px, ~75% calidad, <150KB
- Sin tildes ni espacios en nombres de archivo
- `foto_proximamente.webp` = placeholder para platos sin foto
- Las sube la dueña manualmente desde VS Code

---

## Constantes a recordar

**`MenuOverlay.tsx`** — `RESERVAS`: cambiar cuando haya enlace real (TheFork, WhatsApp...)
Actualmente: `alert('Reservas próximamente')`

**Negocio:**
- Instagram: `https://www.instagram.com/almaibericaa/`
- WhatsApp: `https://wa.me/34635343819`
- Horarios: Lun–Jue 08:00–20:00 · Vie–Dom 08:00–00:00

---

## Reglas de código

- Tipar siempre los props de componentes nuevos. No usar `any` salvo que sea inevitable (y documentarlo).
- No añadir dependencias nuevas sin mencionarlo.
- No tocar el Excel desde código.
- No añadir backend ni llamadas a API externas.
- Nombres de imagen: sin tildes, sin espacios, siempre `.webp`.

---

## Estado actual

- App React 19 + Vite en `web/` — **build limpio** (`npm run build` OK)
- 10 imágenes en `web/public/images/` (sin tildes ni espacios)
- `foto_proximamente.webp` pendiente de crear/añadir en `public/images/`
- Repositorio GitHub aún no creado — pendiente `gh auth login` + `gh repo create`
- Constante `RESERVAS` en `MenuOverlay.tsx`: cambiar cuando haya enlace real