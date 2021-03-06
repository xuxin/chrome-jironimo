Jironimo
===============
Atlassian JIRA&trade; Agile extension for Chrome

## Chrome Web Store
[jironimo at google play](https://chrome.google.com/webstore/detail/jironimo/bplmocfiilcboedgegkcndbngiicdihl)

## Default hotkeys
Windows: `Alt + J`
Mac: `Command + J`

### Contribution
* [Help with translations](https://www.transifex.com/projects/p/chrome-jironimo/)
* Help by coding: fork the repo; do your stuff; create a new Pull Request.

### Hot to use it?
[Please, check the documentation project](http://chrome-jironimo.readthedocs.org/) (`docs` branch)
*I have no time for it right now, PR?*

### Repository clone
```
git clone --recursive https://github.com/kkamkou/chrome-jironimo.git
cd chrome-jironimo
```

### Use the source code
- Navigate to `chrome://extensions`
- Expand the developer dropdown menu and click `Load Unpacked Extension`
- Navigate to local folder `/src`

### Build
```bash
npm install && ./node_modules/.bin/jake version='4.0'
# example for windows
# npm install && C:\...\chrome-jironimo\node_modules\.bin\jake version='4.0'
```

### Docker
```bash
[sudo] docker build -t jironimo .
[sudo] docker run -ti --rm -v "${PWD}:/opt/app" jironimo version='4.0'
```

### License
**Boost Software License 1.0 (BSL-1.0)**

Permission is hereby granted, free of charge, to any person or organization obtaining a copy of the software and accompanying documentation covered by this license (the "Software") to use, reproduce, display, distribute, execute, and transmit the Software, and to prepare derivative works of the Software, and to permit third-parties to whom the Software is furnished to do so, all subject to the following:

The copyright notices in the Software and this entire statement, including the above license grant, this restriction and the following disclaimer, must be included in all copies of the Software, in whole or in part, and all derivative works of the Software, unless such copies or derivative works are solely in the form of machine-executable object code generated by a source language processor.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, TITLE AND NON-INFRINGEMENT. IN NO EVENT SHALL THE COPYRIGHT HOLDERS OR ANYONE DISTRIBUTING THE SOFTWARE BE LIABLE FOR ANY DAMAGES OR OTHER LIABILITY, WHETHER IN CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
