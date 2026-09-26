# Estado del proyecto: DragonflaiLabs / Apps de regalo
_Actualizado: 26-sep-2026 · este archivo se actualiza en el repo cada vez que se cierra algo_

## Flujo de trabajo
El desarrollo se hace en **Claude Code**, directo sobre el repo, que es la fuente única de verdad. El chat se usa para decisiones de producto, revisión de assets visuales y análisis de lo que reporta Claude Code.

## Dominios y repos
- **dragonflailabs.com**: repo `claulizah/Dragonflailabs`, GitHub Pages. Es el sitio de VENTAS (calculadora, Stripe, catálogo). Cupón activo: **VUELA30** (30%, primeros 20 pedidos).
- **regaloparati.com**: en vivo con HTTPS. Repo `claulizacosta8/Dragonflai-regalos` (otra cuenta de GitHub). Solo hostea las páginas ya entregadas a clientes y la landing (`regaloparati-index.html`).
- **Cupón de referidos `TAMBIENTEREGALO`**: decidido pero pausado mientras VUELA30 siga con el mismo 30%. La landing no muestra ningún código mientras no exista en Stripe. La clase `.code-box` se queda en el CSS para ese momento.

## Fixes de la auditoría (rama `claude/inspiring-mendel-w9sdyd`)
1. La cuenta regresiva y la meta del configurador se sobreescribían con el valor por defecto. Corregido en 10 plantillas.
2. El día cambiaba en UTC en vez de hora de México. Corregido en 12 plantillas + `plantilla-regalo.html`.
3. El configurador detectaba cada `PRESET_` dos veces y se rompía con `;` o `<`. Corregido.
4. El estilo de `.edit-link` estaba roto en 12 de 15 plantillas. Corregido con una regla CSS general.
5. Pie de referidos (`Hecho con 🦋 · regaloparati.com`) en las 15 plantillas.

**Verificado (26-sep):** los fixes solo estaban en la rama; `main` seguía con las plantillas viejas (con `blacklist.html` y una sola `cuentaregresiva.html`). Por eso las copias de `cuentaregresiva-viaje.html` y `mensajes-sorpresa.html` que tenía Claudia no traían los fixes 2 y 5. Se abrió un PR de la rama a `main`, pendiente de revisión y merge. **Hasta que se haga el merge, la versión buena de las plantillas es la de la rama, no la de `main`.**

## Plantillas (15 archivos)
| Plantilla | Función distintiva |
|---|---|
| Salud (`miacompanante`/`demogenerica`) | Diario de síntomas + preguntas para el doctor |
| Reto personal | Mapa de recaídas (✓/✗ por día) |
| Romántico | Nuestro mapa (lugares con foto/nota) |
| Cuenta regresiva ×3 (`-bebe`, `-boda`, `-viaje`) | Diario y mensajes propios, `APP_PREFIX` único |
| Cumpleaños | ⏸️ Pausada: falta definir si "línea de su vida" la arma 1 o varias personas |
| Adulta funcional | Generador de excusas + pagos del mes + racha + tarjeta compartible |
| Mi Radar | Red flags de vida, paleta morado/dorado |
| Damas de honor | Checklist + mensajes de la novia sellados |
| Nosotros dos | Fotos + cápsula + mapa + checklist juntos |
| Mensajes sorpresa | Cuenta regresiva + mensajes sellados de varios remitentes |
| Mi semestre | Tareas, horario, racha de estudio, cuenta regresiva |
| Home Office | Checklist diario, rutinas, facturas/gastos |

## Arquitectura técnica
- Un `.html` por plantilla, sin backend. Usa `localStorage` con un `APP_PREFIX` único por plantilla.
- Personalización con `const PRESET_XXX = ...;` y el botón "Fijar ___ en el código".
- `configurador.html` detecta:
  - cualquier `PRESET_`;
  - las variables de color `--nombre: #hex`;
  - 4 combinaciones de tipografía;
  - una foto de portada, que comprime.
- `generador-qr.html`: QR con marco temático (6 colores).

## Íconos
- **Fuentes**:
  - zip propio generado con IA (`Iconos_Dragonflailabs.zip`);
  - paquetes comprados en Etsy (carpeta Drive "Clipart").
