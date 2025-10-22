# 🎬 Movies App

A mobile app developed with **React Native CLI** that allows you to explore, search, and discover movies using the public API of **[The Movie Database (TMDB)](https://www.themoviedb.org/documentation/api)**.
Compatible with **iOS** and **Android**.

---

## 🚀 Main features

- **Search for movies** by title.
- **Movie details** (synopsis, rating, release date, cast, trailers, etc.).
- **Popular movies**, **by producer**, and **top-rated**.
- **Add to favorites or wishlist** (local persistence).

## 🛠️ Technologies used

| Category | Technologies |
|------------|-------------|
| Framework | React Native CLI |
| Language | TypeScript |
| Navigation | React Navigation |
| HTTP Client | Axios |
| API | The Movie Database (TMDB) |
| State / Context | React Context / Hooks |
| Design | Atomic Design |

---

## 📂 Estructura del proyecto


## ⚙️ Configuration and installation

### 1. Clona el repositorio

```bash
git clone https://github.com/tuusuario/movies-app.git
cd movies-app
```

### 2. Instala las dependencias

```bash
npm install
# o
yarn install
```

### 3. Configura tu API Key de TMDB

1. Crea una cuenta gratuita en [TMDB](https://www.themoviedb.org/).  
2. Obtén tu API key (v3).  
3. Crea un archivo `.env` en la raíz del proyecto con el siguiente contenido:

   ```bash
   TMDB_API_KEY=TU_API_KEY_AQUI
   TMDB_BASE_URL=https://api.themoviedb.org/3
   ```

4. Asegúrate de cargar las variables con tu librería de entorno 

## 📱 Ejecución del proyecto

### Android
```bash
npx react-native run-android
```

### iOS
```bash
cd ios && pod install && cd ..
npx react-native run-ios
```

