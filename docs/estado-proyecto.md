# Estado del proyecto: DragonflaiLabs / Apps de regalo
_Actualizado: 28-sep-2026 (catálogo completo + sync a regaloparati.com) · este archivo se actualiza en el repo cada vez que se cierra algo_

## Flujo de trabajo
El desarrollo se hace en **Claude Code**, directo sobre el repo, que es la fuente única de verdad. El chat se usa para decisiones de producto, revisión de assets visuales y análisis de lo que reporta Claude Code.

## Regla: "esto lo decide Claudia" (28-sep-2026)
Cuando algo queda marcado como **"esto lo decide Claudia"** (o equivalente, tipo "propón, no lo cambies sin consultarme"), no se programa todavía: se escribe la propuesta aquí o en el reporte, y se espera confirmación explícita antes de tocar el código. Si no hay forma de saber si ya se confirmó algo, se pregunta en vez de asumir. El detalle completo de esta regla vive en `CLAUDE.md`, en la raíz del repo.

Aplica a cualquier cambio de producto que afecte cómo se ve o se siente una plantilla ante quien recibe o quien compra. **No aplica** a fixes técnicos, de rendimiento, seguridad o limpieza de código — esos se avanzan directo.

Por qué existe: el punto 9 de la revisión UX (diferenciar Romántico y Nosotros dos) traía esa marca y se programó y mergeó en el PR #2 sin pasar por Claudia primero. El resultado quedó bien y no se deshizo, pero no se repite el patrón.

## Dominios y repos
- **dragonflailabs.com**: repo `claulizah/Dragonflailabs`, GitHub Pages. Es el sitio de VENTAS (calculadora, Stripe, catálogo). Cupón activo: **VUELA30** (30%, primeros 20 pedidos).
- **regaloparati.com**: en vivo con HTTPS. Repo `claulizacosta8/Dragonflai-regalos` (otra cuenta de GitHub). Solo hostea las páginas ya entregadas a clientes y la landing (`regaloparati-index.html`).
- **Cupón de referidos `TAMBIENTEREGALO`**: decidido pero pausado mientras VUELA30 siga con el mismo 30%. La landing no muestra ningún código mientras no exista en Stripe. La clase `.code-box` se queda en el CSS para ese momento.

## Fixes de la auditoría (en `main` desde el 27-sep, PR #1)
1. La cuenta regresiva y la meta del configurador se sobreescribían con el valor por defecto. Corregido en 10 plantillas.
2. El día cambiaba en UTC en vez de hora de México. Corregido en 12 plantillas + `plantilla-regalo.html`.
3. El configurador detectaba cada `PRESET_` dos veces y se rompía con `;` o `<`. Corregido.
4. El estilo de `.edit-link` estaba roto en 12 de 15 plantillas. Corregido con una regla CSS general.
5. Pie de referidos (`Hecho con 🦋 · regaloparati.com`) en las 15 plantillas.

**27-sep:** el PR #1 ya está en `main` (merge `15fe010`) y GitHub Pages lo publicó sin errores. Las copias sueltas que no traían los fixes ya no hacen falta: la versión buena es la de `main`.

