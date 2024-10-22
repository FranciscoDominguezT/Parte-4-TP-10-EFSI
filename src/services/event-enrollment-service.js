import EventEnrollmentRepository from "../repositories/event-enrollment-repository.js";

export default class EventEnrollmentService {
    createAsync = async (entity) => {
        const repo = new EventEnrollmentRepository();
        const result = await repo.createAsync(entity);
        return result;
    } 

    deleteAsync = async (id) => {
        const repo = new EventEnrollmentRepository();
        const returnArray = await repo.deleteAsync(id);
        return returnArray;
    }

    getAllAsync = async () => {
        const repo = new EventEnrollmentRepository();
        const returnArray = await repo.getAllAsync();
        return returnArray;
    }

    updateAsync = async (eventId, entity, rating) => {
        const repo = new EventEnrollmentRepository();
        const returnArray = await repo.updateAsync(eventId, entity, rating);
        return returnArray;
      }
}