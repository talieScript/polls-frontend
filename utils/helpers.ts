import { LocalPoll, ApiPoll, pollOptions, VoteStatusRes } from './types';
import axios from 'axios'

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

export const getVoterAnswers = async ({userEmail, ipAdress, pollId}): Promise<string[]> => {
  // get voter answers
  const allVoterAnswers = (await axios.get(`${process.env.vueAppPollsApi}/voter/answers/${pollId}?email=${userEmail}&ip=${ipAdress}`)).data
  // filter out answers related to poll
  return allVoterAnswers
}

export const debounce = (func, wait, immediate = false) => {
	var timeout;
	return function() {
		var context = arguments;
		var later = function() {
			timeout = null;
			if (!immediate) func.apply(context);
		};
		var callNow = immediate && !timeout;
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
		if (callNow) func.apply(context);
	};
};

export const checkPassword = (password: string): string => {
  if (!password) {
    return 'Cannot be empty'
  }
  if (password.length < 8) {
    return 'Must be more the 8 charentors'
  }
  if (password.length > 20) {
    return 'Cannot be over 20 charentors'
  }
  if (!/[a-z]+/.test(password)) {
    return 'One lowercase letter required.'
  }
  if (!/[A-Z]+/.test(password)) {
    return 'One uppercase letter required.'
  }
  if (!/[0-9]+/.test(password)) {
    return 'One number required.'
  }
}