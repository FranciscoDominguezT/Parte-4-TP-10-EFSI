import {Router} from "express";
import ProvinceService from '../services/province-service.js';

const router = Router();
const svc = new ProvinceService();

router.get('', async (req, res) => {
    let respuesta;
    const returnArray = await svc.getAllAsync();

    if (returnArray != null) {
        respuesta = res.status(200).json(returnArray);
    } else {
        respuesta = res.status(404).send('Provincia no encontrada');
    }
    return respuesta;
})

router.get('/:id', async (req, res) => {
    let response;
    let id = req.params.id;
    const returnArray = await svc.getByIdAsync(id);
  
    if (returnArray != null) {
      response = res.status(200).json(returnArray);
    } else {
      response = res.status(404).send('Provincia no encontrada');
    }
    return response;
  });
  
  router.post('', async (req, res) => {
    let response;
    const entity = req.body;

    const returnValue = await svc.createAsync(entity);

    if (returnValue != null) {
        response = res.status(201).json(returnValue);
    } else if (entity.name.length < 3 || isNaN(entity.latitude) || isNaN(entity.longitude)) {
        response = res.status(400).send('Error de validación');
    }
    return response;
});
  
  router.put('', async (req, res) => {
    let response;
    const entity = req.body;
    const returnValue = await svc.updateAsync(entity);
  
    if (returnValue != null) {
      response = res.status(200).json(returnValue);
    } else if (entity.name != null && entity.name.length < 3 || isNaN(entity.latitude) || isNaN(entity.longitude)) {
        response = res.status(400).send('Error de validación');
    } else {
      response = res.status(404).send('Provincia no encontrada');
    }
    return response;
  });
  
  router.delete('/:id', async (req, res) => {
    let response;
    const returnValue = await svc.deleteByIdAsync(req.params.id);
  
    if (returnValue != null) {
      response = res.status(200).json(returnValue);
    } else {
      response = res.status(404).send('Provincia no encontrada');
    }
    return response;
  });

export default router;