## Plantillas (20 archivos)
| Plantilla | Función distintiva |
|---|---|
| Salud (`miacompanante`) | Diario de síntomas + preguntas para el doctor |
| Salud, demo genérica (`demogenerica`) | ⏸️ **Pausada el 28-sep**: se quita del catálogo de venta (nunca estuvo referenciada por nombre en el sitio de ventas — la categoría "Acompañamiento" se cumple con `miacompanante`). El archivo se queda en el repo por si se retoma. |
| Reto personal | Mapa de recaídas (✓/✗ por día) |
| Romántico | Nuestro mapa (lugares con foto/nota) |
| Cuenta regresiva ×3 (`-bebe`, `-boda`, `-viaje`) | Diario y mensajes propios, `APP_PREFIX` único |
| Cumpleaños | ⏸️ Pausada: falta definir si "línea de su vida" la arma 1 o varias personas |
| Adulta funcional | Generador de excusas + pagos del mes + racha + tarjeta compartible |
| Mi Radar | Red flags de vida, paleta morado/dorado |
| Damas de honor | Checklist + mensajes de la novia sellados |
| Nosotros dos | Fotos + cápsula + mapa + checklist juntos. Paleta cambiada el 28-sep a azul grisáceo `#5C7A8A` (antes compartía la de Romántico) |
| Mensajes sorpresa | Cuenta regresiva + mensajes sellados de varios remitentes |
| Mi semestre | Tareas, horario, racha de estudio, cuenta regresiva |
| Home Office | Checklist diario, rutinas, facturas/gastos |
| **Mi changarro desde cero** (`changarro.html`, nueva 28-sep) | Checklist de lanzamiento, registro de ventas, racha de días activa. Mostaza `#C1861F` |
| **Mini CRM de pedidos y clientas** (`minicrm.html`, nueva 28-sep) | Pedidos con estatus (nuevo/proceso/entregado), fichas de clientas con aviso de "hace cuánto no le escribes". Magenta `#C23B75` |
| **Calendario de contenido** (`calendariocontenido.html`, nueva 28-sep) | Banco de ideas por categoría, checklist "antes de publicar", racha de días publicando. Turquesa `#1E9E8E` |
| **Meta de ventas del mes** (`metaventas.html`, nueva 28-sep) | Barra de progreso hacia la meta, registro de ventas, historial de meses (cumplida/no cumplida, archiva solo al cambiar de mes). Azul cielo `#2568C4` |
| **Sanando de una ruptura** (`sanandoruptura.html`, nueva 28-sep) | Contador ascendente desde la fecha, diario libre, cartas selladas escritas a una misma ("Ábrelo cuando…", sin `solo-armar`: se escriben en cualquier momento), chips "Ya no permito". Gris lavanda `#7C6F8C` |

## Arquitectura técnica
- Un `.html` por plantilla, sin backend. Usa `localStorage` con un `APP_PREFIX` único por plantilla.
- Personalización con `const PRESET_XXX = ...;` y el botón "Fijar ___ en el código".
- **Modo armar**: las herramientas para quien arma (botones "Fijar", formularios de mensajes sellados, borrar mensajes) llevan la clase `solo-armar` y solo aparecen si la URL trae `?armar=1`. Toda herramienta nueva de armado debe llevar esa clase.
- `configurador.html` detecta (las constantes de texto, fecha y dedicatoria tienen su propio campo, sin comillas):
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
- **Elegidos, por integrar**: Mi semestre → pila de libros pastel (hoy tiene un ícono provisional, emoji 📚). Mensajes sorpresa → sobre con gatito: integrado el 27-sep (portada, favicon e ícono de instalación).
- **Guardados sin usar todavía** (`assets/iconos/`): post-it, reloj de arena y sobre con conejito.
- **Bebé (integrado 26-sep)**: la portada es la **carriola rosa/lila con capota azul**, del set kawaii "sticker" (contorno café grueso, pastel vivo). Está en `assets/iconos/bebe-carriola-220.png` (220×219, 9 KB) e incrustada como portada de `cuentaregresiva-bebe.html`. El favicon y el ícono de instalación siguen siendo los anteriores. Del mismo set hay íconos para usar adentro de la app: biberón, pañal, zapatitos, cuna, móvil, body, torre de aros, luna, arcoíris, carriola de gajos.
- **Cumpleaños (íconos reservados, mismo set sticker)**: pastel con vela (candidato a portada), gorrito, globos, regalo.
- **Viaje (resuelto 27-sep)**: maleta rosa con asas.
- El set beige/salvia se queda para plantillas de paleta neutra o boho.
- **Las 5 plantillas nuevas (28-sep) tienen ícono placeholder**, a propósito: un SVG liviano (círculo de color + el emoji sugerido en la propuesta) en vez de clipart. Claudia revisa y pasa el ícono definitivo de cada una después, igual que con las demás:
  - Mi changarro desde cero → 🚀 sobre mostaza `#C1861F`
  - Mini CRM de pedidos y clientas → 📋 sobre magenta `#C23B75`
  - Calendario de contenido → 📸 sobre turquesa `#1E9E8E`
  - Meta de ventas del mes → 📈 sobre azul cielo `#2568C4`
  - Sanando de una ruptura → 🌱 sobre gris lavanda `#7C6F8C`
