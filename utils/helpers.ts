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
  const allVoterAnswers = (await axios.get(`${process.env.VUE_APP_POLLS_API}/voter/answers/${pollId}?email=${userEmail}&ip=${ipAdress}`)).data
  // filter out answers related to poll
  return allVoterAnswers
}

export const throttle = (callback, wait, immediate = false) => {
  let timeout = null 
  let initialCall = true
  
  return function() {
    const callNow = immediate && initialCall
    const next = () => {
      callback.apply(this, arguments)
      timeout = null
    }
    
    if (callNow) { 
      initialCall = false
      next()
    }

    if (!timeout) {
      timeout = setTimeout(next, wait)
    }
  }
}
export const debounce = (func, wait, immediate = false) => {
	var timeout;
	return function() {
		var context = this, args = arguments;
		var later = function() {
			timeout = null;
			if (!immediate) func.apply(context, args);
		};
		var callNow = immediate && !timeout;
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
		if (callNow) func.apply(context, args);
	};
};