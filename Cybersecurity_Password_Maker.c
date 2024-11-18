#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <ctype.h>

int hasSpace(char pswd[]) { // Checks to see if pswd has a space in it 
    char *buf = pswd;
    while (*buf) {
        if (isspace(*buf)) {
            return 1;
        }
        buf++;
    }
    return 0;
}

int hasLowercase(char pswd[]) { // Determines if pswd has at least one lowercase character
    int i;
    int count = 0;
    for (i = 0; pswd[i] != '\0'; i++) {
        if (islower(pswd[i])) {
            count++;
        }
    }
    if (count >= 1) {
        return 1;
    }
    else {
        return 0;
    }
}

int hasUppercase(char pswd[]) { // Determines if pswd has at least one uppercase character
    int i;
    int count = 0;
    for (i = 0; pswd[i] != '\0'; i++) {
        if (isupper(pswd[i])) {
            count++;
        }
    }
    if (count >= 1) {
        return 1;
    }
    else {
        return 0;
    }
}

int hasDigit(char pswd[]) { // Determines if pswd has at least one digit
    int i;
    int count = 0;
    for (i = 0; pswd[i] != '\0'; i++) {
        if (isdigit(pswd[i])) {
            count++;
        }
    }
    if (count >= 1) {
        return 1;
    }
    else {
        return 0;
    }
}

int hasSpecialChar(char pswd[]) { // Determines if pswd has at least one special character
    char specialChars[] = "@!#$%^&*()+-{}\\[];',./<>?=_:`~"; // Buffer of all special characters
    while (*pswd != '\0') {
        char *temp = specialChars; // Reset temp to the beginning of specialChars for each character in str
        while (*temp != '\0') { // Compare each character in pswd to each item in specialChars
            if (*pswd == *temp) {
                return 1; 
            }
            temp++;
        }
        pswd++;
    }
    return 0; 
}

int longPswd(char pswd[]) { // Determines if pswd is longer than 12 characters
    if (strlen(pswd) >= 12) {
        return 1;
    } 
    else {
        return 0;
    }
}

int hasRepeatedSequences(char pswd[]) { // Determines whether pswd has any repeated substrings
    int length = strlen(pswd);
    for (int len_substring = 1; len_substring <= length/2; len_substring++) { // Check all possible substring lengths
        for (int i = 0; i <= length - 2*len_substring; i++) {
            // Two substrings to be compared
            char *substring1 = pswd + i; 
            char *substring2 = pswd + i + len_substring;

            if (strncmp(substring1, substring2, len_substring) == 0) {
                return 0;
            }
        }
    }
    return 1;
}

int hasDictWords(char pswd[]) { // Determines whether pswd has any words in predefined 'dictionary'
    char dict_words[][50] = { // 2D Array of random dictionary words to be tested
    // List of most common words in passwords from https://shorturl.at/kpyFZ 
        "would", 
        "there", 
        "password",
        "qwerty", 
        "iloveyou", 
        "password1",
        "dragon", 
        "sunshine", 
        "qwertyuiop",
        "superman", 
        "qwerty123", 
        "apple",
        "orange", 
        "12345679" 
        "banana",
        "11111111", 
        "12345678", 
        ""
    };
    int i = 0;
    while (dict_words[i][0] != '\0') { // Iterate through all words in 2D array
        for (int j = 0; j < strlen(pswd); j++) { // Go through every set of indices corresponding to the length of array word
            if (strlen(dict_words[i]) > strlen(pswd)) { // Check to see if length of pswd < length of word in array
                continue;
            }
            else if (strncmp(pswd+j, dict_words[i], strlen(dict_words[i])) == 0) { // Is dict string found in pswd
                return 0;
            }
        }
        i++;
    }
    return 1;
}

const char* evaluateStrength(char pswd[]) { // function call does not modify buffer so it's const
    int strength = hasLowercase(pswd) + hasUppercase(pswd) + hasDigit(pswd) + hasSpecialChar(pswd) + longPswd(pswd) /*+ hasRepeatedSequences(pswd) + hasDictWords(pswd)*/; 
    //printf("%d", strength) --> strength score
    if (strength <= 2) {
        return "Weak";
    }
    else if (strength <= 4) {
        return "Moderate";
    }
    else if (strength == 5) {
        return "Strong";
    }
    else {
        return "Very Strong";
    }
}

void main() { // MAIN MENU & SUBROUTINE CALLS
    char input[100];
    printf("NOTE 1: USER CAN UNCOMMENT LAST TWO FUNCTION CALLS IN THE EVALUATE STRENGTH METHOD TO DETERMINE IF PSWD HAS REPEATED SEQUENCES OR DICTIONARY WORDS.\n");
    printf("NOTE 2: A PSWD HAVING NO REPEATED SEQUENCES AND NO DICTIONARY WORDS WILL HAVE 1 POINT ADDED TO ITS STRENGTH SCORE FOR EACH.\n");
    printf("NOTE 3: A SCORE OF 6 OR 7 WILL BE DENOTED AS \"VERY STRONG.\"\n");
    while (1) { // Loops until user exits
        // Ensures pswd is in scope of all if statements
        char pswd[100] = {'\0'};
        A: 
        printf("\nPassword Resilience Analyzer\n");
        printf("1. Test a new password\n");
        printf("2. View strength of the last tested password\n");
        printf("3. Exit\n");
        printf("Enter your choice: ");

        if (scanf("%99s", input) != 1) { // Checks to see if scanf input is valid
            printf("Error: Invalid input\n");
            continue;
        }

        if (strlen(input) > 1) { // Checks to see if input is in between 1-3
            printf("Error: Input should be a singular digit (1-3)!\n");
            continue;
        }

        if (input[0] == '1') { // Testing a new pswd
            printf("Enter the password: ");
            getchar(); // Consumes newline character left by scanf
            if (fgets(pswd, sizeof(pswd), stdin) != NULL) { // fgets stores spaces and all possible characters

                int len = strlen(pswd);
                if (len > 0 && pswd[len - 1] == '\n') {  // Replacing newline character with null character 
                    pswd[len - 1] = '\0';
                }

                if (hasSpace(pswd)) { // Testing to see if pswd has a space, newline, tab (newline remove above)
                    printf("Error: Password must not contain any spaces, tabs, or newlines!\n");
                }
                else if (strlen(pswd) < 8) { // Testing to see if pswd is longer than 8 chars
                    printf("Error: Password should be at least 8 characters long\n");
                }
                else {
                    // run pswd through functions
                    const char* pswdStrength = evaluateStrength(pswd); // function returns a pointer to the string literal (e.g. Weak or Moderate or Strong)
                    printf("Password Strength: %s\n", pswdStrength);
                    goto A; // Do NOT restart loop or pswd buffer will be reset
                }
            }
            else {
                printf("Error: Could not read input");
            }
        }

        else if (input[0] == '2') { // Testing strength
            if (pswd[0] == '\0') { // Testing to see if user has previously entered a pswd
                printf("You must enter a password before you can test its strength!\n");
                continue;
            }
            else {
                const char* pswdStrength = evaluateStrength(pswd); 
                printf("Last tested password strength: %s\n", pswdStrength);
            }
        }

        else if (input[0] == '3') { // Exits program
            printf("Exiting...\n");
            exit(0); 
        } 

        else { // Case if input is single digit and between 4-9
            printf("Error: Input must be between 1-3\n");
            continue;
        }
    }
}