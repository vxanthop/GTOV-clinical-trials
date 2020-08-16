const fs = require('fs');
const xml2js = require('xml2js'); 
const Study = require('./models/study');

const rootDir = './data/AllPublicXML';

// A trick to handle undefined errors from missing data 
const getSafe = fn => {
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
const format = async xml => {
    const parser = new xml2js.Parser({ trim: true, normalize: true }); 
    const result = await parser.parseStringPromise(xml) 
    const studyObject = result.clinical_study;
    if(studyObject.study_type[0] !== 'Interventional' || studyObject.intervention === undefined) 
        return;
    
    const drugArray = studyObject.intervention
                        .filter(item => item.intervention_type[0] === 'Drug')
                        .map(item => item.intervention_name[0]);
    if(drugArray.length === 0)
        return;
    
    const newStudy = new Study({
        "study_id": getSafe(() => studyObject.id_info[0].nct_id[0]),
        "status": getSafe(() => studyObject.overall_status[0]),
        "date": getSafe(() => studyObject.verification_date[0]),
        "brief_title": getSafe(() => studyObject.brief_title[0]),
        "url": getSafe(() => studyObject.required_header[0].url[0]),
        "drugs": getSafe(() => drugArray),
        "brief_summary": getSafe(() => studyObject.brief_summary[0].textblock[0]),
        "eligibility_criteria": getSafe(() => studyObject.eligibility[0].criteria[0].textblock[0]),
        "conditions": getSafe(() => studyObject.condition)
    }); 

    return newStudy;
}

let counter = 1;
async function runner() {
    for await (const dirent of await fs.promises.readdir(rootDir, { withFileTypes: true })) {
        if(dirent.isFile()) continue;
        for await (const file of await fs.promises.readdir(`${rootDir}/${dirent.name}`)) {
            const xml = await fs.promises.readFile(`${rootDir}/${dirent.name}/${file}`, {encoding: 'utf-8'})
            const newStudy = await format(xml)
            if(newStudy !== undefined) { // If format actually returns an object
                try {
                    await newStudy.save().then(console.log(`Done with ${counter++}/137,246`))
                } catch(err) {
                    console.error(err)
                }
            }
        }
    }
}

runner()
