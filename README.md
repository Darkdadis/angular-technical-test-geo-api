# 🚀 Angular Technical Test - Geo API

Technical test - Angular application to search French regions, display their departments, and list the communes using the official [geo.api.gouv.fr](https://geo.api.gouv.fr) public API.

---

## 📦 Tech stack

- **Node.js version:** 23.6.0
- **Angular version:** 19

---

## ✨ Features required

- 🔎 Search for a French region by name with autocomplete
- 🗺️ Display the list of departments in the selected region
- 🏘️ Show the list of communes in the selected department
- 🧪 Includes at least one unit test
- 📚 Clean, maintainable code with Angular best practices

---

## ➕ Additional features

- 🔤 **Commune filtering by first letter**:  
  After selecting a department, users can filter the list of communes by choosing the first letter of the commune name. This improves usability and makes it easier to navigate departments with many communes.

---

## 🌐 APIs used

- 🔹 Get regions by name (autocomplete):  
  `GET https://geo.api.gouv.fr/regions?nom=nomDeLaRegion`

- 🔹 Get departments of a region:  
  `GET https://geo.api.gouv.fr/regions/{regionCode}/departements`

- 🔹 Get communes of a department:  
  `GET https://geo.api.gouv.fr/departements/{departmentCode}/communes`

---

## 🧪 Unit Testing

An additional unit test has been added to ensure the **correct execution of the region search functionality**.  
This test verifies that the service:
- Hits the appropriate endpoint on `geo.api.gouv.fr`,
- Processes the HTTP response as expected.

---

## 📂 NPM Scripts

| Script         | Description                       |
|----------------|----------------------------------|
| `npm start`    | Run the app in dev mode on `http://localhost:4200` |
| `npm test`     | Run unit tests with Karma & Jasmine |

---

## 🚀 Installation

```bash
git clone https://github.com/your-username/angular-technical-test-geo-api.git
cd angular-technical-test-geo-api
npm install
npm start
```

---

## 👨‍💻 Author

Developed by **Régis Buquet**  
🔗 [LinkedIn: regis-buquet-dev](https://www.linkedin.com/in/regis-buquet-dev/)
