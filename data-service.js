const e = require("express");
const fs = require("fs");
//const { resolve } = require("path");
var employees = [];
var departments = [];

module.exports.initialize = function(){
    return new Promise((resolve,reject)=>{
        fs.readFile('./data/employees.json',(err,data)=>{
            if(err){
                reject(err);
            }
            employees = JSON.parse(data);
            //resolve();
        });
        fs.readFile('./data/departments.json',(err,data)=>{
            if(err){
                reject(err);
            }
            departments = JSON.parse(data);
        })
        resolve();
    });
}
module.exports.getAllEmployees = function(){
    return new Promise((resolve,reject)=>{
        if(employees.length ==0){
            reject("No employees in the system.");
        }
        resolve(employees);
    })
}
module.exports.getManagers = function(){
    return new Promise((resolve,reject)=>{
        var managers =[];
        for(let i=0;i<employees.length;i++){
            if(employees[i].isManager){
                managers.push(employees[i]);
            }
        }
        if(managers.length==0) reject("No managers in the system.");

        resolve(managers);
    })
}
module.exports.getDepartments = function(){
    return new Promise((resolve,reject)=>{
        if(departments.length==0){
            reject("No departments in the system.")
        }
        resolve(departments);
    })
}