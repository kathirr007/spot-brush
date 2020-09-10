import ConfigService from "./ConfigService";

/**
 * Class the handle the read-only logic
 */
class ReadOnlyService {
    /**
     * @type {boolean}
     */
    #readOnlyActive = true;
    get readOnlyActive() {
        return this.#readOnlyActive;
    }

    /**
     * @type {object}
     */
    #previousToolHtmlElem = null;
    get previousToolHtmlElem() {
        return this.#previousToolHtmlElem;
    }

    /**
     * Activate read-only mode
     */
    activateReadOnlyMode($self) {
        // debugger
        this.#readOnlyActive = true;
        // this.#previousToolHtmlElem = $(".whiteboard-tool.active");
        $self.readOnlyActive = true
        $self.previousToolHtmlElem = document.querySelector(".whiteboard-tool.active");
        document.querySelector(".whiteboard-tool[tool=mouse]").click();
        $self.disableTool = true

        // switch to mouse tool to prevent the use of the
        // other tools
        // $(".whiteboard-tool[tool=mouse]").click();
        // $(".whiteboard-tool").prop("disabled", true);
        // $(".whiteboard-edit-group > button").prop("disabled", true);
        // $(".whiteboard-edit-group").addClass("group-disabled");
        // $("#whiteboardUnlockBtn").hide();
        // $("#whiteboardLockBtn").show();
    }

    /**
     * Deactivate read-only mode
     */
    deactivateReadOnlyMode($self) {
        // debugger
        if (ConfigService.isReadOnly) return;

        this.#readOnlyActive = false;

        // $(".whiteboard-tool").prop("disabled", false);
        // $(".whiteboard-edit-group > button").prop("disabled", false);
        // $(".whiteboard-edit-group").removeClass("group-disabled");
        // $("#whiteboardUnlockBtn").show();
        // $("#whiteboardLockBtn").hide();

        // restore previously selected tool
        // const { previousToolHtmlElem } = this;
        // if (previousToolHtmlElem) previousToolHtmlElem.click();

        if (ConfigService.isReadOnly) return;

        $self.readOnlyActive = false;
        $self.disableTool = false

        /* $(".whiteboard-tool").prop("disabled", false);
        $(".whiteboard-edit-group > button").prop("disabled", false);
        $(".whiteboard-edit-group").removeClass("group-disabled");
        $("#whiteboardUnlockBtn").show();
        $("#whiteboardLockBtn").hide(); */

        // restore previously selected tool
        const { previousToolHtmlElem } = $self;
        if (previousToolHtmlElem) previousToolHtmlElem.click();
    }
}

export default new ReadOnlyService();
