(() => {
  "use strict";
  function escapeStringRegexp(string) {
    if ("string" != typeof string) throw new TypeError("Expected a string");
    return string.replace(/[|\\{}()[\]^$+*?.]/g, "\\$&").replace(/-/g, "\\x2d");
  }
  const editor = document.querySelector(".CodeMirror").CodeMirror;
  editor.on("swapDoc", (() => setTimeout(addWidget, 1)));
  editor.on("changes", ((_, [firstChange]) => {
    if ("undo" === firstChange.origin && firstChange.text[0].startsWith("<<<<<<<")) {
      addWidget();
      editor.setCursor(editor.getCursor());
    }
  }));
  function appendLineInfo(lineHandle, text) {
    if (!lineHandle.text.includes(text)) {
      const line = lineHandle.lineNo();
      editor.replaceRange(text, {
        line,
        ch: Number.POSITIVE_INFINITY
      });
      editor.clearHistory();
    }
  }
  function addWidget() {
    editor.eachLine((lineHandle => {
      if (!(Array.isArray(lineHandle.widgets) && lineHandle.widgets.length > 0)) if (lineHandle.text.startsWith("<<<<<<<")) {
        appendLineInfo(lineHandle, " -- Incoming Change");
        const line = lineHandle.lineNo();
        editor.addLineClass(line, "", "rgh-resolve-conflicts");
        editor.addLineWidget(line, function() {
          const widget = document.createElement("div");
          widget.style.fontWeight = "bold";
          widget.append(createButton("Current"), " | ", createButton("Incoming"), " | ", createButton("Both", "Accept Both Changes"));
          return widget;
        }(), {
          above: !0,
          noHScroll: !0
        });
      } else if (lineHandle.text.startsWith(">>>>>>>")) appendLineInfo(lineHandle, " -- Current Change");
    }));
  }
  function createButton(branch, title = `Accept ${branch} Change`) {
    const link = document.createElement("button");
    link.type = "button";
    link.className = "btn-link";
    link.textContent = title;
    link.addEventListener("click", (({target}) => {
      !function(branch, line) {
        let inDeletableSection = !1;
        const linesToRemove = [];
        editor.eachLine(line, Number.POSITIVE_INFINITY, (lineHandle => {
          const currentLine = lineHandle.text;
          if (incomingChange.test(currentLine)) inDeletableSection = "Current" === branch; else if ("=======" === currentLine) inDeletableSection = "Incoming" === branch;
          if (inDeletableSection || anyMarker.test(currentLine)) linesToRemove.push(lineHandle.lineNo());
          return currentChange.test(currentLine);
        }));
        const ranges = linesToRemove.map((line2 => ({
          anchor: {
            line: line2,
            ch: 0
          },
          head: {
            line: line2,
            ch: 0
          }
        })));
        editor.setSelections(ranges);
        editor.execCommand("deleteLine");
        editor.setCursor(linesToRemove[0]);
      }(branch, (lineChild = target, Number(lineChild.closest(".CodeMirror-gutter-wrapper, .CodeMirror-linewidget").parentElement.querySelector(".CodeMirror-linenumber").textContent) - 1));
      var lineChild;
    }));
    return link;
  }
  const currentChange = /^>>>>>>> .+ -- Current Change$/, incomingChange = /^<<<<<<< .+ -- Incoming Change$/, anyMarker = function(...expressions) {
    const flags = [], source = [];
    for (const part of expressions) if (part instanceof RegExp) {
      source.push(part.source);
      flags.push(...part.flags);
    } else source.push(escapeStringRegexp(part));
    return new RegExp(source.join(""), [ ...new Set(flags) ].join(""));
  }(currentChange, /|/, incomingChange, /|^=======$/);
})();