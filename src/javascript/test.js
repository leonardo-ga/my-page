
const sudoku_site = document.getElementById('sudoku_site');

function access() {
    var innerDoc = sudoku_site.contentDocument || sudoku_site.contentWindow.document;
    innerDoc.body.style.background = "red"; // ✅ works
};