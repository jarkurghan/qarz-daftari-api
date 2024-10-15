/**
 * @swagger
 * /otil/v1/api/resource:
 *   get:
 *       summary: get all resources
 *       tags: [resource]
 *       security:
 *            - token: []
 *       responses:
 *            200:
 *                description: success
 *                content:
 *                    application/json:
 *                         schema:
 *                              type: string
 *            400:
 *                description: error
 *                content:
 *                    application/json:
 *                         schema:
 *                              type: string
 */
/**
 * @swagger
 * /otil/v1/api/resource/file/{id}:
 *   get:
 *       summary: read file
 *       tags: [resource]
 *       security:
 *            - token: []
 *       parameters:
 *            - in: path
 *              name: id
 *              required: true
 *              schema:
 *                     type: integer
 *                     example: 1
 *       responses:
 *            200:
 *                description: success
 *                content:
 *                    application/json:
 *                         schema:
 *                              type: string
 *            400:
 *                description: error
 *                content:
 *                    application/json:
 *                         schema:
 *                              type: string
 */

/**
 * @swagger
 * /otil/v1/api/resource:
 *   post:
 *       summary: create resource
 *       tags: [resource]
 *       security:
 *            - token: []
 *       requestBody:
 *            required: true
 *            content:
 *                  multipart/form-data:
 *                       schema:
 *                            type: object
 *                            properties:
 *                                 file:
 *                                     type: string
 *                                     format: binary
 *                                 name:
 *                                     type: string
 *                                     example: resurs
 *       responses:
 *            200:
 *                description: success
 *                content:
 *                    application/json:
 *                         schema:
 *                              type: string
 *            400:
 *                description: error
 *                content:
 *                    application/json:
 *                         schema:
 *                              type: string
 */
