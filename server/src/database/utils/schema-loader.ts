import * as fs from 'fs';
import * as path from 'path';

export function getAutoLoadSchemas(): { name: string; schema: any }[] {
  const schemas: { name: string; schema: any }[] = [];
  // Resolve the dedicated 'schemas' directory
  const baseDir = path.resolve(__dirname, '../schemas');

  function findSchemasRecursively(dir: string) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
      const fullPath = path.join(dir, file);
      const stat = fs.statSync(fullPath);

      if (stat.isDirectory()) {
        findSchemasRecursively(fullPath);
      } else if (
        fullPath.endsWith('.schema.ts') ||
        fullPath.endsWith('.schema.js')
      ) {
        // Dynamically load the file
        const exported = require(fullPath);

        // Use the PascalCase of the filename (without extension) as the registered schema name.
        // e.g., 'user.schema.ts' -> 'User'
        const filename = path.basename(fullPath);
        const baseName = filename.replace(/\.schema\.(ts|js)$/, '');
        const modelName = baseName
          .split(/[-_]/)
          .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
          .join('');

        const exportedKeys = Object.keys(exported);
        for (const key of exportedKeys) {
          if (key.toLowerCase().includes('schema') && exported[key]) {
            // Check if it's already added to prevent duplicates
            if (!schemas.some((s) => s.name === modelName)) {
              schemas.push({
                name: modelName,
                schema: exported[key],
              });
            }
            break; // Stop after finding the first schema export in this file
          }
        }
      }
    }
  }

  try {
    findSchemasRecursively(baseDir);
  } catch (error) {
    console.error('Error auto-loading schemas:', error);
  }

  return schemas;
}
