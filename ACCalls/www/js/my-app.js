// Init App
var myApp = new Framework7({
    modalTitle: 'AC CALLS',
    // Enable Material theme
    material: true,
	pushState: true,
});

// Expose Internal DOM library
var $$ = Dom7;

// Add main view
var mainView = myApp.addView('.view-main', {
	domCache: true //enable inline pages
});

var ptrContent = $$('.pull-to-refresh-content');
 
// Add 'refresh' listener on it
ptrContent.on('refresh', function (e) {
    // Emulate 2s loading
    setTimeout(function () {
        mainView.router.loadPage('#index');
        myApp.pullToRefreshDone();
    }, 2000);
});


// Define url
var url = 'http://localhost/accalls/api/v4/';
//var url = 'http://accalls.com/api/v1/';

// Login check
function isLogin(){
	if(localStorage.login === 'true'){
		// Hidden all available menu before login
		$$('.user-unregister').hide();
		$$('.user-register').show();
		//$$('.user-register').text(localStorage['name']);$$('.user-register').append(' <i class="fa fa-pencil-square-o"></i>');
		$$('.user-register').append('<a href="#" class="link icon-only">' +localStorage['name']+' <i class="fa fa-pencil-square-o"></i></a>');
		$$('.menu-unregister').hide();
		$$('.menu-register').show();
	}
	else {
		// Hidden all available menu before login
		$$('.user-unregister').show();
		$$('.user-register').hide();
		$$('.menu-unregister').show();
		$$('.menu-register').hide();

	}
}
isLogin();

// Count how many Unit
var start = 1;
var ShowUnit = myApp.picker({
		input: '#unit',
		rotateEffect: true,
		value:[start],
		cols:[
				{
				 values: (function () {
                    var arr = [];
                    for (var i = 1; i <= 10; i++) { arr.push(i); } // change set unit start=1 and end=10
                    return arr;
                })(),
				}
			 ]
});

// Random Number function for activation code
function getRandom(length) {
	return Math.floor(Math.pow(10, length-1) + Math.random() * 9 * Math.pow(10, length-1));
}

// Generate token
function randomString(len, charSet) {
    charSet = charSet || 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var randomString = '';
    for (var i = 0; i < len; i++) {
    	var randomPoz = Math.floor(Math.random() * charSet.length);
    	randomString += charSet.substring(randomPoz,randomPoz+1);
    }
    return randomString;
}

// For todays date;
Date.prototype.today = function () { 
    return (this.getFullYear()) +"-"+(((this.getMonth()+1) < 10)?"0":"") + (this.getMonth()+1) +"-"+ ((this.getDate() < 10)?"0":"") + this.getDate() ;
}

// For the time now
Date.prototype.timeNow = function () {
     return ((this.getHours() < 10)?"0":"") + this.getHours() +":"+ ((this.getMinutes() < 10)?"0":"") + this.getMinutes() +":"+ ((this.getSeconds() < 10)?"0":"") + this.getSeconds();
}

var simple_date = new Date().today() + ' ' + new Date().timeNow();

// Time Hours order function
var today = new Date();


// Get Date and Time Today

/* use a function for the exact format desired... */
function ISODateString(d){
  function pad(n){return n<10 ? '0'+n : n}
  return d.getUTCFullYear()+'-'
      + pad(d.getUTCMonth()+1)+'-'
      + pad(d.getUTCDate()) +' '
      + pad(d.getUTCHours())+':'
      + pad(d.getUTCMinutes())+':'
      + pad(d.getUTCSeconds())
}

var fullDay = ISODateString(today);

