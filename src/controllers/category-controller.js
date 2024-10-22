import {Router} from "express";
import CategoryService from '../services/category-service.js';

const router = Router();
const svc = new CategoryService();

router.get('', async (req, res) => {
    let response;
    const returnArray = await svc.getAllAsync();

    if (returnArray != null) {
        response = res.status(200).json(returnArray);
    } else {
        response = res.status(500).send('Error interno');
    }
    return response;
})

router.get('/:id', async (req, res) => {
    let response;
    let id = req.params.id;
    const returnArray = await svc.getByIdAsync(id);
  
    if (returnArray != null) {
      response = res.status(200).json(returnArray);
    } else {
      response = res.status(404).send('Categoría no encontrada');
    }
    return response;
  });
  
  router.post('/', async (req, res) => {
    let response;
    const entity = req.body;

    const returnValue = await svc.createAsync(entity);
  
    if (returnValue != null) {
      response = res.status(201).json(returnValue);
    } else if (entity.name != null && entity.name.length < 3) {
        response = res.status(400).send('Error de validación');
    }
    return response;
  });
  
  router.put('/', async (req, res) => {
    let response;
    const entity = req.body;
    const returnValue = await svc.updateAsync(entity);
  
    if (returnValue != null) {
      response = res.status(200).json(returnValue);
    } else if (entity.name != null && entity.name.length < 3) {
        response = res.status(400).send('Error de validación');
    } 
    else {
      response = res.status(404).send('Categoría no encontrada');
    }
    return response;
  });
  
  router.delete('/:id', async (req, res) => {
    let response;
    const returnValue = await svc.deleteByIdAsync(req.params.id);
  
    if (returnValue != null) {
      response = res.status(200).json(returnValue);
    } else {
      response = res.status(404).send('Categoría no encontrada');
    }
    return response;
  });

export default router;
