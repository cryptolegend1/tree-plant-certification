const { CredentialsServiceClient, Credentials } = require("@trinsic/service-clients");

class ApiService {
  public async issue(
    species: string,
    location: string,
    date: string,
  ) {
    const client = new CredentialsServiceClient(
      new Credentials(process.env.REACT_APP_ACCESSTOK),
      { noRetryPolicy: true });
    let params = {
      definitionId: process.env.REACT_APP_CRED_DEF_ID,
      automaticIssuance: true,
      credentialValues: {
        "Species": species,
        "Location": location,
        "Date Of Plant": date,
      }
    };
    let result = await client.createCredential(params);
    return {offerData: result.offerData, offerUrl: result.offerUrl};
  }
}

export default new ApiService();