// Set Time Order	
var TimeOrder = myApp.picker({
		input: '#waktu',
		rotateEffect: true,
		//value: [today.getHours(), (today.getMinutes() < 10 ? '0' + today.getMinutes() : today.getMinutes())], //uncomment this to get started with actual time
		value: [8, (today.getMinutes() < 10 ? '0' + today.getMinutes() : today.getMinutes())],
		
		formatValue: function (p, values, displayValues) {
        return values[0] + ':' + values[1] ;
		},
		cols: [ // Hours
            {
                values: (function () {
                    var arr = [];
                    for (var i = 8; i <= 18; i++) { arr.push(i); } // change start_time= 8 and end_time = 18, set i=0 to get begin time of 24 hours format & i=23 to get last time
                    return arr;
                })(),
            },
            // Divider
            {
                divider: true,
                content: ':'
            },
            // Minutes
            {
                values: (function () {
                    var arr = [];
                    for (var i = 0; i <= 50; i+=15) { arr.push(i < 10 ? '0' + i : i); }
                    return arr;
                })(),
            }]
	});
	
	


// Get current date and write it down to #tanggal
	
	var Tanggal = myApp.calendar({
		input: '#tanggal',
		value: [new Date()],
		disabled:{ to: new Date()},
		dateFormat: 'dd/mm/yyyy'
	});
	
 // Service Estimation Price triger from id 'Kota'
$$('#kota').on('change', function () {
	 var jasa = $$('#jasa').val();
	 var kota = $$('#kota').val();
	 var qty = $$('#unit').val();
	 
	// myApp.alert(jasa);
	// myApp.alert(kota);
	 
	 if(jasa === 'servis' && kota !== 'Kota' ){
		 //myApp.alert('biaya N/A');
		 $$('.biaya').text('Biaya tertera setelah pengecekan');
		 $$('#estimationPrice').text('Biaya tertera setelah pengecekan');
	  }
	  else if(jasa === 'cuci' || !kota || !kota.trim()){
		  var totalMin = qty*30;
		  var totalMax = qty*150;
		  $$('.biaya').text('Rp ' +totalMin+ '.000 - Rp ' +totalMax+ '.000');
		  $$('#estimationPrice').text('Rp ' +totalMin+ '.000 - Rp ' +totalMax+ '.000');
	  }	 
	  else {
		var totalMin = qty*175;
		var totalMax = qty*250;
		$$('.biaya').text('Rp ' +totalMin+ '.000 - Rp ' +totalMax+ '.000');
		$$('#estimationPrice').text('Rp ' +totalMin+ '.000 - Rp ' +totalMax+ '.000'); 
	  } 
 });
 
 // Service Estimation Price triger from id 'Jasa'
