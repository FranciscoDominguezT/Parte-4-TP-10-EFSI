import LocationRepository from "../repositories/location-repository.js";

export default class LocationService{
    getAllAsync = async () => {
        const repo = new LocationRepository();
        const returnArray = await repo.getAllAsync();
        return returnArray;
    }

    getByIdAsync = async (id) => {
        const repo = new LocationRepository();
        const returnArray = await repo.getByIdAsync(id);
        return returnArray;
    }

    getEventLocationByIdAsync = async (id) => {
        const repo = new LocationRepository();
        const returnArray = await repo.getEventLocationByIdAsync(id);
        return returnArray;
    }
}