- **Observación (no se tocó, cae en la regla de aprobación)**: Nosotros dos ya no comparte color con Romántico, pero **sí sigue compartiendo el emoji 🌹** en cabecera, saludo y decoraciones — es el ícono elegido en la diferenciación del punto 9 y no formaba parte de esta aprobación de color, así que se quedó igual.

## Ideas diseñadas, no construidas
- **Fan de artista**: checklist, cuenta regresiva a concierto y cartas de la fan hacia el artista. Regla firme: nunca "frases que el artista diría" ni letras de canciones.
- **Tareas de hijos**: checklist por hijo, racha positiva y resumen compartible tipo Stories.

## Validación de las 15 plantillas (27-sep, después de la revisión UX parte 2)
Chromium con zona horaria `America/Mexico_City` y reloj simulado a las 23:30 del 26-sep (en UTC ya es 27). "Sobrevive recarga" = se edita la cuenta regresiva o la meta desde la app, se recarga y se confirma que sigue igual. La misma prueba contra `main` marca ❌ en fecha, pie, `.edit-link` y "hoy" (da 27-sep).

| Plantilla | Fecha local | Pie | `APP_PREFIX` | `PRESET_` (1 vez c/u) | `.edit-link` | Peso | Hoy a las 23:30 | Sobrevive recarga | Sin herramientas de armado visibles | Fecha precargada | Consola |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Adulta funcional (`adultafuncional.html`) | ✅ | ✅ | `app-adulta-` ✅ | PRESET_NAME, PRESET_DE, PRESET_DEDICATORIA ✅ | ✅ | 154 KB | ✅ | ✅ meta | ✅ (no tiene) | n/a (sin cuenta regresiva) | ✅ |
| Cuenta regresiva · Bebé (`cuentaregresiva-bebe.html`) | ✅ | ✅ | `app-bebe-` ✅ | PRESET_NAME, PRESET_DE, PRESET_DEDICATORIA, PRESET_EVENTO, PRESET_FECHA, PRESET_MALETA_HOSPITAL ✅ | ✅ | 157 KB | ✅ | ✅ cuenta | ✅ (1 ocultas; visibles con ?armar=1) | ✅ "La llegada; de <Emilia>" · 24-dic (vía PRESET_FECHA) | ✅ |
| Cuenta regresiva · Boda (`cuentaregresiva-boda.html`) | ✅ | ✅ | `app-boda-` ✅ | PRESET_NAME, PRESET_DE, PRESET_DEDICATORIA, PRESET_EVENTO, PRESET_FECHA, PRESET_ULTIMO_MES ✅ | ✅ | 208 KB | ✅ | ✅ cuenta | ✅ (1 ocultas; visibles con ?armar=1) | ✅ "La llegada; de <Emilia>" · 24-dic (vía PRESET_FECHA) | ✅ |
| Cuenta regresiva · Viaje (`cuentaregresiva-viaje.html`) | ✅ | ✅ | `app-viaje-` ✅ | PRESET_NAME, PRESET_DE, PRESET_DEDICATORIA, PRESET_EVENTO, PRESET_FECHA, PRESET_CHECKLIST_VIAJE ✅ | ✅ | 159 KB | ✅ | ✅ cuenta | ✅ (1 ocultas; visibles con ?armar=1) | ✅ "La llegada; de <Emilia>" · 24-dic (vía PRESET_FECHA) | ✅ |
| Cumpleaños ⏸️ (`cumpleanos.html`) | ✅ | ✅ | `app-cumple-` ✅ | PRESET_NAME, PRESET_DE, PRESET_DEDICATORIA ✅ | ✅ | 111 KB | ✅ | ✅ cuenta | ✅ (no tiene) | ✅ "Fin de prueba" · 24-dic (vía campo "Cuenta regresiva") | ✅ |
| Damas de honor (`damashonor.html`) | ✅ | ✅ | `app-damashonor-` ✅ | PRESET_NAME, PRESET_DE, PRESET_DEDICATORIA, PRESET_MENSAJES_DAMAS, PRESET_NOVIA, PRESET_FECHA ✅ | ✅ | 116 KB (28-sep: ícono del manifest recomprimido) | ✅ | ✅ cuenta | ✅ (2 ocultas; visibles con ?armar=1) | ✅ "La boda de Ana" · 24-dic (vía PRESET_FECHA) | ✅ |
| Salud (demo genérica) (`demogenerica.html`) | ✅ | ✅ | `app-compania-` ✅ | PRESET_NAME, PRESET_DE, PRESET_DEDICATORIA ✅ | ✅ | 162 KB | ✅ | n/a | ✅ (no tiene) | n/a (sin cuenta regresiva) | ✅ |
| Home Office (`homeoffice.html`) | ✅ | ✅ | `app-homeoffice-` ✅ | PRESET_NAME, PRESET_DE, PRESET_DEDICATORIA, PRESET_CHECKLIST_DIARIO, PRESET_RUTINA_INICIO, PRESET_RUTINA_CIERRE ✅ | ✅ | 101 KB | ✅ | n/a | ✅ (3 ocultas; visibles con ?armar=1) | n/a (sin cuenta regresiva) | ✅ |
| Mensajes sorpresa (`mensajes-sorpresa.html`) | ✅ | ✅ | `app-sorpresa-` ✅ | PRESET_NAME, PRESET_DE, PRESET_DEDICATORIA, PRESET_FESTEJO, PRESET_FECHA, PRESET_MENSAJES_SORPRESA ✅ | ✅ | 77 KB | ✅ | ✅ cuenta | ✅ (2 ocultas; visibles con ?armar=1) | ✅ "Tu graduación" · 24-dic (vía PRESET_FECHA) | ✅ |
| Salud (Mi acompañante) (`miacompanante.html`) | ✅ | ✅ | `app-miacomp-` ✅ | PRESET_NAME, PRESET_DE, PRESET_DEDICATORIA ✅ | ✅ | 182 KB | ✅ | n/a | ✅ (no tiene) | n/a (sin cuenta regresiva) | ✅ |
| Mi Radar (`miradar.html`) | ✅ | ✅ | `app-miradar-` ✅ | PRESET_NAME, PRESET_DE, PRESET_DEDICATORIA ✅ | ✅ | 109 KB (28-sep: ícono del manifest recomprimido) | ✅ | n/a | ✅ (no tiene) | n/a (sin cuenta regresiva) | ✅ |
| Mi semestre (`misemestre.html`) | ✅ | ✅ | `app-semestre-` ✅ | PRESET_NAME, PRESET_DE, PRESET_DEDICATORIA, PRESET_HORARIO ✅ | ✅ | 256 KB | ✅ | ✅ cuenta · ✅ meta | ✅ (1 ocultas; visibles con ?armar=1) | ✅ "Fin de prueba" · 24-dic (vía campo "Cuenta regresiva") | ✅ |
| Nosotros dos (`nosotrosdos.html`) | ✅ | ✅ | `app-nosotrosdos-` ✅ | PRESET_NAME, PRESET_DE, PRESET_DEDICATORIA, PRESET_CHECKLIST_JUNTOS, PRESET_LUGARES, PRESET_EVENTO, PRESET_FECHA, PRESET_DESDE, PRESET_HISTORIA ✅ | ✅ | 192 KB | ✅ | ✅ cuenta | ✅ (3 ocultas; visibles con ?armar=1) | ✅ "La llegada; de <Emilia>" · 24-dic (vía PRESET_FECHA) | ✅ |
| Reto personal (`retopersonal.html`) | ✅ | ✅ | `app-reto-` ✅ | PRESET_NAME, PRESET_DE, PRESET_DEDICATORIA ✅ | ✅ | 88 KB (28-sep: ícono del manifest recomprimido) | ✅ | ✅ meta | ✅ (no tiene) | n/a (sin cuenta regresiva) | ✅ |
| Romántico (`romantico.html`) | ✅ | ✅ | `app-favorita-` ✅ | PRESET_NAME, PRESET_DE, PRESET_DEDICATORIA, PRESET_EVENTO, PRESET_FECHA, PRESET_RAZONES, PRESET_CARTAS ✅ | ✅ | 187 KB | ✅ | ✅ cuenta | ✅ (2 ocultas; visibles con ?armar=1) | ✅ "La llegada; de <Emilia>" · 24-dic (vía PRESET_FECHA) | ✅ |

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

