import React from "react";
import {
  screen,
  render,
  cleanup,
  waitFor,
  waitForElementToBeRemoved,
  act,
} from "@testing-library/react";
import axiosMock from "axios";
import Vehicle from "../Vehicle";

//jest.mock("axiosMock");

afterEach(cleanup);
describe("When all is well", () => {
  test("Should render Vehicle", async () => {
    const vehicle = [{ id: "", description: "", price: 0 }];
    axiosMock.get.mockImplementationOnce(() => {
      Promise.resolve({
        data: {
          vehicle: vehicle,
        },
      });
    });
    render(<Vehicle vehicle={vehicle} />);
  });
});

describe("Vehicle is mounted", () => {
  test("fetches and display data", async () => {
    const vehicle = { id: "xf", price: 10000, description: "Hello there" };
    axiosMock.get.mockImplementationOnce(() => {
      Promise.resolve({
        data: {
          vehicle: vehicle,
        },
      });
    });
    const { getByTestId } = render(<Vehicle vehicle={vehicle} />);

    expect(getByTestId("loading")).toHaveTextContent("Loading data...");

    const resolvedData = await screen.findByTestId("loading");
    expect(resolvedData).toHaveTextContent("Loading data...");
    expect(resolvedData.children).toHaveLength(0);
    expect(axiosMock.get).toHaveBeenCalledTimes(1);
    expect(axiosMock.get).toHaveBeenCalledWith(`/api/vehicle/${vehicle.id}`);
  });

  screen.debug();
});
