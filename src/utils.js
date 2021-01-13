const COMMAND_SIGNS = [ "!", "?" ]

module.exports.isCommand = text => {
    for(const commandSign of COMMAND_SIGNS) {
        if (text.startsWith(commandSign) && text.length > 3)
            return true;
    }
    return false;
};