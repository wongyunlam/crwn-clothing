module.exports = {
    printWidth: 80, // 單行長度
    tabWidth: 4, // 縮進長度
    useTabs: false, // 使用空格代替 tab 縮進
    semi: false, // 句末使用分號
    singleQuote: true, // 使用單引號
    quoteProps: 'as-needed', // 僅在必需時為物件的 key 添加引號
    jsxSingleQuote: true, // jsx 中使用單引號
    trailingComma: 'es5', // es5 標準中儘可能使用尾隨逗號
    bracketSpacing: true, // 在物件前後添加空格，例如：{ foo: bar }
    jsxBracketSameLine: true, // 多屬性 HTML 標籤的 ‘>’ 折行放置
    arrowParens: 'avoid', // 單參數箭頭函數參數周圍使用圓括號，例如：(x) => x
    requirePragma: false, // 無需頂部註釋即可格式化
    insertPragma: false, // 在已被 Prettier 格式化的文件頂部加上標註
    proseWrap: 'preserve', // 不修改 Markdown 文本的換行格式
    htmlWhitespaceSensitivity: 'css', // 根據 CSS 的 display 屬性來決定是否敏感
    endOfLine: 'lf', // 結束行形式
    embeddedLanguageFormatting: 'auto', // 對引用代碼進行格式化
    // overrides: [
    //     {
    //         files: '*.json',
    //         options: {
    // tabWidth: 2,
    //         },
    //     },
    // ],
}
