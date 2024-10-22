import EventListRepository from "../repositories/event-list-repository.js";

export default class EventListService {
    getAllAsync = async () => {
        const repo = new EventListRepository();
        const returnArray = await repo.getAllAsync();
        return returnArray;
    }

    getDetailsAsync = async (id) => {
        const repo = new EventListRepository();
        const returnArray = await repo.getDetailsAsync(id);
        return returnArray;
    }

    getParticipantsAsync = async (id) => {
        const repo = new EventListRepository();
        const returnArray = await repo.getParticipantsAsync(id);
        return returnArray;
    }

    getEventsAsync = async (filters) => {
        console.log("Service filters:", filters);
        const repo = new EventListRepository();
        const returnArray = await repo.getEventsAsync(filters);
        return returnArray;
    }
}
