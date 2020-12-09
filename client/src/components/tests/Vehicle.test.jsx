import React from "react";
import {
  screen,
  render,
  cleanup,
  waitFor,
  waitForElementToBeRemoved,
  act,
} from "@testing-library/react";
import axios from "axios";
import Vehicle from "../Vehicle";

jest.mock("axios");

afterEach(cleanup);
describe("When all is well", () => {
  test("Should render Vehicle", async () => {
    const vehicle = { id: "", description: "", price: 0 };
    act(() => {
      render(<Vehicle vehicle={vehicle} />);
    });
  });
});

describe("Vehicle is mounted", () => {
  test("fetches and display data", async () => {
    const vehicle = { id: 1, price: 10000, description: "Hello there" };
    axios.get.mockResolvedValue(vehicle);
    const { getByTestId, findByTestId, queryByTestId } = render(
      <Vehicle vehicle={vehicle} />
    );

    expect(getByTestId("loading")).toHaveTextContent("Loading data...");

    const resolvedData = await screen.findByTestId("resolved-vehicle-data");
    // const resolved = await waitForElementToBeRemoved(() =>
    //   queryByTestId("resolved-vehicle-data")
    // );
    expect(resolvedData).toHaveTextContent(vehicle);
    expect(resolvedData).toHaveTextContent(vehicle);
    expect(resolvedData.children).toHaveLength(2);
    expect(axios.get).toHaveBeenCalledTimes(1);
    expect(axios.get).toHaveBeenCalledWith(vehicle);
  });
});
