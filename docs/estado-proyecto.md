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
- **Modo armar**: las herramientas para quien arma (botones "Fijar", formularios de mensajes sellados, borrar mensajes) llevan la clase `solo-armar` y solo aparecen si la URL trae `?armar=1`. Toda herramienta nueva de armado debe llevar esa clase.
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
- **Integrados**: escritorio con pollito (Home Office, 27-sep; también en favicon e ícono de instalación), maleta (Viaje, 27-sep; reemplaza al reloj de arena genérico), carriola (Bebé, 26-sep), mancuerna (Reto), rosa (Romántico), estetoscopio (Salud), moneda (Adulta funcional), anillos (Boda), ojo Boho/Celestial (Mi Radar), ramo Boho/Wedding (Damas), candado con llave (Nosotros dos).
- **Elegidos, por integrar**: Mi semestre → pila de libros pastel (hoy tiene un ícono provisional, emoji 📚). Mensajes sorpresa → sobre con gatito: ya está en `assets/iconos/sorpresa-sobre-gatito-220.png` y entra con el punto 8 de la revisión UX.
- **Guardados sin usar todavía** (`assets/iconos/`): post-it, reloj de arena y sobre con conejito.
- **Bebé (integrado 26-sep)**: la portada es la **carriola rosa/lila con capota azul**, del set kawaii "sticker" (contorno café grueso, pastel vivo). Está en `assets/iconos/bebe-carriola-220.png` (220×219, 9 KB) e incrustada como portada de `cuentaregresiva-bebe.html`. El favicon y el ícono de instalación siguen siendo los anteriores. Del mismo set hay íconos para usar adentro de la app: biberón, pañal, zapatitos, cuna, móvil, body, torre de aros, luna, arcoíris, carriola de gajos.
- **Cumpleaños (íconos reservados, mismo set sticker)**: pastel con vela (candidato a portada), gorrito, globos, regalo.
- **Viaje (resuelto 27-sep)**: maleta rosa con asas.
- El set beige/salvia se queda para plantillas de paleta neutra o boho.

## Ideas diseñadas, no construidas
- **Fan de artista**: checklist, cuenta regresiva a concierto y cartas de la fan hacia el artista. Regla firme: nunca "frases que el artista diría" ni letras de canciones.
- **Tareas de hijos**: checklist por hijo, racha positiva y resumen compartible tipo Stories.

## Validación de las 15 plantillas (26-sep, rama `claude/inspiring-mendel-w9sdyd`)
Chromium con zona horaria `America/Mexico_City` y reloj simulado a las 23:30 del 26-sep (en UTC ya es 27). "Sobrevive recarga" = se edita la cuenta regresiva o la meta desde la app, se recarga y se confirma que sigue igual. La misma prueba contra `main` marca ❌ en fecha, pie, `.edit-link` y "hoy" (da 27-sep).

