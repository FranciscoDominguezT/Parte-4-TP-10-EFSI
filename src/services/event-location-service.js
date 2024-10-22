import EventLocationRepository from "../repositories/event-location-repository.js";

export default class EventLocationService {
    getAllAsync = async () => {
        const repo = new EventLocationRepository();
        const returnArray = await repo.getAllAsync();
        return returnArray;
    }

    getByIdAsync = async (id) => {
        const repo = new EventLocationRepository();
        const returnArray = await repo.getByIdAsync(id);
        return returnArray;
    }

    createAsync = async (entity) => {
        const repo = new EventLocationRepository();
        const returnArray = await repo.createAsync(entity);
        return returnArray;
    }

    updateAsync = async (entity) => {
        const repo = new EventLocationRepository();
        const returnArray = await repo.updateAsync(entity);
        return returnArray;
    }

    deleteAsync = async (id) => {
        const repo = new EventLocationRepository();
        const returnArray = await repo.deleteAsync(id);
        return returnArray;
    }
}