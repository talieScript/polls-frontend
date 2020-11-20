import { LocalPoll, ApiPoll } from './types';

export const processPollOptions = (pollData: LocalPoll): string => {
  const { voteValidation, options, multipleChoice, results } = pollData;
  let processedOptions = {
    validateEmail: true,
    validateIp: true,
    choiceNoStrict: true,
    choiceNo: 1,
    results,
  };
  if (voteValidation === 'validateEmail') { 
    processedOptions.validateEmail = true;
    processedOptions.validateIp = false;
  } else if (voteValidation === 'validateIp') {
    processedOptions.validateIp = true;
    processedOptions.validateEmail = false;
  }
  if (options.multipleChoice) {
    if (multipleChoice.option === 'upToo') {
      processedOptions.choiceNoStrict = false;
    }
    processedOptions.choiceNo = multipleChoice.number;
  }
  return JSON.stringify(processedOptions);
}

export const createPostPayload = (pollData: LocalPoll): ApiPoll => {
  const { title, question, answers, endDate, options } = pollData;
  const apiEndDate = options.endDate ? endDate : '';
  return {
    title,
    question,
    answers: answers.map(a => a.text),
    endDate: apiEndDate,
    options: processPollOptions(pollData),
  }
}