### Parte 2: PR nuevo después del merge ✅
10. **Modal propio** ✅ `pedir()`, `pedirUno()` y `mostrarTexto()` en las 15 plantillas, con los colores de cada una. Reemplaza los 108 `prompt()` del navegador. Nombre y fecha de la cuenta regresiva van en un solo modal con selector de fecha, y la meta del reto (3 campos) en otro.
5. **Dedicatoria** ✅ `PRESET_DE` y `PRESET_DEDICATORIA` en las 15. Sale una sola vez después de "Toca para abrir" y luego queda plegable en Hoy, debajo de "¿Cómo te llamas?".
6. **Aviso para instalar** ✅ Tarjeta en Hoy con los pasos según el celular (iPhone en Safari, iPhone desde Instagram/WhatsApp con botón para copiar la liga, Android). "Ya la guardé" la cierra para siempre, y no sale si la app ya está instalada.
9. **Romántico ≠ Nosotros dos** ✅
   - Romántico es una carta de quien regala: `PRESET_RAZONES` y la pestaña Cartas "Ábrelo cuando…" (`PRESET_CARTAS`), que solo aparece si hay cartas.
   - Nosotros dos es la app de la pareja: contador "Llevamos X días juntos" (`PRESET_DESDE`) y cuenta regresiva opcional, que se oculta sin fecha. Tiene la pestaña "Nuestra historia" (`PRESET_HISTORIA`) en lugar de Razones, y los mensajes van en plural. La cápsula guarda su fecha de apertura al sellarse.
