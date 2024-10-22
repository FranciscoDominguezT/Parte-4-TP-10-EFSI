import {Router} from "express";
import LocationService from '../services/location-service.js';

const router = Router();
const svc = new LocationService();

router.get('', async (req, res) => {
    let respuesta;
    const returnArray = await svc.getAllAsync();

    if (returnArray != null) {
        respuesta = res.status(200).json(returnArray);
    } else {
        respuesta = res.status(500).send('Error interno');
    }
    return respuesta;
});

router.get('/:id', async (req, res) => {
    let response;
    let id = req.params.id;
    const returnArray = await svc.getByIdAsync(id);
  
    if (returnArray != null) {
      response = res.status(200).json(returnArray);
    } else {
      response = res.status(404).send('Localidad no encontrada');
    }
    return response;
  });

  router.get("/:id/event-location", async (req, res) => {
    let response;
    let id = req.params.id;
    const returnArray = await svc.getEventLocationByIdAsync(id);
  
    if (returnArray != null) {
      response = res.status(200).json(returnArray);
    } else {
      response = res.status(404).send('Localidad no encontrada');
    }
    return response;
  });
  

export default router;