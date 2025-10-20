import { IStudioRepository } from "../domain/IStudioRepository";
import { Studio } from "../domain/Studio";

export class GetInfoByStudio{
    constructor(private studioRepository: IStudioRepository) {}

    async execute(studioId: number): Promise<Studio> {
        return this.studioRepository.getInformationByStudioId(studioId)
    }
}