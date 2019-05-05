import string

def validate_data(text):
    number_keywords = [
        "zero", "one", "two", "three", "four", "five", "six", "seven", "eight",
        "nine", "ten", "eleven", "twelve", "thirteen", "fourteen", "fifteen",
        "sixteen", "seventeen", "eighteen", "nineteen", "twenty"
    ]

    male_keywords = [ "male", "m" ]
    female_keywords = [ "female", "f" ]

    DEFAULT_GENDER = "?"
    DEFAULT_KIDS = 0

    text = text.lower()
    translator = str.maketrans(string.punctuation, ' ' * len(string.punctuation))  # map punctuation to space
    text = text.translate(translator)

    words = text.split(' ')

    data = {}

    for word in words:
        if word.isdigit() and 0 <= int(word) <= 20:
            data['kids'] = int(word)
        elif word in number_keywords:
            data['kids'] = number_keywords.index(word)
        elif word in male_keywords:
            data['gender'] = 'M'
        elif word in female_keywords:
            data['gender'] = 'F'

    if 'kids' not in data:
        data['kids'] = DEFAULT_KIDS

    if 'gender' not in data:
        data['gender'] = DEFAULT_GENDER

    return data

def run():
    assert validate_data('num kids: 2, gender: male') == { "kids": 2, "gender": "M" }
    assert validate_data('f 7') == { "kids": 7, "gender": "F" }
    assert validate_data('I have three kids and am female.') == { "kids": 3, "gender": "F" }
    assert validate_data('zero. m') == { "kids": 0, "gender": "M" }
    assert validate_data('5') == { "kids": 5, "gender": "?" }
    assert validate_data('other, 27') == { "kids": 0, "gender": "?" }
    assert validate_data('six') == { "kids": 6, "gender": "?" }
    assert validate_data('f') == { "kids": 0, "gender": "F" }

__name__ == '__main__' and run()