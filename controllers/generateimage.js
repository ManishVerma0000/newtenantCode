const nodeHtmlToImage = require('node-html-to-image');

const image = async (req, res) => {
    try {
        const generateImage = async () => {
            const htmlTemplate = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Sample HTML to Image</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                display: flex;
                justify-content: center;
                align-items: center;
                height: 100vh;
                margin: 0;
                background-color: #f0f0f0;
            }
            .container {
                background: white;
                padding: 20px;
                border-radius: 10px;
                box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                text-align: center;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <h1>Hello, World!</h1>
            <p>This is a sample HTML to image conversion.</p>
        </div>
    </body>
    </html>
  `;

            await nodeHtmlToImage({
                output: './output-image.png',
                html: htmlTemplate
            });

            console.log('Image generated successfully!');
        };

        generateImage();


    } catch (error) {
        await res.status(400).send(error.message)

    }
}

module.exports = image