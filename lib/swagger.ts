// lib/swagger.ts
import swaggerJsdoc from "swagger-jsdoc";

const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "Cinimaty Careers",
    version: "1.0.0",
    description: "API documentation for Cinimaty Careers",
  },
  servers: [
    {
      url: "http://localhost:3000/api",
    },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
      },
    },
  },
  tags: [
    {
      name: "Applications",
      description: "Application management endpoints",
    },
  ],
};

const options = {
  swaggerDefinition,
  apis: [
    `${process.cwd()}/app/api/**/route.ts`,
    `${process.cwd()}/app/api/**/route.js`,
  ],
};

// Add this for debugging
const swaggerSpec = swaggerJsdoc(options);
console.log("Found files:", options.apis);
// console.log("Generated paths:", swaggerSpec.paths);

export default swaggerSpec;
