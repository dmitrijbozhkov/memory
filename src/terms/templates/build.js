var hs = require("handlebars");
var fs = require("fs");

// Paths to folders
var inPath = `./src/terms/templates/`;
var outPath = `./app/terms/templates/`;
var clientPath = `./app/terms/client/`;

// links in templates
var scripts = `<script src="https://code.jquery.com/jquery-3.2.1.slim.min.js" integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN" crossorigin="anonymous"></script>
`;
var head = `<title>Термины</title>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bulma/0.6.1/css/bulma.min.css" crossorigin="anonymous">
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css">
`;

function readTemplate(name) {
    return fs.readFileSync(inPath + name, "utf8");
}

function readCode(path) {
    var contents = "";
    fs.readdirSync(clientPath + path).forEach((name) => {
        contents += fs.readFileSync(clientPath + path + name, "utf8");
    });
    return contents;
}

// Read templates
var nav = readTemplate("navbar.hbs");
var main = readTemplate("main.hbs");
var dictionaries = readTemplate("dictionaries.hbs");
var learn = readTemplate("learn.hbs");
var statistics = readTemplate("statistics.hbs");

// Register partials
hs.registerPartial("navbar", nav);
hs.registerPartial("head", head);
hs.registerPartial("scripts", scripts);

// Get code
var mainCode = readCode("main/");
var dictCode = readCode("dict/");
var statCode = readCode("stat/");
var learnCode = readCode("learn/");

// Compile templates
var compMain = hs.compile(main)({ code: learnCode + dictCode + statCode + mainCode });
var compDictionaries = hs.compile(dictionaries)();
var compLearn = hs.compile(learn)();
var compStat = hs.compile(statistics)();

// Write results
fs.writeFileSync(outPath + "main.html", compMain);
fs.writeFileSync(outPath + "dictionaries.html", compDictionaries);
fs.writeFileSync(outPath + "learn.html", compLearn);
fs.writeFileSync(outPath + "statistics.html", compStat);