7. **Listas precargadas** ✅
   - Maleta del hospital en dos secciones (`PRESET_MALETA_HOSPITAL`), checklist de viaje (`PRESET_CHECKLIST_VIAJE`), pendientes del último mes (`PRESET_ULTIMO_MES`) e ideas de citas en Juntos (se fijan con `PRESET_CHECKLIST_JUNTOS`, que ya existía).
   - Todas se pueden editar y borrar, y se cargan solo en la primera apertura.
8. **Mensajes sorpresa** ✅ Portada con el sobre con gatito, encabezado de color con "Hola, ___ 💌" y fecha, `apple-touch-icon`, favicon y manifest con ícono.

## Pendientes técnica/calidad después del merge del PR #2 (28-sep)
El commit de íconos (`b7ab85f`) no incluyó todo lo que decía su mensaje. Esto es lo que se encontró y se cerró en la misma ronda, sin PR nuevo (directo sobre `main` vía la rama de trabajo):

| # | Pendiente | Resultado |
|---|---|---|
| 1 | `PRESET_NAME` en Mi acompañante | ✅ Ya existía (línea 860 de `miacompanante.html`); no hacía falta nada. |
| 2 | Recomprimir el ícono grande del manifest en Damas de honor y Mi Radar | ✅ Los íconos originales son acuarela (más detalle que los íconos planos de otras plantillas), por eso pesaban más incluso ya en paleta. Se volvieron a cuantizar a 64 colores: Damas de honor de 27.7 KB (ícono 512×512 del manifest) a 11.4 KB, Mi Radar de 40.7 KB a 13.1 KB. Ahora usan un solo ícono de 220×220 reutilizado en portada, favicon, `apple-touch-icon` y manifest — el mismo estándar que Home Office y Mensajes sorpresa. Nuevos archivos: `assets/iconos/damas-ramo-220.png`, `assets/iconos/miradar-ojo-220.png`. De paso se encontró y corrigió un bug real: el manifest de ambas se había quedado con nombres de una versión anterior (`"Cuenta regresiva"` en Damas de honor, `"Mi blacklist"` en Mi Radar), lo que hacía que el ícono instalado en el celular mostrara el nombre equivocado debajo. |
| 3 | Chequeo de peso en las 15 plantillas | ✅ Se encontró una tercera plantilla pesada que no estaba en la lista original: **Reto personal**, con un manifest de 33.7 KB (ícono 512×512 con sombreado 3D). Se cuantizó igual (64 colores) y se unificó a un solo ícono de 220×220: `retopersonal.html` bajó de 198.3 KB a 88.0 KB. Con las tres arregladas, ninguna de las 17 plantillas (15 + 2 redirecciones) tiene ya una imagen incrustada mayor a 50 KB. |
| 4 | Modo armar sigue ocultando lo nuevo de la parte 2 | ✅ Probado con Playwright en las 15 plantillas sin `?armar=1`: cero elementos `.solo-armar` visibles y `body` nunca trae la clase `armando`. La dedicatoria y el aviso de instalar no dependen de `MODO_ARMAR` (es correcto: son para quien recibe, no herramientas de armado). El botón "+ Agregar cuenta regresiva" de Nosotros dos tampoco lleva `solo-armar` a propósito: es una función de la pareja, no de quien arma. |
| 5 | Probar el flujo desde el navegador integrado de WhatsApp e Instagram | ✅ con aclaración: no hay forma de abrir un WhatsApp/Instagram real en este entorno, así que se emuló su user-agent (iOS y Android) sobre Chromium con Playwright. Con eso se confirmó: la detección de navegador in-app (`Instagram`, `FBAN`, `WhatsApp` en el user-agent de iOS) muestra correctamente el aviso "copia la liga y ábrela en Safari" con botón para copiar; en Android muestra los pasos de Chrome; el modal propio (`pedir()`) abre y guarda bien bajo esos user-agents, sin disparar ningún `alert()`/`prompt()` nativo; "Ya la guardé" persiste en `localStorage` y no vuelve a salir tras recargar. Esto no reemplaza probarlo en un celular real la primera vez que alguien reciba un regalo, pero cubre lo que se podía revisar desde aquí. |

