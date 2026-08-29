const response = document.getElementById("response");
const input = document.getElementById("userInput");
const sendBtn = document.getElementById("sendBtn");
const micBtn = document.getElementById("micBtn");
const status = document.getElementById("status");


// ========================================
// TEXT TO SPEECH
// ========================================

function speak(text) {

    speechSynthesis.cancel();

    const speech = new SpeechSynthesisUtterance(text);

    speech.lang = "en-IN";
    speech.rate = 1;
    speech.pitch = 1;

    speechSynthesis.speak(speech);
}


// ========================================
// OPEN WEBSITE
// ========================================

function openWebsite(url, name) {

    window.open(url, "_blank");

    return `Opening ${name}.`;
}


// ========================================
// JARVIS LOCAL COMMANDS
// ========================================
function jarvisCommand(command) {

    const original = command.trim();
    const text = original.toLowerCase();

    // Remove JARVIS and polite words
    const clean = text
        .replace(/\b(jarvis|please|can you|could you|would you)\b/g, "")
        .replace(/\s+/g, " ")
        .trim();


    // ========================================
    // GREETING
    // ========================================

    if (
        /\b(hi|hello|hey|vanakkam)\b/.test(clean) ||
        clean.includes("vanakkam")
    ) {
        return "Hello! I am JARVIS. I am ready to assist you.";
    }


    // ========================================
    // HOW ARE YOU
    // ========================================

    if (
        clean.includes("how are you") ||
        clean.includes("how r u") ||
        clean.includes("eppadi irukka") ||
        clean.includes("eppadi irukinga") ||
        clean.includes("epdi iruka") ||
        clean.includes("epdi irukinga")
    ) {
        return "I am doing great. I am ready to help you.";
    }


    // ========================================
    // WHO ARE YOU
    // ========================================

    if (
        clean.includes("who are you") ||
        clean.includes("what are you") ||
        clean.includes("nee yaaru") ||
        clean.includes("neenga yaaru") ||
        clean.includes("nee yaru")
    ) {
        return "I am JARVIS, your personal AI assistant. I can talk with you, answer questions and perform useful commands.";
    }


    // ========================================
    // WHO CREATED JARVIS
    // ========================================

    if (
        clean.includes("who made you") ||
        clean.includes("who created you") ||
        clean.includes("who built you") ||
        clean.includes("who developed you") ||
        clean.includes("yaaru unna create pannadhu") ||
        clean.includes("yaaru unna create pannanga") ||
        clean.includes("yaaru unna uruvaakuna") ||
        clean.includes("unna yaaru create pannadhu")
    ) {
        return "I was created by Navin. He designed me to be a smart and helpful personal AI assistant.";
    }


    // ========================================
    // TIME
    // ========================================

    if (
        clean === "time" ||
        clean.includes("what time") ||
        clean.includes("current time") ||
        clean.includes("time now") ||
        clean.includes("time enna") ||
        clean.includes("mani enna") ||
        clean.includes("enna time") ||
        clean.includes("ippo time") ||
        clean.includes("ippa time")
    ) {

        const time = new Date().toLocaleTimeString("en-IN", {
            hour: "numeric",
            minute: "2-digit",
            hour12: true
        });

        return `The current time is ${time}.`;
    }


    // ========================================
    // DATE
    // ========================================

    if (
        clean === "date" ||
        clean.includes("what date") ||
        clean.includes("today date") ||
        clean.includes("today's date") ||
        clean.includes("date enna") ||
        clean.includes("innaiku date") ||
        clean.includes("innaiku enna date") ||
        clean.includes("today enna date")
    ) {

        const date = new Date().toLocaleDateString("en-IN", {
            weekday: "long",
            day: "numeric",
            month: "long",
            year: "numeric"
        });

        return `Today is ${date}.`;
    }


    // ========================================
    // OPEN COMMAND HELPER
    // ========================================

    const wantsToOpen =
        clean.includes("open") ||
        clean.includes("launch") ||
        clean.includes("start") ||
        clean.includes("go to") ||
        clean.includes("show") ||
        clean.includes("open pannu") ||
        clean.includes("open pannunga") ||
        clean.includes("thira") ||
        clean.includes("thirandhu") ||
        clean.includes("po") ||
        clean.includes("pannu") ||
        clean.includes("pannunga");


    // ========================================
    // YOUTUBE
    // ========================================

    if (
        clean.includes("youtube") &&
        (
            wantsToOpen ||
            clean === "youtube"
        )
    ) {

        return openWebsite(
            "https://www.youtube.com",
            "YouTube"
        );
    }


    // ========================================
    // INSTAGRAM
    // ========================================

    if (
        (
            clean.includes("instagram") ||
            clean.includes("insta")
        ) &&
        (
            wantsToOpen ||
            clean === "instagram" ||
            clean === "insta"
        )
    ) {

        return openWebsite(
            "https://www.instagram.com",
            "Instagram"
        );
    }


    // ========================================
    // FACEBOOK
    // ========================================

    if (
        clean.includes("facebook") &&
        (
            wantsToOpen ||
            clean === "facebook"
        )
    ) {

        return openWebsite(
            "https://www.facebook.com",
            "Facebook"
        );
    }


    // ========================================
    // HOTSTAR
    // ========================================

    if (
        (
            clean.includes("hotstar") ||
            clean.includes("jio hotstar") ||
            clean.includes("jiohotstar")
        ) &&
        (
            wantsToOpen ||
            clean.includes("play") ||
            clean === "hotstar"
        )
    ) {

        return openWebsite(
            "https://www.hotstar.com",
            "JioHotstar"
        );
    }


    // ========================================
    // GOOGLE
    // ========================================

    if (
        clean.includes("google") &&
        (
            wantsToOpen ||
            clean === "google"
        )
    ) {

        return openWebsite(
            "https://www.google.com",
            "Google"
        );
    }


    // ========================================
    // WHATSAPP
    // ========================================

    if (
        clean.includes("whatsapp") &&
        (
            wantsToOpen ||
            clean === "whatsapp"
        )
    ) {

        return openWebsite(
            "https://web.whatsapp.com",
            "WhatsApp"
        );
    }


    // ========================================
    // GMAIL
    // ========================================

    if (
        clean.includes("gmail") &&
        (
            wantsToOpen ||
            clean === "gmail"
        )
    ) {

        return openWebsite(
            "https://mail.google.com",
            "Gmail"
        );
    }


    // ========================================
    // SEARCH - ENGLISH + TANGLISH
    // ========================================

    let searchText = null;


    // Example:
    // search python
    // search for python
    // find python

    let match = clean.match(
        /^(?:search|search for|find)\s+(.+)$/i
    );

    if (match) {
        searchText = match[1].trim();
    }


    // Example:
    // google la python search pannu
    // google la genshin search pannunga

    if (!searchText && clean.includes("google")) {

        match = clean.match(
            /google\s+(?:la|l)\s+(.+?)\s+(?:search|search pannu|search pannunga|thedu|thedunga)$/i
        );

        if (match) {
            searchText = match[1].trim();
        }
    }


    // Example:
    // python ah google la search pannu

    if (!searchText && clean.includes("google")) {

        match = clean.match(
            /(.+?)\s+(?:ah\s+)?google\s+(?:la|l)\s+(?:search|search pannu|search pannunga)$/i
        );

        if (match) {
            searchText = match[1].trim();
        }
    }


    if (searchText) {

        window.open(
            "https://www.google.com/search?q=" +
            encodeURIComponent(searchText),
            "_blank"
        );

        return `Searching Google for ${searchText}.`;
    }


    // ========================================
    // CLEAR SCREEN
    // ========================================

    if (
        clean === "clear" ||
        clean === "clear screen" ||
        clean.includes("screen clear") ||
        clean.includes("screen ah clear pannu") ||
        clean.includes("screen clear pannu")
    ) {

        response.innerText = "";

        return "Screen cleared.";
    }


    // ========================================
    // SHUTDOWN
    // ========================================

    if (
        clean.includes("shutdown") ||
        clean.includes("shut down computer") ||
        clean.includes("computer shutdown pannu")
    ) {

        return "I cannot shut down your computer from a normal browser.";
    }


    // ========================================
    // NO LOCAL COMMAND
    // ========================================

    return null;
}

