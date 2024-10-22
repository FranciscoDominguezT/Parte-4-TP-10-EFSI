import { Router } from "express";
import AuthService from '../services/auth-service.js';
import jwt from "jsonwebtoken";
import AuthMiddleware from "../middlewares/auth-middleware.js";

const router = Router();
const svc = new AuthService();

router.post('/login', async (req, res) => {
  const entity = req.body;
  try {
    const returnValue = await svc.loginAsync(entity);
    if (returnValue) {
      const secretKey = 'mysecretkey';
      const options = {
        expiresIn: '1h',
        issuer: 'dai-eventos'
      }
      const token = jwt.sign({ id: returnValue.id, username: returnValue.username }, secretKey, options);
      res.status(200).json({
        success: true,
        message: 'Login exitoso',
        token: token
      });
    } else {
      res.status(401).json({
        success: false,
        message: 'Usuario o clave inválida',
      });
    }
  } catch (error) {
    console.error('Error en login:', error);
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor',
    });
  }
});

router.post('/register', async (req, res) => {
    const entity = req.body;
    try {
      const returnValue = await svc.registerAsync(entity);
      if (returnValue) {
        const secretKey = 'mysecretkey';
        const options = {
          expiresIn: '1h',
          issuer: 'dai-eventos'
        }
        const token = jwt.sign({ id: returnValue.id, username: returnValue.username }, secretKey, options);
        res.status(201).json({
          success: true,
          message: 'Registro exitoso',
          token: token
        });
      } else {
        res.status(400).json({
          success: false,
          message: 'Error en el registro',
        });
      }
    } catch (error) {
      console.error('Error en registro:', error);
      res.status(500).json({
        success: false,
        message: 'Error interno del servidor',
      });
    }
  });

router.get('/validate-token', AuthMiddleware.validateToken, async (req, res) => {
  res.json({ valid: true, user: req.user });
});

export default router;
