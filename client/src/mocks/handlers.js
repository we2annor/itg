import { rest } from "msw";

const handlers = [
  rest.get("/api/vehicle", async (req, res, ctx) => {
    const vehicles = await [
      {
        id: "xe",
        modelYear: "k17",
        url: "/api/vehicle",
        media: [],
      },
      {
        id: "xf",
        modelYear: "k17",
        url: "/api/vehicle",
        media: [],
      },
      {
        id: "ftype",
        modelYear: "k17",
        url: "/api/vehicle",
        media: [],
      },
    ];

    return res(ctx.status(200), ctx.json({ vehicles }));
  }),
];

export { handlers };
