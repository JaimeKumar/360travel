const inputs = document.getElementsByTagName("input");
const output = document.getElementById("output");
const copyButton = document.getElementById('copy');

function inputChange() {
    var outputString = "FBU";
    for (var i = 0; i < inputs.length; i++) {
        if (inputs[i].value == "") continue;
        
        outputString += inputs[i].id.toUpperCase() + "/" + inputs[i].value.toUpperCase() + "+" + "+";
    }
    if (outputString.endsWith("++")) outputString = outputString.slice(0, -2);
    output.innerHTML = outputString;

    copyButton.style.visibility = "visible"
    copyButton.innerHTML = "COPY"
    copyButton.style.backgroundColor = '#748da3';
}

function copyOutput() {
    const range = document.createRange();
    range.selectNode(output);
    window.getSelection().removeAllRanges();
    window.getSelection().addRange(range);
    document.execCommand("copy");
    window.getSelection().removeAllRanges();

    copyButton.innerHTML = "COPIED"
    copyButton.style.backgroundColor = '#ccc';
}

function openTab(evt, tabName) {
    var i, tabContent, tabLinks;
    tabContent = document.getElementsByClassName("tab-content");
    for (i = 0; i < tabContent.length; i++) {
      tabContent[i].style.display = "none";
    }
    tabLinks = document.getElementsByClassName("tab");
    for (i = 0; i < tabLinks.length; i++) {
      tabLinks[i].className = tabLinks[i].className.replace(" active", "");
    }
    document.getElementById(tabName).style.display = "block";
    evt.currentTarget.className += " active";
  }