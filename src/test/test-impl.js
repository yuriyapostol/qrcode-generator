import { expect } from "@open-wc/testing";


const limit = 80;
const debug = false;

export const capture = function(varName, s) {
  let code = '';
  const println = function(s) { code += s + '\n'; };
  let line = s;
  println('let ' + varName + ' = \'\';');
  while (line.length > limit) {
    println(varName + ' += \'' + line.substring(0, limit) + '\';');
    line = line.substring(limit);
  }
  if (line.length > 0) {
    println(varName + ' += \'' + line + '\';');
  }
  if (debug) {
    console.log(code);
  }
  return s;
};

export const overview = function(qrcode) {

describe('QRCode', function(){
	it('should exist', function(){
		expect(!!qrcode).to.be.true;
	});

	it('should be a callable function', function(){
		expect(qrcode instanceof Function).to.be.true;
	});

	it('should generate correct GIF image tag', function(){
		var sourceText = 'http://www.example.com/ążśźęćńół';
		var correctImgTag = '<img src="data:image/gif;base64,R0lGODdhSgBKAIAAAAAAAP///ywAAAAASgBKAAAC/4yPqcvtD6OctNqLs968+w+G4kiWZgKk6roa7ZEiccACco1TeE6r9997uXYsna0xmw0VLyXsyHBCpKijk9qEPh1UrrXYAy4Xu3FtLEmCr9pucP3NGofyN9peBZ7DE3W9Tqd15+fDlxZXiPVlltiGqDb3BpnHRzj4uNgnSHkjZCiZGbXpRVrlyQZINopE9Jc5CdtaeCj7asvIWEvimet4oqkYKDZiCSrMWtobmcW8esfki2exN4XY2cj7aZQtehxIGHwR+41dDg3tdogLCm7N+ZTOOom+irqZGk//DF/vqDiv7cEpTMW4CZxVYSC5gghpOTt46dg4PGxE5aNUkeItje3Drm3zh9DewIytPl7LuBCkHiImpbEjaAvlloTm+DVzJXNftZM89lAz5vLiOZs94YysqZNmtZ8/vQiFeJApmKUPu30qU6mhKola1V0t6g2ZxqcaAK4biraE2axW004LyeNs1loGHfIkGY3uVLV7Ge4rSayvu7WAHQIGGMvn4KqqdLGd2S5xKE2lit2dfIlswJVhU/5VSRmoyEbr9NbdKhqkq156l8GJCFQZ0aRWFcOWGtZ2aN2IN3LlvPv149Kg8UZqi5ElP+JvkyXH+ns4MFnR/+0F/vEw6YDQk//6Dj68+PHky5s/jz69+vULCgAAOw==" width="74" height="74"/>';

		var qr = qrcode(-1, 'M');
		qr.addData(unescape(encodeURI(sourceText)));
		qr.make();

		expect(qr.render('gif') ).to.equal(correctImgTag);
	});

	it('should generate correct GIF image data', function(){
		var sourceText = 'http://www.example.com/ążśźęćńół';
		var correctImgData = 'R0lGODdhSgBKAIAAAAAAAP///ywAAAAASgBKAAAC/4yPqcvtD6OctNqLs968+w+G4kiWZgKk6roa7ZEiccACco1TeE6r9997uXYsna0xmw0VLyXsyHBCpKijk9qEPh1UrrXYAy4Xu3FtLEmCr9pucP3NGofyN9peBZ7DE3W9Tqd15+fDlxZXiPVlltiGqDb3BpnHRzj4uNgnSHkjZCiZGbXpRVrlyQZINopE9Jc5CdtaeCj7asvIWEvimet4oqkYKDZiCSrMWtobmcW8esfki2exN4XY2cj7aZQtehxIGHwR+41dDg3tdogLCm7N+ZTOOom+irqZGk//DF/vqDiv7cEpTMW4CZxVYSC5gghpOTt46dg4PGxE5aNUkeItje3Drm3zh9DewIytPl7LuBCkHiImpbEjaAvlloTm+DVzJXNftZM89lAz5vLiOZs94YysqZNmtZ8/vQiFeJApmKUPu30qU6mhKola1V0t6g2ZxqcaAK4biraE2axW004LyeNs1loGHfIkGY3uVLV7Ge4rSayvu7WAHQIGGMvn4KqqdLGd2S5xKE2lit2dfIlswJVhU/5VSRmoyEbr9NbdKhqkq156l8GJCFQZ0aRWFcOWGtZ2aN2IN3LlvPv149Kg8UZqi5ElP+JvkyXH+ns4MFnR/+0F/vEw6YDQk//6Dj68+PHky5s/jz69+vULCgAAOw==';

		var qr = qrcode(-1, 'M');
		qr.addData(unescape(encodeURI(sourceText)));
		qr.make();

		var data = qr.render({ renderer : 'gif', tag : false }).replace('data:image/gif;base64,', '');

		expect(btoa(atob(data) ) ).to.equal(correctImgData);
	});

	it('should generate correct UTF8 text data', function(){
		var sourceText = 'http://www.example.com/ążśźęćńół';
		var correctTextData1 = [
			'█████████████████████████████████',
			'██ ▄▄▄▄▄ █ ▄█▀▄██ ▀▄ ▄██ ▄▄▄▄▄ ██',
			'██ █   █ █▀ █▀▄█▀▀█▄▄ ▄█ █   █ ██',
			'██ █▄▄▄█ ███ ▀ █▄▀▄▄▀ ▀█ █▄▄▄█ ██',
			'██▄▄▄▄▄▄▄█ ▀▄█▄▀▄▀ █▄▀▄█▄▄▄▄▄▄▄██',
			'██▄█  ▀▄▄▄█▄▄█▀█▀▀▄█▀▀▀█ ▀▀▄█▄ ██',
			'██▀▀▄▀▄█▄█  ▄▄█▄ ▄█  ███ ▀█▀▄▄▀██',
			'██ ▄▀█▄▀▄  ▄▀▄ █ ▄▀▀█▀██▀██▄▄▀▀██',
			'██  █▀ ▄▄▀▀ ▀█    █▀▄ ▀█▄▀▄▄▄ ▄██',
			'██▄██ ▄▄▄▄▄█   ▀▄▄ ▀▀▄▄▄█▄▄█▀ ███',
			'██▄█▄██▄▄▄ █ █▄▄▀█▀███▄▀▄▄█▄ ████',
			'███▄▄██▄▄▄ ▀▀▄█ █▀ █ ▄ ▄▄▄   ▀▀██',
			'██ ▄▄▄▄▄ █ █ ▀█▄█ ▀  ▄ █▄█ ▄█ ▀██',
			'██ █   █ █▀▄▄ ▄▀ ▀▄█ █  ▄▄   ▄ ██',
			'██ █▄▄▄█ █▄█▄▀█ ▀ ▀ ██  █ █▀▄▀▄██',
			'██▄▄▄▄▄▄▄█▄▄█▄█▄███▄▄▄▄████▄█▄███',
			'▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀'].join('\n');

		var correctTextData2 = [
			' ▄▄▄▄▄ █ ▄█▀▄██ ▀▄ ▄██ ▄▄▄▄▄ ',
			' █   █ █▀ █▀▄█▀▀█▄▄ ▄█ █   █ ',
			' █▄▄▄█ ███ ▀ █▄▀▄▄▀ ▀█ █▄▄▄█ ',
			'▄▄▄▄▄▄▄█ ▀▄█▄▀▄▀ █▄▀▄█▄▄▄▄▄▄▄',
			'▄█  ▀▄▄▄█▄▄█▀█▀▀▄█▀▀▀█ ▀▀▄█▄ ',
			'▀▀▄▀▄█▄█  ▄▄█▄ ▄█  ███ ▀█▀▄▄▀',
			' ▄▀█▄▀▄  ▄▀▄ █ ▄▀▀█▀██▀██▄▄▀▀',
			'  █▀ ▄▄▀▀ ▀█    █▀▄ ▀█▄▀▄▄▄ ▄',
			'▄██ ▄▄▄▄▄█   ▀▄▄ ▀▀▄▄▄█▄▄█▀ █',
			'▄█▄██▄▄▄ █ █▄▄▀█▀███▄▀▄▄█▄ ██',
			'█▄▄██▄▄▄ ▀▀▄█ █▀ █ ▄ ▄▄▄   ▀▀',
			' ▄▄▄▄▄ █ █ ▀█▄█ ▀  ▄ █▄█ ▄█ ▀',
			' █   █ █▀▄▄ ▄▀ ▀▄█ █  ▄▄   ▄ ',
			' █▄▄▄█ █▄█▄▀█ ▀ ▀ ██  █ █▀▄▀▄',
			'       ▀  ▀ ▀ ▀▀▀    ▀▀▀▀ ▀ ▀'].join('\n');

		var correctTextData3 = [
			'██████████████████████████████████████████████████████████████████',
			'██████████████████████████████████████████████████████████████████',
			'████              ██    ████  ████  ██      ████              ████',
			'████  ██████████  ██  ████  ██████    ██  ██████  ██████████  ████',
			'████  ██      ██  ████  ████  ████████        ██  ██      ██  ████',
			'████  ██      ██  ██    ██  ████    ██████  ████  ██      ██  ████',
			'████  ██      ██  ██████  ██  ██  ██    ██  ████  ██      ██  ████',
			'████  ██████████  ██████      ████  ████      ██  ██████████  ████',
			'████              ██  ██  ██  ██  ██  ██  ██  ██              ████',
			'████████████████████    ██████  ██    ████  ██████████████████████',
			'████  ██    ██      ██    ██████████  ██████████  ████  ██    ████',
			'████████      ██████████████  ██    ████      ██      ██████  ████',
			'████████  ██  ██  ██        ██      ██    ██████  ██████    ██████',
			'████    ██  ████████    ████████  ████    ██████    ██  ████  ████',
			'████    ████  ██        ██    ██    ██████████████████    ████████',
			'████  ██  ████  ██    ██  ██  ██  ██    ██  ████  ████████    ████',
			'████    ████      ████  ████        ████    ████  ██          ████',
			'████    ██    ████        ██        ██  ██    ████  ██████  ██████',
			'████  ████            ██      ██      ████      ██    ████  ██████',
			'██████████  ████████████        ████      ██████████████    ██████',
			'████  ██  ████        ██  ██    ████████████  ██    ██    ████████',
			'████████████████████  ██  ██████  ██  ████████  ████████  ████████',
			'██████    ████        ████  ██  ████  ██                  ████████',
			'████████████████████      ████  ██    ██  ██  ██████          ████',
			'████              ██  ██  ████  ██  ██        ██  ██    ██  ██████',
			'████  ██████████  ██  ██    ██████        ██  ██████  ████    ████',
			'████  ██      ██  ████        ██  ██  ██  ██                  ████',
			'████  ██      ██  ██  ████  ██      ████  ██    ████      ██  ████',
			'████  ██      ██  ██  ██  ████  ██  ██  ████    ██  ████  ██  ████',
			'████  ██████████  ████████  ██          ████    ██  ██  ██  ██████',
			'████              ██    ██  ██  ██████        ████████  ██  ██████',
			'██████████████████████████████████████████████████████████████████',
			'██████████████████████████████████████████████████████████████████',].join('\n');

		var qr = qrcode(-1, 'M');
		qr.addData(unescape(encodeURI(sourceText)));
		qr.make();

		expect(qr.render('ascii') ).to.equal(correctTextData1, 'ASCII QRCode of size 1 is incorrect');
		expect(qr.render('ascii', 1, 0) ).to.equal(correctTextData2, 'ASCII QRCode of size 1 without margin is incorrect');
		expect(qr.render('ascii', 2) ).to.equal(correctTextData3, 'ASCII QRCode of size 2 is incorrect');
	});
});

};

