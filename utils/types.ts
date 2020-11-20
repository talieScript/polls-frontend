export interface LocalPoll {
  title: string;
  question: string;
  answers: Answer[]; 
  voteValidation: string;
  results: string;
  pollvisibility: string;
  options: {
    endDate: boolean,
    multipleChoice: boolean,
  },
  endDate: string;
  multipleChoice: {
    option: string;
    number: number,
  }
}

export interface Answer {
  text: string;
}

