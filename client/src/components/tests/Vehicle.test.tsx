import React from "react";
import {screen, render, act, waitForElementToBeRemoved, waitFor} from "@testing-library/react";
import {rest} from 'msw';
import Vehicle from "../Vehicle";
import { server } from "../../mocks/server";

const vehicles = [{id:'xf', modelYear: '2020', media:[{name:'vehicle', url:'/image/xf'}],url:'/image/xf'}, {id:'xe', modelYear: '2010', media:[],url:'/image/xe'}]
const vehicle = {id:'xf', modelYear: '2020', media:[{name:'vehicle', url:'/image/xf'}],url:'/image/xf'}
const vehicleInfo= {id:'xf', description:'working', price:40000};

describe("Vehicle component Mounts", () => {
  test('should display test Loading data... while loading vehicles', async ()=>{
    await act(async ()=>{
        const {getByTestId} = render(<Vehicle vehicle={vehicle} />)

        const loadingComponent = await waitFor(()=>getByTestId('loading'))
        expect(loadingComponent).toHaveTextContent('Loading data...');
    })
})

test('should removes text "Loading data..." after displaying Vehicles', async ()=>{
    await act(async ()=>{
        const {getByTestId} = render(<Vehicle vehicle={vehicle}/>);

        const removedElement = await waitForElementToBeRemoved(getByTestId('loading'));
        expect(removedElement).toBeUndefined();
    })
})

  test('should display an error message when fetching vehicleInfo with vehicle Id is unsuccessful', async ()=>{
    server.use(
      rest.get(`/api/vehicle/${vehicle.id}`, (req, res, ctx)=> {
        return res(ctx.status(500), ctx.json({message: 'internal server error'}))
      })
    )

    await act(async ()=>{
     const {getByTestId} = render(<Vehicle vehicle={vehicle}/>)
    const renderedElement = await waitFor(()=>getByTestId('error-div'));
    expect(renderedElement).toBeInTheDocument();
    expect(renderedElement).toHaveTextContent('Error Occured:')
    console.log('element', renderedElement)
    })
  })
  test("Should fetch and display a vehicle with Details", async () => {
    server.use(
      rest.get(`/api/vehicle/xf`, (req, res, ctx)=>{
        return res(ctx.status(200), ctx.json({vehicleInfo}))
      })
    );
    await act(async ()=>{
      const {findByTestId} = render(<Vehicle vehicle={vehicle} />);

      const renderedVehicle = await findByTestId('vehicle');
      expect(renderedVehicle).toHaveLength(3);
    })
  })
});


// describe("Vehicle is mounted", () => {
//   test("fetches and display data", async () => {
   
//     const vehicle = { id: "xf", price: 10000, description: "Hello there" };
//      await act(async ()=>{
//         const { getByTestId } = render(<Vehicle vehicle={vehicle} />);

//         expect(getByTestId("loading")).toHaveTextContent("Loading data...");

//         const resolvedData = await screen.findByTestId("loading");
//         expect(resolvedData).toHaveTextContent("Loading data...");
//         expect(resolvedData.children).toHaveLength(1);
//     })
//   });

//   screen.debug();
// });
