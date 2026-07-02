# CLAUDE.md — Alma Ibérica · Sistema Completo

Este archivo da instrucciones a Claude Code para todo el proyecto.
Léelo entero antes de tocar cualquier fichero.

---

## Permisos y modo de trabajo

- **Actúa sin pedir confirmación.** Edita, crea y elimina ficheros directamente.
- **No preguntes** antes de hacer cambios obvios o menores.
- Si hay varias formas de resolver algo, elige la más simple y hazlo. Menciona las alternativas al final si es relevante.
- Solo interrumpe si hay una decisión que cambia arquitectura o borra datos irreversiblemente.
- Al terminar, resume qué has hecho y qué ficheros has tocado. Nada más.

---

## Identidad de marca

**Nombre:** Alma Ibérica — Tapeo Selecto
**Concepto:** Bar de tapas españolas y taberna gastronómica tradicional
**Especialidad:** Cerdo ibérico en todas sus formas
**Dirección:** Carrer Lluís Pascual Roca 38, Sant Boi de Llobregat, Barcelona
**Teléfono:** 625617176 · WhatsApp: https://wa.me/34625617176
**Email:** almaibericastb@gmail.com
**Instagram:** https://www.instagram.com/almaibericaa/ · TikTok: @alma.iberica7
**Google Maps:** https://share.google/nwD6QzDf4QYuVVWLo
**Reservas:** https://calendly.com/almaibericastb/30

**Horarios:**
- Lunes, martes, miércoles: 08:00–20:00
- Jueves, viernes: 08:00–23:30
- Sábado: 09:00–23:30
- Domingo: 09:00–16:00

**Voz de marca:** "tradicional y canalla" — directo, con orgullo de producto, sin poses gourmet

---

## Identidad visual

| Variable | Valor | Uso |
|---|---|---|
| `--bg` | `#000000` | Fondo de toda la app |
| `--red` | `#EE2737` | Nombres de plato, acentos, CTA |
| `--white` | `#FFFFFF` | Texto general, precios |
| `--gray` | `rgba(255,255,255,0.6)` | Texto secundario, alérgenos |

- **Tipografía:** Oswald (títulos, precios, nav) + Nunito Sans (descripciones)
- **Estilo visual:** Taberna española con carácter. Rústico pero con criterio.
- **Fotografía:** fondo oscuro/pizarra, iluminación dramática cálida, vertical 9:16

---

## Productos estrella

| Producto | Precio |
|---|---|
| Secreto Ibérico | 19,90€ |
| Lagarto Ibérico | 15,90€ |
| Carrilleras al Pedro Ximénez | 10,90€ |
| Croquetas de Jamón (x8) | 12,00€ |
| Bocadillo Especial de la Casa | 8,90€ |
| Serranito | 6,90€ |
| Bravas de la Casa | 5,90€ |
| Pincho Tortilla + Caña | 4,90€ |

**Promo fija:** Caña + tapa 3€ — sábados y domingos al mediodía

---

## Estructura del proyecto

```
alma iberica/
├── CLAUDE.md                          ← este archivo
│
├── web/                               ← Carta Digital (React app)
│   ├── src/
│   │   ├── data.ts                    ← ÚNICO archivo de datos del menú
│   │   ├── App.tsx
│   │   ├── components/
│   │   ├── hooks/
│   │   └── lib/shareImage.ts
│   └── public/images/                 ← fotos en .webp
│
├── brand-kit-almaiberica/             ← Identidad de marca
│   ├── logotipos/
│   ├── colores/
│   ├── tipografia/
│   ├── imagenes_inspiracionales/
│   ├── textos_marca/
│   ├── assets_graficos/
│   └── skills/
│       └── brandkit/SKILL.md
│
├── investigador-competencia/          ← Análisis de competencia
│   ├── perfiles_competidores/
│   ├── precios/
│   │   └── carta_alma_iberica_2026.csv
│   ├── redes_sociales/
│   ├── promociones/
│   ├── criticas_y_valoraciones/
│   ├── informes/
│   └── skills/
│       └── marketing-psychology/SKILL.md
│
├── guiones-reels/                     ← Guiones de vídeo
│   └── skills/
│       ├── viral-short-form/SKILL.md
│       └── viral-hooks/SKILL.md
│
├── copywriter-almaiberica/            ← Redacción y captions
│   └── skills/
│       ├── copywriting/SKILL.md
│       └── viral-captions-and-ctas/SKILL.md
│
├── calendario-contenido/              ← Estrategia de contenido
│   └── skills/
│       └── content-strategy/SKILL.md
│
└── disenadora-web/                    ← Diseño web
    └── skills/
        ├── frontend-design/SKILL.md
        ├── high-end-visual-design/SKILL.md
        ├── web-design-guidelines/SKILL.md
        └── seo-audit/SKILL.md
```