## 5 plantillas nuevas + limpieza aprobadas (28-sep-2026)
Claudia propuso 5 plantillas y 3 fixes de catálogo/paleta bajo la regla "esto lo decide Claudia", y dio su aprobación final explícita para las tres. Se construyeron directo sobre la rama de trabajo (no necesitan PR nuevo aparte, van en el mismo que los pendientes técnicos).

**Las 5 plantillas** (ver la tabla de "Plantillas" arriba para el detalle de cada una): reusan toda la infraestructura ya probada — modal propio, dedicatoria/aviso de instalar, pie de referidos, modo armar, `localStorage` con `APP_PREFIX` único. Por pedido explícito de Claudia, esta ronda entrega **solo la estructura funcional** (pestañas, `PRESET_`, mecánica, `localStorage`, modo armar, dedicatoria): los íconos son placeholder (ver sección "Íconos"), a la espera de que Claudia mande los definitivos.

**Limpieza de catálogo/paleta:**
- `demogenerica.html` pausada del catálogo de venta. Se revisó `index.html`, `regalos.html`, `pedido.html` y `catalogo.html`: ninguno referencia el archivo por nombre (el sitio de ventas fulfilla por categorías genéricas, no por archivo), así que no hubo nada que desconectar en código. El archivo se queda en `templates/`.
- `nosotrosdos.html` cambia de paleta a azul grisáceo (`--plum: #5C7A8A`, `--plum-dark: #3D515C` calculado para mantener la misma proporción de oscurecido que el resto de las plantillas), en CSS, `theme-color` y el `theme_color` del manifest. Ya no comparte identidad visual con Romántico (antes: `#A9776D`/`#734E46`, idéntico). No se tocó el ícono/artwork de la portada (bitmap, fuera de lo aprobado). El emoji 🌹 se cambió después, ver la ronda del 28-sep siguiente.

