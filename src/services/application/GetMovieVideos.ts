import { IMovieRepository } from '../domain/IMovieRepository';
import { Video } from '../domain/Video';

export class GetMovieVideos {
  constructor(private movieRepository: IMovieRepository) {}

  async execute(movieId: number): Promise<Video[]> {
    return await this.movieRepository.getMovieVideos(movieId);
  }
}
