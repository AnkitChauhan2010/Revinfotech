const express=require('express');
const router=express.Router();
const controller=require('../Controller/controller')

   /**
  * @swagger
  * /users/signup:
  *   post:
  *     tags:
  *       - USER
  * 
  *     produces:
  *       - application/json

  *     parameters:
  *       - name: name
  *         description: name
  *         in: formData
  *         required: true
  *       - name: email
  *         description: email
  *         in: formData
  *         required: true
  *       - name: password
  *         description: password
  *         in: formData 
  *         required: true
  *     responses:
  *       200:
  *         description: "Successfully signup" 
  *       404:
  *         description: Invalid credentials
  *       500:
  *         description: Internal Server Error
  *       400:
  *         description: Already exist
  */

router.post('/signup',controller.signup)


   /**
  * @swagger
  * /users/login:
  *   post:
  *     tags:
  *       - USER

  *     produces:
  *       - application/json
  *     parameters:

  *       - name: email
  *         description: email
  *         in: formData
  *         required: true

  *       - name: password
  *         description: password
  *         in: formData  
  *         required: true
  *     responses:
  *       200:
  *         description: Successfully logged in 
  *       404:
  *         description: Invalid credentials
  *       500:
  *         description: Internal Server Error
  */

router.post('/login',controller.login)


module.exports=router