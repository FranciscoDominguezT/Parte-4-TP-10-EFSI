import { Router } from "express";
import EventService from "../services/event-service.js";
import EventLocationService from "../services/event-location-service.js";
import AuthMiddleware from "../middlewares/auth-middleware.js";

const router = Router();
const EventSvc = new EventService();
const EventLocationSvc = new EventLocationService();


router.post('', AuthMiddleware.validateToken, async (req, res) => {
  let response;
  const entity = req.body;

  let eventCapacity = await EventLocationSvc.getByIdAsync(entity.id_event_location);

  if (!entity.name || typeof entity.name !== 'string' || entity.name.length < 3) {
    return res.status(400).json({ error: "El nombre es inválido." });
  }
  if (!entity.description || typeof entity.description !== 'string' || entity.description.length < 3) {
    return res.status(400).json({ error: "La descripción es inválida." });
  }
  if (!entity.id_event_category || isNaN(entity.id_event_category)) {
    return res.status(400).json({ error: "La categoría del evento es inválida." });
  }
  if (!entity.id_event_location || isNaN(entity.id_event_location)) {
    return res.status(400).json({ error: "La ubicación del evento es inválida." });
  }
  if (!entity.start_date || isNaN(Date.parse(entity.start_date))) {
    return res.status(400).json({ error: "La fecha de inicio es inválida." });
  }
  if (entity.max_assistance > eventCapacity.max_capacity) {
    return res.status(400).json({ error: "La asistencia máxima es mayor que la capacidad máxima." });
  }
  if (entity.price < 0 || isNaN(entity.price)) {
    return res.status(400).json({ error: "El precio del evento es inválido." });
  }
  if (entity.duration_in_minutes < 0 || isNaN(entity.duration_in_minutes)) {
    return res.status(400).json({ error: "La duración del evento es inválida." });
  }
  if (typeof entity.enabled_for_enrollment !== 'boolean') {
    return res.status(400).json({ error: "El valor de enabled_for_enrollment es inválido." });
  }

  console.log(entity);
  const returnArray = await EventSvc.createAsync(entity);
  if (returnArray != null) {
    response = res.status(201).json(returnArray);
  } else {
    response = res.status(500).send('Error interno');
  }
  return response;

});

router.put('', AuthMiddleware.validateToken, async (req, res) => {
  let response;
  const entity = req.body;

  if (!entity.name || typeof entity.name !== 'string' || entity.name.length < 3) {
    return res.status(400).json({ error: "El nombre es inválido." });
  }
  if (!entity.description || typeof entity.description !== 'string' || entity.description.length < 3) {
    return res.status(400).json({ error: "La descripción es inválida." });
  }
  if (!entity.id_event_category || isNaN(entity.id_event_category)) {
    return res.status(400).json({ error: "La categoría del evento es inválida." });
  }
  if (!entity.id_event_location || isNaN(entity.id_event_location)) {
    return res.status(400).json({ error: "La ubicación del evento es inválida." });
  }
  if (!entity.start_date || isNaN(Date.parse(entity.start_date))) {
    return res.status(400).json({ error: "La fecha de inicio es inválida." });
  }
  if (entity.price < 0 || isNaN(entity.price)) {
    return res.status(400).json({ error: "El precio del evento es inválido." });
  }
  if (entity.duration_in_minutes < 0 || isNaN(entity.duration_in_minutes)) {
    return res.status(400).json({ error: "La duración del evento es inválida." });
  }
  if (typeof entity.enabled_for_enrollment !== 'boolean') {
    return res.status(400).json({ error: "El valor de enabled_for_enrollment es inválido." });
  }

  console.log(entity);

  const returnArray = await EventSvc.updateAsync(entity);

  if (returnArray != null) {
    response = res.status(200).json(returnArray);
  } else {
    response = res.status(404).send('Evento no encontrado');
  }
  return response;

});

router.delete('/:id', AuthMiddleware.validateToken, async (req, res) => {
  let response;
  const element = req.params.id;

  const returnArray = await EventSvc.deleteAsync(element);

  if (returnArray != null) {
    response = res.status(200).json(returnArray);
  } else {
    response = res.status(404).send('Evento no encontrado');
  }
  return response;
});

router.get("/:id", async (req, res) => {
  const eventId = req.params.id;

  try {
    const result = await EventSvc.getByIdAsync(eventId);
    if (result) {
      res.status(200).json(result);
    } else {
      res.status(404).json({ error: "Evento no encontrado." });
    }
  } catch (error) {
    res.status(500).json({ error: "Error del servidor." });
  }
});

export default router;
