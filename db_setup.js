const fs = require('fs');
const path = require('path');
const xml2js = require('xml2js'); 

const parser = new xml2js.Parser({ trim: true, normalize: true }); 
const root_dir = './data/AllPublicXML';

const Study = require('./models/study');

// A trick to handle undefined errors from missing data 
const getSafe = (fn) => {
    try {
        return fn();
    } catch (e) {
        return undefined;
    }
}

/**
 * The directory structure of the data as downloaded from https://clinicaltrials.gov/ is:
 *  /data/AllPublicXML
 *  ├── NCT0000xxxx
 *  │   ├── NCT00000001.xml
 *  │   ├── NCT00000002.xml
 *  │   ├── NCT00000003.xml
 *  │   ├── ...
 *  ├── NCT0001xxxx
 *  │   ├── NCT00010001.xml
 *  │   ├── NCT00010002.xml
 *  │   ├── NCT00010003.xml
*   │   ├── ...
 *  ├── ...
 *  │   ├── ...
 *  |   ├── ...
 *  ├── NCT0449xxxx
 *  │   ├── NCT04490001.xml
 *  │   ├── NCT04490002.xml
 *  │   ├── NCT04490003.xml
 *  │   ├── ...
 */
let counter = 1;
fs.readdirSync(root_dir).forEach(folder => {
    fs.readdirSync(root_dir + '/' + folder).forEach(file => {
        fs.readFile(root_dir + '/' + folder + '/' + file, (err, data) => { 
            parser.parseString(data, (err, result) => { 
                const studyObject = result.clinical_study;
                if(studyObject.study_type[0] != 'Interventional' || studyObject.intervention === undefined) 
                    return;
                
                const drug_array = studyObject.intervention
                                    .filter(item => item.intervention_type == 'Drug')
                                    .map(item => item.intervention_name[0]);
                if(drug_array.length == 0)
                    return;

                const newStudy = new Study({
                    "study_id": getSafe(() => studyObject.id_info[0].nct_id[0]),
                    "status": getSafe(() => studyObject.overall_status[0]),
                    "date": getSafe(() => studyObject.verification_date[0]),
                    "brief_title": getSafe(() => studyObject.brief_title[0]),
                    "url": getSafe(() => studyObject.required_header[0].url[0]),
                    "drugs": getSafe(() =>drug_array),
                    "brief_summary": getSafe(() => studyObject.brief_summary[0].textblock[0]),
                    "eligibility_criteria": getSafe(() => studyObject.eligibility[0].criteria[0].textblock[0]),
                    "conditions": getSafe(() => studyObject.condition)
                }); 

                // Insert in the DB
                newStudy.save().then(() => {
                    console.log(`Done with ${counter}/348,177`)
                    counter += 1
                });
            }); 
        });
    })
});
