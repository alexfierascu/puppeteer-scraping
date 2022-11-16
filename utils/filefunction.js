import fs from 'fs';


const write_to_file = (element) => {
    fs.writeFile(`${generalPath}/courses.json`, JSON.stringify(element), (error) => {
        if (error) throw error;
        console.log(`file saved`);
    });
};

const create_folder = (path) => {
    fs.mkdirSync(path, { recursive: true });
};

module.exports = { write_to_file, create_folder };