const { program } = require("commander");

const {
    getAll,
    getById,
    add,
    deleteById,
} = require("./contacts")

const invokeAction = async ({action, id, name, email, phone}) => {
    switch(action) {
        case "read":
            const allContacts = await getAll();
            return console.log(allContacts);
            break;        
        case "getById":
            const oneContacts = await getById(id);
            return console.log(oneContacts);
            break;
        case "deleteById":
            const deleteContacts = await deleteById(id);
            return console.log(deleteContacts);     
            break;
        case "add":
            const newContacts = await add({ name, email, phone });
            return console.log(newContacts);
            break;
        default:
            console.warn("\x1B[31m Unknown action type!")
    }
}

program
    .option("-a, --action, <type>")
    .option("-i, --id, <type>")
    .option("-n, --name, <type>")
    .option("-e, --email, <type>")
    .option("-p, --phone, <type>")

program.parse();
const options = program.opts();
invokeAction(options)    

// invokeAction({ action: "read" });
// invokeAction({ action: "getById", id: "qdggE76Jtbfd9eWJHrssH" });
// invokeAction({ action: "deleteById", id: "etRxG_e63JNJInm0f_q8D" });
// invokeAction({ action: "add", name: "Dmytro Best", email: "db@gmail.com", phone: "(050) 887-4654"});