export const sjis = function(qrcode) {
  describe('QRCode', function(){
    it('correct qr', function(){

      let s = '';
      s += 'data:image/gif;base64,R0lGODdhUgBSAIAAAAAAAP///ywAAAAAUgBSAAAC/4yPqcvtD6OctNqLs9';
      s += '68+w+G4kiW5mkC6sqyhsq4ATyvUIvbU56/QKyjyRw8HIUG9CGKv4Ow6XsSoRHkQuosLptWmVXxfTy9XJ';
      s += '2ytuVtz0b0rkyOUrHyNhsepN7w2Hb47ldWJ/g2CJiXVBN4SFfFRyh3BvbY9yjpaOgWqZkw1nKX+dcgyq';
      s += 'jXiahoSsq5N5UJVBm2ujrJVAnqdptrS3vKi6sbTNlzEpc61YtSSzh0ZTbSbJe1Ccs8N3z0LH2IbL2W2m';
      s += 'wh+5xmPYtKfTEuahzuC3lcwZ53Hmt6iV/o7NnN7TyJwZMuXIOiWTol7mCjhVqmgVN1D9PDSwLRIeREJt';
      s += 'm/if8YsbFy2IVexGr8Hjb6piZeQXJiPsVLOW9lOibZqm2iCfKaMYD6lt1sSJBjTH0nN5a0+Y7DwFHmRq';
      s += 'rMorHVu5DpfO5yl0/COm14+l1lmbUl1ZxWjzpKqZUrSoj2sqE9yxInUrM4o0KNC3Rf03KL1DVsB0+uSZ';
      s += 'ca6qJi+PZXBsBDYUYsWdHtXqPEGh8mDBdy4Mce+1YVKzKo5UA7nyYkzesaxb9g/aJWLJq13UQZK3dlGt';
      s += 'Jg4duGP5fjq1qe2qdmyw4bK3ntWKx3S+kuMa/tRuWtlXKWzpO63dQ6nTJ2WfS0rd+4mwK27or45sQQ0T';
      s += 'OduZ5YvtmUz7+0TVK+w7ShJjtXzr/NR+l5RlZ9mHWznULtCfgVc8sk2B9w7M0XnIMtRXiXYEUtV92F73';
      s += 'XkTyIpeLdZiNNBl1p/9XjDIH3cqUiiMCIqQ2ONNt6IY4467shjjz7+CGSQBxQAADs=';

      const qr = qrcode(4, 'L');
      qr.addData('あいう澤', 'Kanji');
      qr.addData('abcあいう①', 'Byte', { encoding : 'SJIS' });
      qr.make();
      expect(capture('s', qr.render({ renderer : 'gif', tag : false }) ) ).to.equal(s);
    });
  });
};

