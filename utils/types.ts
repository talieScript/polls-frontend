export interface LocalPoll {
  title: string;
  question: string;
  answers: Answer[]; 
  voteValidation: string;
  resultsVisibility: string;
  pollVisibility: string;
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

export interface ApiPoll {
  title: string;
  question: string;
  answers: string[];
  // stringified json
  options: string;
  // iso string
  endDate: string;
  visibility: string;
}

export interface pollOptions {
  validateEmail: boolean,
  validateIp: boolean,
  choiceNoStrict: boolean,
  choiceNo: number,
  resultsVisibility: string,
}

export interface Answer {
  text: string;
}

export interface ApiAnswer {
  Poll: string;
  answer_string: string;
  id: string;
  votes: number;
}

export interface PollOptions {
  validateEmail: boolean;
  validateIp: boolean;
  choiceNoStrict: boolean;
  choiceNo: number;
  resultsVisibility: string;
}

