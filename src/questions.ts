// questions.ts
export interface Question {
  question: string;
  answer: number;
  options: string[];
  selected: number | null;
}

export const questions: Question[] = [
  {
    question: 'Where is Rwanda located?',
    answer: 1,
    options: ['In South America', 'In East Africa'],
    selected: null
  },
  {
    question: 'When did the genocide happen in Rwanda?',
    answer: 0,
    options: ['1994', '2000'],
    selected: null
  }
];