export const utf8 = function(qrcode) {
  describe('QRCode', function(){
    it('correct qr', function(){

      let s = '';
      s += 'data:image/gif;base64,R0lGODdhcgByAIAAAAAAAP///ywAAAAAcgByAAAC/4yPqcvtD6OctNqLs9';
      s += '68+w+G4kiW5omm6sq2bgXE8jwrsVEHty7bAEKjAX+8oZEXDFKSSR+uV0QSj0/mcfe8MoUT7GK35Waj4G';
      s += 'mirIxWoV5n1+wO58blcbypltYb7Qeabfa35uCVRheIl/O3J7FIVPgI2Eelh2hXKUjGNckXqRh5OKfpNt';
      s += 'iZCbnGGOF4GArVeobIWfqpVfuWCnpwewkZpjUkese76gkYrNsruwW8K/ZlrAoxq7knav3qjOrcTElaTG';
      s += 'js2iwsRbndR03tI6eLDfs+Kh/vaPXWDu+un88/r49f4lQ2dnDy0BIX6wW0g+oGGjRXreC6DL8qKSOGzF';
      s += '45ZP/9pBXTuGmZx1xpNmrb5w9DJpLPXJV7eQwix5OlliBkCZMlwZ0ReTIsOM2SzIQ05V0aZwphyWS4uA';
      s += '09F3ObLaBFP92amNHhyjwArwlVRtBXSz94pkKt6BWqN4snTTJIN1aVVGhiDRmNZRer06x31CbNmvahzr';
      s += '3gFnIti0lStqsO18KywEkuYrTPGDd8y9TmxX+Lo4asWzlz1bFBN7tcdrpmYnRUrTYmyxMmaNesMQ9W7b';
      s += 'ZTbK2dQQaOHK036gsCNRALjPPr0LmNlFJtLnluRdOE9foNig2u198ihzMvfPRvT7zCa7f1rhx7+dahkX';
      s += 'JfGg445NAm83LGHXxk0W/Qbxr/3mobW4+t1tlM8wFIFILDFHjYdA0+9xEzENnT0XCYZScURvdISBuD8a';
      s += 'i2G34HmZCbdBJ52J1rA5L4GliEifjgUh9+4OBWGNao3Gz0QdiffTDWM1mOKe5o03f1tfjiQ5ad6BNxDB';
      s += 'pIXmlEzYSgdjxG2A9goi0JYpROeWTdaCsmFh6XT3mZZZLzhbVlfryFeKaVXa5JHphuwgVnTl7mxmZydo';
      s += '1IoIwQdkhZkYoBROWdiSBJKIdXJqrXdu0wWZ2QR/K5J5JQTvpmpWe99ueGgoZzHVs4lnmifuqNqpun5y';
      s += 'XXTZIaxofYpkNSaKp/AQJ6YK37xSgHX+ORKuYGoPE3oa7J/+Jqp5Zhfopnpl02ah60pMF2l1nnqZgge7';
      s += 'flimlfgg1L4LSinXasgOCRG2qToeqYromafbmeesJaK6lkjpHVbrdIXRhcrIzBaCim9DB6aIbo/Tvurv';
      s += 'SG96ObC8764JzYksOeebiie27FZ64KKoph6gmvYlAWHDJrI3daso2atgpkowK3Jx4ryUKMbcwJV6tuQz';
      s += 'c6h7O9DxvmIsDi+unfs3Qp7PB3J9/V1ZMUpXorit/K66q5Ssu5Lc1Aloq11o/WmbHCl/2aaMROw3Dte4';
      s += 'NaKO1ySY8NMNcyKzmpxfht3PDSdu/cZtQ+V42sBxTrjKyZa3ErwuGKJu5ZtJDSHajJNaijJNDggEoeIW';
      s += 'WapzReiZY325TDMyP6a9hxStgcsUdXznXRHjtLuc22C0k74kNzum+A8OUKdrDl7p63mjCHNFjJbCr+n9';
      s += 'kvT/VzdL4W+vHQqTX1e79mqhwkdSDNm33bkTOl+4B3r0zswF0D5zisx8/ru2e0191x+c2j7JuyaY+rPL';
      s += '3hryw4/RVLPutzHvMUgsAEKnCBDGygAx8IwQhKcIIUrKAFL0iCAgAAOw==';

      const qr = qrcode(8, 'L');
      qr.addData('abcあいうĀ👏', 'Byte');
      qr.make();
      expect(capture('s', qr.render({ renderer : 'gif', tag : false }) ) ).to.equal(s);
    });
  });
};

