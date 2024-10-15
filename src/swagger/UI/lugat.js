/**
 * @swagger
 * /lugat/search:
 *   get:
 *       summary: search
 *       tags: [lugat]
 *       parameters:
 *            - in: query
 *              name: request
 *              schema:
 *                     type: string
 *                     example: "s"
 *            - name: args
 *              in: query
 *              explode: true
 *              schema:
 *                     type: string
 *                     example: word,definition,history,resource,
 *            - name: page
 *              in: query
 *              schema:
 *                     type: number
 *                     example: 1
 *            - name: count
 *              in: query
 *              schema:
 *                     type: number
 *                     example: 40
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
 * /lugat/info/{word}:
 *   get:
 *       summary: word info
 *       tags: [lugat]
 *       parameters:
 *            - in: path
 *              name: word
 *              schema:
 *                     type: string
 *                     example: "repost"
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
 * /lugat/word/view:
 *   post:
 *       summary: increase word views count
 *       tags: [lugat]
 *       requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          example: {"word": 18}
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
