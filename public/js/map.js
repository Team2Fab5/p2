
var mapObject = document.getElementById("map");

// Check if Geolocation is supported
function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        mapObject.innerHTML = "Geolocation is not supported by this browser.";
    };
};
getLocation();

// Show current user location
function showPosition(position) {
    var map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: position.coords.latitude, lng: position.coords.longitude },
        zoom: 14
    });

    // Add Marker of current location
    var marker = new google.maps.Marker({
        position: { lat: position.coords.latitude, lng: position.coords.longitude },
        map: map
    });

    var infowindow = new google.maps.InfoWindow({
        content: "Agnes needs help shoveling snow!"
    });
    marker.addListener('click', function () {
        infowindow.open(map, marker);
    });
};

// Error Handeling
//     }, function () {
//       handleNoGeolocation(true);
//     });
//   } else {
//     // Browser doesn't support Geolocation
//     handleNoGeolocation(false);
//   }

//   // var infowindow = new google.maps.Infowindow({
//   //   content: "Task"
//   // });
// }





