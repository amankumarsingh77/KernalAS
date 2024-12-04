import re
from typing import Optional, List
import nltk
from nltk.tokenize import word_tokenize, sent_tokenize
from nltk.corpus import stopwords

class TextPreprocessor:
    def __init__(self):
        self.patterns = {
            'urls': r'https?://\S+|www\.\S+',
            'html_tags': r'<.*?>',
            'special_chars': r'[^\w\s]',
            'extra_spaces': r'\s+',
            'numbers': r'\d+'
        }
        self.download_nltk_data()
        self.stop_words = set(stopwords.words('english'))
    
    def download_nltk_data(self):
        """Download necessary NLTK data files."""
        try:
            nltk.data.find('tokenizers/punkt')
        except LookupError:
            nltk.download('punkt')
        try:
            nltk.data.find('corpora/stopwords')
        except LookupError:
            nltk.download('stopwords')

    def remove_urls(self, text: str) -> str:
        """Remove URLs from text"""
        return re.sub(self.patterns['urls'], '', text)
    
    def remove_html_tags(self, text: str) -> str:
        """Remove HTML tags from text"""
        return re.sub(self.patterns['html_tags'], '', text)
    
    def remove_special_characters(self, text: str, keep_punctuation: bool = True) -> str:
        """Remove special characters, optionally keeping punctuation"""
        if keep_punctuation:
            # Keep basic punctuation but remove other special characters
            pattern = r'[^a-zA-Z0-9\s.,!?-]'
            return re.sub(pattern, '', text)
        return re.sub(self.patterns['special_chars'], '', text)
    
    def remove_extra_whitespace(self, text: str) -> str:
        """Remove extra whitespace from text"""
        return re.sub(self.patterns['extra_spaces'], ' ', text.strip())
    
    def remove_numbers(self, text: str) -> str:
        """Remove numbers from text"""
        return re.sub(self.patterns['numbers'], '', text)
    
    def tokenize_text(self, text: str, remove_stopwords: bool = False) -> List[str]:
        """Tokenize text into words"""
        tokens = word_tokenize(text)
        if remove_stopwords:
            tokens = [token for token in tokens if token.lower() not in self.stop_words]
        return tokens

    def tokenize_sentences(self, text: str) -> List[str]:
        """Tokenize text into sentences"""
        return sent_tokenize(text)

    def preprocess_text(self, 
                       text: str, 
                       remove_urls: bool = True,
                       remove_html: bool = True,
                       remove_special_chars: bool = True,
                       keep_punctuation: bool = True,
                       remove_numbers: bool = False,
                       lowercase: bool = True,
                       tokenize: bool = False,
                       remove_stopwords: bool = False) -> str | List[str]:
        """
        Apply multiple preprocessing steps to text
        
        Args:
            text (str): Input text to preprocess
            remove_urls (bool): Whether to remove URLs
            remove_html (bool): Whether to remove HTML tags
            remove_special_chars (bool): Whether to remove special characters
            keep_punctuation (bool): Whether to keep basic punctuation when removing special chars
            remove_numbers (bool): Whether to remove numbers
            lowercase (bool): Whether to convert text to lowercase
            tokenize (bool): Whether to tokenize the text into words
            remove_stopwords (bool): Whether to remove stopwords (only applies if tokenize=True)
            
        Returns:
            Union[str, List[str]]: Preprocessed text or list of tokens
        """
        if not text or not isinstance(text, str):
            return "" if not tokenize else []
            
        if remove_urls:
            text = self.remove_urls(text)
        if remove_html:
            text = self.remove_html_tags(text)
        if remove_special_chars:
            text = self.remove_special_characters(text, keep_punctuation)
        if remove_numbers:
            text = self.remove_numbers(text)
        if lowercase:
            text = text.lower()
            
        text = self.remove_extra_whitespace(text)
        
        if tokenize:
            return self.tokenize_text(text, remove_stopwords)
        return text