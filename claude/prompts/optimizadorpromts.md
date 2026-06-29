---
name: optimizador-prompts
description: Usa este skill para mejorar, reescribir u optimizar cualquier prompt antes de usarlo con una IA. Actívalo cuando el usuario diga "optimiza este prompt", "mejora este prompt", "cómo escribo mejor esto para la IA", "hazme un buen prompt para X", "este prompt no me da buenos resultados", o cuando pegue un prompt y pida que funcione mejor. Output: solo el prompt optimizado, listo para copiar y pegar.
---

# Optimizador de Prompts

## Qué hace este skill

Toma un prompt malo, vago o genérico y lo convierte en uno claro, específico y efectivo. El output es siempre el prompt mejorado, listo para usar — sin explicaciones salvo que el usuario las pida.

---

## Principios de un buen prompt

### Estructura base
Un prompt efectivo tiene algunos de estos elementos (no siempre todos):

1. **Rol** — quién es la IA en este contexto
2. **Tarea** — qué tiene que hacer exactamente
3. **Contexto** — información relevante que la IA necesita saber
4. **Formato** — cómo debe ser el output (longitud, estilo, estructura)
5. **Restricciones** — qué NO debe hacer
6. **Ejemplo** — si ayuda, un ejemplo de input/output esperado

### Errores más comunes a corregir
- Prompt demasiado vago: "hazme un post de Instagram" → especificar producto, tono, longitud, objetivo
- Sin contexto: la IA no sabe quién eres ni para qué es → añadir contexto mínimo necesario
- Pedir demasiado en uno: separar tareas complejas en pasos
- Sin formato definido: la IA inventa la estructura → especificar qué se espera
- Instrucciones negativas mal puestas: "no seas formal" → mejor "tono directo y conversacional"

---

## Proceso

1. Leer el prompt original
2. Identificar qué le falta o qué está mal
3. Reescribirlo aplicando los principios
4. Output: **solo el prompt optimizado**, sin preámbulo

Si el usuario solo describe lo que quiere conseguir (sin prompt previo), construir el prompt desde cero.

---

## Contexto de Alma Ibérica (aplicar cuando sea relevante)

Si el prompt es para contenido del bar, incorporar automáticamente:
- **Bar:** Alma Ibérica, tapas bar de ibérico en Sant Boi de Llobregat
- **Tono:** tradicional y canalla, directo, sin florituras
- **Plataformas habituales:** Instagram, TikTok, carta digital, email
- **Producto estrella:** cerdo ibérico (jamón, secreto, lagarto, baos, bocadillos)

---

## Ejemplos

### Ejemplo 1 — prompt vago

**Original:**
> hazme un post de instagram

**Optimizado:**
> Eres un copywriter con voz directa y canalla. Escribe un post de Instagram para Alma Ibérica, un tapas bar especializado en ibérico en Sant Boi de Llobregat. El post es sobre [PLATO/PRODUCTO]. Tono: cercano, sin exclamaciones vacías, nada de "no te lo puedes perder". Primera línea: gancho directo. Longitud: máximo 4-5 líneas. Máximo 3 hashtags relevantes (#iberico #santboi o similares). Output: solo el texto del post.

---

### Ejemplo 2 — prompt sin formato

**Original:**
> dame ideas para contenido de redes sociales del bar

**Optimizado:**
> Genera 10 ideas de contenido para Instagram y TikTok de Alma Ibérica, un tapas bar de ibérico en Sant Boi de Llobregat. Tono tradicional y canalla. Para cada idea indica: formato (Reel, carrusel, foto estática, Stories), tema y una frase de ejemplo como título o gancho. Prioriza contenido sobre producto, proceso y ambiente. Sin ideas genéricas de "foodie lifestyle".

---

### Ejemplo 3 — construir desde cero

**Usuario dice:**
> quiero un prompt para que la IA me ayude a escribir descripciones de platos para la carta

**Prompt construido:**
> Eres un redactor de cartas de restaurante con estilo directo y sin adornos. Escribe una descripción breve para el plato [NOMBRE DEL PLATO] de Alma Ibérica, un tapas bar especializado en cerdo ibérico. La descripción debe tener máximo 2 líneas, destacar el ingrediente principal y el modo de preparación, y sonar apetecible sin usar palabras como "exquisito", "delicioso" o "único". Output: solo la descripción, sin título ni explicaciones.

---

## Notas

- Si el prompt ya es bueno, decirlo y hacer ajustes mínimos
- Si el usuario quiere el prompt en inglés (para Midjourney, Grok, etc.), optimizar en inglés
- Para prompts de imagen AI, añadir siempre: estilo visual, ratio, iluminación, qué evitar
- No alargar el prompt innecesariamente — un prompt conciso suele funcionar mejor que uno largo
