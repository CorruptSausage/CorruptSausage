module.exports = {
    commands: ['add', 'addition'],
    expectedArgs: '<num1> <num2>',
    permissionError: "You don't have access to this command.",
    minArgs: 2,
    maxArgs: 2,
    callback: (message, arguments, text) => {

    },
    permissions: 'ADMINISTRATOR',
    requiredRoles: [],
}