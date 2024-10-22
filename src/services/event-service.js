import EventRepository from "../repositories/event-repository.js";
import EventLocationRepository from "../repositories/event-location-repository.js";

export default class EventService {
  createAsync = async (entity) => {
    const repo = new EventRepository();
    const returnArray = await repo.createAsync(entity);
    return returnArray;
  }

  updateAsync = async (entity) => {
    const repo = new EventRepository();
    const returnArray = await repo.updateAsync(entity);
    return returnArray;
  }

  deleteAsync = async (id) => {
    const repo = new EventRepository();
    const returnArray = await repo.deleteAsync(id);
    return returnArray;
  }

  getByIdAsync = async (id) => {
    const repo = new EventRepository();
    const reutnEntity = await repo.getByIdAsync(id);
    return reutnEntity;
  }

  getAllAsync = async () => {
    const repo = new EventRepository();
    const returnArray = await repo.getAllAsync();
    return returnArray;
  }

  getEventLocationByIdAsync = async (id) => {
    const repo = new EventLocationRepository();
    const location = await repo.getByIdAsync(id);
    return location;
  }

  registrationAsync = async (id) => {
    const repo = new EventRepository();
    const registeredUsers = await repo.registrationAsync(id);
    return registeredUsers;
  }

  ifAlreadyRegistered = async (id) => {
    const repo = new EventRepository();
    const returnArray = await repo.ifAlreadyRegistered(id);
    return returnArray;
  }

  // updateAsync = async (eventId, entity, rating) => {
  //   const repo = new EventEnrollmentRepository();
  //   const returnArray = await repo.updateAsync(eventId, entity, rating); // Pasar el rating al repositorio
  //   return returnArray;
  // }
}
