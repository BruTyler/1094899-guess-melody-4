import {GameType} from './const';
 
export interface AnswerArtist {
  artist: string,
  picture: string,
}
  
export interface AnswerGenre {
  genre: string,
  src: string,
}

export interface QuestionArtist {
  answers: AnswerArtist[],
  song: {
    artist: string,
    src: string,
  },
  type: GameType.ARTIST,
}

export interface QuestionGenre {
  answers: AnswerGenre[],
  genre: string,
  type: GameType.GENRE,
}

export type Question = QuestionArtist | QuestionGenre;
export type Answer = AnswerArtist | AnswerGenre;

export interface AuthData {
    login: string,
    password: string,
}

export type RenderPlayerFunc = (src: string, id: number) => React.ReactNode;
export type UserAnswers = boolean[];
