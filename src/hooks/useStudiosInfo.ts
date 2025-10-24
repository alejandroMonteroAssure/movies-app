import { useEffect, useState } from 'react';
import { GetInfoByStudio } from '../services/application/GetInfoByStudio';
import { StudioRepository } from '../services/infrastructure/StudiosRepository';
import { Studio } from '../services/domain/Studio';
import { curatedStudios } from '../services/domain/CuratedCompanies';

export const useStudiosInfo = () => {
  const studioRepository = new StudioRepository();
  const getInfoByStudio = new GetInfoByStudio(studioRepository);

  const [studiosInfo, setStudiosInfo] = useState<Studio[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchInfoForStudios = async () => {
    const list: Studio[] = [];
    for (const studio of curatedStudios) {
      try {
        const data = await getInfoByStudio.execute(studio.id);
        list.push({ ...studio, ...data });
      } catch (e) {
        console.warn(`Failed for ${studio.name} (${studio.id}):`, e);
        continue;
      }
    }
    setStudiosInfo(list);
  };

  useEffect(() => {
    let mounted = true;

    (async () => {
      setLoading(true);
      try {
        await fetchInfoForStudios();
      } finally {
        if (mounted) setLoading(false);
      }
    })();

    return () => {
      mounted = false;
    };
  }, []);

  return { studiosInfo, loading };
};
