import React, { useEffect, useState } from "react";
import axios from "axios";
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CloudIcon from "@mui/icons-material/Cloud";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import moment from "moment";
import "moment/min/locales";
import { useTranslation } from 'react-i18next';

moment.locale("ar")

const WeatherCard = () => {
  const { t, i18n } = useTranslation();
  let cancelAxios = null
  const [timeAndDate, setTimeAndDate] = useState("")
  const [temp, setTemp] = useState({
    number: null,
    min: null,
    max: null,
    description: "",
    icon:""
  });
  const [locale , setLocale] = useState("ar")

  const handleLanguage = () => {
    if (locale === "en") {
      setLocale("ar");
      i18n.changeLanguage("ar");
      moment.locale("ar")
    } else {
      setLocale("en");
      i18n.changeLanguage("en");
      moment.locale("en")
    }
    setTimeAndDate(moment().format('MMMM Do YYYY, h:mm:ss a'))
  };
  useEffect(() => {
    i18n.changeLanguage("ar")
    setTimeAndDate(moment().format('MMMM Do YYYY, h:mm:ss a'))
    const lat = "30.0444"; // Example: Cairo latitude
    const lon = "31.2357"; // Example: Cairo longitude
    const apiKey = "a11fca8b0e250f4152680db6ec881b70"; // Use your actual API key

    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`,
        {
          cancelToken: new axios.CancelToken((c) => {
            cancelAxios = c;
          }),
        }
      )
      .then((response) => {
        const tempResponse = Math.round(response.data.main.temp - 273.15);
        const min = Math.round(response.data.main.temp_min - 273.15);
        const max = Math.round(response.data.main.temp_max - 273.15);
        const description = response.data.weather[0].description;
        const responseIcon = response.data.weather[0].icon;

        setTemp({ number: tempResponse, min, max, description , icon:`https://openweathermap.org/img/w/${responseIcon}.png` });
      })
      .catch((error) => {
        if (axios.isCancel(error)) {
          console.log("Request canceled", error.message);
        } else {
          console.log("Error: ", error.message);
        }
      });

    return () => {
      if (cancelAxios) {
        console.log("canceling");
        cancelAxios();
      }
    };
  }, [i18n]);

  return (
    <Container
      maxWidth="sm"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        flexDirection: "column",
      }}
    >
      <Card
        style={{
          background: "rgb(200, 95, 55)",
          width: "100%",
          color: "white",
          padding: "10px",
          borderRadius: "13px",
          boxShadow: "0px 11px 3px rgba(0,0,0,0.1)",
        }}
      >
        <CardContent>
          <div
            style={{
              display: "flex",
              alignItems: "end",
              justifyContent: "start",
            }}
            dir={locale === "ar" ? "rtl" : "ltr"}
          >
            <Typography style={{ marginRight: "20px" }} variant="h2">
            {t("cairo")}
            </Typography>
            <Typography style={{ marginRight: "20px" }} variant="h5">
            {timeAndDate}
            </Typography>
          </div>
          <hr />
          <Grid
            container
            spacing={2}
            alignItems="center"
            justifyContent="space-between"
            dir={locale === "ar" ? "rtl" : "ltr"}
          >
         <Grid item>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <Typography variant="h1" style={{ textAlign: "right", marginRight: '10px' }}>
                  {temp.number !== null ? `${temp.number}°C` : "Loading..."}
                </Typography>
                <img src={temp.icon} alt="weather icon" style={{ height: '50px' }} />
              </div>
              <Typography variant="h5" style={{ textAlign: "right" }}>
                {temp.description}
              </Typography>
            </Grid>
            <Grid item>
              <CloudIcon style={{ color: "white", fontSize: 210 }} />
            </Grid>
          </Grid>
          <div
            style={{
              textAlign: "right",
              display: "flex",
              justifyContent: "space-between",
            }}
            dir="rtl"
          >
            <div
              style={{
                textAlign: "right",
                display: "flex",
                justifyContent: "space-around",
                alignItems: "center",
              }}
            >
              <Typography variant="h5" style={{ margin: "0 5px" }}>
                {t("min")}: {temp.min !== null ? `${temp.min}°C` : "Loading..."}
              </Typography>
              <Typography variant="h5" style={{ margin: "0 5px" }}>
                |
              </Typography>
              <Typography variant="h5" style={{ margin: "0 5px" }}>
              {t("min")}: {temp.max !== null ? `${temp.max}°C` : "Loading..."}
              </Typography>
            </div>
          </div>
        </CardContent>
      </Card>

      <Box
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "flex-start",
          marginTop: "12px",
        }}
      >
        <Button style={{ color: "white", fontSize: "22px" }} variant="text" onClick={handleLanguage}>
          {locale == "en" ? "Arabic" : "إنجليزي"}
        </Button>
      </Box>
    </Container>
  );
};

export default WeatherCard;
