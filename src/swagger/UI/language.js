/**
 * @swagger
 * /otil/v1/api/language:
 *   get:
 *       summary: get all languages
 *       tags: [language]
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
 * /otil/v1/api/language/{language_id}/type:
 *   get:
 *       summary: get word types
 *       tags: [language]
 *       security:
 *            - token: []
 *       parameters:
 *            - in: path
 *              name: language_id
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
 * /otil/v1/api/language:
 *   post:
 *       summary: create language
 *       tags: [language]
 *       security:
 *            - token: []
 *       requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          example: { "language": "Qozoq tili", description:"" }
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
 * /otil/v1/api/language/type:
 *   post:
 *       summary: create word type
 *       tags: [language]
 *       security:
 *            - token: []
 *       requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          example: { "language": 2, description:"" }
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
