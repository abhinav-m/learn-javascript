window.Babel.transform("import cube from './export.js'", { presets: 'es2015' }).code

window.onload = () => document.getElementById('result').innerHTML = cube(3);