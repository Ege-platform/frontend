export function getStrokeColor(category: string) {
    let strokeColor = "#fff";
    if (category === "punctuation") {
        strokeColor = "#FAB02D";
    } else if (category === "norm") {
        strokeColor = "#7CB518";
    } else if (category === "orthography") {
        strokeColor = "#F96108";
    } else if (category === "text") {
        strokeColor = "#605DE3";
    }
    return strokeColor;
}
