import { Router } from "express";
import EventService from "../services/event-service.js";
import EventLocationService from "../services/event-location-service.js";
import EventEnrollmentService from "../services/event-enrollment-service.js";
import AuthMiddleware from "../middlewares/auth-middleware.js";
import { boolean } from "zod";

const router = Router();
const EventSvc = new EventService();
const EventLocationSvc = new EventLocationService();
const EventEnrollmentSvc = new EventEnrollmentService();

router.post("/:id/enrollment", AuthMiddleware.validateToken, async (req, res) => {
  let response;
  const entity = req.body;
  const eventId = req.params.id;

  const event = await EventSvc.getByIdAsync(eventId);
  const eventLocation = await EventLocationSvc.getByIdAsync(event.id_event_location);
  const eventEnabled = await EventSvc.getAllAsync(eventId);

  console.log('event', event);

  const enrollment = {
    id_event: eventId,
    id_user: 1,
    description : entity.description || null,
    registration_date_time: new Date(),
    attended: true, 
    observations: entity.observations || null,
    rating: entity.rating || null,
  };

  console.log(enrollment);

  console.log('enabled_for_enrollment',event.enabled_for_enrollment);
  if (event.enabled_for_enrollment !== '1') {
    console.log("ERROR");
    console.log(eventEnabled[0].enabled_for_enrollment);
    return res.status(400).json({ error: "El evento no admite inscripciones." });
  }else{
    console.log("OK");
  }


  if (event.start_date <= new Date()) {
    return res.status(400).json({ error: "El evento ya ha comenzado o está ocurriendo hoy." });
  }
  if (eventLocation.max_capacity <= event.max_assistance) {
    return res.status(400).json({ error: "La capacidad máxima del evento ha sido alcanzada." });
  }

  console.log(enrollment);

  const returnArray = await EventEnrollmentSvc.createAsync(enrollment);

  if (returnArray != null) {
    response = res.status(201).json(returnArray);
  } else {
    response = res.status(404).send("ID de evento no encontrado");
  }
  return response;
});

router.delete("/:id/enrollment", AuthMiddleware.validateToken, async (req, res) => {
  let response;
  const eventId = req.params.id;

  const event = await EventSvc.getByIdAsync(eventId);

  console.log('event', event);

  const returnArray = await EventEnrollmentSvc.deleteAsync(eventId);

  if (returnArray != null || new Date(event.start_date) <= new Date()) {
    response = res.status(200).json(returnArray);
  } else {
    response = res.status(404).send("ID de evento no encontrado");
  }
  return response;
});

//El siguiente patch Actualiza un event_enrollment que es enviado por parámetro con un valor que es enviado por parámetro, para el usuario autenticado. El feedback (observations) debe enviarse en el cuerpo del mensaje (puede estar vacío).

router.patch("/:id/enrollment/:num", AuthMiddleware.validateToken, async (req, res) => {
  let response;
  const entity = req.body;
  const eventId = req.params.id;
  const rating = req.params.num; 

  const event = await EventSvc.getByIdAsync(eventId);

  if (!event) {
    return res.status(404).json({ error: "Evento no encontrado" });
  }

  if (new Date(event.start_date) < new Date()) {
    return res.status(400).json({ error: "El evento aún no ha finalizado" });
}

  if (rating < 1 || rating > 10) {
    return res.status(400).json({ error: "El rating debe estar entre 1 y 10" });
  }

  const enrollment = await EventEnrollmentSvc.updateAsync(eventId, entity, rating); 

  if (enrollment != null) {
    response = res.status(200).json(enrollment);
  } else {
    response = res.status(404).send("ID de evento no encontrado");
  }
  
  return response;
});

export default router;