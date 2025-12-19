import { toast } from "react-toastify";

async function getAddressFromCoords(lat, lon) {
    try {
        const res = await fetch(
            `http://localhost:4000/location/reverse-geocode?lat=${lat}&lon=${lon}`
        );
        const data = await res.json();
        console.log("API response:", data);

        // Check correct path for address
        if (!data.response || !data.response.address) {
            return null;
        }

        return data.response.address; // return the address object

    } catch (error) {
        console.error("Error fetching address:", error);
        return null;
    }
}

export default function getUserLocation() {
    return new Promise((resolve, reject) => {
        if (!navigator.geolocation) {
            alert("Geolocation is not supported in your browser");
            reject("Geolocation not supported");
            return;
        }

        navigator.geolocation.getCurrentPosition(
            async (position) => {
                const latitude = position.coords.latitude;
                const longitude = position.coords.longitude;

                const address = await getAddressFromCoords(latitude, longitude);

                if (address) {
                    toast.success("Location Successfully Fetched", {
                        position: "top-right",
                        style: {
                            background: "linear-gradient(135deg, red, black)",
                            color: "#fff",
                            borderRadius: "10px",
                            padding: "14px",
                            fontSize: "16px",
                            fontFamily: "Poppins",
                            fontWeight: "700"
                        }
                    });
                    resolve(address);
                } else {
                    reject("Location not found");
                }
            },
            (error) => {
                switch (error.code) {
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
                reject(error);
            }
        );
    });
}
