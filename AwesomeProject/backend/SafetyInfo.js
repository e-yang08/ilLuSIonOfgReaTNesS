import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import Geocoder from "react-native-geocoding";
import { GOOGLE_API_KEY, AMADEUS_CLIENT_ID, AMADEUS_CLIENT_SECRET } from "@env";
// import { LinearGradient } from "expo-linear-gradient";

const SafetyInfo = ({ address, lat, long }) => {
  const [coords, setCoords] = useState("loading...");
  const [safety, setSafety] = useState("");
  const [loading, setIsLoading] = useState(false);
  const [token, setToken] = useState("");
  const [error, setError] = useState("");

  // Function to fetch the token
  const fetchToken = async () => {
    try {
      const response = await fetch(
        "https://test.api.amadeus.com/v1/security/oauth2/token",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: `grant_type=client_credentials&client_id=${AMADEUS_CLIENT_ID}&client_secret=${AMADEUS_CLIENT_SECRET}`,
        }
      );
      const json = await response.json();
      setToken(json.access_token);
      console.log("Token fetched: ", json.access_token);
    } catch (error) {
      console.error("Error fetching token: ", error);
    }
  };

  const getSafetyRating = async () => {
    // Function to get the Safety Rating of the state variables of latitude and longitude

    if (!lat || !long) return; // Ensure lat, long, and token are available

    const radiusInDegrees = 0.5 / 69; // 1 degree = 69 miles

    // Find the coordinates of the bound
    const north = parseFloat(lat) + radiusInDegrees;
    const south = parseFloat(lat) - radiusInDegrees;
    const east = parseFloat(long) + radiusInDegrees;
    const west = parseFloat(long) - radiusInDegrees;

    setIsLoading(true);
    try {
      const url = `https://test.api.amadeus.com/v1/safety/safety-rated-locations/by-square?north=${north}&west=${west}&south=${south}&east=${east}&page[limit]=10&page[offset]=0`;
      const response = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const json = await response.json();
      console.log(json);

      if (json.data && json.data.length > 0) {
        // Example of processing the data:
        // Calculate the average safety score for the area
        const averageScores = json.data.reduce(
          (acc, cur) => {
            acc.lgbtq += cur.safetyScores.lgbtq;
            acc.medical += cur.safetyScores.medical;
            acc.overall += cur.safetyScores.overall;
            acc.physicalHarm += cur.safetyScores.physicalHarm;
            acc.politicalFreedom += cur.safetyScores.politicalFreedom;
            acc.theft += cur.safetyScores.theft;
            acc.women += cur.safetyScores.women;
            return acc;
          },
          {
            lgbtq: 0,
            medical: 0,
            overall: 0,
            physicalHarm: 0,
            politicalFreedom: 0,
            theft: 0,
            women: 0,
          }
        );

        Object.keys(averageScores).forEach((key) => {
          averageScores[key] /= json.data.length;
        });

        setSafety(averageScores);
        console.log(averageScores);
      } else {
        setSafety("No data available for this area.");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchToken();
  }, []);

  useEffect(() => {
    if (token) {
      // Ensure to call getSafetyRating only when token is available
      getSafetyRating();
    }
  }, [lat, long, token]);

  // useEffect(() => {
  //   if (!address) return; // Exit if no address is provided

  //   Geocoder.init(GOOGLE_API_KEY, { language: "en" });
  //   Geocoder.from(
  //     address,
  //     // Hard-coded bounds for San Francisco
  //     {
  //       northeast: { lat: 37.83, lng: -122.34 },
  //       southwest: { lat: 37.63, lng: -122.55 },
  //     }
  //   )
  //     .then((json) => {
  //       const location = json.results[0].geometry.location;
  //       setLat(location.lat);
  //       setLong(location.lng);
  //       const latLngString = `${location.lat}, ${location.lng}`;
  //       setCoords(latLngString);
  //       // Now that lat and long are updated, getSafetyRating will be triggered
  //     })
  //     .catch((error) => {
  //       if (error.origin.status === "ZERO_RESULTS") {
  //         setError(
  //           "No results were found. Please try entering the address again."
  //         );
  //       }
  //       console.log("⚠️⚠️⚠️⚠️⚠️ERROR!!", error);
  //     });
  // }, [address]);

  function getColor(value) {
    if (value >= 0 && value <= 24) {
      return "#168c14"; // green
    } else if (value >= 25 && value <= 49) {
      return "#ebab34"; // yellow/gold
    } else if (value >= 50 && value <= 74) {
      return "#ed8134"; // orange
    } else if (value >= 75 && value <= 100) {
      return "#c21515"; // red
    }
  }

  // function to generate message
  function safetyAdvice(value) {
    if (value.overall <= 24) {
      return "Enjoy your day!";
    } else if (value.theft >= 40) {
      return "Watch out your bags and belongings!";
    } else if ((value.women >= 40) | (value.lgbtq >= 40)) {
      return "You might want to go out in a group.";
    } else if (value.physicalHarm >= 40) {
      return "Bring pepper spray for protection.";
    } else if (value.politicalFreedom >= 40) {
      return "We value freedom but also your safety.";
    } else {
      return "Enjoy your day! (Make sure location is shared just in case :)";
    }
  }
  //   lgbtq: 0,
  //   medical: 0,
  //   overall: 0,
  //   physicalHarm: 0,
  //   politicalFreedom: 0,
  //   theft: 0,
  //   women: 0,

  return (
    <View>
      {/* Display error if present */}
      {error ? (
        <Text
          style={{
            margin: 4,
            textAlign: "center",
            color: "red",
            fontWeight: "bold",
          }}
        >
          {error}
          {"\n"}
        </Text>
      ) : // Conditional rendering based on safety data
      safety !== "" ? (
        <View>
          <Text style={{ fontWeight: "bold", fontSize: 18, marginBottom: 5 }}>
            📍{address.split(",")[0].trim()}
          </Text>
          <Text style={{ fontWeight: "bold", fontSize: 14, marginBottom: 5 }}>
            {safetyAdvice(safety)}
          </Text>
          <Text
            style={{
              color: "grey",
              marginBottom: 20,
              marginRight: 1,
              fontSize: 12,
            }}
          >
            Likelihood of danger from 1 (safe) to 100 (dangerous).
          </Text>
          {/* <View style={{ width: "100%", height: 50 }}>
            <LinearGradient colors={["#168c14", "#c21515"]} style={{ flex: 1 }}>
            </LinearGradient>
          </View> */}
          <Text
            style={{
              color: "black",
              fontWeight: "bold",
              fontSize: 16,
              marginBottom: 10,
            }}
          >
            Overall:{" "}
            <Text style={{ color: getColor(safety.overall) }}>
              {safety.overall?.toFixed(1)}
            </Text>
          </Text>
          <Text style={{ color: "black", fontWeight: "bold" }}>
            Against Women:{" "}
            <Text style={{ color: getColor(safety.women), fontWeight: "bold" }}>
              {safety.women?.toFixed(1)}
            </Text>
          </Text>
          <Text style={{ color: "black", fontWeight: "bold" }}>
            Against LGBTQ:{" "}
            <Text style={{ color: getColor(safety.lgbtq), fontWeight: "bold" }}>
              {safety.lgbtq?.toFixed(1)}
            </Text>
          </Text>
          <Text style={{ color: "black", fontWeight: "bold" }}>
            Theft:{" "}
            <Text style={{ color: getColor(safety.theft), fontWeight: "bold" }}>
              {safety.theft?.toFixed(1)}
            </Text>
          </Text>
          <Text style={{ color: "black", fontWeight: "bold" }}>
            Political Freedom:{" "}
            <Text
              style={{
                color: getColor(safety.politicalFreedom),
                fontWeight: "bold",
              }}
            >
              {safety.politicalFreedom?.toFixed(1)}
            </Text>
          </Text>
          <Text style={{ color: "black", fontWeight: "bold" }}>
            Medical Conerns:{" "}
            <Text
              style={{ color: getColor(safety.medical), fontWeight: "bold" }}
            >
              {safety.medical?.toFixed(1)}
            </Text>
          </Text>
          <Text style={{ color: "black", fontWeight: "bold" }}>
            Physical Harm:{" "}
            <Text
              style={{
                color: getColor(safety.physicalHarm),
                fontWeight: "bold",
              }}
            >
              {safety.physicalHarm?.toFixed(1)}
            </Text>
            {"\n"}
          </Text>
        </View>
      ) : (
        <Text>Loading...</Text>
      )}
    </View>
  );
};

export default SafetyInfo;
