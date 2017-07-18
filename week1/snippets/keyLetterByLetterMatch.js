    // Checks if the pressed key matches the current letter in the sentence.
    if (key == lyrics[lineIndex][0]) {
        console.log("Matched char!");
        lyrics[lineIndex] = lyrics[lineIndex].slice(1);
        // Checks if the current sentence was completed.
        if (0 == lyrics[lineIndex].length) {
            lineIndex++;
        }
    }
    else {
        console.log("Missed char");
    }