/**  
 *  @module hwe-react-deps
 *  return a promise object that resolves when the scripts load into the window
 *  updating packages can happen here directly now
 *  update project using 'npm update hwe-react-deps'
 */
module.exports = () => {
  return new Promise((resolve, reject) => {
    var postscribe = require('postscribe');
    require('./src/pako/pako.js');
    postscribe(document.body, '<script language="javascript" src="http://ajax.googleapis.com/ajax/libs/dojo/1.10.4/dojo/dojo.js"></script>', {
      done: () => {
        require('./src/JSDraw/Scilligence.JSDraw2.Lite-uncompressed.js'); // line 26950 breaks app, its commented out here
        require('./src/JSDraw/Pistoia.HELM.js');
        require('./src/JSDraw/Scilligence.JSDraw2.Resources.js');
        resolve('success');
      },
      error: (error) => {
        reject(error);
      }
    });
  });
}