- **Licencia**: el PDF de la compra es solo una nota de agradecimiento, sin términos. Hay que guardar la captura de la licencia del anuncio de Etsy.
- **Nunca subir los archivos originales de clipart al repo**, porque es público. Solo van las versiones comprimidas (~220px) ya incrustadas en las plantillas o en `assets/iconos/`.
- **Regla de estilo**: no mezclar estilos de ícono dentro de una misma app.

**Estado por plantilla:**
- **Integrados**: carriola (Bebé, 26-sep), mancuerna (Reto), rosa (Romántico), estetoscopio (Salud), moneda (Adulta funcional), anillos (Boda), ojo Boho/Celestial (Mi Radar), ramo Boho/Wedding (Damas), candado con llave (Nosotros dos).
- **Elegidos, por integrar**: Mi semestre → pila de libros pastel; Home Office → conejito en escritorio; Mensajes sorpresa → sobre con gatito (todos de "Cute Clipart Bundle"). Mi semestre y Home Office tienen hoy un ícono provisional (emoji 📚 / 💻 renderizado). Mensajes sorpresa no tiene insignia de portada con imagen.
- **Bebé (integrado 26-sep)**: la portada es la **carriola rosa/lila con capota azul**, del set kawaii "sticker" (contorno café grueso, pastel vivo). Está en `assets/iconos/bebe-carriola-220.png` (220×219, 9 KB) e incrustada como portada de `cuentaregresiva-bebe.html`. El favicon y el ícono de instalación siguen siendo los anteriores. Del mismo set hay íconos para usar adentro de la app: biberón, pañal, zapatitos, cuna, móvil, body, torre de aros, luna, arcoíris, carriola de gajos.
- **Cumpleaños (íconos reservados, mismo set sticker)**: pastel con vela (candidato a portada), gorrito, globos, regalo.
- **Viaje**: falta decidir entre el portadocumentos con avión y el avioncito entre nubes.
- El set beige/salvia se queda para plantillas de paleta neutra o boho.

## Ideas diseñadas, no construidas
- **Fan de artista**: checklist, cuenta regresiva a concierto y cartas de la fan hacia el artista. Regla firme: nunca "frases que el artista diría" ni letras de canciones.
- **Tareas de hijos**: checklist por hijo, racha positiva y resumen compartible tipo Stories.

## Validación de las 15 plantillas (26-sep, rama `claude/inspiring-mendel-w9sdyd`)
Chromium con zona horaria `America/Mexico_City` y reloj simulado a las 23:30 del 26-sep (en UTC ya es 27). "Sobrevive recarga" = se edita la cuenta regresiva o la meta desde la app, se recarga y se confirma que sigue igual. La misma prueba contra `main` marca ❌ en fecha, pie, `.edit-link` y "hoy" (da 27-sep).

