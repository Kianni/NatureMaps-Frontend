# UT 924 — Fuentes de información

RF23, RNF6. Cambios separados en frontend y backend, ambos en `feat/ut-924-source-provenance`, desde sus respectivas `main`.

## Qué cambia

La ficha muestra en Fuentes la entidad responsable, la fecha con su significado (consulta, recuperación o última importación), la versión si consta y un enlace. También muestra la fuente municipal en especies sin texto editorial. Los créditos y licencias existentes se conservan.

El backend añade `provenance` a plantas, especies y ubicaciones. Reutiliza las columnas actuales y reconoce la fecha explícita de las referencias editoriales antiguas. No necesita migración ni volver a importar los datos. El detalle del contrato está en `docs/source-provenance.md` del backend y en [el plan](plan-ut-924.md).

El frontend anterior sigue funcionando con el backend nuevo. El frontend nuevo admite la API anterior, pero entonces solo muestra los datos que esa API proporciona. Para revisar UT 924 completa hay que ejecutar las dos ramas. No depende de UT 921, 932 ni 933; sus etiquetas están en `src/components/SourceMetadata/locales/{es,va,en}.json`.

## Comprobación manual

1. Backend: seleccionar la rama UT 924 y ejecutar `npm run dev` en `NatureMaps-Backend`.
2. Frontend: seleccionar la rama UT 924 y ejecutar `npm run dev` en `NatureMaps-Frontend`. Si Vite ya está activo en este checkout, basta recargar el navegador.
3. Abrir `http://localhost:5173/ficha`. Desplazarse a Fuentes de información.
4. Comprobar que el inventario indica Ajuntament de València, una última importación real y un enlace al conjunto de datos.
5. Pulsar el enlace: debe abrirse en otra pestaña. Volver a la ficha y navegar con Siguiente/Anterior.
6. En una especie con texto o foto, comprobar sus fuentes y créditos. Las consultas editoriales del seed llevan 25/10/2026; las recuperaciones automáticas pueden tener otra fecha.
7. Cambiar el idioma en Ajustes y volver a la ficha. Revisar las etiquetas en español, valenciano e inglés y en una ventana estrecha (320 px).
8. Abrir `http://localhost:3000/trees?limit=1` y `/species?limit=1`: `provenance` debe contener entidad, enlace y fecha o versión. En `/trees/ID`, la fuente enlaza al ejemplar; en `/species/ID`, al conjunto de datos. Sustituir ID por un identificador devuelto por la lista.

La última importación no es una fecha de revisión/publicación del Ayuntamiento. No se inventa una versión. Las entidades o fechas desconocidas se indican como no disponibles. Los nombres propios y los textos de la fuente conservan su idioma original.

## Verificación técnica

Backend: `npm run build` y `npm run test:catalog` (PostgreSQL aislado). Frontend: `npm run build`, `npm run lint`, `npm test`. Las verificaciones de la base compartida usan únicamente SELECT/GET; no consumen cuota de Pl@ntNet.

Resultado del 05/11/2026: backend 23 pruebas correctas; frontend 194; combinación con UT 921/932/933, 222. Build y lint correctos. Los 24 órdenes de integración no tienen conflictos para los commits registrados en `evidencias/ut-924/integration.json`. Los informes de aceptación indican expresamente qué se verificó automáticamente en navegador con la API real.
