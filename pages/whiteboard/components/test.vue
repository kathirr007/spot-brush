<template>
    <div class="stickyNote" :style="noteStyles">
        <div class="note moveNote">
            <div class="note_cnt">
                <textarea class="test" placeholder="Enter note title" :style="testTextArea"></textarea>
            </div>
        </div>
        <div title="remove stickynote" class="removeIcon" style="position:absolute; cursor:pointer; top:-5px; right:-5px;"><i class="v-icon notranslate mdi mdi-close theme--light text-body-1 grey--text text--darken-1"></i></div>
    </div>
</template>

<script>
    export default {
        props: {
            fontsize: {
                type: Number
            },
            textcolor: {
                type: String
            }
        },
        computed: {
            noteStyles() {
                return {
                    fontFamily: Monospace,
                    cursor: text
                }
            },
            testTextArea() {
                return {
                    outline: none,
                    fontSize: `${this.fontsize*.8}em`,
                    color: `${this.textcolor}`
                }
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>
