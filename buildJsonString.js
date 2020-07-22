function BuildJsonString(object) {
  const resumeJsonObj = { basics: {} };

  // build basic
  resumeJsonObj.basics.name = object.basics.firstname;

  if (object.basics.lastname) {
    if (!object.basics.firstname) {
      resumeJsonObj.basics.name = object.basics.lastname;
    } else {
      resumeJsonObj.basics.name =
        resumeJsonObj.basics.name + " " + object.basics.lastname;
    }
  }

  resumeJsonObj.basics.label = object.basics.label;
  resumeJsonObj.basics.picture = object.basics.picture;
  resumeJsonObj.basics.email = object.basics.email;
  resumeJsonObj.basics.phone = object.basics.phone;
  resumeJsonObj.basics.website = object.basics.website;
  resumeJsonObj.basics.summary = object.basics.summary;
  resumeJsonObj.basics.location = object.basics.location || {};
  resumeJsonObj.basics.summary = object.basics.summary;
  resumeJsonObj.skills = [{ keywords: object.basics.skills }];

  //Build work
  resumeJsonObj.work = [];

  for (let i = 0; i < object.work.length; i++) {
    let currentWorkItem = {};

    currentWorkItem.position = object.work[i].position;
    currentWorkItem.company = object.work[i].company;
    currentWorkItem.website = object.work[i].website;
    // currentWorkItem.city =  object.work[i].city;
    // currentWorkItem.state = object.work[i].state;
    currentWorkItem.startDate = object.work[i].startDate;
    currentWorkItem.endDate = object.work[i].endDate;
    currentWorkItem.highlights = object.work[i].highlights;

    resumeJsonObj.work.push(currentWorkItem);
  }

  //Build Education

  resumeJsonObj.education = [];

  for (let y = 0; y < object.education.length; y++) {
    let currentEduItem = {};

    currentEduItem.institution = object.education[y].institution;
    currentEduItem.area = object.education[y].area;
    currentEduItem.studyType = object.education[y].studyType;
    currentEduItem.startDate = object.education[y].startDate;
    currentEduItem.endDate = object.education[y].endDate;
    currentEduItem.gpa = object.education[y].gpa;
    currentEduItem.courses = object.education[y].courses;

    resumeJsonObj.education.push(currentEduItem);
  }
  console.log(resumeJsonObj);

  return resumeJsonObj;
  // return JSON.stringify(resumeJsonObj);
}

module.exports = BuildJsonString;
