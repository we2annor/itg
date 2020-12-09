import { rest } from "msw";

export const handlers = [
  rest.get("/api/vehicle", (req, res, ctx) => {
    const error = false;
    if (!error) {
      return res(ctx.status(403), ctx.json({ message: "An error occured" }));
    }
    return res(ctx.status(200), ctx.json({ data: "working" }));
  }),
];
