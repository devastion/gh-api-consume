import { screen, render, fireEvent } from "@testing-library/react";
import SearchInput from "../components/SearchInput";
import { Provider } from "react-redux";
import store from "../store/store";
import { BrowserRouter } from "react-router-dom";
import Profile from "../Profile";

test("Onclick make request", () => {
  render(
    <Provider store={store}>
      <BrowserRouter>
        <SearchInput />
      </BrowserRouter>
    </Provider>
  );
  const searchButton = screen.getByRole("button", { name: "Search" });
  expect(searchButton).toBeInTheDocument;

  fireEvent.submit(searchButton);

  expect(<Profile />).toBeInTheDocument;
});
