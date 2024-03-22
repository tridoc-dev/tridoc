<template>
    <iframe :src="pdfurl" width="100%" height="100%"></iframe>
</template>

<script>
export default {
    name: "PDF",
    data() {
        return {
            pdfurl: "",
        };
    },
    mounted() {
        const fileUrl = "pdfjs/web/viewer.html?file=" + "/example-pdf.pdf";
        this.pdfurl = fileUrl;
    },
};
</script>

