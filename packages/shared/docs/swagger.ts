interface SwaggerOptions {
  definition: {
    openapi: string,
    info: {
      title: string,
      version: string,
    },
  },
  apis: string[],
}

export function getSwaggerOptions(options: SwaggerOptions) {
  return {
      definition: {
      openapi: '3.0.0',
      info: {
        title: 'Minimal Express API',
        version: '1.0.0',
      },
    },
    apis: ['./src/routes/*.ts'], // Path to your route files for API documentation
  }
};