| Plantilla | Fecha local | Pie | `APP_PREFIX` | `PRESET_` (1 vez c/u) | `.edit-link` | Peso | Hoy a las 23:30 | Sobrevive recarga | Consola |
|---|---|---|---|---|---|---|---|---|---|
| Adulta funcional (`adultafuncional.html`) | ✅ | ✅ | `app-adulta-` ✅ | PRESET_NAME ✅ | ✅ | 141 KB | ✅ | ✅ meta | ✅ |
| Cuenta regresiva · Bebé (`cuentaregresiva-bebe.html`) | ✅ | ✅ | `app-bebe-` ✅ | PRESET_NAME ✅ | ✅ | 139 KB | ✅ | ✅ cuenta | ✅ |
| Cuenta regresiva · Boda (`cuentaregresiva-boda.html`) | ✅ | ✅ | `app-boda-` ✅ | PRESET_NAME ✅ | ✅ | 192 KB | ✅ | ✅ cuenta | ✅ |
| Cuenta regresiva · Viaje (`cuentaregresiva-viaje.html`) | ✅ | ✅ | `app-viaje-` ✅ | PRESET_NAME ✅ | ✅ | 168 KB | ✅ | ✅ cuenta | ✅ |
| Cumpleaños ⏸️ (`cumpleanos.html`) | ✅ | ✅ | `app-cumple-` ✅ | PRESET_NAME ✅ | ✅ | 97 KB | ✅ | ✅ cuenta | ✅ |
| Damas de honor (`damashonor.html`) | ✅ | ✅ | `app-damashonor-` ✅ | PRESET_NAME, PRESET_MENSAJES_DAMAS ✅ | ✅ | 154 KB | ✅ | ✅ cuenta | ✅ |
| Salud (demo genérica) (`demogenerica.html`) | ✅ | ✅ | `app-compania-` ✅ | PRESET_NAME ✅ | ✅ | 149 KB | ✅ | n/a | ✅ |
| Home Office (`homeoffice.html`) | ✅ | ✅ | `app-homeoffice-` ✅ | PRESET_NAME, PRESET_CHECKLIST_DIARIO, PRESET_RUTINA_INICIO, PRESET_RUTINA_CIERRE ✅ | ✅ | 122 KB | ✅ | n/a | ✅ |
| Mensajes sorpresa (`mensajes-sorpresa.html`) | ✅ | ✅ | `app-sorpresa-` ✅ | PRESET_NAME, PRESET_FESTEJO, PRESET_FECHA, PRESET_MENSAJES_SORPRESA ✅ | ✅ | 23 KB | ✅ (sin `todayKey`, cuenta OK) | ✅ cuenta | ✅ |
| Salud (Mi acompañante) (`miacompanante.html`) | ✅ | ✅ | `app-miacomp-` ✅ | PRESET_NAME ✅ | ✅ | 169 KB | ✅ | n/a | ✅ |
| Mi Radar (`miradar.html`) | ✅ | ✅ | `app-miradar-` ✅ | PRESET_NAME ✅ | ✅ | 169 KB | ✅ | n/a | ✅ |
| Mi semestre (`misemestre.html`) | ✅ | ✅ | `app-semestre-` ✅ | PRESET_NAME, PRESET_HORARIO ✅ | ✅ | 242 KB | ✅ | ✅ cuenta · ✅ meta | ✅ |
| Nosotros dos (`nosotrosdos.html`) | ✅ | ✅ | `app-nosotrosdos-` ✅ | PRESET_NAME, PRESET_CHECKLIST_JUNTOS, PRESET_LUGARES ✅ | ✅ | 170 KB | ✅ | ✅ cuenta | ✅ |
| Reto personal (`retopersonal.html`) | ✅ | ✅ | `app-reto-` ✅ | PRESET_NAME ✅ | ✅ | 185 KB | ✅ | ✅ meta | ✅ |
| Romántico (`romantico.html`) | ✅ | ✅ | `app-favorita-` ✅ | PRESET_NAME ✅ | ✅ | 167 KB | ✅ | ✅ cuenta | ✅ |

Redirecciones (ligas viejas): `templates/blacklist.html` → `miradar.html` y `templates/cuentaregresiva.html` → `cuentaregresiva-boda.html`. Conservan `?parámetros` y `#ancla`. Probadas en Chromium.

Cerrados en esta ronda (26-sep):
- `miacompanante.html` ya tiene `PRESET_NAME`: el configurador lo detecta y la app abre con el nombre fijado.
- Portadas recomprimidas a paleta de 256 colores con transparencia: Damas de honor de 58 → 16 KB y Mi Radar de 61 → 18 KB. Siguen a 220px y no hay diferencia visible.

Hallazgos abiertos:
- Mi semestre pesa 242 KB porque el ícono provisional (34 KB) va 4 veces: favicon, ícono de instalación, manifest y portada. Se reduce al poner el ícono definitivo.
- Las redirecciones no pasan los datos guardados: quien ya usaba la versión vieja (`blacklist.html` sin prefijo, `cuentaregresiva.html` con `app-cuenta-`) abre la nueva vacía.

## Próximos pasos
1. ~~Verificar que los fixes estén en `main`, y correr las validaciones en las 15 plantillas.~~ Validado; falta revisar y hacer merge del PR a `main`.
2. ~~Integrar la carriola en Bebé.~~ Falta integrar los íconos de Mi semestre, Home Office y Mensajes sorpresa.
3. Decidir el ícono de Viaje.
4. Decidir si se retoma Cumpleaños.
5. Construir "Fan de artista" y "Tareas de hijos" si se sigue esa línea.