---

## Carta Digital — Stack técnico

```bash
cd "alma iberica/web"
npm install
npm run dev
npm run build
npm run preview
```

- React 19 + Vite 6 + TypeScript
- Tailwind CSS v4 (`@tailwindcss/vite`)
- GSAP 3 + ScrollTrigger
- lucide-react (iconos)
- Deploy: Vercel ← GitHub (`github.com/almaiberica/Carta`)
- Sin backend: estado en `localStorage`, sin API, sin base de datos

> **Nota Linux:** si `npm run build` falla con "Cannot find native binding":
> `npm install @tailwindcss/oxide-linux-x64-gnu`

---

## Regla de oro: datos del menú

**El Excel `AlmaIberica_Carta_Completa_2026.xlsx` es la única fuente de verdad.**

- Solo mostrar platos con `Mostrar en carta = Sí` (~57 de 139)
- Los datos van **únicamente** en `src/data.ts`, dentro del bloque:

```ts
/* INICIO DATOS */
export const MENU_DATA: Record<string, Dish[]> = { ... };
/* FIN DATOS */
```

- Columna `Bloque menu` define la categoría:
  - `Bocadillos` → `bocadillos`
  - `Tapeo y Vermut` → `tapeo`
  - `Platos Principales` → `platos`
  - `Bodega y Bebidas` → `bebidas`
- `img` = `/images/` + valor columna `Archivo imagen` + `.webp`. Si vacío → `img: ""`

---

## Arquitectura de la app

**Modo Real (Reels):**
- `scroll-snap-type: y mandatory`, cada plato ocupa `100dvh`
- Bucle infinito: array triplicado + salto silencioso

**Modo Carta:**
- Lista vertical agrupada por categoría
- Thumbnail 72×72px + stagger GSAP al hacer scroll

**localStorage:**
- `alma_comanda` → carrito (visual, no envía pedido)
- `alma_antojos` → favoritos/likes

---

## Imágenes

- Todas en `public/images/*.webp`, máx 800×1200px, ~75% calidad, <150KB
- Sin tildes ni espacios en nombres de archivo
- `foto_proximamente.webp` = placeholder para platos sin foto

---

## Reglas de código

- Tipar siempre los props. No usar `any` salvo inevitable (documentarlo).
- No añadir dependencias sin mencionarlo.
- No tocar el Excel desde código.
- No añadir backend ni llamadas a API externas.
- Nombres de imagen: sin tildes, sin espacios, siempre `.webp`.

---

## Skills del sistema de marketing

Todas las skills tienen el contexto de Alma Ibérica incorporado. No hace falta repetirlo en cada petición.

| Skill | Carpeta | Para qué |
|---|---|---|
| `viral-short-form` | guiones-reels/ | Guiones completos Reels/TikTok |
| `viral-hooks` | guiones-reels/ | Hooks primeros 2-3 segundos |
| `copywriting` | copywriter-almaiberica/ | Copy web y marketing |
| `viral-captions-and-ctas` | copywriter-almaiberica/ | Captions + hashtags + CTAs |
| `marketing-psychology` | investigador-competencia/ | Psicología del cliente |
| `content-strategy` | calendario-contenido/ | Planificación de contenido |
| `brandkit` | brand-kit-almaiberica/ | Identidad visual |
| `frontend-design` | disenadora-web/ | Diseño web |
| `high-end-visual-design` | disenadora-web/ | UI premium |
| `web-design-guidelines` | disenadora-web/ | Auditoría de código |
| `seo-audit` | disenadora-web/ | SEO local Barcelona |

---

## Competidores de referencia

@barbocata_ · @varromad · @tasquetablaibcn · @b.de.bocata

## Pendiente

- 30 de los 57 platos activos en `data.ts` aún no tienen foto (`img: ""` o archivo no subido todavía). Mientras tanto se muestra automáticamente el placeholder "Foto próximamente" (ya no requiere ningún fichero `foto_proximamente.webp`: está implementado como marcador visual en el propio componente). La dueña puede ir subiendo `.webp` a `disenadora-web/public/images/` y rellenando el campo `img` en `data.ts` según se vayan teniendo las fotos.
- Constante `RESERVAS` en `MenuOverlay.tsx`: resuelta, ya usa `https://calendly.com/almaibericastb/30`.