# Instrucciones para Claude Code en este repo

## Gate de aprobación para decisiones de producto (regla desde el 28-sep-2026)

Antes de programar cualquier cosa marcada **"esto lo decide Claudia"** (o equivalente, como "propón, no lo cambies sin consultarme") en `docs/estado-proyecto.md`, en un issue o en una conversación: **no la programes todavía.**

En vez de eso:
1. Escribe la propuesta primero — en el reporte a Claudia o en `docs/estado-proyecto.md`.
2. Espera su confirmación explícita antes de tocar el código.
3. Si no hay forma de saber si ya confirmó algo, **pregúntale** en vez de asumir.

**Esto aplica a:** cualquier cambio de producto que afecte cómo se ve o se siente una plantilla ante quien recibe o quien compra (diferenciar dos plantillas, cambiar contenido o tono, decidir si se retoma una plantilla pausada y cómo, etc.). Ahora mismo aplica en concreto a:
- Si se retoma **Cumpleaños** y cómo (sigue sin decidirse si la "línea de su vida" la arma una persona o varias).

**No aplica a:** fixes técnicos, de rendimiento, seguridad o limpieza de código (como el PR #3). Esos se avanzan directo, sin esperar aprobación.

### Por qué existe esta regla
El punto 9 de la revisión UX (diferenciar Romántico y Nosotros dos) traía la nota "propón qué hace única a cada una; no lo cambies sin consultarme", y se programó y se mergeó en el PR #2 sin pasar por Claudia primero. El resultado quedó bien y no se deshizo, pero no se debe repetir el patrón: la próxima vez que algo lleve esa marca, se propone y se espera, no se asume.
