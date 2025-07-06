// loc-ft.js
// Script Node.js para localizar arquivos de fotos e gerar um JSON.

const fs = require('fs');
const path = require('path');

const fotosDirectory = path.join(__dirname, 'Fotos');
const outputJsonPath = path.join(__dirname, 'fotos.json');
const imageExtensions = ['.jpg', '.jpeg', '.png', '.webp', '.gif'];

try {
    // Lê o conteúdo do diretório de fotos
    const files = fs.readdirSync(fotosDirectory);

    // Filtra para manter apenas os arquivos com extensões de imagem
    const imageFiles = files.filter(file => {
        const ext = path.extname(file).toLowerCase();
        return imageExtensions.includes(ext);
    });

    // Converte o array de nomes de arquivo para uma string JSON formatada
    const jsonContent = JSON.stringify(imageFiles, null, 2);

    // Escreve a string JSON no arquivo 'fotos.json'
    fs.writeFileSync(outputJsonPath, jsonContent, 'utf8');

    console.log(`Sucesso! O arquivo 'fotos.json' foi criado/atualizado com ${imageFiles.length} imagens.`);
    console.log(`Local: ${outputJsonPath}`);

} catch (error) {
    console.error("Ocorreu um erro ao gerar o arquivo JSON:", error.message);
    // Cria um arquivo vazio em caso de erro para não quebrar o app
    if (!fs.existsSync(outputJsonPath)) {
        fs.writeFileSync(outputJsonPath, '[]', 'utf8');
        console.log("Um arquivo 'fotos.json' vazio foi criado para evitar erros.");
    }
}