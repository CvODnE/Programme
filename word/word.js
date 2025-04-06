document.addEventListener('DOMContentLoaded', function() {
    const tick = document.getElementById("tick");
    const img = document.getElementById("image");
    const clu = document.getElementById("clu");
    const input = document.getElementById("input");
    const result = document.getElementById("result");
    const game = document.getElementById("game");

let words = [
    "cow","horse","buffallo","donkey","camel","yak","alpaca","llama", "zebu","ox",
    // domestic big animals:0-9:10
    "dog","cat","rabbit","squirrel","hamster","ferret", "pig", "goet", "sheep","mouse",
    // domestic small animals:10-19:10
    "elephant", "tiger", "lion", "hippopotamus", "giraffe", "rhinoceros", "bear", "crocodile", "kangaroo", "panda",
    // wild big animals:20-29:10
    "meerkat", "monkey", "deer", "rabbit", "fox", "loris", "shrew", "chipmunk", "pika", "raccoon",
    // wild small animals:30-39:10
    "turkey","goose","swan","duck","ostrich","emu","pegion","crow","chicken","rhea",
    // domestic big birds:40-49:10
    "eagle","cassovary","pelican","hornbill","falcon","ostrich","emu","penguin","vulture","peacock",
    // wild big birds:50-59:10
    "finch","quail","dove","lovebird","parrot","kingfisher","robin","woodpekker","parakeet","cockatiel",
    // domestic small birds:60-69:10
    "hummingbird","sunbird","budgerigar","goldcrest","weebill","kinglet","toucan","swallow", "flycatcher","sparrow",
    // wild small birds:70-79:10
    "mushi","catfish","koi","goldfish","oscar","arapaima","shark","beluga","cod","knifefish",
    // domestic big fish:80-89:10
    "whale","shark","eel","arapaima","plecostomus","catfish","arowana","perch","gourami","pacu",
    // wild big fish:90-99:10
    "guppy","sari","betta","molly","discus","angel","betta","terta","pygmy","barb",
    // domestic small fish:100-109:10
    "swordtail","angelfish","barb","platy","betta","zebradanio","terta","rainbowfish","rasbora","killifish",
    // wild small fish:110-119:10
    "jackfruit","greengrapes","lemon","pear","guava",
    // green fruits:120-124:5
    "apple","strawberry","rambootan","pomegranet","dragonfruit",
    // red fruits:125-129:5
    "banana","mango","papaya","eggfruit",
    // yellow fruits:130-133:4
    "ladiesfinger","greenchilly","cucumber","capsicum","bitterguard",
    // green vegetables:134-138:5
    "beetroot","chilly","pepper","tomato",
    // red vegetables:139-142:4
    "radish","garlic",
    // white vegetables:143-144:2
    "russia","china","america","canada","india","brazil","mexico","argentina","australia","kazakisthan",
    // large country:145-154:10
    "pakisthan","afganistan","nepal","peru","chile","spain","germeny","italy","yemen","bhutan",
    // small country:155-164:10
    "run", "jump", "walk", "skip", "hop", "dance", "sing", "read", "write", "draw",
    "paint", "cook", "eat", "drink", "sleep", "dream", "think", "learn", "study", "play",
    "laugh", "cry", "smile", "talk", "listen", "speak", "whisper", "shout", "call", "answer",
    "ask", "help", "share", "give", "take", "hold", "catch", "throw", "kick", "push",
    "pull", "open", "close", "turn", "look", "see", "watch", "hear", "smell", "taste",
    "touch", "feel", "grow", "plant", "water", "climb", "swim", "ride", "drive", "fly",
    "travel", "explore", "discover", "build", "create", "imagine", "invent", "solve", "count", "add",
    "subtract", "multiply", "divide", "clean", "wash", "brush", "comb", "dress", "undress",
    "tie", "untie", "fold", "unfold", "carry", "lift", "drop", "find", "lose", "remember",
    "forget", "want", "need", "hope", "wish", "believe", "decide", "plan", "organize", "wait", "try",
    "bake", "fry", "boil", "stir", "mix", "chop", "slice", "peel", "pour", "sprinkle",
    "arrange", "decorate", "wrap", "unwrap", "glue", "tape", "cut", "sew", "knit", "crochet",
    "design", "code", "program", "debug", "upload", "download", "save", "delete", "copy", "paste",
    "search", "browse", "click", "type", "scroll", "zoom", "record", "pause", "rewind",
    "fastforward", "edit", "publish", "comment", "like", "follow", "unfollow", "block", "report",
    "meet", "greet", "introduce", "invite", "visit", "welcome", "support", "guide", "teach",
    "explain", "describe", "compare", "contrast", "define", "discuss", "argue", "agree", "disagree", "promise",
    "apologize", "forgive", "comfort", "encourage", "motivate", "inspire", "obey", "ignore",
    "protect", "defend", "attack", "retreat", "hide", "seek", "win",
    "achieve", "fail", "succeed", "practice", "improve", "master",
    "arrive", "depart", "enter", "exit", "approach", "advance", "flee", "chase",
    "gather", "scatter", "collect", "distribute", "tidy", "mess", "dust",
    "sweep", "mop", "vacuum", "polish", "fix", "repair", "break", "mend", "assemble", "disassemble",
    "construct", "demolish", "knock", "tap", "poke", "pat", "rub", "squeeze", "twist",
    "shake", "nod", "wave", "point", "gesture", "signal", "lower",
    "drag", "bounce", "roll", "slide", "spin", "swing",
    "crawl", "creep", "dash", "sprint", "jog", "amble", "stroll", "march", "parade",
    "soar", "dive", "float", "sink", "land", "takeoff", "row", "paddle", "sail", "steer",
    "navigate", "hide", "seek", "reveal",
    "observe", "examine", "inspect", "analyze", "conclude", "choose",
    "sense", "notice", "observe", "perceive", "recognize", "recall",
    "doubt", "wonder", "fear", "worry", "desire", "crave", "love",
    "hate", "enjoy", "dislike", "admire", "respect", "envy", "pity", "amuse", "bore", "surprise",
    "astonish", "shock", "please", "satisfy", "frustrate", "anger", "calm", "soothe", "comfort", "excite",
    "interest", "fascinate", "confuse", "understand", "comprehend", "know", "realize",
    "change", "alter", "modify", "transform", "convert", "develop", "evolve", "improve", "worsen", "increase",
    "decrease", "shrink", "expand", "contract", "begin", "start", "end", "finish", "complete",
    "continue", "persist", "stop", "resume", "delay", "postpone", "hasten", "accelerate", "slow",
    "weaken", "strengthen", "heal", "injure", "damage", "repair", "destroy", "exist", "vanish",
    "appear", "become", "remain", "stay", "live", "die",
    "advise", "suggest", "recommend", "inform", "notify", "warn", "remind", "persuade", "convince", "encourage",
    "assist", "aid", "instruct", "train", "coach", "mentor",
    "communicate", "convey", "express", "articulate", "explain", "describe", "illustrate", "clarify", "interpret", "translate",
    "discuss", "debate", "argue", "negotiate", "compromise", "agree", "disagree", "confront", "resolve", "mediate",
    "understand", "respond", "reply", "question", "inquire", "interrogate", "interview",
    "socialize", "interact", "collaborate", "cooperate", "participate",
    "contribute", "receive", "offer", "accept", "refuse", "decline", "request", "demand",
    "command", "order", "obey", "defy", "serve", "assist", "care", "nurture", "protect", "defend",
    "comfort", "console", "empathize", "sympathize", "uplift", "motivate", "inspire", "appreciate", "thank",
    "bloom", "blossom", "wither", "sprout", "bud", "flourish", "decay", "erode", "dissolve",
    "flow", "drift", "meander", "rush", "drip", "trickle", "flood", "freeze", "thaw",
    "burn", "ignite", "extinguish", "erupt", "tremble", "shake", "sway", "rustle", "whistle", "roar",
    "chirp", "hum", "buzz", "crawl", "slither", "soar", "hover", "migrate",
    "burrow", "nest", "hunt", "stalk", "pounce", "graze", "dive", "splash", "float",
    "takeoff", "descend", "leap", "bound", "crawl", "creep",
    "dash", "sprint", "jog", "amble", "stroll", "march", "parade", "saunter", "wander", "roam",
    "journey", "trek", "hike", "navigate", "steer", "pilot",
    "pedal", "paddle", "sail", "anchor", "dock", "moor", "drift", "collide",
    "achieve", "accomplish", "attain", "complete", "execute", "perform", "undertake", "handle", "manage",
    "schedule", "prepare", "develop", "construct",
    "implement", "operate", "utilize", "employ", "apply", "practice", "master", "improve",
    "resolve", "fix", "repair", "mend", "adjust", "modify", "alter", "change", "transform",
    "innovate", "research", "investigate", "examine", "analyze", "evaluate", "assess", "review",
    "check", "inspect", "monitor", "oversee", "supervise", "direct", "lead", "coordinate", "collaborate",
    "contribute", "participate", "assist", "serve", "provide", "offer", "supply", "distribute",
    "collect", "gather", "acquire", "obtain", "earn", "win", "fail", "succeed", "strive",
    "persevere", "endure", "persist", "begin", "start", "initiate", "conclude", "finalize", "submit", "present",
    "observe", "notice", "glance", "stare", "gaze", "peep", "peek",
    "hear", "overhear", "eavesdrop", "sound", "resonate", "echo", "ring",
    "sniff", "scent", "reek", "fragrance", "aroma", "stink", "odor", "perfume", "exhale",
    "savor", "lick", "bite", "chew", "swallow", "sip", "guzzle", "devour", "season",
    "feel", "grasp", "grip", "pinch", "poke", "stroke", "press",
    "handle", "manipulate", "caress", "nudge", "tap", "pat", "embrace", "shiver", "tremble", "itch",
    "ache", "hurt", "tingle", "throb", "pulse", "vibrate", "resonate", "glow", "shine", "sparkle",
    "dim", "fade", "illuminate", "reflect", "appear", "vanish", "loom", "blur", "focus", "perceive",
    "sense", "detect", "discern", "identify", "observe", "witness", "experience", "encounter",
    "know", "understand", "comprehend",
    "ponder", "contemplate", "analyze", "reason", "choose", "judge", "assess",
    "feel", "sense", "experience", "perceive", "notice", "fear", "worry",
    "desire", "crave", "enjoy", "admire",
    "pity", "amuse", "bore", "surprise", "astonish", "shock", "please", "satisfy", "frustrate", "anger",
    "calm", "soothe", "comfort", "excite", "interest", "fascinate", "confuse", "embarrass", "shame", "guilt",
    "pride", "joy", "happiness", "sadness", "grief", "disappointment", "frustration", "irritation", "annoyance",
    "relief", "contentment", "serenity", "anticipate", "expect", "suspect", "doubt", "trust", "distrust",
    "value", "appreciate", "cherish", "resent", "loathe", "yearn", "pine", "grieve", "mourn", "celebrate",
    "banish", "bestow", "coerce", "concur", "defer", "elicit", "entail", "exert", "feign", "flounder",
    "garner", "hinder", "implore", "instigate", "juxtapose", "lament", "muster", "nullify", "obfuscate", "ostracize",
    "peruse", "placate", "predominate", "procrastinate", "quell", "reiterate", "relinquish", "reprimand", "rescind", "retaliate",
    "sanction", "scrutinize", "simulate", "squander", "substantiate", "supplant", "surmise", "thwart", "transcend", "underscore",
    "usurp", "vindicate", "waver", "wield", "yearn", "abet", "accede", "afflict", "alleviate", "amplify",
    "appease", "augment", "belittle", "bolster", "cajole", "capitulate", "chasten", "circumvent", "condone", "consign",
    "corroborate", "debilitate", "decipher", "denounce", "depict", "divulge", "doggedly", "efface", "emanate", "embody",
    "encompass", "endow", "engender", "entice", "enumerate", "envisage", "epitomize", "exasperate", "exonerate", "extricate",
    "fathom", "foment", "forfeit", "galvanize", "harangue", "harass", "impart", "impeach", "imply", "incite",
    "indoctrinate", "inhibit", "insinuate", "intimidate", "invoke", "jettison", "kindle", "lionize", "malign", "meditate"
    // verbs:165-
]

let word_pos = Math.floor(Math.random() * words.length)
let word = words[word_pos]

console.log(word)

let fishes = [words[word_pos-2], words[word_pos-1], words[word_pos+1], words[word_pos+2], words[word_pos+3], words[word_pos+4]]
let fishes_pos = Math.floor(Math.random() * fishes.length)
let fis = fishes[fishes_pos]
let fishe = [word, fis]
fishes.push(fishe[0], fishe[1])


let verb_len = []
let verb_len_letter = []
let verb_letter = []

words.forEach((verwo) => {
    verwo_pos = words.indexOf(verwo)
    if (verwo_pos > 164) {
        if (word.length == verwo.length) {
            verb_len.push(verwo)
            if (word[0] == verwo[0]) {
                verb_len_letter.push(verwo)
            }
        }
        if(word[0] == verwo[0]) {
            verb_letter.push(verwo)
        }
    }
})
verb = [verb_len, verb_len_letter, verb_letter]
verb_pos = Math.floor(Math.random() * verb.length)
verbs = verb[verb_pos]


if (word_pos > 164) {
    clu.textContent = "The word is a verb. "
    tick.addEventListener(("click"), function() {
        if (input.value.toLowerCase() != word) {
            clu.textContent = "The word is a verb. "+"The word have " + word.length + " letters. "+"One of these : ("+verbs+"). "
            img.src = "../images/Screenshot__208_-removebg-preview.png"
            tick.addEventListener(("click"), function() {
                if (input.value.toLowerCase() !== word) {
                    clu.textContent = "The word is a verb. "+"The word have " + word.length + " letters. "+"The first letter of the word is '"+word[0]+"'. "+"One of these : ("+verbs+"). "
                    img.src = "../images/Screenshot__210_-removebg-preview.png"
                    tick.addEventListener(("click"), function() {
                        if (input.value.toLowerCase() !== word) {
                            clu.textContent = "The word is a verb. "+"The word have " + word.length + " letters. "+"The first letter of the word is '"+word[0]+"'. "+"The last letter of the word is '"+word[word.length - 1]+"'. "+"One of these : ("+verbs+"). "
                            img.src = "../images/Screenshot__211_-removebg-preview.png"
                            tick.addEventListener(("click"), function() {
                                if (input.value.toLowerCase() !== word) {
                                    game.textContent = "You Lose!"
                                    game.style.cssText = "color: #f00;"
                                    result.textContent = "You think the word is "+input.value+" But the word is "+word+" 😁."
                                    result.style.cssText = "color: cyan;"
                                    img.src = "../images/Screenshot__213_-removebg-preview.png"
                                }else {
                                    game.textContent = "You Win!"
                                    game.style.cssText = "color: #0f0;"
                                }
                            });
                        }else {
                            game.textContent = "You Win!"
                            game.style.cssText = "color: #0f0;"
                        }
                    });
                }else {
                    game.textContent = "You Win!"
                    game.style.cssText = "color: #0f0;"
                }
            });
        }else {
            game.textContent = "You Win!"
            game.style.cssText = "color: #0f0;"
        }
    });
}
if (word_pos < 165) {
    clu.textContent = "The word is a noun."
    tick.addEventListener(("click"), function() {
        if(input.value.toLowerCase() !== word) {
            if(word_pos < 30) {
                clu.textContent = "The word is a noun."+"The word is a name of animal. "
                img.src = "../images/Screenshot__208_-removebg-preview.png"
                tick.addEventListener(("click"), function() {
                    if(input.value.toLowerCase() !== word){
                        clu.textContent = "The word is a noun."+"The word is a name of animal. "+"The word have "+word.length+" letters. "
                        img.src = "../images/Screenshot__209_-removebg-preview.png"
                        tick.addEventListener(("click"), function() {
                            if(input.value.toLowerCase() !== word){
                                if(word_pos < 20){
                                    clu.textContent = "The word is a noun."+"The word is a name of animal. "+"The word have "+word.length+" letters. "+"The animal is domestic. "
                                    img.src = "../images/Screenshot__210_-removebg-preview.png"
                                    tick.addEventListener(("click"), function() {
                                        if(input.value.toLowerCase() !== word){
                                            clu.textContent = "The word is a noun."+"The word is a name of animal. "+"The word have "+word.length+" letters. "+"The animal is domestic. "+"The first letter of the word is "+word[0]+" . "
                                            img.src = "../images/Screenshot__211_-removebg-preview.png"
                                            tick.addEventListener(("click"), function() {
                                                if(input.value.toLowerCase() !== word){
                                                    clu.textContent = "The word is a noun."+"The word is a name of animal. "+"The word have "+word.length+" letters. "+"The animal is domestic. "+"The first letter of the word is "+word[0]+" . "+"The last letter of the word is "+word[word.length]+" . "
                                                    img.src = "../images/Screenshot__212_-removebg-preview.png"
                                                    tick.addEventListener(("click"), function() {
                                                        if(input.value.toLowerCase() !== word) {
                                                            game.textContent = "You Lose!"
                                                            game.style.cssText = "color: #f00;"
                                                            result.textContent = "You think the word is "+input.value+" But the word is "+word+" 😁."
                                                            result.style.cssText = "color: cyan;"
                                                            img.src = "../images/Screenshot__213_-removebg-preview.png"
                                                        }else {
                                                            game.textContent = "You Win!"
                                                            game.style.cssText = "color: #0f0;"
                                                        }
                                                    });
                                                }else {
                                                    game.textContent = "You Win!"
                                                    game.style.cssText = "color: #0f0;"
                                                }
                                            });
                                        }else {
                                            game.textContent = "You Win!"
                                            game.style.cssText = "color: #0f0;"
                                        }
                                    });
                                }
                                else if(word_pos > 19 && word_pos < 40 ){
                                    clu.textContent = "The word is a noun."+"The word is a name of animal. "+"The word have "+word.length+" letters. "+"The animal is wild. "
                                    img.src = "../images/Screenshot__210_-removebg-preview.png"
                                    tick.addEventListener(("click"), function() {
                                        if(input.value.toLowerCase() !== word){
                                            clu.textContent = "The word is a noun."+"The word is a name of animal. "+"The word have "+word.length+" letters. "+"The animal is wild. "+"The first letter of the word is "+word[0]+" . "
                                            img.src = "../images/Screenshot__211_-removebg-preview.png"
                                            tick.addEventListener(("click"), function() {
                                                if(input.value.toLowerCase() !== word){
                                                    clu.textContent = "The word is a noun."+"The word is a name of animal. "+"The word have "+word.length+" letters. "+"The animal is wild. "+"The first letter of the word is "+word[0]+" . "+"The last letter of the word is "+word[word.length]+" . "
                                                    img.src = "../images/Screenshot__212_-removebg-preview.png"
                                                    tick.addEventListener(("click"), function() {
                                                        if(input.value.toLowerCase() !== word) {
                                                            game.textContent = "You Lose!"
                                                            game.style.cssText = "color: #f00;"
                                                            result.textContent = "You think the word is "+input.value+" But the word is "+word+" 😁."
                                                            result.style.cssText = "color: cyan;"
                                                            img.src = "../images/Screenshot__213_-removebg-preview.png"
                                                        }else {
                                                            game.textContent = "You Win!"
                                                            game.style.cssText = "color: #0f0;"
                                                        }
                                                    })
                                                }else {
                                                    game.textContent = "You Win!"
                                                    game.style.cssText = "color: #0f0;"
                                                }
                                            });
                                        }else {
                                            game.textContent = "You Win!"
                                            game.style.cssText = "color: #0f0;"
                                        }
                                    });
                                }
                            }else {
                                game.textContent = "You Win!"
                                game.style.cssText = "color: #0f0;"
                            }
                        });
                    }else {
                        game.textContent = "You Win!"
                        game.style.cssText = "color: #0f0;"
                    }
                });
            }
            if(word_pos > 29 && word_pos < 80) {
                clu.textContent = "The word is a noun."+"The word is a name of bird. "
                img.src = "../images/Screenshot__208_-removebg-preview.png"
                tick.addEventListener(("click"), function() {
                    if(input.value.toLowerCase() !== word){
                        clu.textContent = "The word is a noun."+"The word is a name of bird. "+"The word have "+word.length+" letters. "
                        img.src = "../images/Screenshot__209_-removebg-preview.png"
                        tick.addEventListener(("click"), function() {
                            if(input.value.toLowerCase() !== word){
                                if(word_pos > 29 && word_pos < 60){
                                    clu.textContent = "The word is a noun."+"The word is a name of bird. "+"The word have "+word.length+" letters. "+"The bird is big. "
                                    img.src = "../images/Screenshot__210_-removebg-preview.png"
                                    tick.addEventListener(("click"), function() {
                                        if(input.value.toLowerCase() !== word){
                                            clu.textContent = "The word is a noun."+"The word is a name of bird. "+"The word have "+word.length+" letters. "+"The bird is big. "+"The first letter of the word is "+word[0]+" . "
                                            img.src = "../images/Screenshot__211_-removebg-preview.png"
                                            tick.addEventListener(("click"), function() {
                                                if(input.value.toLowerCase() !== word){
                                                    clu.textContent = "The word is a noun."+"The word is a name of bird. "+"The word have "+word.length+" letters. "+"The bird is big. "+"The first letter of the word is "+word[0]+" . "+"The last letter of the word is "+word[word.length]+" . "
                                                    img.src = "../images/Screenshot__212_-removebg-preview.png"
                                                    tick.addEventListener(("click"), function() {
                                                        if(input.value.toLowerCase() !== word) {
                                                            game.textContent = "You Lose!"
                                                            game.style.cssText = "color: #f00;"
                                                            result.textContent = "You think the word is "+input.value+" But the word is "+word+" 😁."
                                                            result.style.cssText = "color: cyan;"
                                                            img.src = "../images/Screenshot__213_-removebg-preview.png"
                                                        }else {
                                                            game.textContent = "You Win!"
                                                            game.style.cssText = "color: #0f0;"
                                                        }
                                                    });
                                                }else {
                                                    game.textContent = "You Win!"
                                                    game.style.cssText = "color: #0f0;"
                                                }
                                            });
                                        }else {
                                            game.textContent = "You Win!"
                                            game.style.cssText = "color: #0f0;"
                                        }
                                    });
                                }
                                else if(word_pos > 59 && word_pos < 80 ){
                                    clu.textContent = "The word is a noun."+"The word is a name of bird. "+"The word have "+word.length+" letters. "+"The bird is small. "
                                    img.src = "../images/Screenshot__210_-removebg-preview.png"
                                    tick.addEventListener(("click"), function() {
                                        if(input.value.toLowerCase() !== word){
                                            clu.textContent = "The word is a noun."+"The word is a name of bird. "+"The word have "+word.length+" letters. "+"The bird is small. "+"The first letter of the word is "+word[0]+" . "
                                            img.src = "../images/Screenshot__211_-removebg-preview.png"
                                            tick.addEventListener(("click"), function() {
                                                if(input.value.toLowerCase() !== word){
                                                    clu.textContent = "The word is a noun."+"The word is a name of bird. "+"The word have "+word.length+" letters. "+"The bird is small. "+"The first letter of the word is "+word[0]+" . "+"The last letter of the word is "+word[word.length]+" . "
                                                    img.src = "../images/Screenshot__212_-removebg-preview.png"
                                                    tick.addEventListener(("click"), function() {
                                                        if(input.value.toLowerCase() !== word) {
                                                            game.textContent = "You Lose!"
                                                            game.style.cssText = "color: #f00;"
                                                            result.textContent = "You think the word is "+input.value+" But the word is "+word+" 😁."
                                                            result.style.cssText = "color: cyan;"
                                                            img.src = "../images/Screenshot__213_-removebg-preview.png"
                                                        }else {
                                                            game.textContent = "You Win!"
                                                            game.style.cssText = "color: #0f0;"
                                                        }
                                                    })
                                                }else {
                                                    game.textContent = "You Win!"
                                                    game.style.cssText = "color: #0f0;"
                                                }
                                            });
                                        }else {
                                            game.textContent = "You Win!"
                                            game.style.cssText = "color: #0f0;"
                                        }
                                    });
                                }
                            }else {
                                game.textContent = "You Win!"
                                game.style.cssText = "color: #0f0;"
                            }
                        });
                    }else {
                        game.textContent = "You Win!"
                        game.style.cssText = "color: #0f0;"
                    }
                });
            }
            if(word_pos > 79 && word_pos < 120) {
                clu.textContent = "The word is a noun."+"The word is a name of fish. "
                img.src = "../images/Screenshot__208_-removebg-preview.png"
                tick.addEventListener(("click"), function() {
                    if(input.value.toLowerCase() !== word){
                        clu.textContent = "The word is a noun."+"The word is a name of fish. "+"The word have "+word.length+" letters. "+"One of these : ("+fishes+"). "
                        img.src = "../images/Screenshot__209_-removebg-preview.png"
                        tick.addEventListener(("click"), function() {
                            if(input.value.toLowerCase() !== word){
                                if(word_pos > 79 && word_pos < 100){
                                    clu.textContent = "The word is a noun."+"The word is a name of fish. "+"The word have "+word.length+" letters. "+"One of these : ("+fishes+"). "+"The fish is big. "
                                    img.src = "../images/Screenshot__210_-removebg-preview.png"
                                    tick.addEventListener(("click"), function() {
                                        if(input.value.toLowerCase() !== word){
                                            clu.textContent = "The word is a noun."+"The word is a name of fish. "+"The word have "+word.length+" letters. "+"One of these : ("+fishes+"). "+"The fish is big. "+"The first letter of the word is "+word[0]+" . "
                                            img.src = "../images/Screenshot__211_-removebg-preview.png"
                                            tick.addEventListener(("click"), function() {
                                                if(input.value.toLowerCase() !== word){
                                                    clu.textContent = "The word is a noun."+"The word is a name of fish. "+"The word have "+word.length+" letters. "+"One of these : ("+fishes+"). "+"The fish is big. "+"The first letter of the word is "+word[0]+" . "+"The last letter of the word is "+word[word.length]+" . "
                                                    img.src = "../images/Screenshot__212_-removebg-preview.png"
                                                    tick.addEventListener(("click"), function() {
                                                        if(input.value.toLowerCase() !== word) {
                                                            game.textContent = "You Lose!"
                                                            game.style.cssText = "color: #f00;"
                                                            result.textContent = "You think the word is "+input.value+" But the word is "+word+" 😁."
                                                            result.style.cssText = "color: cyan;"
                                                            img.src = "../images/Screenshot__213_-removebg-preview.png"
                                                        }else {
                                                            game.textContent = "You Win!"
                                                            game.style.cssText = "color: #0f0;"
                                                        }
                                                    });
                                                }else {
                                                    game.textContent = "You Win!"
                                                    game.style.cssText = "color: #0f0;"
                                                }
                                            });
                                        }else {
                                            game.textContent = "You Win!"
                                            game.style.cssText = "color: #0f0;"
                                        }
                                    });
                                }
                                else if(word_pos > 99 && word_pos < 120 ){
                                    clu.textContent = "The word is a noun."+"The word is a name of fish. "+"The word have "+word.length+" letters. "+"One of these : ("+fishes+"). "+"The fish is small. "
                                    img.src = "../images/Screenshot__210_-removebg-preview.png"
                                    tick.addEventListener(("click"), function() {
                                        if(input.value.toLowerCase() !== word){
                                            clu.textContent = "The word is a noun."+"The word is a name of fish. "+"The word have "+word.length+" letters. "+"One of these : ("+fishes+"). "+"The fish is small. "+"The first letter of the word is "+word[0]+" . "
                                            img.src = "../images/Screenshot__211_-removebg-preview.png"
                                            tick.addEventListener(("click"), function() {
                                                if(input.value.toLowerCase() !== word){
                                                    clu.textContent = "The word is a noun."+"The word is a name of fish. "+"The word have "+word.length+" letters. "+"One of these : ("+fishes+"). "+"The fish is small. "+"The first letter of the word is "+word[0]+" . "+"The last letter of the word is "+word[word.length]+" . "
                                                    img.src = "../images/Screenshot__212_-removebg-preview.png"
                                                    tick.addEventListener(("click"), function() {
                                                        if(input.value.toLowerCase() !== word) {
                                                            game.textContent = "You Lose!"
                                                            game.style.cssText = "color: #f00;"
                                                            result.textContent = "You think the word is "+input.value+" But the word is "+word+" 😁."
                                                            result.style.cssText = "color: cyan;"
                                                            img.src = "../images/Screenshot__213_-removebg-preview.png"
                                                        }else {
                                                            game.textContent = "You Win!"
                                                            game.style.cssText = "color: #0f0;"
                                                        }
                                                    })
                                                }else {
                                                    game.textContent = "You Win!"
                                                    game.style.cssText = "color: #0f0;"
                                                }
                                            });
                                        }else {
                                            game.textContent = "You Win!"
                                            game.style.cssText = "color: #0f0;"
                                        }
                                    });
                                }
                            }else {
                                game.textContent = "You Win!"
                                game.style.cssText = "color: #0f0;"
                            }
                        });
                    }else {
                        game.textContent = "You Win!"
                        game.style.cssText = "color: #0f0;"
                    }
                });
            }
            if(word_pos > 119 && word_pos < 134) {
                clu.textContent = "The word is a noun."+"The word is a name of fruit. "
                img.src = "../images/Screenshot__208_-removebg-preview.png"
                tick.addEventListener(("click"), function() {
                    if(input.value.toLowerCase() !== word){
                        clu.textContent = "The word is a noun."+"The word is a name of fruit. "+"The word have "+word.length+" letters. "
                        img.src = "../images/Screenshot__209_-removebg-preview.png"
                        tick.addEventListener(("click"), function() {
                            if(input.value.toLowerCase() !== word){
                                if(word_pos > 119 && word_pos < 125){
                                    clu.textContent = "The word is a noun."+"The word is a name of fruit. "+"The word have "+word.length+" letters. "+"The fruit is green. "
                                    img.src = "../images/Screenshot__210_-removebg-preview.png"
                                    tick.addEventListener(("click"), function() {
                                        if(input.value.toLowerCase() !== word){
                                            clu.textContent = "The word is a noun."+"The word is a name of fruit. "+"The word have "+word.length+" letters. "+"The fruit is green. "+"The first letter of the word is "+word[0]+" . "
                                            img.src = "../images/Screenshot__211_-removebg-preview.png"
                                            tick.addEventListener(("click"), function() {
                                                if(input.value.toLowerCase() !== word){
                                                    clu.textContent = "The word is a noun."+"The word is a name of fruit. "+"The word have "+word.length+" letters. "+"The fruit is green. "+"The first letter of the word is "+word[0]+" . "+"The last letter of the word is "+word[word.length]+" . "
                                                    img.src = "../images/Screenshot__212_-removebg-preview.png"
                                                    tick.addEventListener(("click"), function() {
                                                        if(input.value.toLowerCase() !== word) {
                                                            game.textContent = "You Lose!"
                                                            game.style.cssText = "color: #f00;"
                                                            result.textContent = "You think the word is "+input.value+" But the word is "+word+" 😁."
                                                            result.style.cssText = "color: cyan;"
                                                            img.src = "../images/Screenshot__213_-removebg-preview.png"
                                                        }else {
                                                            game.textContent = "You Win!"
                                                            game.style.cssText = "color: #0f0;"
                                                        }
                                                    });
                                                }else {
                                                    game.textContent = "You Win!"
                                                    game.style.cssText = "color: #0f0;"
                                                }
                                            });
                                        }else {
                                            game.textContent = "You Win!"
                                            game.style.cssText = "color: #0f0;"
                                        }
                                    });
                                }
                                else if(word_pos > 124 && word_pos < 130 ){
                                    clu.textContent = "The word is a noun."+"The word is a name of fruit. "+"The word have "+word.length+" letters. "+"The fruit is red. "
                                    img.src = "../images/Screenshot__210_-removebg-preview.png"
                                    tick.addEventListener(("click"), function() {
                                        if(input.value.toLowerCase() !== word){
                                            clu.textContent = "The word is a noun."+"The word is a name of fruit. "+"The word have "+word.length+" letters. "+"The fruit is red. "+"The first letter of the word is "+word[0]+" . "
                                            img.src = "../images/Screenshot__211_-removebg-preview.png"
                                            tick.addEventListener(("click"), function() {
                                                if(input.value.toLowerCase() !== word){
                                                    clu.textContent = "The word is a noun."+"The word is a name of fruit. "+"The word have "+word.length+" letters. "+"The fruit is red. "+"The first letter of the word is "+word[0]+" . "+"The last letter of the word is "+word[word.length]+" . "
                                                    img.src = "../images/Screenshot__212_-removebg-preview.png"
                                                    tick.addEventListener(("click"), function() {
                                                        if(input.value.toLowerCase() !== word) {
                                                            game.textContent = "You Lose!"
                                                            game.style.cssText = "color: #f00;"
                                                            result.textContent = "You think the word is "+input.value+" But the word is "+word+" 😁."
                                                            result.style.cssText = "color: cyan;"
                                                            img.src = "../images/Screenshot__213_-removebg-preview.png"
                                                        }else {
                                                            game.textContent = "You Win!"
                                                            game.style.cssText = "color: #0f0;"
                                                        }
                                                    })
                                                }else {
                                                    game.textContent = "You Win!"
                                                    game.style.cssText = "color: #0f0;"
                                                }
                                            });
                                        }else {
                                            game.textContent = "You Win!"
                                            game.style.cssText = "color: #0f0;"
                                        }
                                    });
                                }
                                else if(word_pos > 129 && word_pos < 134 ){
                                    clu.textContent = "The word is a noun."+"The word is a name of fruit. "+"The word have "+word.length+" letters. "+"The fruit is yellow. "
                                    img.src = "../images/Screenshot__210_-removebg-preview.png"
                                    tick.addEventListener(("click"), function() {
                                        if(input.value.toLowerCase() !== word){
                                            clu.textContent = "The word is a noun."+"The word is a name of fruit. "+"The word have "+word.length+" letters. "+"The fruit is yellow. "+"The first letter of the word is "+word[0]+" . "
                                            img.src = "../images/Screenshot__211_-removebg-preview.png"
                                            tick.addEventListener(("click"), function() {
                                                if(input.value.toLowerCase() !== word){
                                                    clu.textContent = "The word is a noun."+"The word is a name of fruit. "+"The word have "+word.length+" letters. "+"The fruit is yellow. "+"The first letter of the word is "+word[0]+" . "+"The last letter of the word is "+word[word.length]+" . "
                                                    img.src = "../images/Screenshot__212_-removebg-preview.png"
                                                    tick.addEventListener(("click"), function() {
                                                        if(input.value.toLowerCase() !== word) {
                                                            game.textContent = "You Lose!"
                                                            game.style.cssText = "color: #f00;"
                                                            result.textContent = "You think the word is "+input.value+" But the word is "+word+" 😁."
                                                            result.style.cssText = "color: cyan;"
                                                            img.src = "../images/Screenshot__213_-removebg-preview.png"
                                                        }else {
                                                            game.textContent = "You Win!"
                                                            game.style.cssText = "color: #0f0;"
                                                        }
                                                    })
                                                }else {
                                                    game.textContent = "You Win!"
                                                    game.style.cssText = "color: #0f0;"
                                                }
                                            });
                                        }else {
                                            game.textContent = "You Win!"
                                            game.style.cssText = "color: #0f0;"
                                        }
                                    });
                                }
                            }else {
                                game.textContent = "You Win!"
                                game.style.cssText = "color: #0f0;"
                            }
                        });
                    }else {
                        game.textContent = "You Win!"
                        game.style.cssText = "color: #0f0;"
                    }
                });
            }
            if(word_pos > 133 && word_pos < 145) {
                clu.textContent = "The word is a noun."+"The word is a name of vegetable. "
                img.src = "../images/Screenshot__208_-removebg-preview.png"
                tick.addEventListener(("click"), function() {
                    if(input.value.toLowerCase() !== word){
                        clu.textContent = "The word is a noun."+"The word is a name of vegetable. "+"The word have "+word.length+" letters. "
                        img.src = "../images/Screenshot__209_-removebg-preview.png"
                        tick.addEventListener(("click"), function() {
                            if(input.value.toLowerCase() !== word){
                                if(word_pos > 133 && word_pos < 139){
                                    clu.textContent = "The word is a noun."+"The word is a name of vegetable. "+"The word have "+word.length+" letters. "+"The vegetable is green. "
                                    img.src = "../images/Screenshot__210_-removebg-preview.png"
                                    tick.addEventListener(("click"), function() {
                                        if(input.value.toLowerCase() !== word){
                                            clu.textContent = "The word is a noun."+"The word is a name of vegetable. "+"The word have "+word.length+" letters. "+"The vegetable is green. "+"The first letter of the word is "+word[0]+" . "
                                            img.src = "../images/Screenshot__211_-removebg-preview.png"
                                            tick.addEventListener(("click"), function() {
                                                if(input.value.toLowerCase() !== word){
                                                    clu.textContent = "The word is a noun."+"The word is a name of vegetable. "+"The word have "+word.length+" letters. "+"The vegetable is green. "+"The first letter of the word is "+word[0]+" . "+"The last letter of the word is "+word[word.length]+" . "
                                                    img.src = "../images/Screenshot__212_-removebg-preview.png"
                                                    tick.addEventListener(("click"), function() {
                                                        if(input.value.toLowerCase() !== word) {
                                                            game.textContent = "You Lose!"
                                                            game.style.cssText = "color: #f00;"
                                                            result.textContent = "You think the word is "+input.value+" But the word is "+word+" 😁."
                                                            result.style.cssText = "color: cyan;"
                                                            img.src = "../images/Screenshot__213_-removebg-preview.png"
                                                        }else {
                                                            game.textContent = "You Win!"
                                                            game.style.cssText = "color: #0f0;"
                                                        }
                                                    });
                                                }else {
                                                    game.textContent = "You Win!"
                                                    game.style.cssText = "color: #0f0;"
                                                }
                                            });
                                        }else {
                                            game.textContent = "You Win!"
                                            game.style.cssText = "color: #0f0;"
                                        }
                                    });
                                }
                                else if(word_pos > 138 && word_pos < 143 ){
                                    clu.textContent = "The word is a noun."+"The word is a name of vegetable. "+"The word have "+word.length+" letters. "+"The vegetable is red. "
                                    img.src = "../images/Screenshot__210_-removebg-preview.png"
                                    tick.addEventListener(("click"), function() {
                                        if(input.value.toLowerCase() !== word){
                                            clu.textContent = "The word is a noun."+"The word is a name of vegetable. "+"The word have "+word.length+" letters. "+"The vegetable is red. "+"The first letter of the word is "+word[0]+" . "
                                            img.src = "../images/Screenshot__211_-removebg-preview.png"
                                            tick.addEventListener(("click"), function() {
                                                if(input.value.toLowerCase() !== word){
                                                    clu.textContent = "The word is a noun."+"The word is a name of vegetable. "+"The word have "+word.length+" letters. "+"The vegetable is red. "+"The first letter of the word is "+word[0]+" . "+"The last letter of the word is "+word[word.length]+" . "
                                                    img.src = "../images/Screenshot__212_-removebg-preview.png"
                                                    tick.addEventListener(("click"), function() {
                                                        if(input.value.toLowerCase() !== word) {
                                                            game.textContent = "You Lose!"
                                                            game.style.cssText = "color: #f00;"
                                                            result.textContent = "You think the word is "+input.value+" But the word is "+word+" 😁."
                                                            result.style.cssText = "color: cyan;"
                                                            img.src = "../images/Screenshot__213_-removebg-preview.png"
                                                        }else {
                                                            game.textContent = "You Win!"
                                                            game.style.cssText = "color: #0f0;"
                                                        }
                                                    })
                                                }else {
                                                    game.textContent = "You Win!"
                                                    game.style.cssText = "color: #0f0;"
                                                }
                                            });
                                        }else {
                                            game.textContent = "You Win!"
                                            game.style.cssText = "color: #0f0;"
                                        }
                                    });
                                }
                                else if(word_pos > 142 && word_pos < 145 ){
                                    clu.textContent = "The word is a noun."+"The word is a name of vegetable. "+"The word have "+word.length+" letters. "+"The vegetable is white. "
                                    img.src = "../images/Screenshot__210_-removebg-preview.png"
                                    tick.addEventListener(("click"), function() {
                                        if(input.value.toLowerCase() !== word){
                                            clu.textContent = "The word is a noun."+"The word is a name of vegetable. "+"The word have "+word.length+" letters. "+"The vegetable is white. "+"The first letter of the word is "+word[0]+" . "
                                            img.src = "../images/Screenshot__211_-removebg-preview.png"
                                            tick.addEventListener(("click"), function() {
                                                if(input.value.toLowerCase() !== word){
                                                    clu.textContent = "The word is a noun."+"The word is a name of vegetable. "+"The word have "+word.length+" letters. "+"The vegetable is white. "+"The first letter of the word is "+word[0]+" . "+"The last letter of the word is "+word[word.length]+" . "
                                                    img.src = "../images/Screenshot__212_-removebg-preview.png"
                                                    tick.addEventListener(("click"), function() {
                                                        if(input.value.toLowerCase() !== word) {
                                                            game.textContent = "You Lose!"
                                                            game.style.cssText = "color: #f00;"
                                                            result.textContent = "You think the word is "+input.value+" But the word is "+word+" 😁."
                                                            result.style.cssText = "color: cyan;"
                                                            img.src = "../images/Screenshot__213_-removebg-preview.png"
                                                        }else {
                                                            game.textContent = "You Win!"
                                                            game.style.cssText = "color: #0f0;"
                                                        }
                                                    })
                                                }else {
                                                    game.textContent = "You Win!"
                                                    game.style.cssText = "color: #0f0;"
                                                }
                                            });
                                        }else {
                                            game.textContent = "You Win!"
                                            game.style.cssText = "color: #0f0;"
                                        }
                                    });
                                }
                            }else {
                                game.textContent = "You Win!"
                                game.style.cssText = "color: #0f0;"
                            }
                        });
                    }else {
                        game.textContent = "You Win!"
                        game.style.cssText = "color: #0f0;"
                    }
                });
            }
            if(word_pos > 144 && word_pos < 165) {
                clu.textContent = "The word is a noun."+"The word is a name of country. "
                img.src = "../images/Screenshot__208_-removebg-preview.png"
                tick.addEventListener(("click"), function() {
                    if(input.value.toLowerCase() !== word){
                        clu.textContent = "The word is a noun."+"The word is a name of country. "+"The word have "+word.length+" letters. "
                        img.src = "../images/Screenshot__209_-removebg-preview.png"
                        tick.addEventListener(("click"), function() {
                            if(input.value.toLowerCase() !== word){
                                if(word_pos > 144 && word_pos < 155){
                                    clu.textContent = "The word is a noun."+"The word is a name of country. "+"The word have "+word.length+" letters. "+"The country is large. "
                                    img.src = "../images/Screenshot__210_-removebg-preview.png"
                                    tick.addEventListener(("click"), function() {
                                        if(input.value.toLowerCase() !== word){
                                            clu.textContent = "The word is a noun."+"The word is a name of country. "+"The word have "+word.length+" letters. "+"The country is large. "+"The first letter of the word is "+word[0]+" . "
                                            img.src = "../images/Screenshot__211_-removebg-preview.png"
                                            tick.addEventListener(("click"), function() {
                                                if(input.value.toLowerCase() !== word){
                                                    clu.textContent = "The word is a noun."+"The word is a name of country. "+"The word have "+word.length+" letters. "+"The country is large. "+"The first letter of the word is "+word[0]+" . "+"The last letter of the word is "+word[word.length]+" . "
                                                    img.src = "../images/Screenshot__212_-removebg-preview.png"
                                                    tick.addEventListener(("click"), function() {
                                                        if(input.value.toLowerCase() !== word) {
                                                            game.textContent = "You Lose!"
                                                            game.style.cssText = "color: #f00;"
                                                            result.textContent = "You think the word is "+input.value+" But the word is "+word+" 😁."
                                                            result.style.cssText = "color: cyan;"
                                                            img.src = "../images/Screenshot__213_-removebg-preview.png"
                                                        }else {
                                                            game.textContent = "You Win!"
                                                            game.style.cssText = "color: #0f0;"
                                                        }
                                                    });
                                                }else {
                                                    game.textContent = "You Win!"
                                                    game.style.cssText = "color: #0f0;"
                                                }
                                            });
                                        }else {
                                            game.textContent = "You Win!"
                                            game.style.cssText = "color: #0f0;"
                                        }
                                    });
                                }
                                else if(word_pos > 154 && word_pos < 165 ){
                                    clu.textContent = "The word is a noun."+"The word is a name of country. "+"The word have "+word.length+" letters. "+"The country is small. "
                                    img.src = "../images/Screenshot__210_-removebg-preview.png"
                                    tick.addEventListener(("click"), function() {
                                        if(input.value.toLowerCase() !== word){
                                            clu.textContent = "The word is a noun."+"The word is a name of country. "+"The word have "+word.length+" letters. "+"The country is small. "+"The first letter of the word is "+word[0]+" . "
                                            img.src = "../images/Screenshot__211_-removebg-preview.png"
                                            tick.addEventListener(("click"), function() {
                                                if(input.value.toLowerCase() !== word){
                                                    clu.textContent = "The word is a noun."+"The word is a name of country. "+"The word have "+word.length+" letters. "+"The country is small. "+"The first letter of the word is "+word[0]+" . "+"The last letter of the word is "+word[word.length]+" . "
                                                    img.src = "../images/Screenshot__212_-removebg-preview.png"
                                                    tick.addEventListener(("click"), function() {
                                                        if(input.value.toLowerCase() !== word) {
                                                            game.textContent = "You Lose!"
                                                            game.style.cssText = "color: #f00;"
                                                            result.textContent = "You think the word is "+input.value+" But the word is "+word+" 😁."
                                                            result.style.cssText = "color: cyan;"
                                                            img.src = "../images/Screenshot__213_-removebg-preview.png"
                                                        }else {
                                                            game.textContent = "You Win!"
                                                            game.style.cssText = "color: #0f0;"
                                                        }
                                                    })
                                                }else {
                                                    game.textContent = "You Win!"
                                                    game.style.cssText = "color: #0f0;"
                                                }
                                            });
                                        }else {
                                            game.textContent = "You Win!"
                                            game.style.cssText = "color: #0f0;"
                                        }
                                    });
                                }
                            }else {
                                game.textContent = "You Win!"
                                game.style.cssText = "color: #0f0;"
                            }
                        });
                    }else {
                        game.textContent = "You Win!"
                        game.style.cssText = "color: #0f0;"
                    }
                });
            }
        }else {
            game.textContent = "You Win!"
            game.style.cssText = "color: #0f0;"
        }
    });
}
});