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

export const categoryColors = {
    punctuation: "#FAB02D",
    norm: "#7CB518",
    orthography: "#F96108",
    text: "#605DE3",
};

export function getFillColor(category: string) {
    let fillColor = "#fff";
    if (category === "punctuation") {
        fillColor = "#FAB02D";
    } else if (category === "norm") {
        fillColor = "#7CB518";
    } else if (category === "orthography") {
        fillColor = "#F96108";
    } else if (category === "text") {
        fillColor = "#605DE3";
    }
    return fillColor;
}
