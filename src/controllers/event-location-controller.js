import { Router } from "express";
import EventLocationService from "../services/event-location-service.js";
import AuthMiddleware from "../middlewares/auth-middleware.js";

const router = Router();
const svc = new EventLocationService();

router.get('', AuthMiddleware.validateToken, async (req, res) => {
  let response;

  const returnArray = await svc.getAllAsync();
  if (returnArray != null) {
    response = res.status(200).json(returnArray);
  } else {
    response = res.status(401).send('Error interno');
  }

  return response;
});

router.get('/:id', AuthMiddleware.validateToken, async (req, res) => {
  let response;
  const element = req.params.id;
  
  const returnArray = await svc.getByIdAsync(element);
  if (returnArray != null) {
    response = res.status(200).json(returnArray);
  } else {
    response = res.status(404).send('Localidad no encontrada');
  }

  return response;
});

router.post('', AuthMiddleware.validateToken, async (req, res) => {
  let response;
  const entity = req.body;
  const returnArray = await svc.createAsync(entity);

  if (returnArray != null) {
    response = res.status(201).json(returnArray);
  } else {
    response = res.status(500).send('Error interno');
  }

  return response;
})

router.put('/:id', AuthMiddleware.validateToken, async (req, res) => {
  let response;
  const id = req.params.id;
  const entity = req.body;
  entity.id = id;
  const returnArray = await svc.updateAsync(entity);
  
  if (returnArray != null) {
    response = res.status(200).json(returnArray);
  } else {
    response = res.status(404).send('Localidad no encontrada');
  }
  
    return response;
  })

  router.delete('/:id', AuthMiddleware.validateToken, async (req, res) => {
    let response;
    const element = req.params.id;
  
    const returnArray = await svc.deleteAsync(element);
  
    if (returnArray != null) {
      response = res.status(200).json(returnArray);
    } else {
      response = res.status(500).send('Error interno');
    }
    return response;
  });
  
  export default router;