// ========================================
// PROCESS COMMAND
// ========================================

async function processCommand(command) {

    if (!command.trim()) return;

    response.innerText = "Processing...";
    status.innerText = "PROCESSING";


    const localResponse =
        jarvisCommand(command);


    // LOCAL COMMAND
    if (localResponse) {

        response.innerText =
            localResponse;

        speak(localResponse);

        status.innerText =
            "SYSTEM ONLINE";

        return;
    }


    // AI
    await askAI(command);
}


// ========================================
// GEMINI AI BACKEND
// ========================================

async function askAI(question) {

    try {

        const result =
            await fetch("/api/chat", {

                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    message: question
                })
            });


        if (!result.ok) {

            throw new Error(
                "Backend returned HTTP " +
                result.status
            );
        }


        const data =
            await result.json();


        const answer =
            data.reply ||
            "I couldn't understand that.";


        response.innerText =
            answer;

        speak(answer);

        status.innerText =
            "SYSTEM ONLINE";

    }

    catch (error) {

        console.error(
            "AI ERROR:",
            error
        );


        const message =
            "AI connection is currently unavailable.";


        response.innerText =
            message;

        speak(message);

        status.innerText =
            "OFFLINE";
    }
}


// ========================================
// SEND BUTTON
// ========================================

sendBtn.addEventListener(
    "click",
    () => {

        const command =
            input.value.trim();

        input.value = "";

        processCommand(command);
    }
);