| Plantilla | Fecha local | Pie | `APP_PREFIX` | `PRESET_` (1 vez c/u) | `.edit-link` | Peso | Hoy a las 23:30 | Sobrevive recarga | Sin herramientas de armado visibles | Fecha precargada | Consola |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Adulta funcional (`adultafuncional.html`) | ✅ | ✅ | `app-adulta-` ✅ | PRESET_NAME ✅ | ✅ | 142 KB | ✅ | ✅ meta | ✅ (no tiene) | n/a (sin cuenta regresiva) | ✅ |
| Cuenta regresiva · Bebé (`cuentaregresiva-bebe.html`) | ✅ | ✅ | `app-bebe-` ✅ | PRESET_NAME, PRESET_EVENTO, PRESET_FECHA ✅ | ✅ | 141 KB | ✅ | ✅ cuenta | ✅ (no tiene) | ✅ "La llegada; de <Emilia>" · 24-dic (vía PRESET_FECHA) | ✅ |
| Cuenta regresiva · Boda (`cuentaregresiva-boda.html`) | ✅ | ✅ | `app-boda-` ✅ | PRESET_NAME, PRESET_EVENTO, PRESET_FECHA ✅ | ✅ | 193 KB | ✅ | ✅ cuenta | ✅ (no tiene) | ✅ "La llegada; de <Emilia>" · 24-dic (vía PRESET_FECHA) | ✅ |
| Cuenta regresiva · Viaje (`cuentaregresiva-viaje.html`) | ✅ | ✅ | `app-viaje-` ✅ | PRESET_NAME, PRESET_EVENTO, PRESET_FECHA ✅ | ✅ | 170 KB | ✅ | ✅ cuenta | ✅ (no tiene) | ✅ "La llegada; de <Emilia>" · 24-dic (vía PRESET_FECHA) | ✅ |
| Cumpleaños ⏸️ (`cumpleanos.html`) | ✅ | ✅ | `app-cumple-` ✅ | PRESET_NAME ✅ | ✅ | 98 KB | ✅ | ✅ cuenta | ✅ (no tiene) | ✅ "Fin de prueba" · 24-dic (vía campo "Cuenta regresiva") | ✅ |
| Damas de honor (`damashonor.html`) | ✅ | ✅ | `app-damashonor-` ✅ | PRESET_NAME, PRESET_MENSAJES_DAMAS, PRESET_NOVIA, PRESET_FECHA ✅ | ✅ | 155 KB | ✅ | ✅ cuenta | ✅ (2 ocultas; visibles con ?armar=1) | ✅ "La boda de Ana" · 24-dic (vía PRESET_FECHA) | ✅ |
| Salud (demo genérica) (`demogenerica.html`) | ✅ | ✅ | `app-compania-` ✅ | PRESET_NAME ✅ | ✅ | 150 KB | ✅ | n/a | ✅ (no tiene) | n/a (sin cuenta regresiva) | ✅ |
| Home Office (`homeoffice.html`) | ✅ | ✅ | `app-homeoffice-` ✅ | PRESET_NAME, PRESET_CHECKLIST_DIARIO, PRESET_RUTINA_INICIO, PRESET_RUTINA_CIERRE ✅ | ✅ | 123 KB | ✅ | n/a | ✅ (3 ocultas; visibles con ?armar=1) | n/a (sin cuenta regresiva) | ✅ |
| Mensajes sorpresa (`mensajes-sorpresa.html`) | ✅ | ✅ | `app-sorpresa-` ✅ | PRESET_NAME, PRESET_FESTEJO, PRESET_FECHA, PRESET_MENSAJES_SORPRESA ✅ | ✅ | 24 KB | ✅ (sin `todayKey`, cuenta OK) | ✅ cuenta | ✅ (2 ocultas; visibles con ?armar=1) | ✅ "Tu graduación" · 24-dic (vía PRESET_FECHA) | ✅ |
| Salud (Mi acompañante) (`miacompanante.html`) | ✅ | ✅ | `app-miacomp-` ✅ | PRESET_NAME ✅ | ✅ | 169 KB | ✅ | n/a | ✅ (no tiene) | n/a (sin cuenta regresiva) | ✅ |
| Mi Radar (`miradar.html`) | ✅ | ✅ | `app-miradar-` ✅ | PRESET_NAME ✅ | ✅ | 170 KB | ✅ | n/a | ✅ (no tiene) | n/a (sin cuenta regresiva) | ✅ |
| Mi semestre (`misemestre.html`) | ✅ | ✅ | `app-semestre-` ✅ | PRESET_NAME, PRESET_HORARIO ✅ | ✅ | 243 KB | ✅ | ✅ cuenta · ✅ meta | ✅ (1 ocultas; visibles con ?armar=1) | ✅ "Fin de prueba" · 24-dic (vía campo "Cuenta regresiva") | ✅ |
| Nosotros dos (`nosotrosdos.html`) | ✅ | ✅ | `app-nosotrosdos-` ✅ | PRESET_NAME, PRESET_CHECKLIST_JUNTOS, PRESET_LUGARES, PRESET_EVENTO, PRESET_FECHA ✅ | ✅ | 171 KB | ✅ | ✅ cuenta | ✅ (2 ocultas; visibles con ?armar=1) | ✅ "La llegada; de <Emilia>" · 24-dic (vía PRESET_FECHA) | ✅ |
| Reto personal (`retopersonal.html`) | ✅ | ✅ | `app-reto-` ✅ | PRESET_NAME ✅ | ✅ | 186 KB | ✅ | ✅ meta | ✅ (no tiene) | n/a (sin cuenta regresiva) | ✅ |
| Romántico (`romantico.html`) | ✅ | ✅ | `app-favorita-` ✅ | PRESET_NAME, PRESET_EVENTO, PRESET_FECHA ✅ | ✅ | 168 KB | ✅ | ✅ cuenta | ✅ (no tiene) | ✅ "La llegada; de <Emilia>" · 24-dic (vía PRESET_FECHA) | ✅ |

