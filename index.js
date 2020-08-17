/**  
 *  @module hwe-react-deps
 *  return a promise object that resolves when the scripts load into the window
 *  updating packages can happen here directly now
 *  update project using 'npm update hwe-react-deps'
 */
module.exports = () => {
  if (!navigator.onLine) { alert('Navigator offline. Check internet connection'); throw 'HTTP Status 503: Service Unavailable'}
  return new Promise((resolve) => {
    const res = () => { resolve('success'); }
    if (!window.dojoFlag) {
      window.dojoFlag = true;
      var s = document.createElement("script");
      s.setAttribute("src","http://ajax.googleapis.com/ajax/libs/dojo/1.10.4/dojo/dojo.js");
      s.onload = () => {
        require('./src/pako/pako.js');
        require('./src/JSDraw/Scilligence.JSDraw2.Lite-uncompressed.js'); // line 26950 breaks app, its commented out here
        require('./src/JSDraw/Pistoia.HELM.js');
        require('./src/JSDraw/Scilligence.JSDraw2.Resources.js');        
        scil.ready(() => { res(); });
      }
      document.head.appendChild(s);
    } else { // skip dependencies
      if (window.scil) { // dependencies are loaded
        res();
      } else { // wait for dependencies to load
        let interval = setInterval(() => {
          if (window.scil) {
            clearInterval(interval);
            res();
          }
        }, 100);
      }
    }
  });
}