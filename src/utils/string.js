// Utility module for string operations

export function prettyPrintJSON(jsonLiteral){
    return JSON
        .stringify(jsonLiteral, null, "\t")
        .replaceAll(
            "],\n\t\"", 
            "],\n\n\t\""
        );
}