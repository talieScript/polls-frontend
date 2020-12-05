import { LocalPoll, ApiPoll, pollOptions } from './types';

export const processPollOptions = (pollData: LocalPoll): pollOptions => {
  const { voteValidation, options, multipleChoice, resultsVisibility } = pollData;
  let processedOptions = {
    validateEmail: true,
    validateIp: true,
    choiceNoStrict: true,
    choiceNo: 1,
    resultsVisibility,
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
  return processedOptions;
}

export const createPostPayload = (pollData: LocalPoll): ApiPoll => {
  const { title, question, answers, endDate, pollVisibility, options } = pollData;
  const apiEndDate = options.endDate ? endDate : '';
  return {
    title,
    question,
    answers: answers.map(a => a.text),
    endDate: apiEndDate,
    options: processPollOptions(pollData),
    visibility: pollVisibility,
  }
}