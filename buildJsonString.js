function BuildJsonString(object) {
  // builds basics
  // builds location
  // builds profiles

  const resumeJsonObj = { basics: {} };

  // build basic
  if (object.name) {
    resumeJsonObj.basics.name = object.name;
  }

  if (object.label) {
    resumeJsonObj.basics.label = object.label;
  }

  if (object.picture) {
    resumeJsonObj.basics.picture = object.picture;
  }

  if (object.email) {
    resumeJsonObj.basics.email = object.email;
  }

  if (object.phone) {
    resumeJsonObj.basics.phone = object.phone;
  }

  if (object.website) {
    resumeJsonObj.basics.website = object.website;
  }

  if (object.summary) {
    resumeJsonObj.basics.summary = object.summary;
  }

  // check to see if any location data, if so create an empty obj for data
  if (
    object.address ||
    object.postalCode ||
    object.city ||
    object.countryCode ||
    object.region
  ) {
    resumeJsonObj.basics.location = {};
  }

  // build location
  if (object.address) {
    resumeJsonObj.basics.location.address = object.address;
  }

  if (object.postalCode) {
    resumeJsonObj.basics.location.postalCode = object.postalCode;
  }

  if (object.city) {
    resumeJsonObj.basics.location.city = object.city;
  }

  if (object.countryCode) {
    resumeJsonObj.basics.location.countryCode = object.countryCode;
  }

  if (object.region) {
    resumeJsonObj.basics.location.region = object.region;
  }

  return JSON.stringify(resumeJsonObj);
}

module.exports = BuildJsonString;

// test function
// BuildJsonString({
//   name: "koby",
//   label: "Programmer",
//   email: "koby@roomservice.dev",
//   address: "345 Frederick St #1",
//   postalCode: "94117",
//   city: "San Francisco",
//   countryCode: "US",
//   region: "California",
// });
