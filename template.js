function template(greeting, namesList){
    return `
        <!DOCTYPE html>
        <html>
        <head>
            <title>Enter Name</title>
        </head>
        <body>
            ${greeting}
            <form action="/submit-name" method="post">
            <input
                type="text"
                name="username"
                placeholder="Enter your name"
                required
            />
            <button type="submit">Submit</button>
            </form>
            <div>
            <h1>All Names</h1>
            ${namesList}
            </div>
        </body>
        </html>`;
}   
   
module.exports = template;
