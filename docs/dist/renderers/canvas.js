"use strict";const n=require("../core/qrcode.js");n.default.registerRenderer("canvas",function(s,t){t=t||2;const e=this.getModuleCount();for(let r=0;r<e;r+=1)for(let o=0;o<e;o+=1)s.fillStyle=this.isDark(r,o)?"black":"white",s.fillRect(o*t,r*t,t,t)});
//# sourceMappingURL=canvas.js.map
