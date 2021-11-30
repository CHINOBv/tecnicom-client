import Instagram from "node-instagram";

const client_id = "359294529284647";
const client_secret = "d43b1fce076bb4c522f70de3cb7a1ab5";
const redirectURI = "https://localhost:3000/";
const accessToken =
  "IGQVJVVjRaeE5tLW56ekJ4SV9KTkRmUkhBUXdJaUNXRlJHRm1Wb2o3UnlqU2xkcFRja0VZAd0tXOWlvZAUxRYkFrVjNNNDl5aUZA3UUwxRGlSeFVCZA3ctVC1DOUFZAMGU5VzdSeHBYRmlXMzhNOFpGVFZAnTAZDZD";

export const instagram = new Instagram({
  clientId: client_id,
  clientSecret: client_secret,
  // accessToken,
});

export const redirectToAuth = () => {
  const authUrl = instagram.getAuthorizationUrl(redirectURI, {
    scope: ["basic"],
  });
  window.location.replace(authUrl);
};
