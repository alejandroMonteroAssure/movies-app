import { Studio } from "./Studio";

export interface IStudioRepository{
    getInformationByStudioId(studioId: number): Promise<Studio>;
}