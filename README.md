# my-app

`my-app` is a D coding expert free static site generator built using Node.js, Express.js, Handlebars, and Archiver. This application allows you to create, manage, and deploy static websites easily.

## Features

- **Node.js**: Fast and scalable server-side JavaScript runtime.
- **Express.js**: Web application framework for Node.js to handle server-side logic.
- **Handlebars**: Templating engine to create dynamic HTML content.
- **Archiver**: Utility for creating .zip files, useful for packaging and deploying your site.
- **Static Site Generation**: Generate static HTML pages from dynamic templates and content.

## Installation

1. **Clone the repository:**
    ```bash
    git clone https://github.com/yourusername/my-app.git
    cd my-app
    ```

2. **Install dependencies:**
    ```bash
    npm install
    ```

## Usage

1. **Start the development server:**
    ```bash
    npm run dev
    ```

2. **Generate the static site:**
    ```bash
    npm run build
    ```

3. **Package the site:**
    ```bash
    npm run package
    ```

## Project Structure

- **/src**: Source files
  - **/views**: Handlebars templates
  - **/public**: Static assets (CSS, JS, images)
    - **/index.html**: Main entry point for the site
  - **/routes**: Express routes
  - **/templates**: Handlebars templates
    - **/templates1.hbs**
    - **/templates2.hbs**
    - ...
    - **/templates20.hbs**
- **/build**: Generated static site
- **/packages**: Packaged zip files of the site

## Contributing

1. Fork the repository.
2. Create a new branch.
    ```bash
    git checkout -b feature-branch
    ```
3. Make your changes.
4. Commit your changes.
    ```bash
    git commit -m "Description of changes"
    ```
5. Push to your branch.
    ```bash
    git push origin feature-branch
    ```
6. Open a pull request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgements

- [Node.js](https://nodejs.org/)
- [Express.js](https://expressjs.com/)
- [Handlebars](https://handlebarsjs.com/)
- [Archiver](https://www.npmjs.com/package/archiver)
