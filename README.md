# 🚀 Angular Technical Test - Geo API

Angular application to search French regions, display their departments, and list the communes using the official [geo.api.gouv.fr](https://geo.api.gouv.fr) public API.

---

## ✨ Features

- 🔎 Search for a French region by name with autocomplete
- 🗺️ Display the list of departments in the selected region
- 🏘️ Show the list of communes in the selected department
- 🧪 Includes at least one unit test
- 📚 Clean, maintainable code with Angular best practices

---

## ⚙️ Tech stack

- **Angular** ^19.2
- **TypeScript** ~5.7
- **RxJS** ~7.8
- **Zone.js** ~0.15
- **Karma & Jasmine** for testing

---

## 🌐 APIs used

- 🔹 Get regions by name (autocomplete):  
  `GET https://geo.api.gouv.fr/regions?nom=nomDeLaRegion`

- 🔹 Get departments of a region:  
  `GET https://geo.api.gouv.fr/regions/{regionCode}/departements`

- 🔹 Get communes of a department:  
  `GET https://geo.api.gouv.fr/departements/{departmentCode}/communes`

---

## 📂 NPM Scripts

| Script         | Description                       |
|----------------|----------------------------------|
| `npm start`    | Run the app in dev mode on `http://localhost:4200` |
| `npm run build`| Build the app for production     |
| `npm run watch`| Watch files and rebuild on changes |
| `npm test`     | Run unit tests with Karma & Jasmine |

---

## 🚀 Installation

```bash
git clone https://github.com/your-username/angular-technical-test-geo-api.git
cd angular-technical-test-geo-api
npm install
npm start
