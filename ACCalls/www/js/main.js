// Wait for device API libraries to load
//
 /* function onLoad() {
    document.addEventListener("deviceready", onDeviceReady, false);
}

document.addEventListener("backbutton", onBackKeyDown, false); 
 
function onBackKeyDown() {
    // Handle the back button
	

}  
*/


/* document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady() {
    document.addEventListener("backbutton", onBackKeyDown, false); //Listen to the User clicking on the back button
}

function onBackKeyDown(e) {
	var info = (this.id);
    e.preventDefault();
	//alert(info);
    navigator.notification.confirm("Apakah anda yakin keluar dari aplikasi ini ?", onConfirm, "", "Ya,Tidak"); 
    // Prompt the user with the choice
}

function onConfirm(button) {
    if(button==1){//If User selected Yes, then we close app
        navigator.app.exitApp();// Otherwise we quit the app.
    }else{
        window.close();
    }
} */

/* document.addEventListener("backbutton", function() {
			var nilai =  document.getElementsByClassName("page");
			alert(nilai[0].id);
            if (  nilai == 'home') {
                navigator.notification.confirm(
                      'Press back again to exit'
                    , function(button) {
                        if (button == 2 || button == 0) {
                            navigator.app.exitApp();
                        }
                      }
                    , 'Exit App?'
                    , ['No way', 'Exit']
                );
                return false;

            } else {
                history.back();
            }
        }, false); */
		
document.addEventListener('deviceready', function() {
	
		// replace original alert
	if (navigator.notification) { // Override default HTML alert with native dialog
    window.alert = function (message) {
      navigator.notification.alert(
        message,    // message
        null,       // callback
        "", // title
        'Oke'        // buttonName
      );
    };
  }
	
	// exit apps with double back button hit
    var exitApp = false, intval = setInterval(function (){exitApp = false;}, 1000);
    document.addEventListener("backbutton", function (e){
        e.preventDefault();
        if (exitApp) {
			navigator.notification.confirm(
                      'Apakah anda yakin keluar dari aplikasi ini ?'
                    , function(button) {
                        if (button == 1) {
							clearInterval(intval) 
                            //navigator.app.exitApp();
							(navigator.app && navigator.app.exitApp()) || (device && device.exitApp())
                        }
                      }
                    , ''
                    , ['Ya', 'Tidak']
                );
            //clearInterval(intval) 
            //(navigator.app && navigator.app.exitApp()) || (device && device.exitApp())
        }
        else {
            exitApp = true
            history.back(1);
        } 
    }, false);
	
	// share to social media
	
	var message = {
    text: "This is a test message",
    activityTypes: ["PostToFacebook"]
	};
	$$('.share').on('click', function () {
		window.socialmessage.send(message);
	});	
	

	
}, false);	