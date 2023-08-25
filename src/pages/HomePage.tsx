import { Container, Grid } from "@mui/material";
import MapCard from "../components/MapCard";

import CssBaseline from "@mui/material/CssBaseline";
import map from "../assets/map.svg";

export default function HomePage() {
    // const HomePageTheme = createTheme({
    //     palette: {
    //         background: {
    //             default: "#10062B",
    //         },
    //     },
    // });

    return (
        <>
            <CssBaseline />
            <Container
                //center container in the middle of the screen
                // make it full screen
                // make map.svg as background

                sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    mt: 8,
                    background: `url(${map}) bottom center no-repeat`,
                }}
            >
                <Grid container spacing={50}>
                    <Grid container item spacing={100}>
                        <Grid item xs={12} md={6}>
                            <MapCard
                                name="Мир орфографии"
                                fill="#605DE3"
                                opacity={0.9}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <MapCard
                                name="Мир орфографии"
                                fill="#F96108"
                                opacity={0.9}
                            />
                        </Grid>
                    </Grid>
                    <Grid container item spacing={100}>
                        <Grid item xs={12} md={6}>
                            <MapCard
                                name="Мир орфографии"
                                fill="#FAB02D"
                                opacity={0.9}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <MapCard
                                name="Мир орфографии"
                                fill="#7CB518"
                                opacity={0.9}
                            />
                        </Grid>
                    </Grid>
                </Grid>
            </Container>
        </>
    );
}