// ========================================
// ENTER KEY
// ========================================

input.addEventListener(
    "keydown",
    (event) => {

        if (event.key === "Enter") {

            const command =
                input.value.trim();

            input.value = "";

            processCommand(command);
        }
    }
);


// ========================================
// VOICE RECOGNITION
// ========================================

const SpeechRecognition =
    window.SpeechRecognition ||
    window.webkitSpeechRecognition;


if (SpeechRecognition) {

    const recognition =
        new SpeechRecognition();


    recognition.lang = "en-IN";

    recognition.continuous = false;

    recognition.interimResults = false;


    // MIC BUTTON
    micBtn.addEventListener(
        "click",
        () => {

            try {

                status.innerText =
                    "LISTENING...";

                micBtn.classList.add(
                    "listening"
                );

                recognition.start();

            }

            catch (error) {

                console.log(
                    "Recognition already running."
                );
            }
        }
    );


    // SPEECH RESULT
    recognition.onresult =
    (event) => {

        const text =
            event.results[0][0]
                .transcript
                .trim();

        console.log("Heard:", text);

        const lowerText = text.toLowerCase();


        // ========================================
        // JARVIS WAKE WORD
        // ========================================

        if (
            lowerText.includes("hey jarvis") ||
            lowerText.includes("jarvis")
        ) {

            status.innerText =
                "JARVIS ACTIVATED";

            const reply =
                "Yes, I am listening.";

            response.innerText =
                reply;

            speak(reply);


            // Remove wake word
            const command =
                text
                    .replace(/hey jarvis/ig, "")
                    .replace(/jarvis/ig, "")
                    .trim();


            // If command was spoken together
            if (command) {

                setTimeout(() => {

                    processCommand(command);

                }, 700);

            }

            return;
        }


        // ========================================
        // NORMAL VOICE COMMAND
        // ========================================

        input.value = text;

        processCommand(text);
    };

    // SPEECH END
    recognition.onend =
        () => {

            micBtn.classList.remove(
                "listening"
            );


            if (
                status.innerText ===
                "LISTENING..."
            ) {

                status.innerText =
                    "SYSTEM ONLINE";
            }
        };


    // SPEECH ERROR
    recognition.onerror =
        (event) => {

            console.log(
                "Voice error:",
                event.error
            );


            micBtn.classList.remove(
                "listening"
            );

            status.innerText =
                "VOICE ERROR";
        };

}
else {

    micBtn.disabled = true;

    status.innerText =
        "VOICE NOT SUPPORTED";
}