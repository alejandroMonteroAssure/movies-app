import { IStudioRepository } from "../domain/IStudioRepository";
import { Studio } from "../domain/Studio";
import { handleAxiosError, httpClient } from "./httpClient";
import { mapStudioToDomain } from "./Mappers";

export class StudioRepository implements IStudioRepository{
    async getInformationByStudioId(studioId: number): Promise<Studio> {
        try{
            console.log("Called with ", studioId);
            const response = await httpClient.get(`/company/${studioId}`);
            return mapStudioToDomain(response.data);
        } catch(error){
            handleAxiosError(error);
            return {id: 0, name: "", color: ""}
        }
    }
}