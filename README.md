## PARCIAL 3 EDyA2

Aplicación desarrollada en **React + Vite** que modela una red
de ciudades conectadas y un sistema jerárquico de zonas verdes
para cada ciudad. Los datos se almacenan de manera persistente
en **Firebase Firestore**, e incluyen:

- El grafo completo de ciudades.
- Las zonas verdes de cada ciudad.
- Conexiones entre ciudades.
- Cambios en tiempo real, sincronizados automáticamente.

Además, se visualizan dos grafos:
1. El grafo de ciudades.
2. El grafo del árbol de zonas verdes de cada ciudad.

---
## ⚙️ INSTALACIÓN

Para evitar conflictos con dependencias serializables, la
instalación debe realizarse SIEMPRE usando:

    npm install --force

---
## 📌 TECNOLOGÍAS UTILIZADAS

- React + Vite (JavaScript)
- Redux Toolkit
- Firebase Authentication (Login con Google)
- Firebase Firestore (persistencia)
- react-d3-graph (visualización de grafos)
- Estructuras de datos personalizadas:
    - Graph (ciudades)
    - ZoneNode (árbol n-ario)
    - Stack, Queue, LinkedList
- React Router

---
## 🔐 AUTENTICACIÓN

La primera pantalla de la aplicación es el **Login con Google**.
- Si el usuario ya está autenticado, se redirige automáticamente a:
  /cities
- Si no tiene sesión activa, no podrá acceder a otra ruta.

---
## 🌆 RED DE CIUDADES (GRAFO)

El proyecto inicia con dos ciudades predeterminadas:

- Cali
- Jamundí

Funciones disponibles:
- Agregar nuevas ciudades.
- Eliminar ciudades existentes.
- Conectar ciudades entre sí (arista no dirigida).
- Visualizar el grafo completo usando react-d3-graph.

Todos los cambios quedan guardados en Firestore.

---
## 🌿 ZONAS VERDES (ÁRBOL N-ARIO)

Cada ciudad posee un árbol jerárquico de zonas verdes.

Acciones permitidas:
- Agregar nuevas zonas.
- Agregar subzonas.
- Editar zonas existentes.  
  *(No se permite eliminarlas.)*

Cálculos disponibles:
- Total de zonas.
- Longitud máxima del árbol.

Visualización:
- Se muestra el árbol textual.
- Se muestra un grafo de zonas verdes, donde cada nodo tiene
  un color verde según su profundidad:
  Nivel 0  → verde fuerte  
  Niveles superiores → verde cada vez más claro

---

## ▶️ EJECUCIÓN DEL PROYECTO

1. Instalar dependencias:
   npm install --force

2. Ejecutar en modo desarrollo:
   npm run dev

3. Abrir en el navegador

---
## 📝 NOTAS FINALES

- Firestore guarda automáticamente todo el grafo y las zonas.
- Si deseas reiniciar la base de datos, borra:
  cityNetwork/main
  en la colección correspondiente.
- react-d3-graph permite visualizar tanto ciudades como zonas.

---
## ✒️ AUTOR

Jorge Andrés Medina Urrutia  
Código: 2230419
