import swaggerUi from 'swagger-ui-express'
import { getMetadataArgsStorage } from 'routing-controllers';
import { validationMetadatasToSchemas } from 'class-validator-jsonschema';
import { routingControllersToSpec } from 'routing-controllers-openapi';

export function attachSwagger(expressApp: any) {
  const storage = getMetadataArgsStorage();

  const schemas = validationMetadatasToSchemas({
    refPointerPrefix: '#/components/schemas/',
  });

  const spec2 = routingControllersToSpec(storage, {}, {
    components: { schemas,
      securitySchemes: {
        bearerAuth: {
            type: 'http',
            scheme: 'bearer',
            bearerFormat: 'JWT'
        },
    }, },
    info: { title: 'Users', version: '0.0.0' },
  });
  console.log(JSON.stringify(spec2))
  expressApp.use('/docs', swaggerUi.serve, swaggerUi.setup(spec2));
}