"Sin herramientas de armado visibles": se abre sin `?armar=1` y se confirma que no se ve ningún botón "Fijar", ni el formulario de mensajes sellados, ni "Eliminar" en mensajes sellados. Con `?armar=1` sí aparecen, junto con el aviso "Modo armar". "Fecha precargada": se sube la plantilla al `configurador.html` real, se llenan fecha y título (con `;` y `<` de prueba), se descarga, se abre y se recarga. La cuenta regresiva debe decir lo mismo las dos veces.

Redirecciones (ligas viejas): `templates/blacklist.html` → `miradar.html` y `templates/cuentaregresiva.html` → `cuentaregresiva-boda.html`. Conservan `?parámetros` y `#ancla`. Probadas en Chromium.

Cerrados en esta ronda (26-sep):
- `miacompanante.html` ya tiene `PRESET_NAME`: el configurador lo detecta y la app abre con el nombre fijado.
- Portadas recomprimidas a paleta de 256 colores con transparencia: Damas de honor de 58 → 16 KB y Mi Radar de 61 → 18 KB. Siguen a 220px y no hay diferencia visible.

Hallazgos abiertos:
- Mi semestre pesa 242 KB porque el ícono provisional (34 KB) va 4 veces: favicon, ícono de instalación, manifest y portada. Se reduce al poner el ícono definitivo.
- Las redirecciones no pasan los datos guardados: quien ya usaba la versión vieja (`blacklist.html` sin prefijo, `cuentaregresiva.html` con `app-cuenta-`) abre la nueva vacía.

## Revisión UX (27-sep, vista de celular, como quien recibe y como quien compra)

### Parte 1: en el PR #1, antes del merge ✅
1. **Modo "quien arma" vs. "quien recibe"** ✅
   - Mismo mecanismo en las 15 plantillas: la clase `solo-armar` y la constante `MODO_ARMAR`. Las herramientas solo aparecen si la URL trae `?armar=1`, y en ese modo sale un aviso negro arriba.
   - Ocultos para quien recibe: los botones "Fijar ___ en el código" (Mensajes sorpresa, Damas, Home Office, Mi semestre y Nosotros dos), el formulario para escribir mensajes sellados (Mensajes sorpresa y Damas) y el botón "Eliminar" de cada mensaje sellado.
   - El configurador explica que hay que abrir la plantilla con `?armar=1`.
2. **Fecha precargada** ✅
   - `PRESET_EVENTO` y `PRESET_FECHA` en Bebé, Boda, Viaje, Romántico y Nosotros dos.
   - Se guardan en la primera apertura y no se pisan al recargar.
   - El configurador ahora muestra un campo de texto o de fecha para las constantes de texto, sin comillas. Antes, escribir `2026-12-24` sin comillas rompía el archivo.
3. **Íconos** ✅
   - Diario de Boda y Viaje: 🤰 → 📔.
   - Emoji principal (encabezado, "Hola, ___", pestaña Hoy, marca de agua): 🍼 Bebé, 💍 Boda, ✈️ Viaje, 💐 Damas.
   - `<title>` de Bebé: "Ya viene el bebé 🍼".
   - El nombre al instalar ya no dice "Cuenta regresiva": ahora dice Ya viene el bebé, Nuestra boda, Nuestro viaje y Damas de honor.
4. **Damas de honor** ✅: la tarjeta dice "La boda de ___" con `PRESET_NOVIA`, y además tiene `PRESET_FECHA`.

### Parte 2: PR nuevo después del merge (propuesta pendiente de aprobación)
5. Dedicatoria de quien regala (`PRESET_DEDICATORIA`, `PRESET_DE`).
6. Aviso "Guárdala en tu pantalla de inicio".
7. Listas precargadas: maleta del hospital, checklist de viaje, último mes de boda e ideas de citas.
8. Mensajes sorpresa al nivel de las demás (portada con sobre con gatito, encabezado de color, `apple-touch-icon`).
9. Diferenciar Romántico y Nosotros dos (solo propuesta, no se cambia sin consultar).
10. Modal propio en lugar de los `prompt()` nativos.

## Próximos pasos
1. ~~Verificar que los fixes estén en `main`, y correr las validaciones en las 15 plantillas.~~ Validado; falta revisar y hacer merge del PR a `main`.
2. ~~Integrar la carriola en Bebé.~~ Falta integrar los íconos de Mi semestre, Home Office y Mensajes sorpresa.
3. Decidir el ícono de Viaje.
4. Decidir si se retoma Cumpleaños.
5. Construir "Fan de artista" y "Tareas de hijos" si se sigue esa línea.
