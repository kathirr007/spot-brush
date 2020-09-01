//This file is only for saving the whiteboard. (Not to a file, only to RAM atm. Whiteboard is gone after server restart)

var savedBoards = {};
var savedUndos = {};
module.exports = {
    handleEventsAndData: function (content) {
        var tool = content["t"]; //Tool witch is used
        var wid = content["wid"]; //whiteboard ID
        var username = content["username"];
        if (tool === "clear") {
            //Clear the whiteboard
            delete savedBoards[wid];
            delete savedUndos[wid];
        } else if (tool === "undo") {
            //Undo an action
            if (!savedUndos[wid]) {
                savedUndos[wid] = [];
            }
            if (savedBoards[wid]) {
                for (var i = savedBoards[wid].length - 1; i >= 0; i--) {
                    if (savedBoards[wid][i]["username"] == username) {
                        var drawId = savedBoards[wid][i]["drawId"];
                        for (var i = savedBoards[wid].length - 1; i >= 0; i--) {
                            if (
                                savedBoards[wid][i]["drawId"] == drawId &&
                                savedBoards[wid][i]["username"] == username
                            ) {
                                savedUndos[wid].push(savedBoards[wid][i]);
                                savedBoards[wid].splice(i, 1);
                            }
                        }
                        break;
                    }
                }
                if (savedUndos[wid].length > 1000) {
                    savedUndos[wid].splice(0, savedUndos[wid].length - 1000);
                }
            }
        } else if (tool === "redo") {
            if (!savedUndos[wid]) {
                savedUndos[wid] = [];
            }
            if (!savedBoards[wid]) {
                savedBoards[wid] = [];
            }
            for (var i = savedUndos[wid].length - 1; i >= 0; i--) {
                if (savedUndos[wid][i]["username"] == username) {
                    var drawId = savedUndos[wid][i]["drawId"];
                    for (var i = savedUndos[wid].length - 1; i >= 0; i--) {
                        if (
                            savedUndos[wid][i]["drawId"] == drawId &&
                            savedUndos[wid][i]["username"] == username
                        ) {
                            savedBoards[wid].push(savedUndos[wid][i]);
                            savedUndos[wid].splice(i, 1);
                        }
                    }
                    break;
                }
            }
        } else if (
            [
                "line",
                "pen",
                "rect",
                "circle",
                "eraser",
                "addImgBG",
                "recSelect",
                "eraseRec",
                "addTextBox",
                "setTextboxText",
                "removeTextbox",
                "setTextboxPosition",
                "setTextboxFontSize",
                "setTextboxFontColor",
            ].includes(tool)
        ) {
            //Save all this actions
            if (!savedBoards[wid]) {
                savedBoards[wid] = [];
            }
            delete content["wid"]; //Delete id from content so we don't store it twice
            if (tool === "setTextboxText") {
                for (var i = savedBoards[wid].length - 1; i >= 0; i--) {
                    //Remove old textbox tex -> dont store it twice
                    if (
                        savedBoards[wid][i]["t"] === "setTextboxText" &&
                        savedBoards[wid][i]["d"][0] === content["d"][0]
                    ) {
                        savedBoards[wid].splice(i, 1);
                    }
                }
            }
            savedBoards[wid].push(content);
        }
    },
    loadStoredData: function (wid) {
        //Load saved whiteboard
        return savedBoards[wid] ? savedBoards[wid] : [];
    },
};
