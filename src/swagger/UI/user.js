/**
 * @swagger
 * /otil/v1/api/user:
 *   get:
 *       summary: get all users
 *       tags: [user]
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
 * /otil/v1/api/user/status:
 *   get:
 *       summary: get all statuses
 *       tags: [user]
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
 * /otil/v1/api/user:
 *   post:
 *       summary: create user
 *       tags: [user]
 *       security:
 *            - token: []
 *       requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          example: {"first_name": "ism", "last_name": "familya", "email":"test@email.uz", "phone":"+998900012498"}
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
 * /otil/v1/api/user:
 *   put:
 *       summary: update user
 *       tags: [user]
 *       security:
 *            - token: []
 *       requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          example: { "id":2, "first_name": "ism", "last_name": "familya", "email":"test@email.uz", "phone":"+998900012498"}
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
 * /otil/v1/api/user/action:
 *   get:
 *       summary: get actions of all users
 *       tags: [user]
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
 * /otil/v1/api/user/actions:
 *   get:
 *       summary: get all actions
 *       tags: [user]
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
 * /otil/v1/api/user/action:
 *   post:
 *       summary: add action for user
 *       tags: [user]
 *       security:
 *            - token: []
 *       requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          example: {"user": 2,"action":1}
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
 * /otil/v1/api/user/action:
 *   delete:
 *       summary: remove action from user
 *       tags: [user]
 *       security:
 *            - token: []
 *       requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          example: {"user": 2,"action":1}
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
