async function getAddressFromCoords(lat, lon) {
    try {
        const response = await fetch(
            `http://localhost:4000/location/reverse-geocode?lat=${lat}&lon=${lon}`
        );

        const data = await response.json();
        console.log(data);

        if (!data.address) {
            return null;
        }

        return data.address;

    } catch (error) {
        console.error("Error:", error);
        return null;
    }
}


export default async function getUserLocation() {
    if (!navigator.geolocation) {
        alert("Geolocation is not supported in your browser");
        return;
    }

    navigator.geolocation.getCurrentPosition(
        async (position) => {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;

            console.log("Latitude:", latitude);
            console.log("Longitude:", longitude);

            const address = await getAddressFromCoords(latitude, longitude);


//             alert(`Your Location\nLat: ${latitude}\nLong: ${longitude}`);
//              alert(`
// Your Location:
// Street: ${address.road}
// City: ${address.city}
// State: ${address.state}
// Pincode: ${address.pincode}
// Country: ${address.country}
//     `);

        },
        (error) => {
            switch(error.code){
                case error.PERMISSION_DENIED:
                    alert("Please allow location access ❗");
                    break;
                case error.POSITION_UNAVAILABLE:
                    alert("Location unavailable ❗");
                    break;
                case error.TIMEOUT:
                    alert("Location request timed out ❗");
                    break;
                default:
                    alert("Something went wrong ❗");
            }
        }
    );
}


