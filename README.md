# TailorTrack — Frontend

Frontend de **TailorTrack: All-in-One Tailoring & Retail ERP**, un proyecto académico desarrollado en el marco de la **Práctica Profesionalizante** de la carrera de Desarrollo de Software.

El sistema está orientado a la gestión integral de una empresa de indumentaria masculina elegante sport, contemplando procesos relacionados con productos, ventas, stock, clientes, proveedores y administración.

## 👥 Equipo

El proyecto fue desarrollado inicialmente por:

* **Raiza Cunha**
* **Naara Larcher**
* **Micaela Caamaño**

Actualmente, **Raiza Cunha continúa con el desarrollo y evolución del proyecto en la Práctica Profesionalizante 3**, incorporando nuevas funcionalidades y mejoras a partir de las observaciones realizadas durante las etapas anteriores.

## 🛠️ Tecnologías

* **React**
* **TypeScript**
* **Vite**
* **Tailwind CSS**
* **Axios**
* **React Router**
* **Lucide React**

## 📁 Estructura principal

```text
TailorTrack-frontend/
├── src/
│   ├── components/
│   ├── helpers/
│   ├── layouts/
│   ├── pages/
│   ├── routes/
│   ├── services/
│   ├── types/
│   └── ...
├── public/
├── package.json
├── tsconfig.json
└── vite.config.ts
```

La aplicación sigue una organización por componentes, páginas, servicios, tipos y rutas, separando responsabilidades y facilitando el mantenimiento y la evolución del proyecto.

## 🚀 Ejecución

### Requisitos

* Node.js
* npm

### Instalación

Clonar el repositorio e instalar las dependencias:

```bash
npm install
```

Configurar las variables de entorno en un archivo `.env`.

Para iniciar el entorno de desarrollo:

```bash
npm run dev
```

El frontend queda disponible en:

```text
http://localhost:5173
```

La aplicación se comunica con el backend mediante la API:

```text
http://localhost:4000/api
```

## ✨ Funcionalidades destacadas

* Autenticación de usuarios.
* Gestión de productos.
* Gestión de categorías.
* Gestión de marcas.
* Asociación de marcas a productos.
* Validación de datos en formularios.
* Baja lógica de productos.
* Visualización de productos inactivos.
* Reactivación de productos previamente desactivados.
* Manejo y visualización de errores provenientes de la API.
* Navegación mediante rutas protegidas.
* Interfaz de administración para la gestión de datos.

## 📌 Estado del proyecto

El frontend se encuentra **en desarrollo** y continúa evolucionando como parte de las actividades de la **Práctica Profesionalizante 3**.

Las funcionalidades, componentes y estructura pueden continuar modificándose a medida que avance el proyecto.
