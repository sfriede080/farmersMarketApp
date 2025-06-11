import { expressjwt } from "express-jwt";
import { expressJwtSecret } from "jwks-rsa";

const checkJWT = expressjwt({
  secret: expressJwtSecret({
    jwksUri: "https://dev-vndmogggzut30im0.us.auth0.com/.well-known/jwks.json",
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
  }),
  audience: "https://dev-vndmogggzut30im0.us.auth0.com/api/v2/",
  issuer: "https://dev-vndmogggzut30im0.us.auth0.com/",
  algorithms: ["RS256"],
});

export { checkJWT };
