import { Application } from "express";

export const listRoutes = (app: Application) => {
  const cleanPath = (regexp: RegExp) => {
    return regexp
      .toString()
      .replace(/^\/\^/, "")
      .replace(/\$\//, "")
      .replace(/\(\?:\(\?=\/\|\)\)/g, "")
      .replace(/\\\//g, "/")
      .replace(/\?.*/, "");
  };

  const routes: { Method: string; Path: string }[] = [];

  const extractRoutes = (stack: any, basePath = "") => {
    stack.forEach((middleware: any) => {
      if (middleware.route) {
        // Direct route
        routes.push({
          Method: Object.keys(middleware.route.methods).join(", ").toUpperCase(),
          Path: (basePath + middleware.route.path).replace("//", "/")
        });
      } else if (middleware.name === "router") {
        // Extract prefix correctly
        const newBasePath = basePath + cleanPath(middleware.regexp);
        extractRoutes(middleware.handle.stack, newBasePath);
      }
    });
  };

  extractRoutes(app._router.stack);

  console.log("\nAvailable Routes:");
  console.table(routes);
};