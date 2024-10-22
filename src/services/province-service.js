import ProvinceRepository from "../repositories/province-repository.js";

export default class ProvinceService {
    getAllAsync = async () => {
        const repo = new ProvinceRepository();
        const returnArray = await repo.getAllAsync();
        return returnArray;
    }

    getByIdAsync = async (id) => {
        const repo = new ProvinceRepository();
        const returnArray = await repo.getByIdAsync(id);
        return returnArray;
    }

    createAsync = async (entity) => {
        const repo = new ProvinceRepository();
        const returnArray = await repo.createAsync(entity);
        return returnArray;
    }

    updateAsync = async (entity) => {
        const repo = new ProvinceRepository();
        const returnArray = await repo.updateAsync(entity);
        return returnArray;
    }

    deleteByIdAsync = async (id) => {
        const repo = new ProvinceRepository();
        const returnArray = await repo.deleteByIdAsync(id);
        return returnArray;
    }   
}
