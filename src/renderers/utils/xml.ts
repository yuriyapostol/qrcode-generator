export const escapeXml = function(s : string) {
  let escaped = '';
  for (let i = 0; i < s.length; i += 1) {
    const c = s.charAt(i);
    switch(c) {
    case '<': escaped += '&lt;'; break;
    case '>': escaped += '&gt;'; break;
    case '&': escaped += '&amp;'; break;
    case '"': escaped += '&quot;'; break;
    default : escaped += c; break;
    }
  }
  return escaped;
};