$$('#jasa').on('change', function () {
	 var jasa = $$('#jasa').val();
	 var kota = $$('#kota').val();
	 var qty = $$('#unit').val();
	 
	 /* myApp.alert(jasa);
	 myApp.alert(kota);
	 myApp.alert(simple_date); */
	 
	 if(jasa === 'servis' && kota !== 'Kota' ){
		 //myApp.alert('biaya N/A');
		 $$('.biaya').text('Biaya tertera setelah pengecekan');
		 $$('#estimationPrice').text('Biaya tertera setelah pengecekan');
	  }
	  else if(jasa === 'cuci' || !kota || !kota.trim()){
		  var totalMin = qty*30;
		  var totalMax = qty*150;
		  $$('.biaya').text('Rp ' +totalMin+ '.000 - Rp ' +totalMax+ '.000');
		  $$('#estimationPrice').text('Rp ' +totalMin+ '.000 - Rp ' +totalMax+ '.000');
	  }	 
	  else {
		var totalMin = qty*175;
		var totalMax = qty*250;
		$$('.biaya').text('Rp ' +totalMin+ '.000 - Rp ' +totalMax+ '.000');
		$$('#estimationPrice').text('Rp ' +totalMin+ '.000 - Rp ' +totalMax+ '.000');
	  } 
 });
 
 // Order
 $$('.main-page .pesan').on('click', function () {
	 var jasa = $$('#jasa').val();
	 var jenis = $$('#jenisDefault').text();
	 var unit = $$('#unit').val();
	 var tanggal = $$('#tanggal').val();
	 var waktu = $$('#waktu').val();
	 var alamat = $$('#alamat').val();
	 var kota = $$('#kota').val();
	 var hunian = $$('#hunian').val();
	 var layanan = $$('#layanan').val();
	 var pembayaran = $$('#pembayaran').val();
	 var catatan = $$('#noteTech').val();
	 var promo = $$('#promo').val();
	 var tanggal_full = tanggal + ' ' + waktu;
	 	 //myApp.alert(fullDay);
	 if($$('#noteTech').val() == "") {
			var catatan = "-";
		}	
		
	 myApp.showPreloader();
	 
	if(localStorage.login === 'false'){
		myApp.hidePreloader();
		//myApp.alert(localStorage.length);
		mainView.router.load({pageName: 'login-screen-embedded'});
	}  
	else{
		var query = url + 'orders';
		var email = localStorage.email;
		var nama  = localStorage.name;
		var telp = localStorage.phone;
		
		var jamkerja = '';
		
	
		myApp.hidePreloader();
		
		//myApp.alert('Nama: ' + nama +',Jasa: ' + jasa + ', Jenis AC:' + jenis + ', Unit:' + unit + ', Tanggal:' + tanggal + ', Waktu: ' + waktu + ', Alamat: ' + alamat + ',Kota: ' + kota + ',Hunian: ' + hunian +',Layanan: ' + layanan + ', Pembayaran: ' + pembayaran + ',Catatan: ' + catatan + ',Kode Promosi: ' + promo );
		
			
		 $$.ajax({
				   type: 'POST',
				   url: query,
				   data: { "nama":nama, "email":email, "telp":telp, "alamat":alamat, "kecamatan":kota, "layanan":jasa, "jenis_ac":jenis, "hunian":hunian, "jenis_layanan":layanan, "note":catatan, "tanggal":simple_date, "jmlac":unit, "tglorder":tanggal, "jamorder":waktu, "jamkerja":jamkerja, "status":"open", "status2":"open" },
				   processData: true,
				   dataType: "json",
				   success: function (data) {
					    myApp.hidePreloader();
					    //alert(JSON.stringify(data));
						console.log(data);
					   window.alert('Terima kasih, order anda telah sukses kami catat');
					   
						var todayDate = new Date();
						var dd = todayDate.getDate();
						var mm = todayDate.getMonth()+1; //January is 0!

						var yyyy = todayDate.getFullYear();
						if(dd<10){
							dd='0'+dd
						} 
						if(mm<10){
							mm='0'+mm
						} 
						var todayDate = dd+'/'+mm+'/'+yyyy;
						document.getElementById("tanggal").value = todayDate;

						$$('#jasaDefault').text('Cuci');
						$$('#jenisDefault').text('Split 0.5 - 1 PK');
						$$('#unit').val(start);
						//$$('#tanggal').val(Tanggal);
						$$('#waktu').val();
						$$('#alamat').val('');
						$$('#noteTech').val('');
						$$('#layananDefault').text('Pribadi');
						$$('#pembayaran').val();
						$$('.biaya').text('');
						$$('#hunianDefault').text('Rumah');
						//document.getElementById('tanggal').value += todayDate;
						myApp.resizeTextarea("#alamat"); 
						myApp.resizeTextarea("#noteTech"); 
						document.getElementById('kota').selectedIndex = '0';
						document.getElementById('jasa').selectedIndex = '0';
						document.getElementById('jenis').selectedIndex = '0';
						document.getElementById('layanan').selectedIndex = '0';
						document.getElementById('hunian').selectedIndex = '0';
						//document.getElementById('pembayaran').selectedIndex = '0';
						mainView.router.loadPage('#sukses');
						
						}
				  
					}); 
				}
 });
 
 // Login	
 $$('.login-screen-embedded .list-button').on('click', function () {
        var email = $$('.login-screen-embedded input[name="email"]').val();
        var password = $$('.login-screen-embedded input[name="password"]').val();
       /*  myApp.alert('Username: ' + username + ', Password: ' + password, function () {
          myApp.closeModal('.login-screen');
        }); */
		if ( !password || !email ){
			//myApp.alert('Ooops.....anda melewatkan sesuatu');
			window.alert('Ooops.....anda melewatkan sesuatu');
		return;
		}
		else {
			var query = url + 'login';
			//myApp.showIndicator();
			myApp.showPreloader();
			$$.ajax({
				   type: 'POST',
				   url: query,
				   data: { "email":email, "password":MD5(password)},
				   processData: true,
				   dataType: "json",
				   success: function (data) {
						//alert(data);
						//myApp.hideIndicator();
						myApp.hidePreloader();
						/* mainView.router.loadPage('index.html'); */
						//alert(JSON.stringify(data));
						console.log(data); 
						if (data["status"] === 404) {
							//myApp.alert('Whoops...kami tidak menemukan anda dalam data kami');
							window.alert('Whoops...kami tidak menemukan anda dalam data kami');
						}
						else {
						myApp.closeModal('.login-screen-embedded');
						mainView.router.back();
						var form = document.getElementById("formLogin");
						form.reset();
						$$('.user-register').text(data['name']);
						$$('.user-register').append(' <i class="fa fa-pencil-square-o"></i>');
						/* window.localStorage["email"] = email;
						window.localStorage["password"] = password; */
						localStorage.login = "true";
						localStorage.email = email;
						localStorage.password = MD5(password);
						localStorage.token = data["token"];
						localStorage.phone = data["phone_number"];
						localStorage.name = data["name"];
						localStorage.UserId = data["id"];
						$$('.user-register').show();
						$$('.user-unregister').hide();
						$$('.menu-register').show();
						$$('.menu-unregister').hide();
						
						}
				   }
					});
		}
      });

 // Logout
	$$('.logout').on('click', function () {
						myApp.showPreloader();
						
						if (localStorage.login = "true"){
							//myApp.hidePreloader();
						//myApp.alert('Terima kasih telah menggunakan aplikasi AC CALLS');
						window.alert('Terima kasih telah menggunakan aplikasi AC CALLS');
						localStorage.login = "false";
						//localStorage.clear();
						$$('.user-register').hide();
						$$('.user-unregister').show();
						$$('.menu-register').hide();
						$$('.menu-unregister').show();
						myApp.hidePreloader();
						}
		
	});
	
	  
 // Register	
	
	$$('.card-login-area .button-register').on('click', function () {
	
        var username = $$('.card-login-area input[name="name"]').val();
        var password = $$('.card-login-area input[name="password"]').val();
        var phone = $$('.card-login-area input[name="phone"]').val();
        var email = $$('.card-login-area input[name="email"]').val();
		var randomValue = randomString(10);
        /* myApp.alert('Username: ' + username + ', Password: ' + password + ', Phone: ' + phone + ', Email: ' + email, function () {
          //myApp.closeModal('.login-screen');
        }); */
		if (!username || !password || !email || !phone){
			//myApp.alert('Ooops.....anda melewatkan sesuatu');
			window.alert('Ooops.....anda melewatkan sesuatu');
		return;
		}
		else {
			var query = url + 'register';
			//myApp.showIndicator();
			myApp.showPreloader();
			$$.ajax({
				   type: 'POST',
				   url: query,
				   data: {"username":username, "email":email, "password":MD5(password), "telp":phone,"activation_code":getRandom(4) ,"token":randomValue, "created_at":fullDay, "updated_at":fullDay },
				   processData: true,
				   dataType: "json",
				   success: function (data) {
						//alert(JSON.stringify(data));
						console.log(data);
						//myApp.hideIndicator();
						myApp.hidePreloader();
						window.alert('Terima kasih telah melakukan pendaftaran akun di AC CALLS. Silahkan masuk ke akun anda untuk melakukan pemesanan.');
						/* mainView.router.loadPage('index.html'); */
						mainView.router.back();
						var form = document.getElementById("formRegister");
						form.reset();
				   }
					});
		}

      });
	  
 // Comment 
 $$('.button-comment').on('click', function () {
	 if(localStorage.login === 'false'){
		//myApp.alert(localStorage.length);
		mainView.router.load({pageName: 'login-screen-embedded'});
	}  else{
		var comment = $$('comment').val();
		myApp.alert(comment);
	}
 });
 
 // Function hide show Password field
