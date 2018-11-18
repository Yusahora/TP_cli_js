#!/usr/bin/env node

//import des modules
var program = require('commander');
var inquirer = require('inquirer');
var fs = require('fs-extra');
const sqlite3 = require('sqlite3').verbose();

//création des variables
var now = new Date();
var date = now.getDate()+"_"+now.getMonth()+"_"+now.getFullYear();

//création des options avec le mocule commander
program
  .version('0.1.0')
  .option('-d, --date', 'add date D/m/y at the end of the filename')
  .option('-c, --current', 'save the curent directory in a backup directory');

program.on('--help', function(){
  console.log('')
  console.log('Examples:');
  console.log('  $ custom-help --help');
  console.log('  $ custom-help -h');
});

program.parse(process.argv);


function test1() {
//demande des inputs utilisateurs avec inquierer
if(program.current){
  fs.copy(__dirname, 'Documents/backup')
  .then(() => console.log('success!'))
  .catch(err => console.error(err))
  
} else {
  inquirer.prompt([
    {
    type: 'input',
    message: 'Entrez le chemin du dossier à sauvegarder',
    name: 'folderToSave'
    }, {
    type: 'input',
    message: 'Entrez le chemin de destination de la sauvegarde',
    name: 'destinationFolder'
    }
    ]).then((answers) => {
    //traitement des réponses
    destinationFolder = answers.destinationFolder
    folderToSave = answers.folderToSave 
    destinationFolder1 = destinationFolder +"_"+ date
    //fait la copie différement selon les options
    if (program.date){
      fs.copy(folderToSave, destinationFolder1)
    .then(() => console.log('success!'))
    .catch(err => console.error(err))
    }
    else{
      fs.copy(folderToSave, destinationFolder)
    .then(() => console.log('success!'))
    .catch(err => console.error(err))
    }
    })
}
}


test1()
