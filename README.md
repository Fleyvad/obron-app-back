A MERN application is needed that focuses on project management at site level, and is accessible to non-technical users. The application must have a login system for administrators and regular users.

CRUD functionality will allow the administrator (such as an architect, for example) to create an empty project, and then edit it to populate the fields with relevant information, such as project name, date, company, line item code, etc. The administrator should also have the option to delete create or download projects.

On the other hand, the logged-in user (such as the site foreman) should be able to see the projects he/she has access to in his/her profile. The user should be able to fill in fields with specific information about the project, such as the number, the name of the workers assigned to the item, the measurements taken, the observations, and the tools and machinery used. It should also be possible to associate images of the process.

In this back-end, the four basic operations a software application can perform, CRUD, are defined.

The document database that is used is MongoDB (https://www.mongodb.com/), with Mongoose (https://mongoosejs.com/) to model it. The API for the app is built using Render (https://render.com/docs). For storage and uploding images and text files, Supabase (https://supabase.com/) and Multer (https://www.npmjs.com/package/multer) are used.

The language in which this app is programmed is Typescript (https://www.typescriptlang.org/).

In order to keep the code clean and follow best practices, these tools are used:

-Husky hooks (https://typicode.github.io/husky/#/)

-Eslint (https://eslint.org/)

-Code formatter Prettier (https://prettier.io/)

-SonarCloud (https://www.sonarsource.com/products/sonarcloud/)

-Editorconfig

Testing is also done through all the project, with the help of:

-Jest (https://jestjs.io/)

-Mock Service Worker (https://mswjs.io/)

-MongoDB Memory Server (https://www.npmjs.com/package/mongodb-memory-server)

-Supertest (https://www.npmjs.com/package/supertest)
