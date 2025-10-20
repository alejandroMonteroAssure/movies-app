import { useEffect, useState } from 'react';
import { GetInfoByStudio } from '../services/application/GetInfoByStudio';
import { StudioRepository } from '../services/infrastructure/StudiosRepository';
import { Studio } from '../services/domain/Studio';
import { curatedStudios } from '../services/domain/CuratedCompanies';

export const useInfoByStudio = (studioName: string) => {
  const studioRepository = new StudioRepository();
  const getInfoByStudio = new GetInfoByStudio(studioRepository);

  const [studioInfo, setStudioInfo] = useState<Studio>({id: 0, name: "", logoPath: "", color: ""});
  const [loading, setLoading] = useState(true);

  const getIdByName = () => {
    const target = studioName.trim().toLowerCase();
    for (const studio of curatedStudios) {
      if (studio.name.toLowerCase().includes(target)) return studio.id;
    }
    return 0;
  };

  const fetchInfoByStudio = async (studioId: number) => {
    try {
      const data = await getInfoByStudio.execute(studioId);
      console.log(data);
      setStudioInfo(data);
    } catch (error) {
      console.error("Error fetching studio's info: ", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log("MOUNTED CUSTOM HOOK");
    const studioId = getIdByName();
    fetchInfoByStudio(studioId);
  }, [studioName]);

  return { studioInfo, loading };
};
