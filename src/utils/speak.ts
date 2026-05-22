export const speak = (
  text: string
) => {
  const speakNow = () => {
    const voices =
      speechSynthesis.getVoices();

    console.log(voices);

    const preferredVoice =
      
      voices.find(
        (voice) =>
          voice.lang === "en-IN"
      ) || voices.find(
        (voice) =>
          voice.name.includes("Microsoft") &&
          voice.name.includes("Neural")
      ) ||
      voices[0];
    

      console.log(preferredVoice)

    const utterance =
      new SpeechSynthesisUtterance(text);

    utterance.voice =
      preferredVoice || null;

    //   console.log(utterance.voice)

    utterance.rate = 1.2;

    utterance.pitch = 1.8;

    utterance.volume = 1;

    speechSynthesis.speak(
      utterance
    );
  };

  if (
    speechSynthesis.getVoices()
      .length === 0
  ) {
    speechSynthesis.onvoiceschanged =
      speakNow;
  } else {
    speakNow();
  }
};