export const misc = function(qrcode) {
  describe('QRCode', function(){
    it('mixed qr', function(){

      let s = '';
      s += 'data:image/gif;base64,R0lGODdhWgBaAIAAAAAAAP///ywAAAAAWgBaAAAC/4yPqcvtD6OctNqLs9';
      s += '68+w+G4kiW5ommHcC2rmu8QDwvLC3TjszXUp8LBG+2Wk/XAL4oRAYx6GwhYUmjr8i8Kp7LKhenTXyrWf';
      s += 'CYe5Z6reBptxlBq9P0MIIqd+PtZOHbOmbW5Xb3J4j0AziniOh3dBDouHjoVyYZGVW3M1l5yTYhh1mkuU';
      s += 'bo2QgBt/UpSGXaqoYqxhe12ahUeAuU25eolGYK3Cn8GxtX/EmcvByMbAIXiQvJqnLMC707LSvieorlKa';
      s += 'o3OMyThd19Xd65CpsOBaqoqr0+206/OkT7EMoXTp6/CeCFYm3AGYuWbU9BCwQlwcKm65FChxXk7ZHIqN';
      s += 'Q/Z//39oW5qC6PRn7S5KWKd/AKulmkMqk0lsheRH0TVxY6p8+STYoiXYoraHJgRnzLggLNONEXNWk+Nw';
      s += 'ZkNk/pzHdEf45cmvPbyXQ31b3iyYlhVl1TxyEUabSPwJoh+6Hkxw4eJbRvqbn7szJtXErNahncNg2hJb';
      s += '7kAJO0yxIrB4EPX5YFiVPvsaQGIdIraXacTsfeeo4q6jWqULKdh34WR7VjzL/1KDb1TBS2NdZ3n1p1Kf';
      s += 'sk3aBs0/bmjAHkwsS3TzsVrQGj1OO4F0lWStk288/CM3hm+zhl2eFih2O/nO1rvufUw7dW/g2jRZgeG8';
      s += 'ZF/77tevKoP9r3C7/83tmp1+Pbb/uUfx90415hgckHnGrWpcSUgY15l2ByKDXjGyePELbYhAbudJRM3p';
      s += 'jzUoMcggVhQ/S5VhmDNFmoImYk5MVihaIIww17v0knoD/NXahgV8X5uKFm7f3CC46mAVnHiRXKclZoNC';
      s += 'I3mlr3gcfjk4Bt9htkYZ2HDGP8GcJafnd1qWN6YPoVn5dMQrWamq2leSaUVno0l30iYpUakmNxGV2Klk';
      s += 'XGnp7dSamMjKDhJKEtJE5X1UaILmgiaEZyN4+A0CUk6VWUfnVlNZ5+Cmqooo5KaqmmnopqqqquGkIBAD';
      s += 's=';

      const qr = qrcode(5, 'L');
      qr.addData('012345', 'Numeric');
      qr.addData('ABC123', 'Alphanumeric');
      qr.addData('漢字', 'Kanji');
      qr.addData('abcあいう', 'Byte', { encoding : 'SJIS' });
      qr.make();
      expect(capture('s', qr.render({ renderer : 'gif', tag : false }) ) ).to.equal(s);
    });

    it('img tag (for coverage)', function(){

      let s = '';
      s += '<img src="data:image/gif;base64,R0lGODdhQQBBAIAAAAAAAP///ywAAAAAQQBBAAAC/4yPqcvt';
      s += 'D6KctLYqD9428B9dmwZyRmkyqYdiZ/iQgNyx83vHNq7zeJ3x6YLBIcwGPBZjROVIqFgVpbDpc6e6Wl2+';
      s += 'bTIX1Tq5WC9FRjuihdSbebJGqtnjL538Dufe27s9sXSXBtdVdwaFiKXY5neoGBfHN5Yosjf3SJnldlkJ';
      s += 'mRjo0AQGMQl4Cdop11K6aLi6+don+BNL+xrJGkvYYzTK+wucGjxM7FlcWTIIKttqObqqfJo7/dwS7cuc';
      s += 'zYnwt6ArjKpqfL2iNy6eqZqsuVZzjes8KGyr1629a87t+D7bHI65zp+0D/X2qXOUxxRBhe4O7kqob2HE';
      s += 'hvbEPBwIrCIehJkYf2n8wuzcMVIbsXXEVIyRwnwoiamMyFLUN1vd5CHSJemiSZ0Ma9HkuDNkS3Yre4A8';
      s += '9I+lyILOOiQtCtMoUKeu7t2LuS0nvKtQw2ltFO8Tq64WbTpctm0rULMBlwrkSe8nvnRgra6Ny+vrW7u+';
      s += 'SPLbS+2pUr91r7gVDI+cwaFuowImcxhn05PGKEo2W3lgIMmTdw5GNzI0sQIAOw==" width="65" hei';
      s += 'ght="65" alt="a&lt;&gt;&quot;&amp;\'\\z"/>';

      const qr = qrcode(1, 'L');
      qr.addData('abc');
      qr.make();
      expect(capture('s', qr.render({
        renderer : 'gif',
        cellSize : 3,
        margin : 1,
        alt : 'a<>"&\'\\z'
      }) ) ).to.equal(s);
    });

    it('gif renderer accepts custom colors via options object', function(){
      const qr = qrcode(1, 'L');
      qr.addData('abc');
      qr.make();

      const data = qr.render({
        renderer : 'gif',
        tag : false,
        cellColor : '#112233',
        backgroundColor : 'rgb(240, 241, 242)'
      }).replace('data:image/gif;base64,', '');

      const binary = atob(data);
      expect(binary.charCodeAt(13) ).to.equal(0x11);
      expect(binary.charCodeAt(14) ).to.equal(0x22);
      expect(binary.charCodeAt(15) ).to.equal(0x33);
      expect(binary.charCodeAt(16) ).to.equal(240);
      expect(binary.charCodeAt(17) ).to.equal(241);
      expect(binary.charCodeAt(18) ).to.equal(242);
    });

    it('gif renderer accepts custom colors as positional args', function(){
      const qr = qrcode(1, 'L');
      qr.addData('abc');
      qr.make();

      const html = qr.render('gif', 3, 1, '#112233', 'rgb(240, 241, 242)');
      const src = html.match(/src="([^"]+)"/)[1];
      const data = src.replace('data:image/gif;base64,', '');

      const binary = atob(data);
      expect(binary.charCodeAt(13) ).to.equal(0x11);
      expect(binary.charCodeAt(14) ).to.equal(0x22);
      expect(binary.charCodeAt(15) ).to.equal(0x33);
      expect(binary.charCodeAt(16) ).to.equal(240);
      expect(binary.charCodeAt(17) ).to.equal(241);
      expect(binary.charCodeAt(18) ).to.equal(242);
    });

    it('png renderer returns PNG data URL by object options', function(){
      const qr = qrcode(1, 'L');
      qr.addData('abc');
      qr.make();

      const dataURL = qr.render({
        renderer : 'png',
        tag : false,
        cellColor : '#112233',
        backgroundColor : 'rgb(240, 241, 242)',
        colors : 2
      });

      expect(dataURL.startsWith('data:image/png;base64,') ).to.be.true;

      const binary = atob(dataURL.replace('data:image/png;base64,', ''));
      expect(binary.charCodeAt(0) ).to.equal(0x89);
      expect(binary.charCodeAt(1) ).to.equal(0x50);
      expect(binary.charCodeAt(2) ).to.equal(0x4e);
      expect(binary.charCodeAt(3) ).to.equal(0x47);
    });

    it('png renderer returns image tag by positional args', function(){
      const qr = qrcode(1, 'L');
      qr.addData('abc');
      qr.make();

      const html = qr.render('png', 3, 1, '#112233', 'rgb(240, 241, 242)');
      const src = html.match(/src="([^"]+)"/)[1];

      expect(html).to.contain('width="65"');
      expect(html).to.contain('height="65"');
      expect(src.startsWith('data:image/png;base64,') ).to.be.true;

      const binary = atob(src.replace('data:image/png;base64,', ''));
      expect(binary.charCodeAt(0) ).to.equal(0x89);
      expect(binary.charCodeAt(1) ).to.equal(0x50);
      expect(binary.charCodeAt(2) ).to.equal(0x4e);
      expect(binary.charCodeAt(3) ).to.equal(0x47);
    });

    it('png renderer keeps transparent background', async function(){
      const qr = qrcode(1, 'L');
      qr.addData('abc');
      qr.make();

      const dataURL = qr.render({
        renderer : 'png',
        tag : false,
        backgroundColor : 'transparent',
        colors : 2
      });

      const image = new Image();
      image.src = dataURL;
      await new Promise((resolve, reject) => {
        image.onload = resolve;
        image.onerror = reject;
      });

      const canvas = document.createElement('canvas');
      canvas.width = image.width;
      canvas.height = image.height;
      const context = canvas.getContext('2d');
      context.drawImage(image, 0, 0);

      const corner = context.getImageData(0, 0, 1, 1).data;
      expect(corner[3]).to.equal(0);
    });

    it('png renderer keeps rgba alpha for modules', async function(){
      const qr = qrcode(1, 'L');
      qr.addData('abc');
      qr.make();

      const dataURL = qr.render({
        renderer : 'png',
        tag : false,
        cellSize : 3,
        margin : 1,
        cellColor : 'rgba(17, 34, 51, 0.5)',
        backgroundColor : 'rgba(240, 241, 242, 1)',
        colors : 2
      });

      const image = new Image();
      image.src = dataURL;
      await new Promise((resolve, reject) => {
        image.onload = resolve;
        image.onerror = reject;
      });

      const canvas = document.createElement('canvas');
      canvas.width = image.width;
      canvas.height = image.height;
      const context = canvas.getContext('2d');
      context.drawImage(image, 0, 0);

      const modulePixel = context.getImageData(1, 1, 1, 1).data;
      expect(modulePixel[0]).to.equal(17);
      expect(modulePixel[1]).to.equal(34);
      expect(modulePixel[2]).to.equal(51);
      expect(modulePixel[3]).to.equal(128);
    });

    it('table tag (for coverage)', function(){
      const qr = qrcode(1, 'L');
      qr.addData('{TABLE}');
      qr.make();
      expect(!!qr.render('table') ).to.be.true;
    });

    it('table renderer keeps margin outside QR cells', function(){
      const qr = qrcode(1, 'L');
      qr.addData('{TABLE}');
      qr.make();
      const table = qr.render('table', 2, 4, '#111111', '#eeeeee');
      expect(table).not.to.contain('border: 4px solid');
      expect(table).to.contain('colspan="21"');
      expect(table).to.contain('width: 4px; height: 4px; background-color: #eeeeee;');
      expect(table).to.contain('width: 4px; height: 2px; background-color: #eeeeee;');
    });

    it('svg tag (for coverage)', function(){
      const qr = qrcode(1, 'Q');
      qr.addData('{SVG}');
      qr.make();
      expect(!!qr.render('svg') ).to.be.true;
    });

    it('svg tag by object (for coverage)', function(){
      const qr = qrcode(1, 'H');
      qr.addData('{SVG}');
      qr.make();
      expect(!!qr.render({ renderer : 'svg' }) ).to.be.true;
    });

    it('svg tag auto crispEdges for whole-number cell size', function(){
      const qr = qrcode(1, 'H');
      qr.addData('{SVG}');
      qr.make();
      expect(qr.render({ renderer : 'svg', cellSize : 2 }) ).to.contain(' shape-rendering="crispEdges"');
      expect(qr.render({ renderer : 'svg', cellSize : 2.5 }) ).not.to.contain(' shape-rendering="crispEdges"');
    });

    it('svg tag can force crispEdges on and off', function(){
      const qr = qrcode(1, 'H');
      qr.addData('{SVG}');
      qr.make();
      expect(qr.render({ renderer : 'svg', cellSize : 2.5, crispEdges : true }) ).to.contain(' shape-rendering="crispEdges"');
      expect(qr.render({ renderer : 'svg', cellSize : 2, crispEdges : false }) ).not.to.contain(' shape-rendering="crispEdges"');
    });

    it('canvas renderer legacy args (for coverage)', function(){

      let count = 0;
      let check = 0;
      const context = {
        fillStyle : '',
        fillRect : function(x, y, _width, _height) {
          count += 1;
          if (this.fillStyle == 'black') {
            check += x + y * 21;
          }
        },
      };

      const qr = qrcode(1, 'H');
      qr.addData('{2d}');
      qr.make();
      qr.render('canvas', context);
      expect(count).to.equal(221);
      expect(check).to.equal(131826);
    });

    it('canvas renderer accepts object options', function(){

      const fills = [];
      const context = {
        fillStyle : '',
        fillRect : function(x, y, width, height) {
          fills.push({
            fillStyle : this.fillStyle,
            x : x,
            y : y,
            width : width,
            height : height
          });
        },
      };

      const qr = qrcode(1, 'H');
      qr.addData('{2d}');
      qr.make();
      qr.render('canvas', context, {
        cellSize : 3,
        margin : 2,
        cellColor : '#111111',
        backgroundColor : '#eeeeee'
      });

      expect(fills[0]).to.deep.equal({
        fillStyle : '#eeeeee',
        x : 0,
        y : 0,
        width : 67,
        height : 67
      });
      expect(fills).to.have.length(221);
      expect(fills[1].fillStyle).to.equal('#111111');
      expect(fills[1].x).to.equal(2);
      expect(fills[1].y).to.equal(2);
      expect(fills[1].width).to.equal(3);
      expect(fills[1].height).to.equal(3);
    });

    it('- (for coverage)', function(){

      let s = '';
      s += 'data:image/gif;base64,R0lGODdhSgBKAIAAAAAAAP///ywAAAAASgBKAAAC/4yPqcvtD6OctNqLs9';
      s += '68+w+G4kiWZgKk6roiLGC8aay68kvd+LHf9MzTtSZABnB4rAWSxSWs0YREUU9kVcl80hxT7tW6pdrCim';
      s += 'wy98Vey1onWewEE9PnuO7XbprXc3xdmDUW5McnsRfWFRQI19MmRceXiDfJyPL26EWIVmfk+CDpZgfKxr';
      s += 'kwSgUYqYqomroJyBob+pfqCeIzW3jyKle6qyfTCdx7lzFsaaqkmYuLAUxpqGy3fNopOBR9TG0L5blo4z';
      s += 'uY/NxXOSXHJpzH/XrNTU7YyIGday0ej1ytKC1fH4pvz8KObbKO0RPkDBK4dW+s1GL3SeE+dwvxNSvHqh';
      s += 'SuPegakUVz17HfxnUHIxz6h5LeOZK60BC8Nw1mQzUCW4pKA+3mwJj6ZC1cpBLWRJS8IHakmOxShZ3pUj';
      s += 'IkKq7nUGI+o+K8qfQR0FVQaZ2Uas8ry5lCciYsyI/mvpFgY/40Ki2jUKklmaLyBmkkibL+EK6F6IFvuJ';
      s += 'Uls83lSoxWxTmu/G2lFBIwnLDv0prFegFUuJzf/p7FTC4ox8MuQT8VnZd0uX5ym6rbbFJi6LhQ32aN/X';
      s += 'JnUFIsC3fL7dFt17R2M/0+frn0R+RJh342zJcsXotCoReT3vRh8V3cu3v/Dj68+PHky5s/b74AADs=';

      const qr = qrcode(3, 'H');
      qr.addData('A\u0020$%*+-./:Z', 'Alphanumeric');
      qr.addData('1234', 'Numeric');
      qr.addData('12345', 'Numeric');
      qr.addData('123456', 'Numeric');
      qr.make();
      expect(capture('s', qr.render({ renderer : 'gif', tag : false }) ) ).to.equal(s);
    });

    const dataURLHandler = function(dataURL) {
      expect(!!dataURL).to.be.true;
    };

    [1, 20, 27].forEach( (t) => {
      ['L', 'M', 'Q', 'H'].forEach( (e) => {
        it('addData - Numeric (for coverage)', function(){
          const qr = qrcode(t, e);
          qr.addData('1', 'Numeric');
          qr.make();
          dataURLHandler(qr.render({ renderer : 'gif', tag : false }) );
        });
        it('addData - Alphanumeric (for coverage)', function(){
          const qr = qrcode(t, e);
          qr.addData('A1', 'Alphanumeric');
          qr.make();
          dataURLHandler(qr.render({ renderer : 'gif', tag : false }) );
        });
        it('addData - Kanji (for coverage)', function(){
          const qr = qrcode(t, e);
          qr.addData('漢', 'Kanji');
          qr.make();
          dataURLHandler(qr.render({ renderer : 'gif', tag : false }) );
        });
        it('addData - Byte (for coverage)', function(){
          const qr = qrcode(t, e);
          qr.addData('A1漢', 'Byte');
          qr.make();
          dataURLHandler(qr.render({ renderer : 'gif', tag : false }) );
        });
      });
    });

    it('addData - Byte with explicit encoding and eci (for coverage)', function(){
      qrcode.registerEncoder('TEST-BYTE', {
        encode(data) {
          return [data.length + 64];
        },
        eci : 26,
        modes : ['Byte']
      });
      const qr = qrcode(1, 'L');
      qr.addData('A', 'Byte', { encoding : 'TEST-BYTE', eci : true });
      qr.make();
      dataURLHandler(qr.render({ renderer : 'gif', tag : false }) );
    });

    it('setDefaultEncoding (for coverage)', function(){
      qrcode.registerEncoder('TEST-BYTE-DEFAULT', {
        encode(data) {
          return [data.length + 65];
        },
        modes : ['Byte']
      });
      qrcode.setDefaultEncoding('Byte', 'TEST-BYTE-DEFAULT');
      expect(qrcode.getDefaultEncoding('Byte')).to.equal('TEST-BYTE-DEFAULT');
    });

  });
};
