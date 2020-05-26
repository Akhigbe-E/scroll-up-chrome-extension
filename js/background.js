// chrome.runtime.onInstalled.addListener(() => {
// var old_ver = (chrome.storage.sync.get(['version'], function (result) { return result.version }) || "").split(".");
// var new_ver = (chrome.extension.getVersion() + "").split(".");
// console.log(chrome.extension.getVersion())
// if (old_ver[0] + '.' + old_ver[1] + '.' + old_ver[2] != new_ver[0] + '.' + new_ver[1] + '.' + new_ver[2]) {
//     chrome.tabs.query({}, function (tabs) {
//         // for (var i = 0, tab; tab = tabs[i]; i++) {
//         //     var str = tab.url;
//         //     if (str.match('http://github.com/')) {
//         //         chrome.tabs.update(tab.id, { selected: true });
//         //         return;
//         //     }
//         // }
//         chrome.tabs.create({ url: 'https://www.github.com/' });
//     });
//     chrome.storage.sync.set({ version: chrome.extension.getVersion() }, function () {
//         // console.log('Value is set to ' + version);
//     });
// }

// chrome.declarativeContent.onPageChanged.removeRules(undefined, function () {
//     chrome.declarativeContent.onPageChanged.addRules([{
//         conditions: [new chrome.declarativeContent.PageStateMatcher({
//             pageUrl: { hostEquals: 'www.twitter.com' },
//         })
//         ],
//         actions: [new chrome.declarativeContent.ShowPageAction()]
//     }]);
// });
// });


chrome.extension.getVersion = () => {
    if (!chrome.extension.version_) {
        var xhr = new XMLHttpRequest();
        xhr.open("GET", chrome.extension.getURL('manifest.json'), true);
        xhr.onreadystatechange = () => {
            if (this.readyState == 4) {
                var manifest = JSON.parse(this.responseText);
                chrome.extension.version_ = manifest.version;
            }
        };
        xhr.send();
    }
    return chrome.extension.version_;
};