$$('.showPassword').on('click', function () {
	alert("Hai");
 });
 
 // Main Menu Screen
 $$('.menu-top').on('click', function(){
	 myApp.closeModal('.login-screen');
	 mainView.router.loadPage('#promo');
 });
 $$('.menu-middle').on('click', function(){
	 window.alert("Silahkan hubungi +62 2291 0331 untuk mendapatkan layanan ini");
 });
 $$('.menu-bottom').on('click', function(){
	 myApp.closeModal('.login-screen');
	 mainView.router.loadPage('#index');
 });
 
 // Promo back
 $$('.reload-main').on('click', function(){
	location.reload();
 });
 
 // Rate apps button click
$$('.rate').on('click', function () {
		window.open('market://details?id=com.accalls');
});



 //MD5 password function
 var MD5 = function (string) {

   function RotateLeft(lValue, iShiftBits) {
           return (lValue<<iShiftBits) | (lValue>>>(32-iShiftBits));
   }

   function AddUnsigned(lX,lY) {
           var lX4,lY4,lX8,lY8,lResult;
           lX8 = (lX & 0x80000000);
           lY8 = (lY & 0x80000000);
           lX4 = (lX & 0x40000000);
           lY4 = (lY & 0x40000000);
           lResult = (lX & 0x3FFFFFFF)+(lY & 0x3FFFFFFF);
           if (lX4 & lY4) {
                   return (lResult ^ 0x80000000 ^ lX8 ^ lY8);
           }
           if (lX4 | lY4) {
                   if (lResult & 0x40000000) {
                           return (lResult ^ 0xC0000000 ^ lX8 ^ lY8);
                   } else {
                           return (lResult ^ 0x40000000 ^ lX8 ^ lY8);
                   }
           } else {
                   return (lResult ^ lX8 ^ lY8);
           }
   }

   function F(x,y,z) { return (x & y) | ((~x) & z); }
   function G(x,y,z) { return (x & z) | (y & (~z)); }
   function H(x,y,z) { return (x ^ y ^ z); }
   function I(x,y,z) { return (y ^ (x | (~z))); }

   function FF(a,b,c,d,x,s,ac) {
           a = AddUnsigned(a, AddUnsigned(AddUnsigned(F(b, c, d), x), ac));
           return AddUnsigned(RotateLeft(a, s), b);
   };

   function GG(a,b,c,d,x,s,ac) {
           a = AddUnsigned(a, AddUnsigned(AddUnsigned(G(b, c, d), x), ac));
           return AddUnsigned(RotateLeft(a, s), b);
   };

   function HH(a,b,c,d,x,s,ac) {
           a = AddUnsigned(a, AddUnsigned(AddUnsigned(H(b, c, d), x), ac));
           return AddUnsigned(RotateLeft(a, s), b);
   };

   function II(a,b,c,d,x,s,ac) {
           a = AddUnsigned(a, AddUnsigned(AddUnsigned(I(b, c, d), x), ac));
           return AddUnsigned(RotateLeft(a, s), b);
   };

   function ConvertToWordArray(string) {
           var lWordCount;
           var lMessageLength = string.length;
           var lNumberOfWords_temp1=lMessageLength + 8;
           var lNumberOfWords_temp2=(lNumberOfWords_temp1-(lNumberOfWords_temp1 % 64))/64;
           var lNumberOfWords = (lNumberOfWords_temp2+1)*16;
           var lWordArray=Array(lNumberOfWords-1);
           var lBytePosition = 0;
           var lByteCount = 0;
           while ( lByteCount < lMessageLength ) {
                   lWordCount = (lByteCount-(lByteCount % 4))/4;
                   lBytePosition = (lByteCount % 4)*8;
                   lWordArray[lWordCount] = (lWordArray[lWordCount] | (string.charCodeAt(lByteCount)<<lBytePosition));
                   lByteCount++;
           }
           lWordCount = (lByteCount-(lByteCount % 4))/4;
           lBytePosition = (lByteCount % 4)*8;
           lWordArray[lWordCount] = lWordArray[lWordCount] | (0x80<<lBytePosition);
           lWordArray[lNumberOfWords-2] = lMessageLength<<3;
           lWordArray[lNumberOfWords-1] = lMessageLength>>>29;
           return lWordArray;
   };

   function WordToHex(lValue) {
           var WordToHexValue="",WordToHexValue_temp="",lByte,lCount;
           for (lCount = 0;lCount<=3;lCount++) {
                   lByte = (lValue>>>(lCount*8)) & 255;
                   WordToHexValue_temp = "0" + lByte.toString(16);
                   WordToHexValue = WordToHexValue + WordToHexValue_temp.substr(WordToHexValue_temp.length-2,2);
           }
           return WordToHexValue;
   };

   function Utf8Encode(string) {
           string = string.replace(/\r\n/g,"\n");
           var utftext = "";

           for (var n = 0; n < string.length; n++) {

                   var c = string.charCodeAt(n);

                   if (c < 128) {
                           utftext += String.fromCharCode(c);
                   }
                   else if((c > 127) && (c < 2048)) {
                           utftext += String.fromCharCode((c >> 6) | 192);
                           utftext += String.fromCharCode((c & 63) | 128);
                   }
                   else {
                           utftext += String.fromCharCode((c >> 12) | 224);
                           utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                           utftext += String.fromCharCode((c & 63) | 128);
                   }

           }

           return utftext;
   };

   var x=Array();
   var k,AA,BB,CC,DD,a,b,c,d;
   var S11=7, S12=12, S13=17, S14=22;
   var S21=5, S22=9 , S23=14, S24=20;
   var S31=4, S32=11, S33=16, S34=23;
   var S41=6, S42=10, S43=15, S44=21;

   string = Utf8Encode(string);

   x = ConvertToWordArray(string);

   a = 0x67452301; b = 0xEFCDAB89; c = 0x98BADCFE; d = 0x10325476;

   for (k=0;k<x.length;k+=16) {
           AA=a; BB=b; CC=c; DD=d;
           a=FF(a,b,c,d,x[k+0], S11,0xD76AA478);
           d=FF(d,a,b,c,x[k+1], S12,0xE8C7B756);
           c=FF(c,d,a,b,x[k+2], S13,0x242070DB);
           b=FF(b,c,d,a,x[k+3], S14,0xC1BDCEEE);
           a=FF(a,b,c,d,x[k+4], S11,0xF57C0FAF);
           d=FF(d,a,b,c,x[k+5], S12,0x4787C62A);
           c=FF(c,d,a,b,x[k+6], S13,0xA8304613);
           b=FF(b,c,d,a,x[k+7], S14,0xFD469501);
           a=FF(a,b,c,d,x[k+8], S11,0x698098D8);
           d=FF(d,a,b,c,x[k+9], S12,0x8B44F7AF);
           c=FF(c,d,a,b,x[k+10],S13,0xFFFF5BB1);
           b=FF(b,c,d,a,x[k+11],S14,0x895CD7BE);
           a=FF(a,b,c,d,x[k+12],S11,0x6B901122);
           d=FF(d,a,b,c,x[k+13],S12,0xFD987193);
           c=FF(c,d,a,b,x[k+14],S13,0xA679438E);
           b=FF(b,c,d,a,x[k+15],S14,0x49B40821);
           a=GG(a,b,c,d,x[k+1], S21,0xF61E2562);
           d=GG(d,a,b,c,x[k+6], S22,0xC040B340);
           c=GG(c,d,a,b,x[k+11],S23,0x265E5A51);
           b=GG(b,c,d,a,x[k+0], S24,0xE9B6C7AA);
           a=GG(a,b,c,d,x[k+5], S21,0xD62F105D);
           d=GG(d,a,b,c,x[k+10],S22,0x2441453);
           c=GG(c,d,a,b,x[k+15],S23,0xD8A1E681);
           b=GG(b,c,d,a,x[k+4], S24,0xE7D3FBC8);
           a=GG(a,b,c,d,x[k+9], S21,0x21E1CDE6);
           d=GG(d,a,b,c,x[k+14],S22,0xC33707D6);
           c=GG(c,d,a,b,x[k+3], S23,0xF4D50D87);
           b=GG(b,c,d,a,x[k+8], S24,0x455A14ED);
           a=GG(a,b,c,d,x[k+13],S21,0xA9E3E905);
           d=GG(d,a,b,c,x[k+2], S22,0xFCEFA3F8);
           c=GG(c,d,a,b,x[k+7], S23,0x676F02D9);
           b=GG(b,c,d,a,x[k+12],S24,0x8D2A4C8A);
           a=HH(a,b,c,d,x[k+5], S31,0xFFFA3942);
           d=HH(d,a,b,c,x[k+8], S32,0x8771F681);
           c=HH(c,d,a,b,x[k+11],S33,0x6D9D6122);
           b=HH(b,c,d,a,x[k+14],S34,0xFDE5380C);
           a=HH(a,b,c,d,x[k+1], S31,0xA4BEEA44);
           d=HH(d,a,b,c,x[k+4], S32,0x4BDECFA9);
           c=HH(c,d,a,b,x[k+7], S33,0xF6BB4B60);
           b=HH(b,c,d,a,x[k+10],S34,0xBEBFBC70);
           a=HH(a,b,c,d,x[k+13],S31,0x289B7EC6);
           d=HH(d,a,b,c,x[k+0], S32,0xEAA127FA);
           c=HH(c,d,a,b,x[k+3], S33,0xD4EF3085);
           b=HH(b,c,d,a,x[k+6], S34,0x4881D05);
           a=HH(a,b,c,d,x[k+9], S31,0xD9D4D039);
           d=HH(d,a,b,c,x[k+12],S32,0xE6DB99E5);
           c=HH(c,d,a,b,x[k+15],S33,0x1FA27CF8);
           b=HH(b,c,d,a,x[k+2], S34,0xC4AC5665);
           a=II(a,b,c,d,x[k+0], S41,0xF4292244);
           d=II(d,a,b,c,x[k+7], S42,0x432AFF97);
           c=II(c,d,a,b,x[k+14],S43,0xAB9423A7);
           b=II(b,c,d,a,x[k+5], S44,0xFC93A039);
           a=II(a,b,c,d,x[k+12],S41,0x655B59C3);
           d=II(d,a,b,c,x[k+3], S42,0x8F0CCC92);
           c=II(c,d,a,b,x[k+10],S43,0xFFEFF47D);
           b=II(b,c,d,a,x[k+1], S44,0x85845DD1);
           a=II(a,b,c,d,x[k+8], S41,0x6FA87E4F);
           d=II(d,a,b,c,x[k+15],S42,0xFE2CE6E0);
           c=II(c,d,a,b,x[k+6], S43,0xA3014314);
           b=II(b,c,d,a,x[k+13],S44,0x4E0811A1);
           a=II(a,b,c,d,x[k+4], S41,0xF7537E82);
           d=II(d,a,b,c,x[k+11],S42,0xBD3AF235);
           c=II(c,d,a,b,x[k+2], S43,0x2AD7D2BB);
           b=II(b,c,d,a,x[k+9], S44,0xEB86D391);
           a=AddUnsigned(a,AA);
           b=AddUnsigned(b,BB);
           c=AddUnsigned(c,CC);
           d=AddUnsigned(d,DD);
   		}

   	var temp = WordToHex(a)+WordToHex(b)+WordToHex(c)+WordToHex(d);

   	return temp.toLowerCase();
}