const team = [];

const devs = [
    {name: "john", stack: "frontend"},
    {name: "paul", stack: "backend"},
    {name: "anne", stack: "qa"},
    {name: "dwight", stack: "uxui"}
];

function findDev(stack){
    const data = devs.find(x => x.stack == stack);
    return data;
}

const querys = {
    qa: findDev("qa"),
    backend: findDev("backend"),
    frontend: findDev("frontend"),
    uxui: findDev("uxui")
}

function assignTeam(dev){
    team.push(dev);
    console.log(`welcome to the team ${dev.name} our new ${dev.stack}`);
}

function checkTeam(stack){
    console.log(stack);
    const data = team.find(x => x.stack === stack.stack);
    
    if(!data){
        assignTeam(stack);
    } else {
        console.log(`team already has a ${stack.stack} dev`)
    }    
}

function devsOnTeam (){

    checkTeam(querys.qa);
    checkTeam(querys.backend);
    checkTeam(querys.frontend);
    checkTeam(querys.uxui);
}

if (team.length < 2) {
    devsOnTeam();
} 
//console.log(team);