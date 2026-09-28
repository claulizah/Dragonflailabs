# Estado del proyecto: DragonflaiLabs / Apps de regalo
_Actualizado: 28-sep-2026 · este archivo se actualiza en el repo cada vez que se cierra algo_

## Flujo de trabajo
El desarrollo se hace en **Claude Code**, directo sobre el repo, que es la fuente única de verdad. El chat se usa para decisiones de producto, revisión de assets visuales y análisis de lo que reporta Claude Code.

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

## Próximos pasos
1. ~~Verificar que los fixes estén en `main`, y correr las validaciones en las 15 plantillas.~~ PR #1 mergeado el 27-sep; Pages lo publicó bien. La revisión UX parte 2 va en el PR nuevo.
2. ~~Integrar la carriola en Bebé.~~ ~~Home Office y Mensajes sorpresa.~~ Falta el ícono de Mi semestre (pila de libros pastel).
3. ~~Decidir el ícono de Viaje.~~ Maleta, integrada el 27-sep.
4. Decidir si se retoma Cumpleaños.
5. Construir "Fan de artista" y "Tareas de hijos" si se sigue esa línea.
