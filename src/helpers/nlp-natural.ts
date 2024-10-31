import natural from 'natural';


export const parseText = (text: string) => {
    if (!text) return null;

    const tokenizer = new natural.WordTokenizer();
    const stemmer = natural.PorterStemmer;

    const tokens = tokenizer.tokenize(text);
    const stemmedTokens = tokens.map(token => stemmer.stem(token));


    return { tokens: stemmedTokens };
};