**Validado:**
- Sintaxis JS, balance de llaves/paréntesis/corchetes y peso (`<50 KB` por imagen) en las 22 plantillas.
- Modo armar: cero herramientas `.solo-armar` visibles sin `?armar=1` en las 22; con `?armar=1` si aparecen ("Fijar checklist/ideas en el código") en las plantillas que las tienen.
- Flujo completo con Playwright en cada plantilla nueva: nombre/negocio, registro de ventas y racha (Mi changarro), pedidos con estatus + clientas con aviso de "hace cuánto no le escribes" (Mini CRM), banco de ideas por categoría + checklist de publicar + racha (Calendario de contenido), meta con barra de progreso + historial (Meta de ventas), contador ascendente + cartas selladas + límites (Sanando de una ruptura).
- `configurador.html` detecta correctamente los `PRESET_` nuevos (`PRESET_NEGOCIO`, `PRESET_CHECKLIST_LANZAMIENTO`, `PRESET_IDEAS_CONTENIDO`, `PRESET_META_VENTAS`, `PRESET_LIMITES`) con etiquetas propias en `LABELS_CONOCIDOS`; probado subiendo `changarro.html`.

## 7 mejoras aprobadas, segunda ronda (28-sep-2026)
Claudia aprobó 7 puntos: 3 ya definidos por completo (se construyeron directo) y 4 nuevos sobre Damas de honor y Nosotros dos que son construcciones nuevas — para esos, la regla "esto lo decide Claudia" pide propuesta antes de programar el detalle fino.

**Construidos (1-3):**
1. `PRESET_NEGOCIO` en `metaventas.html` — mismo patrón que `changarro`/`minicrm`/`calendariocontenido`: campo en el setup inicial, `negocioTag` en la cabecera, se limpia con "Reiniciar app".
2. Chips de "Ya no permito" en `sanandoruptura.html` reemplazados por los 3 ejemplos exactos que dio Claudia ("Que me busque solo cuando le conviene", "Minimizar lo que sentí", "Compararme con alguien más") — menos presuntuosos sobre la historia de quien la usa que los genéricos anteriores.
3. Emoji de `nosotrosdos.html` cambiado de 🌹 (compartido con Romántico) a **⏳**, en cabecera, saludo, decoraciones y nav — se eligió sobre 🏡 porque encaja con el contador de días juntos y la cápsula del tiempo, que son el corazón de la app. De paso se corrigió un bug del mismo tipo que Damas/Mi Radar: el manifest y el `apple-mobile-web-app-title` decían "Mi favorita" (nombre viejo) en vez de "Nosotros dos".

**Construidos con luz verde directa (4 y 6):**
4. **Itinerario del día de la boda** (Damas de honor) — pestaña nueva "Itinerario" (🗓️), con el horario precargado que aprobó Claudia (arreglo, fotos, ceremonia, cóctel, recepción, primer baile, fiesta), editable/agregable, ordenado por hora, con "Fijar itinerario en el código" (`solo-armar`). Si `PRESET_FECHA` es hoy, en Hoy aparece una tarjeta "Ahora: [evento] · [hora]" con el siguiente bloque.
6. **Hitos automáticos** (Nosotros dos) — se detectan solos a partir de "desde cuándo están juntos": 100 días, 6 meses y cada año en adelante (1, 2, 3...). El día exacto de un hito, la tarjeta "Llevamos juntos" se reemplaza por una tarjeta de celebración (`#hitoCard`, confeti + el mensaje) sin botón de compartir, tal como se aprobó. Al día siguiente vuelve sola a la tarjeta normal.

**5 y 7, construidos con los copys aprobados:**
5. **Cierre del círculo** (Damas de honor) — dentro de la pestaña Mensajes, una segunda sección ("Cierre del círculo 💌") que solo aparece cuando ya pasó la fecha de la boda (reusa `isCountdownReached()`). Libro de firmas compartido: cada quien deja nombre + mensaje para la novia (su nombre se detecta solo de `PRESET_NOVIA`/el título de la cuenta regresiva), lista con fecha y botón eliminar, y el botón **"Armar recuerdo para [novia] 💌"** arma y copia el texto final con el formato aprobado.
7. **Mini-diario de gratitud** (Nosotros dos) — reemplaza por completo el check-in de ánimo (se quitan los emojis de MOODS y el atajo de WhatsApp) y se fusiona con "Recuerditos" en una sola tarjeta: "¿Qué agradeces hoy de tu persona? 💕", campo + botón "Guardar", lista con fecha y botón eliminar por entrada (ya no hay vista barajada). Los recuerditos que ya existían se conservan (mismo storage `companion-goodthings`, solo cambia cómo se muestran). Se quitaron también los contactos de emergencia (nombre, teléfono, botón "+ Agregar a tu persona") por quedarse sin ningún disparador — mismo criterio que la limpieza de `shareSymptoms()`. Las claves viejas (`companion-moods`, `companion-contacts`) se quedan en "Reiniciar app" para limpiar datos de quien ya las tenía guardadas.

