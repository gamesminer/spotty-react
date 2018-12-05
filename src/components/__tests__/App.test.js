import React from "react";
import { ThemedApp } from "../App";
import renderer from "react-test-renderer";

import { MuiThemeProvider } from "@material-ui/core/styles";
import theme from "../../theme";

jest.mock("../mySongs/MySongs", () => "my-songs");
jest.mock("../artists/Artists", () => "artists");
jest.mock("../about/About", () => "about");
jest.mock("../albums/Albums", () => "albums");
jest.mock("../albums/AlbumTable", () => "album-table");
jest.mock("../artists/ArtistTable", () => "artist-table");
jest.mock("../auth/Auth", () => "auth");
jest.mock("../notFound/NotFound", () => "not-found");

jest.mock("../routes/PrivateRoute", () => "private-route");
jest.mock("../routes/PublicRoute", () => "public-route");

jest.mock("../../services/FirebaseService");

describe("App component", () => {
  const props = {
    fetchUser: jest.fn()
  };

  it("should render correctly", () => {
    const tree = renderer
      .create(
        <MuiThemeProvider theme={theme}>
          <ThemedApp {...props} />
        </MuiThemeProvider>
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it("should load initial data after mount", () => {
    expect(props.fetchUser).toHaveBeenCalled();
  });
});
