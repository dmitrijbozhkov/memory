var hs = require("handlebars");
var fs = require("fs");

// Paths to folders
var inPath = `./src/terms/templates/`;
var outPath = `./app/terms/templates/`;
var clientPath = `./app/terms/client/`;

// links in templates
var scripts = `<script src="https://code.jquery.com/jquery-3.2.1.slim.min.js" integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN" crossorigin="anonymous"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.3/umd/popper.min.js" integrity="sha384-vFJXuSJphROIrBnz7yo7oB41mKfc8JzQZiCq4NCceLEaO4IHwicKwpJf9c9IpFgh" crossorigin="anonymous"></script>
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta.2/js/bootstrap.min.js" integrity="sha384-alpBpkh1PFOepccYVYDB4do5UnbKysX5WZXm3XxPqe5iKTfUKjNkCk9SaVuEZflJ" crossorigin="anonymous"></script>
`;
var head = `<title>Термины</title>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta.2/css/bootstrap.min.css" integrity="sha384-PsH8R72JQ3SOdhVi3uxftmaW6Vc51MKb0q5P2rRUpPvrszuE4W1povHYgTpBfshb" crossorigin="anonymous">
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
var languages = readTemplate("languages.hbs");
var learn = readTemplate("learn.hbs");

// Register partials
hs.registerPartial("navbar", nav);
hs.registerPartial("head", head);
hs.registerPartial("scripts", scripts);

// Get code
var mainCode = readCode("main/");

// Compile templates
var compMain = hs.compile(main)({ code: mainCode });
var compDictionaries = hs.compile(dictionaries)();
var compLanguages = hs.compile(languages)();
var compLearn = hs.compile(learn)();

// Write results
fs.writeFileSync(outPath + "main.html", compMain);
fs.writeFileSync(outPath + "dictionaries.html", compDictionaries);
fs.writeFileSync(outPath + "languages.html", languages);
fs.writeFileSync(outPath + "learn.html", learn);