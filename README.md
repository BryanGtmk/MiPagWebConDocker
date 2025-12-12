# MiPagWebConDocker

## Descripción general
MiPagWebConDocker es una página web estática informativa sobre videojuegos (InfoGames). El proyecto muestra contenido académico sobre la historia, géneros y tecnologías de los videojuegos, y está preparado para ejecutarse en un contenedor Docker con Nginx. El repositorio es público y utiliza GitHub Actions para integración continua.

## Objetivos del proyecto
- Presentar información clara y bien estructurada sobre videojuegos.
- Practicar el despliegue de sitios estáticos con Docker y Nginx.
- Automatizar la construcción de la imagen Docker con GitHub Actions.
- Mantener una estructura de proyecto ordenada y fácil de entender.

## Tecnologías utilizadas
- HTML
- CSS
- JavaScript
- Docker
- Nginx
- GitHub Actions

## Estructura del proyecto
```
MiPagWebConDocker/
├── index.html
├── Dockerfile
├── README.md
├── css/
│   └── styles.css
├── js/
│   └── main.js
└── assets/
		└── img/
```

## Dockerización del proyecto
- **Dockerfile**: usa la imagen base `nginx:alpine` y copia todo el contenido del proyecto en `/usr/share/nginx/html`, que es el directorio público de Nginx.

### Construir la imagen Docker
```bash
docker build -t mipagweb .
```

### Ejecutar el contenedor
```bash
docker run -d -p 8080:80 --name mipagweb mipagweb
```

- La página quedará disponible en: http://localhost:8080
- Para detener y eliminar el contenedor (si ya existe):
```bash
docker stop mipagweb && docker rm mipagweb
```

## Integración Continua con GitHub Actions
- **¿Qué es GitHub Actions?** Es la plataforma de automatización de GitHub que permite ejecutar flujos de trabajo (workflows) en eventos del repositorio, facilitando tareas como pruebas, builds y despliegues.

- **Workflow "Docker Build on Main"**: definido en `.github/workflows/docker-build.yml`. Se ejecuta en `ubuntu-latest` cuando hay `push` o `pull_request` hacia la rama `main`. Pasos principales:
	1. Checkout del repositorio con `actions/checkout@v4`.
	2. Construcción de la imagen Docker con `docker build -t mipagweb .` usando el `Dockerfile` de la raíz. No realiza despliegue, solo build (integración continua).

## Contribuciones
- Haz un fork del repositorio.
- Crea una rama para tu cambio: `git checkout -b feature/mi-cambio`.
- Realiza tus modificaciones y confirma: `git commit -m "Descripcion breve"`.
- Envía un Pull Request hacia `main` describiendo el cambio y su motivacion.

## Licencia
Este proyecto se distribuye bajo la licencia MIT. Puedes usarlo y modificarlo libremente, manteniendo los avisos de copyright y la licencia.
