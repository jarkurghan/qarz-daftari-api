/**
 * @swagger
 * /qd/v1/api/journal/{journal_id}/value:
 *  get:
 *       summary: get journal value schema
 *       tags: [journal]
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
