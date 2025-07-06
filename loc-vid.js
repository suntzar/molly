// loc-vid.js
// Script para localizar arquivos de vídeo e gerar um JSON com metadados.

const fs = require('fs');
const path = require('path');

const videosDirectory = path.join(__dirname, 'Videos');
const outputJsonPath = path.join(__dirname, 'videos.json');
const videoExtensions = ['.mp4', '.webm', '.mov', '.ogg'];

// Dados fictícios para enriquecer o JSON
const sampleUsers = ["@noxss_dev", "@creative_coder", "@ux_master", "@frontend_fun", "@css_wizard"];
const sampleDescriptions = [
    "Testando o novo layout de feed vertical com Noxss! O que acharam? #uikit #dev",
    "Um pouco de animação CSS para começar o dia. ✨ #frontend #webdev",
    "Construindo interfaces incríveis de forma rápida e modular. 🔥",
    "A simplicidade é a máxima sofisticação. #design #minimalism",
    "Um fim de tarde relaxante na praia. 🌊 #nature #travel",
    "O processo criativo por trás do meu último projeto. #makingof"
];

try {
    const files = fs.readdirSync(videosDirectory);

    const videoFiles = files
        .filter(file => videoExtensions.includes(path.extname(file).toLowerCase()))
        .map((file, index) => ({
            id: `vid_${index + 1}`,
            filename: file,
            user: sampleUsers[index % sampleUsers.length],
            description: sampleDescriptions[index % sampleDescriptions.length],
            likes: Math.floor(Math.random() * 2000) + 100,
            comments: Math.floor(Math.random() * 500) + 20,
            shares: Math.floor(Math.random() * 300) + 10
        }));

    const jsonContent = JSON.stringify(videoFiles, null, 2);
    fs.writeFileSync(outputJsonPath, jsonContent, 'utf8');

    console.log(`Sucesso! 'videos.json' foi criado/atualizado com ${videoFiles.length} vídeos.`);
    console.log(`Local: ${outputJsonPath}`);

} catch (error) {
    console.error("Erro ao gerar 'videos.json':", error.message);
    if (!fs.existsSync(outputJsonPath)) {
        fs.writeFileSync(outputJsonPath, '[]', 'utf8');
        console.log("Um 'videos.json' vazio foi criado para evitar erros na aplicação.");
    }
}