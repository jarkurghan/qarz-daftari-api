/**
 * @swagger
 * /qd/v1/api/journal/{journal_id}/debt:
 *  get:
 *       summary: get debt
 *       tags: [debt]
 *       parameters:
 *         - in: path
 *           name: journal_id
 *           schema:
 *               type: number
 *       responses:
 *            200:
 *                description: success.
 *                content:
 *                    application/json:
 *                         schema:
 *                              type: object
 *                              properties:
 *                                     status:
 *                                        type: string
 *                                        example: "success"
 *                                     data:
 *                                        type: object
 *                                        example: {}
 *                                     errors:
 *                                        type: object
 *                                        example: []
 *            400:
 *                description: Error.
 *                content:
 *                    application/json:
 *                         schema:
 *                              type: object
 *                              properties:
 *                                     status:
 *                                        type: string
 *                                        example: "error"
 *                                     data:
 *                                        type: object
 *                                        example: {}
 *                                     errors:
 *                                        type: object
 *                                        example: [{"code": "code_num_1", "message": "an error occurred" }]
 */

/**
 * @swagger
 * /qd/v1/api/journal/debt:
 *   post:
 *       summary: create debt
 *       tags: [debt]
 *       security:
 *            - token: []
 *       requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          example: {"name": "Abdulla bozor 100-do'kon", "amount": "2 karobka qalam"}
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
 * /qd/v1/api/journal/debt/{debt_id}:
 *  get:
 *       summary: get debt items
 *       tags: [debt]
 *       parameters:
 *         - in: path
 *           name: debt_id
 *           schema:
 *               type: number
 *       responses:
 *            200:
 *                description: success.
 *                content:
 *                    application/json:
 *                         schema:
 *                              type: object
 *                              properties:
 *                                     status:
 *                                        type: string
 *                                        example: "success"
 *                                     data:
 *                                        type: object
 *                                        example: {}
 *                                     errors:
 *                                        type: object
 *                                        example: []
 *            400:
 *                description: Error.
 *                content:
 *                    application/json:
 *                         schema:
 *                              type: object
 *                              properties:
 *                                     status:
 *                                        type: string
 *                                        example: "error"
 *                                     data:
 *                                        type: object
 *                                        example: {}
 *                                     errors:
 *                                        type: object
 *                                        example: [{"code": "code_num_1", "message": "an error occurred" }]
 */

/**
 * @swagger
 * /qd/v1/api/journal/debt/item:
 *   post:
 *       summary: create debt item
 *       tags: [debt]
 *       security:
 *            - token: []
 *       requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          example: {"amount": "2 karobka qalam"}
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
