/* ══════════════════════════════════════════════════════════════════
   CATÁLOGO DE DISEÑOS — fuente única para index.html y regalos.html.
   Antes cada página tenía su propia copia de DISENOS/NOMBRES y se
   desincronizaban (el home se quedó en 7 diseños mientras regalos.html
   ya tenía 19). Se edita aquí una sola vez y las dos páginas lo reflejan.

   `activo:false` marca un diseño que sigue en el catálogo de venta
   (regalos.html lo muestra) pero no cuenta como una de las plantillas
   activas — usarlo para filtrar vitrinas que solo deban mostrar las
   plantillas activas (home).

   `color`/`icono` son los mismos valores de `main`/`deco` en el TEMAS
   de plantilla-regalo.html (no son un color de marketing aparte): así
   una tarjeta nunca desentona con el color real que carga su demo.

   `categoria` agrupa las 18 activas en las mismas 4 categorías que ya
   se usan en como-instalar.html (Bodas y parejas · Bienestar y
   crecimiento personal · Negocio y emprendimiento · Vida diaria).
   ══════════════════════════════════════════════════════════════════ */
const DISENOS = [
  { id:"animo", nombre:"Para levantar el ánimo", tema:"mariposa", activo:false,
    color:"#E85D9E", icono:"🦋",
    titulo:"Para levantar el ánimo",
    para:"Para alguien que está pasando una racha pesada y no siempre lo dice.",
    trae:["Un mensajito distinto cada día","Cajita de cosas buenas para releer","Recordatorios de lo que se le olvida","Contactos a un toque para cuando no quiere estar sola"] },
  { id:"salud", nombre:"Acompañamiento", tema:"durazno",
    color:"#EE7E92", icono:"🌸", categoria:"Bienestar y crecimiento personal",
    titulo:"Acompañamiento en un tratamiento",
    para:"Para quien tiene que acordarse de citas, estudios y cómo se ha sentido.",
    trae:["Diario de cómo se siente, listo para su doctora","Barra de avance del tratamiento","Recordatorios de citas y estudios"] },
  { id:"amor", nombre:"Romántico", tema:"noche",
    color:"#7C5CE0", icono:"✨", categoria:"Bodas y parejas",
    titulo:"Para alguien que quieres",
    para:"Para un aniversario, una distancia, o porque sí.",
    trae:["Razones para amarte, siempre a la mano","Cartas “Ábrelo cuando…” selladas por fecha","Nuestro mapa de lugares compartidos"] },
  { id:"reto", nombre:"Un reto personal", tema:"bosque",
    color:"#3E9B62", icono:"🌿", categoria:"Bienestar y crecimiento personal",
    titulo:"Para quien empezó algo difícil",
    para:"Un maratón, dejar un vicio, volver al gimnasio, terminar la tesis.",
    trae:["Mapa de días marcados (✓ / ✗)","Racha de días consecutivos","Notas para registrar cómo va el reto"] },
  { id:"bebe", nombre:"Nueva mamá", tema:"atardecer",
    color:"#F2704B", icono:"🌅", categoria:"Bodas y parejas",
    titulo:"Para esta etapa",
    para:"Embarazo o recién nacido, cuando se te olvida hasta tu nombre.",
    trae:["Cuenta regresiva a la fecha esperada","Diario para ir registrando la espera","Mensajes sellados para leer después"] },
  { id:"nosotrosdos", nombre:"Nosotros dos", tema:"nosotrosdos",
    color:"#5C7A8A", icono:"⏳", categoria:"Bodas y parejas",
    titulo:"Para los dos",
    para:"Para tu pareja, para celebrar lo que llevan juntos y todo lo que falta.",
    trae:["Hitos automáticos (100 días, 6 meses, cada año)","Mini-diario de gratitud con fecha","Contador de “llevamos juntos” siempre visible"] },
  { id:"boda", nombre:"Cuenta regresiva — boda", tema:"boda",
    color:"#C9A24A", icono:"💍", categoria:"Bodas y parejas",
    titulo:"Para la novia",
    para:"Para la futura esposa, contando los días hasta el gran día.",
    trae:["Cuenta regresiva a la fecha exacta","Diario para ir registrando cómo se siente","Mensajes sellados para leer en momentos clave"] },
  { id:"viaje", nombre:"Cuenta regresiva — viaje", tema:"viaje",
    color:"#3D9483", icono:"✈️", categoria:"Bodas y parejas",
    titulo:"Para el viaje que ya viene",
    para:"Para quien está contando los días para su próximo viaje.",
    trae:["Cuenta regresiva a la fecha de salida","Diario de la espera y la emoción","Mensajes sellados para leer en el camino"] },
  { id:"adulta", nombre:"Adulta funcional", tema:"adulta",
    color:"#6E74A8", icono:"🧾", categoria:"Vida diaria",
    titulo:"Para sobrevivir el mes",
    para:"Para quien está aprendiendo a ser adulta y necesita ayuda para no perder el hilo.",
    trae:["Generador de excusas al toque","Pagos del mes y racha de “adulta funcional”","Tarjeta compartible para presumir (o reírse)"] },
  { id:"radar", nombre:"Mi Radar", tema:"radar",
    color:"#7A4AD6", icono:"🔮", categoria:"Bienestar y crecimiento personal",
    titulo:"Para andar de soltera",
    para:"Para quien está soltera y quiere llevar cuentas claras de con quién anda.",
    trae:["Radar con notas de cada prospecto","Victorias de soltera para celebrar","Diario de cómo se siente"] },
  { id:"damashonor", nombre:"Damas de honor", tema:"damashonor",
    color:"#C9A24A", icono:"💍", categoria:"Bodas y parejas",
    titulo:"Para la boda de tu mejor amiga",
    para:"Para las damas de honor, para organizar la boda de su amiga sin perder nada.",
    trae:["Itinerario del día con “ahora: …” en vivo","Mensajes de la novia que se abren cuando toca","Libro de firmas compartido entre las damas"] },
  { id:"sorpresa", nombre:"Mensajes sorpresa", tema:"sorpresa",
    color:"#C97A45", icono:"💌", categoria:"Bodas y parejas",
    titulo:"Para un día especial",
    para:"Para un cumpleaños, un aniversario o cualquier día que quieras hacer especial.",
    trae:["Cuenta regresiva a la fecha del evento","Mensajes de varias personas, sellados hasta que toque","Todo reunido en un solo link para compartir"] },
  { id:"semestre", nombre:"Mi semestre", tema:"semestre",
    color:"#3E7C87", icono:"📚", categoria:"Vida diaria",
    titulo:"Para sobrevivir el semestre",
    para:"Para quien está en la escuela y necesita organizarse sin ahogarse.",
    trae:["Tareas y horario en un solo lugar","Racha de días de estudio","Cuenta regresiva a exámenes o entregas"] },
  { id:"homeoffice", nombre:"Home Office", tema:"homeoffice",
    color:"#5F7A61", icono:"💻", categoria:"Vida diaria",
    titulo:"Para trabajar desde casa",
    para:"Para quien trabaja desde casa y necesita rutina, no caos.",
    trae:["Checklist diario de rutina","Registro de gastos y facturas","Todo organizado en un solo lugar"] },
  { id:"changarro", nombre:"Mi changarro desde cero", tema:"changarro",
    color:"#C1861F", icono:"🚀", categoria:"Negocio y emprendimiento",
    titulo:"Para arrancar su negocio",
    para:"Para quien está empezando su changarro desde cero.",
    trae:["Checklist de lanzamiento paso a paso","Registro y racha de ventas","Notas para ideas y pendientes"] },
  { id:"minicrm", nombre:"Mini CRM de pedidos y clientas", tema:"minicrm",
    color:"#C23B75", icono:"📋", categoria:"Negocio y emprendimiento",
    titulo:"Para llevar el changarro",
    para:"Para quien ya tiene su negocio y necesita llevar pedidos y clientas en orden.",
    trae:["Pedidos con estatus de avance","Fichas de clientas con aviso de seguimiento","Notas para no olvidar ningún detalle"] },
  { id:"calendario", nombre:"Calendario de contenido", tema:"calendario",
    color:"#1E9E8E", icono:"📸", categoria:"Negocio y emprendimiento",
    titulo:"Para las redes de su negocio",
    para:"Para quien vende por redes y necesita organizar qué publicar.",
    trae:["Banco de ideas de contenido","Checklist antes de publicar","Racha de días publicando"] },
  { id:"metaventas", nombre:"Meta de ventas del mes", tema:"metaventas",
    color:"#2568C4", icono:"📈", categoria:"Negocio y emprendimiento",
    titulo:"Para llegar a la meta",
    para:"Para quien vende y quiere llevar el registro de su meta del mes.",
    trae:["Barra de progreso hacia la meta","Registro rápido de ventas","Historial del mes para ver el avance"] },
  { id:"sanando", nombre:"Sanando de una ruptura", tema:"sanando",
    color:"#7C6F8C", icono:"🌱", categoria:"Bienestar y crecimiento personal",
    titulo:"Para cuando terminó algo",
    para:"Para quien está sanando de una ruptura y necesita un espacio para ella.",
    trae:["Contador ascendente de días desde la ruptura","Cartas selladas para leer en el momento indicado","Chips de “ya no permito” para poner límites"] },
];

/* Orden fijo de categorías para la cuadrícula del home — no alfabético,
   sigue el mismo orden que como-instalar.html. */
const CATEGORIAS_ORDEN = ["Bodas y parejas","Bienestar y crecimiento personal","Negocio y emprendimiento","Vida diaria"];

const NOMBRES = { animo:"Ana", salud:"Rosa", amor:"Sofi", reto:"Luis", bebe:"Mar",
  nosotrosdos:"Ale", boda:"Vale", viaje:"Cami", adulta:"Fer", radar:"Any",
  damashonor:"Pau", sorpresa:"Dani", semestre:"Mica", homeoffice:"Lore",
  changarro:"Nay", minicrm:"Caro", calendario:"Vane", metaventas:"Isa", sanando:"Karla" };