**Con esto, los 7 puntos aprobados el 28-sep quedan construidos.**

## Catálogo de venta completo + sync a regaloparati.com (28-sep-2026)

**Catálogo de venta (`dragonflailabs.com`):** PR #6 mergeado en `main` (`84bdf80`). `regalos.html` pasó de 5 a las **19 entradas** en `DISENOS` (18 plantillas activas + la demo genérica) — las 14 que faltaban ya estaban construidas desde las rondas anteriores pero no estaban en el catálogo de venta. `plantilla-regalo.html` también quedó con `TEMAS` extendido para que la vista previa (iframe de `demoUrl()`) muestre el color real de cada plantilla nueva en vez de un tema por default. Verificado en vivo contra `raw.githubusercontent.com` de `main` después del merge: las 19 entradas de `DISENOS` y las llaves nuevas de `TEMAS` (`changarro`, `minicrm`, `calendario`, `metaventas`, `sanando`) están ahí con sus colores correctos.

**Sync a regaloparati.com:** repo `claulizacosta8/Dragonflai-regalos` (la otra cuenta de GitHub), commit `95797fb`. Las 18 plantillas activas quedaron ahí: 16 subidas por primera vez y `adultafuncional.html`/`romantico.html` reemplazadas por estar desactualizadas frente a `main`. Verificado byte a byte (hash) cada una de las 18 contra su versión en `templates/` de `main` de `Dragonflailabs` — las 18 coinciden exactamente.

Con esto, `dragonflailabs.com` (venta) y `regaloparati.com` (entrega) quedan alineados: ya no hay brecha entre lo que se vende y lo que se puede entregar.

**Nota de proceso:** durante este trabajo se detectó que tener los dos repos (`claulizah/Dragonflailabs` y `claulizacosta8/Dragonflai-regalos`, cuentas de GitHub distintas) agregados en una misma sesión cambia la identidad activa de las herramientas de GitHub y bloquea acciones de escritura (como abrir un PR) sobre el repo de la otra cuenta. A tener en cuenta a futuro: evitar mezclar ambos repos en una sola sesión cuando se necesite escribir en los dos — separarlo en sesiones distintas.

## Próximos pasos
1. ~~Verificar que los fixes estén en `main`, y correr las validaciones en las 15 plantillas.~~ PR #1 mergeado el 27-sep; Pages lo publicó bien. La revisión UX parte 2 va en el PR nuevo.
2. ~~Integrar la carriola en Bebé.~~ ~~Home Office y Mensajes sorpresa.~~ Falta el ícono de Mi semestre (pila de libros pastel) y los 5 íconos placeholder de las plantillas nuevas (28-sep).
3. ~~Decidir el ícono de Viaje.~~ Maleta, integrada el 27-sep.
4. **Esto lo decide Claudia** — Decidir si se retoma Cumpleaños y cómo (falta definir si la "línea de su vida" la arma una persona o varias). No se programa hasta que Claudia lo confirme; ver "Regla: 'esto lo decide Claudia'" arriba.
5. Construir "Fan de artista" y "Tareas de hijos" si se sigue esa línea.
6. ~~Agregar las 5 plantillas nuevas al catálogo de venta.~~ Hecho el 28-sep: PR #6 mergeado (`84bdf80`), `regalos.html` ya trae las 19 entradas. `regaloparati.com` sincronizado en el mismo movimiento (commit `95797fb`).
